"use client";

import { useRecoilState } from "recoil";

import ReservationDateCalendar from "@/components/organisms/Calendar/Reservation/ReservationDateCalendar";
import { ReserveDateAtom } from "@/lib/recoil/EventReserveDateAtom";

interface ThisFCProps {
  className?: string;
}

const ReservationDate: React.FC<ThisFCProps> = ({ className }) => {
  const [reserveDate, setReserveDate] = useRecoilState(ReserveDateAtom);

  const handleClick = () => {
    setReserveDate((prevState) => ({
      ...prevState,
      isOpen: !prevState.isOpen,
    }));
  }

  return (
    <div className="w-full">
      <div onClick={handleClick}
        className={`w-full max-w-full text-[15px] px-2 py-1 border-[1px] border-[#ccc] rounded-[5px] min-h-[33px] ${className}`}
      >
        {reserveDate.value}
      </div>
      {reserveDate.isOpen && <ReservationDateCalendar className="absolute z-50" />}
    </div>
  )
}

export default ReservationDate;
