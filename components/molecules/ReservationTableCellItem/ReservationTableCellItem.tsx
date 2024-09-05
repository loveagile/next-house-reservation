import React, { useState } from "react";
import { useRecoilValue, useRecoilState } from "recoil";

import { Button } from "@mui/material";

import { includeEventDate, getDateStr } from "@/utils/convert";
import { CandidateReserveDateAtom, SelectYearMonthAtom, CurrentReserveDateAtom } from "@/lib/recoil/EventDateAtom";

import "./ReservationTableCellItem.css";

const ReservationTableCellItem: React.FC<{ day: number }> = ({ day }) => {
  const candidateReserveDates = useRecoilValue(CandidateReserveDateAtom);
  const [_, setCurrentReserveDate] = useRecoilState(CurrentReserveDateAtom);
  const selectYearMonth = useRecoilValue(SelectYearMonthAtom);

  const { status, time, index } = includeEventDate(
    candidateReserveDates,
    selectYearMonth.year,
    selectYearMonth.month,
    day
  );

  const handleClick = () => {
    const year = selectYearMonth.year;
    const month = selectYearMonth.month.toString().padStart(2, '0');
    setCurrentReserveDate((prevState) => ({
      value: `${year}-${month}-${day}`,
      isOpen: !prevState.isOpen,
    }));
  }

  return (
    status ? (
      <div className="flex justify-center items-center">
        <Button className="reserve_btn" onClick={handleClick}>
          {day}
        </Button>
      </div>
    ) : (
      <p className="text-center text-xs text-[#777]">{day}</p>
    )
  );
};

export default ReservationTableCellItem;
