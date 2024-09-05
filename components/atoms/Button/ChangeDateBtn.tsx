"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useRecoilState, useRecoilValue } from "recoil";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

import InputField from "@/components/molecules/InputField";
import SelectBox from "@/components/molecules/SelectBox";
import ReservationDate from "@/components/molecules/ReservationDate/ReservationDate";
import ReservationTime from "@/components/molecules/ReservationTime/ReservationTime";

import { getTimeStr, getFormatDate } from "@/utils/convert";
import { SelectYearMonthAtom, CandidateReserveDateAtom, CurrentReserveDateAtom } from "@/lib/recoil/EventDateAtom";
import { IEventDateTime } from "@/utils/types";
import { IReservationTimeProps } from "@/components/molecules/ReservationTime/ReservationTime";

export interface IChangeDateForm {
  reserveDate: string;
  startTime: string;
  endTime: string;
}

interface IChangeDateBtnProps {
  reserveDate: string;
  startTime: string;
  endTime: string;
  setCurrentReserveDateAndTime: (currentReserveDateAndTime: IChangeDateForm) => void;
  reserveId: number;
  eventId: number;
}

const ChangeDateBtn: React.FC<IChangeDateBtnProps> = ({ reserveDate, startTime, endTime, setCurrentReserveDateAndTime, reserveId, eventId }) => {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const [candidateReserveDates, setCandidateReserveDates] = useRecoilState(CandidateReserveDateAtom);
  const currentReserveDate = useRecoilValue(CurrentReserveDateAtom);
  const [_, setSelectYearMonth] = useRecoilState(SelectYearMonthAtom);
  const [currentTime, setCurrentTime] = useState<IReservationTimeProps>({
    startTime,
    endTime,
  });

  useEffect(() => {
    const fetchEventDetail = async () => {
      setIsLoading(true);

      const currentDate: Date = new Date();
      setSelectYearMonth({
        year: currentDate.getFullYear(),
        month: currentDate.getMonth() + 1,
      });

      const res = await axios.post("/api/events/detail", { id: eventId });
      if (res.status === 200) {
        const eventDates = JSON.parse(res.data[0].eventDate);
        let candidates: IEventDateTime[] = [];
        for (let i = 0; i < eventDates.length; i++) {
          const currentEventDate: IEventDateTime = eventDates[i];
          const { date, time } = currentEventDate;
          for (let j = 0; j < time.length; j += 2) {
            if (getFormatDate(date, getTimeStr(time[j])) >= new Date()) {
              candidates.push({
                date,
                time: time.slice(j)
              });
              break;
            }
          }
        }
        if (candidates.length > 0) {
          const { date, time } = candidates[0];
          const [year, month, day] = date.split("-");
          setSelectYearMonth({
            year: Number(year),
            month: Number(month),
          })
        }
        setCandidateReserveDates(candidates);
      }
      setIsLoading(false);
    };
    fetchEventDetail();
  }, []);

  // useEffect(() => {
  //   for (let i = 0; i < candidateReserveDates.length; i++) {
  //     const { date, time } = candidateReserveDates[i];
  //     if (date === reserveDate) {
  //       for (let j = 0; j < time.length; j += 2) {
  //         if (getTimeStr(time[j]) === startTime) {
  //           setCurrentTime({
  //             startTime,
  //             endTime: getTimeStr(time[j + 1])
  //           })
  //           return;
  //         }
  //       }
  //     }
  //   }
  // }, [candidateReserveDates])

  const handleChangeDateTime = () => {
    const date = currentReserveDate.value;
    const { startTime, endTime } = currentTime;

    const updateDateAndTime = async () => {
      await axios.post("/api/reservations/update", {
        id: reserveId,
        field_name: 'reserveDate',
        field_value: date,
      })

      await axios.post("/api/reservations/update", {
        id: reserveId,
        field_name: 'startTime',
        field_value: startTime,
      })

      await axios.post("/api/reservations/update", {
        id: reserveId,
        field_name: 'endTime',
        field_value: endTime,
      })
    }

    updateDateAndTime();

    setCurrentReserveDateAndTime({
      reserveDate: date,
      startTime,
      endTime
    })

    setOpen(false)
  }

  return (
    <>
      <Button className="date_change_btn" variant="contained" onClick={() => setOpen(true)}>
        日時変更
      </Button >
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="date_change_dialog_title"
      >
        <Button
          className="absolute right-1 top-1 min-w-0 text-[#95979c]"
          autoFocus
          onClick={() => setOpen(false)}
        >
          <CloseRoundedIcon />
        </Button>
        <DialogTitle className="dialog_title" id="date_change_dialog_title">
          変更する時間を指定してください
        </DialogTitle>
        <DialogContent>
          <div className="flex items-start mt-5">
            <div className="w-full">
              <ReservationDate id="date" className="min-w-[500px] w-full mt-3" value={reserveDate} />
            </div>
          </div>

          <p className="text-sm mt-6 mb-4 font-semibold">予約したい時刻を選択してください。</p>

          {/* Reservation Time */}
          <div className="w-full">
            <ReservationTime id="time" currentTime={currentTime} setCurrentTime={setCurrentTime} />
          </div>

          <p className="text-sm mt-12 mb-10">変更後、予約者にメールが送信されます。</p>

          <div className="flex gap-x-2 mb-5">
            <Button className="apply_btn" variant="contained" onClick={handleChangeDateTime}>
              変更
            </Button >
            <Button className="discard_btn" variant="contained" onClick={() => setOpen(false)}>
              閉じる
            </Button >
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ChangeDateBtn;
