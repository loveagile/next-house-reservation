"use client";

import axios from "axios";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";

import Loading from "@/components/molecules/loading";
import CalendarBody from "@/components/organisms/CalendarBody/CalendarBody";
import CalendarHeader from "@/components/organisms/CalendarHeader/CalendarHeader";

import { numberOfDays } from "@/utils/convert";

import "./ReservationCalendarPage.css";

export interface ICalendarProps {
  year: number;
  month: number;
  days: number;
}

const ReservationCalendarPage: React.FC = () => {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth() + 1;

  const [currentCalendar, setCurrentCalendar] = useState<ICalendarProps>({
    year: currentYear,
    month: currentMonth,
    days: numberOfDays(currentYear, currentMonth),
  })

  return (
    <>
      {isLoading && <Loading />}
      <div className="flex flex-col p-10 w-full">
        <div className="mb-6">
          <h1 className="border-m-green border-l-[6px] text-xl p-0 pl-2 mb-3 font-bold ">
            予約カレンダー（月表示）
          </h1>
          <p className="text-sm">
            その月の全ての各イベントの予約状況がご確認いただけます。<br></br>
            「イベント名」「日付」「件数」をクリックすると、詳細が表示されます。
          </p>
        </div>
        <div className="bg-white w-full p-5">
          <table className="calendars_month w-full">
            <CalendarHeader currentCalendar={currentCalendar} setCurrentCalendar={setCurrentCalendar} />
            <CalendarBody currentCalendar={currentCalendar} setCurrentCalendar={setCurrentCalendar} isLoading={isLoading} setIsLoading={setIsLoading} />
          </table>
        </div>
      </div>
    </>
  );
};

export default ReservationCalendarPage;
