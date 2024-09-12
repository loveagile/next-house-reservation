import React from "react";
import { useRecoilValue, useRecoilState } from "recoil";

import { Button } from "@mui/material";

import { getCandidateReserveTimes, includeEventDate } from "@/utils/convert";
import { IEventDateTime } from "@/utils/types";
import { CandidateEventDateTimeAtom, YearMonthAtom, ReserveDateAtom, ReserveTimeAtom } from "@/lib/recoil/EventReserveDateAtom";
import { IReservationTimeProps } from "@/components/molecules/Reservation/ReservationTime";

const ReservationTableCellItem: React.FC<{ day: number }> = ({ day }) => {
  const candidateReserveDates = useRecoilValue<IEventDateTime[]>(CandidateEventDateTimeAtom);
  const { year, month } = useRecoilValue(YearMonthAtom);
  const [_, setReserveDate] = useRecoilState(ReserveDateAtom);
  const [__, setReserveTime] = useRecoilState(ReserveTimeAtom);

  const { status, time, index } = includeEventDate(
    candidateReserveDates,
    year, month, day
  );

  const handleReservationDateClick = () => {
    const monthStr = month.toString().padStart(2, '0');
    const dayStr = day.toString().padStart(2, '0');
    const convReserveDate = `${year}-${monthStr}-${dayStr}`;

    setReserveDate((prevState) => ({
      value: convReserveDate,
      isOpen: !prevState.isOpen,
    }));

    const times: IReservationTimeProps[] = getCandidateReserveTimes(candidateReserveDates, convReserveDate);
    if (times.length) {
      setReserveTime({
        startTime: times[0].startTime,
        endTime: times[0].endTime,
      })
    }
  }

  return (
    status ? (
      <div className="flex justify-center items-center">
        <Button onClick={handleReservationDateClick} sx={{
          backgroundColor: "#00BFFF",
          color: "white",
          padding: "3px 8px",
          borderRadius: "50%",
          minWidth: "auto",
          lineHeight: 1,
          '&:hover': {
            backgroundColor: "#00BFFF",
            opacity: 0.9,
          }
        }}>
          {day}
        </Button>
      </div>
    ) : (
      <p className="text-center text-xs text-[#777]">{day}</p>
    )
  );
};

export default ReservationTableCellItem;
