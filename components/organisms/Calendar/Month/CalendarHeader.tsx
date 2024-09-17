import Link from "next/link";

import Button from "@mui/material/Button";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import { ICalendarProps } from "@/features/reservations/ReservationCalendarMonthPage";

import { dayStrOfWeek, numberOfDays } from "@/utils/convert";

interface ThisFCProps {
  currentCalendar: ICalendarProps;
  setCurrentCalendar: (currentCalendar: ICalendarProps) => void;
}

const CalendarHeader: React.FC<ThisFCProps> = ({ currentCalendar, setCurrentCalendar }) => {
  const handlePreviousMonth = () => {
    let year = currentCalendar.year;
    let prevMonth = currentCalendar.month - 1;
    if (prevMonth === 0) {
      year -= 1, prevMonth = 12;
    }
    setCurrentCalendar({
      year,
      month: prevMonth,
      days: numberOfDays(year, prevMonth)
    })
  }

  const handleNextMonth = () => {
    let year = currentCalendar.year;
    let nxtMonth = currentCalendar.month + 1;
    if (nxtMonth === 13) {
      year += 1, nxtMonth = 1;
    }
    setCurrentCalendar({
      year,
      month: nxtMonth,
      days: numberOfDays(year, nxtMonth)
    })
  }

  return (
    <thead>
      <tr>
        <th rowSpan={2} className="min-w-[230px]"></th>
        <th colSpan={currentCalendar.days}>
          <div className="flex justify-center items-center gap-x-1 py-1">
            <Button
              onClick={handlePreviousMonth}
              sx={{
                padding: 0,
                minWidth: "auto",
              }}
            >
              <MdKeyboardArrowLeft className="text-3xl" />
            </Button>
            <p className="text-xl font-bold">
              {currentCalendar.year}年{String(currentCalendar.month).padStart(2, "0")}月
            </p>
            <Button
              onClick={handleNextMonth}
              sx={{
                padding: 0,
                minWidth: "auto",
              }}
            >
              <MdKeyboardArrowRight className="text-3xl" />
            </Button>
          </div>
        </th>
      </tr>
      <tr>
        {Array.from({ length: currentCalendar.days }, (_, i) => i + 1).map((index) => {
          const dateUrl = `${currentCalendar.year}-${String(currentCalendar.month).padStart(2, "0")}-${String(index).padStart(2, "0")}`;
          const dayStr = dayStrOfWeek(new Date(currentCalendar.year, currentCalendar.month - 1, index));
          const bgColor = dayStr === "土" ? "bg-[#eaf7ff]" : dayStr === "日" ? "bg-[#fff2f2]" : "";

          return (
            <th key={index} style={{ width: `${100 / currentCalendar.days}%` }} className={`font-medium p-1 text-sm ${bgColor}`}>
              <Link href={`/reservations/calendars/${dateUrl}`} target="_blank" className="text-[15px] mb-5 text-link-color underline">
                {index}
              </Link>
            </th>
          )
        })}
      </tr>
      <tr className="bg-[#868686] text-white">
        <th className="font-medium text-sm p-1">現在開催中のイベント</th>
        {Array.from({ length: currentCalendar.days }, (_, i) => i + 1).map((index) => {
          const dayStr = dayStrOfWeek(new Date(currentCalendar.year, currentCalendar.month - 1, index));
          const bgColor = dayStr === "土" ? "bg-[#2296f3]" : dayStr === "日" ? "bg-[#ff7271]" : "";
          return (
            <th key={index}
              style={{ width: `${100 / currentCalendar.days}%` }}
              className={`font-medium text-sm ${bgColor}`}
            >
              {dayStr}
            </th>
          )
        })}
      </tr>
    </thead>
  )
}

export default CalendarHeader;