"use client";

import { useState } from "react";

import CalendarBody from "@/components/organisms/Calendar/Month/CalendarBody";
import CalendarHeader from "@/components/organisms/Calendar/Month/CalendarHeader";

import { numberOfDays } from "@/utils/convert";

export interface ICalendarProps {
  year: number;
  month: number;
  days: number;
}

const ReservationCalendarMonthPage: React.FC = () => {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth() + 1;

  const [currentCalendar, setCurrentCalendar] = useState<ICalendarProps>({
    year: currentYear,
    month: currentMonth,
    days: numberOfDays(currentYear, currentMonth),
  })

  return (
    <div className="flex flex-col p-10 w-full">
      <div className="mb-6">
        <h1 className="border-m-green border-l-[6px] text-xl pl-2 mb-3 font-bold">
          予約カレンダー（月表示）
        </h1>
        <p className="text-sm">
          その月の全ての各イベントの予約状況がご確認いただけます。<br />
          「イベント名」「日付」「件数」をクリックすると、詳細が表示されます。
        </p>
      </div>
      <div className="bg-white w-full p-5">
        <table className="w-full">
          <CalendarHeader currentCalendar={currentCalendar} setCurrentCalendar={setCurrentCalendar} />
          <CalendarBody currentCalendar={currentCalendar} />
        </table>
      </div>
    </div>
  )
};

export default ReservationCalendarMonthPage;
