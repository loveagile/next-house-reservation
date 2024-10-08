"use client";

import axios from "axios";
import { useState, useEffect } from "react";
import { useRecoilState } from "recoil";

import { Button, Dialog, DialogTitle, DialogContent, useMediaQuery } from "@mui/material";
import { CgClose } from "react-icons/cg";
import { useTheme } from "@mui/material/styles";

import ReservationDate from "@/components/molecules/Reservation/ReservationDate";
import ReservationTime from "@/components/molecules/Reservation/ReservationTime";

import { getCandidateReserveDateTimes } from "@/utils/convert";
import { CandidateEventDateTimeAtom, ReserveDateAtom, ReserveTimeAtom, YearMonthAtom } from "@/lib/recoil/EventReserveDateAtom";
import { IEventDateTime, IReserveDateTime } from "@/utils/types";

export interface IChangeDateForm {
  reserveDate: string;
  startTime: string;
  endTime: string;
}

interface ThisFCPrpos {
  reserveDateTime: IReserveDateTime;
  setReserveDateTime: (reserveDateTime: IReserveDateTime) => void;
  reserveId: number;
  eventId: number;
}

const ChangeDateBtn: React.FC<ThisFCPrpos> = ({ reserveDateTime, setReserveDateTime, reserveId, eventId }) => {
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const [_, setCandidateReserveDateTimes] = useRecoilState(CandidateEventDateTimeAtom);
  const [__, setYearMonth] = useRecoilState(YearMonthAtom);
  const [reserveDate, setReserveDate] = useRecoilState(ReserveDateAtom);
  const [reserveTime, setReserveTime] = useRecoilState(ReserveTimeAtom);

  useEffect(() => {
    if (open === false) return;

    setReserveDate({
      value: reserveDateTime.date,
      isOpen: false,
    });

    setReserveTime({
      startTime: reserveDateTime.startTime,
      endTime: reserveDateTime.endTime,
    });

    const [year, month, day] = reserveDateTime.date.split("-").map(Number);
    setYearMonth({
      year,
      month,
    });

    const fetchEventDetail = async () => {
      const res = await axios.post("/api/events/detail", { id: eventId });
      if (res.status === 200) {
        const candidates: IEventDateTime[] = getCandidateReserveDateTimes(JSON.parse(res.data[0].eventDate));
        setCandidateReserveDateTimes(candidates);
      }
    };
    fetchEventDetail();
  }, [open]);

  const handleChangeDateTime = () => {
    const date = reserveDate.value;
    const { startTime, endTime } = reserveTime;

    const updateDateAndTime = async () => {
      await axios.post("/api/reservations/update", {
        id: reserveId,
        field_names: ['reserveDate', 'startTime', 'endTime'],
        field_values: [date, startTime, endTime],
      })
    }
    updateDateAndTime();

    setReserveDateTime({
      date,
      startTime,
      endTime,
    })
    setOpen(false)
  }

  return (
    <>
      <Button variant="contained" onClick={() => setOpen(true)} sx={{
        width: "100%",
        display: "block",
        backgroundColor: "#2296f3",
        textAlign: "center",
        fontSize: "12px",
        padding: "4px 5px 2px",
        borderRadius: "1px",
        '&:hover': {
          backgroundColor: "#2296f3",
          opacity: 0.9,
        }
      }}>
        日時変更
      </Button >
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={() => setOpen(false)}
        sx={{
          '& .MuiDialog-paper': {
            minWidth: "700px",
          }
        }}
      >
        <Button
          className="absolute right-1 top-1 min-w-0 text-[#95979c]"
          onClick={() => setOpen(false)}
        >
          <CgClose className="text-lg" />
        </Button>
        <DialogTitle sx={{
          borderLeft: "5px #35bda1 solid",
          fontWeight: "700",
          color: "#555",
          padding: "0 0 0 8px",
          margin: "30px 30px 0",
        }}>
          変更する時間を指定してください
        </DialogTitle>
        <DialogContent>
          <div className="flex items-start mt-5">
            <div className="w-full">
              <ReservationDate className="min-w-[500px] w-full mt-3" />
            </div>
          </div>

          <p className="text-sm mt-5 mb-3 font-semibold">予約したい時刻を選択してください。</p>

          {/* Reservation Time */}
          <div className="w-full">
            <ReservationTime />
          </div>

          <p className="text-sm mt-10 mb-8">変更後、予約者にメールが送信されます。</p>

          <div className="flex gap-x-2 mb-5">
            <Button variant="contained" onClick={handleChangeDateTime} sx={{
              backgroundColor: "#2296f3",
              textAlign: "center",
              padding: "6px 20px 4px",
              fontSize: "14px",
              borderRadius: "1px",
              '&:hover': {
                backgroundColor: "#2296f3",
                opacity: 0.9,
              }
            }}>
              変更
            </Button >
            <Button variant="contained" onClick={() => setOpen(false)} sx={{
              backgroundColor: "#fff",
              color: "black",
              textAlign: "center",
              padding: "6px 20px 4px",
              fontSize: "14px",
              borderRadius: "1px",
              border: "1px solid #ddd",
              '&:hover': {
                backgroundColor: "#fff",
                opacity: 0.9,
              }
            }}>
              閉じる
            </Button >
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ChangeDateBtn;
