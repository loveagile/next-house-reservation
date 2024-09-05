"use client";

import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";

import ReservationDateCalendar from "@/components/organisms/ReservationDateCalendar/ReservationDateCalendar";
import { CurrentReserveDateAtom } from "@/lib/recoil/EventDateAtom";

import "./ReservationDate.css";

interface ThisFCProps {
  id: string;
  value: string;
  className?: string;
}

const ReservationDate: React.FC<ThisFCProps> = ({ id, value, className }) => {
  const [currentReserveDate, setCurrentReserveDate] = useRecoilState(CurrentReserveDateAtom);

  useEffect(() => {
    setCurrentReserveDate((prevState) => ({
      ...prevState,
      value,
    }));
  }, [])

  const handleClick = () => {
    setCurrentReserveDate((prevState) => ({
      ...prevState,
      isOpen: !prevState.isOpen,
    }));
  }


  return (
    <div className="w-full">
      <div
        id={id} onClick={handleClick}
        className={`w-full text-[15px] px-2 py-1 border-[1px] border-[#ccc] rounded-[5px] min-h-[33px] ${className}`}
      >
        {currentReserveDate.value}
      </div>
      {currentReserveDate.isOpen && <ReservationDateCalendar className="absolute z-50" />}
    </div>
  )
}

export default ReservationDate;
