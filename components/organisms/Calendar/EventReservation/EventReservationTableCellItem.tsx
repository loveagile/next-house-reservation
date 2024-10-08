import React from "react";
import { useRecoilValue, useRecoilState } from "recoil";

import { Button } from "@mui/material";

import { getCandidateReserveTimes, includeEventDate } from "@/utils/convert";
import { IEventDateTime } from "@/utils/types";
import { CandidateEventDateTimeAtom, YearMonthAtom, ReserveDateAtom, ReserveTimeAtom } from "@/lib/recoil/EventReserveDateAtom";
import { IReservationTimeProps } from "@/components/molecules/Reservation/ReservationTime";

const EventReservationTableCellItem: React.FC<{ day: number }> = ({ day }) => {
  const candidateReserveDates = useRecoilValue<IEventDateTime[]>(CandidateEventDateTimeAtom);

  const { year, month } = useRecoilValue(YearMonthAtom);
  const [reserveDate, setReserveDate] = useRecoilState(ReserveDateAtom);
  const [_, setReserveTime] = useRecoilState(ReserveTimeAtom);

  const { status, time, index } = includeEventDate(
    candidateReserveDates,
    year, month, day
  );

  const isSelected = reserveDate.value.slice(-2) === String(day).padStart(2, "0");

  const handleEventReservationDateClick = () => {
    const monthStr = month.toString().padStart(2, '0');
    const dayStr = day.toString().padStart(2, '0');
    const convReserveDate = `${year}-${monthStr}-${dayStr}`;

    if (convReserveDate === reserveDate.value) return;

    setReserveDate((prevState) => ({
      value: convReserveDate,
      isOpen: !prevState.isOpen,
    }));

    setReserveTime({
      startTime: "予約したい時刻を選択",
      endTime: "",
    })
  }

  return (
    status ? (
      <div className="flex flex-col justify-center items-center">
        <Button onClick={handleEventReservationDateClick} sx={{
          backgroundColor: isSelected ? "#e73939" : "#00BFFF",
          color: "white",
          width: "33px",
          height: "33px",
          padding: "0",
          borderRadius: "50%",
          minWidth: "auto",
          lineHeight: 1,
          fontSize: "15px",
          '&:hover': {
            backgroundColor: isSelected ? "#e73939" : "#00BFFF",
            opacity: 0.9,
          }
        }}>
          {day}
        </Button>
        <span className="text-[#00BFFF] text-lg">◎</span>
      </div>
    ) : (
      <p className="text-center leading-5 p-1">
        {day}<br />
        <span>–</span>
      </p>
    )
  );
};

export default EventReservationTableCellItem;
