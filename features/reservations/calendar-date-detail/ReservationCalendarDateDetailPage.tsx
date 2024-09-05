"use client";

import axios from "axios";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";

import Button from "@mui/material/Button";
import KeyboardArrowLeftRoundedIcon from "@mui/icons-material/KeyboardArrowLeftRounded";
import KeyboardArrowRightRoundedIcon from "@mui/icons-material/KeyboardArrowRightRounded";

import Loading from "@/components/molecules/loading";
import CalendarBody from "@/components/organisms/CalendarBody/CalendarBody";
import CalendarHeader from "@/components/organisms/CalendarHeader/CalendarHeader";
import ReservationGroupEvent from "@/components/organisms/ReservationGroupEvent/ReservationGroupEvent";

import { IReservationEvent, IReservationGroupedEvent } from "@/utils/types";
import { groupEventsByEventId, dayStrOfWeek, getDateStr } from "@/utils/convert";

import "./ReservationCalendarDateDetailPage.css";

interface ISelectedDate {
  year: number;
  month: number;
  date: number;
}

const ReservationCalendarDateDetailPage: React.FC = () => {
  const { id, eventId } = useParams<{ id: string; eventId: string }>();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [groupedEvents, setGroupedEvents] = useState<IReservationGroupedEvent[]>([]);

  const [year, month, date] = String(id).split("-");
  const [selectedDate, setSelectedDate] = useState<ISelectedDate>({
    year: Number(year),
    month: Number(month),
    date: Number(date),
  })

  useEffect(() => {
    setIsLoading(true);
    const fetchEventData = async () => {
      const res = await axios.post('/api/reservations/search', {
        searchStr: id,
        eventId,
      })
      const events: IReservationEvent[] = res.data;
      const groupedEvents: IReservationGroupedEvent[] = groupEventsByEventId(events);
      setGroupedEvents(groupedEvents);
    }
    fetchEventData();
    setIsLoading(false);
  }, [])

  const handlePreviousDay = () => {
    const currentDate = new Date(selectedDate.year, selectedDate.month - 1, selectedDate.date);
    const previousDate = new Date(currentDate);
    previousDate.setDate(currentDate.getDate() - 1);
    const previousDateStr = getDateStr(previousDate.getFullYear(), previousDate.getMonth() + 1, previousDate.getDate());
    router.push(`/reservations/calendars/${previousDateStr}`);
  }

  const handleNextDay = () => {
    const currentDate = new Date(selectedDate.year, selectedDate.month - 1, selectedDate.date);
    const nextDate = new Date(currentDate);
    nextDate.setDate(currentDate.getDate() + 1);
    const nextDateStr = getDateStr(nextDate.getFullYear(), nextDate.getMonth() + 1, nextDate.getDate());
    router.push(`/reservations/calendars/${nextDateStr}`);
  }

  return (
    <>
      {/* {isLoading && <Loading />} */}
      <div className="flex flex-col p-10 w-full">
        <div className="mb-6">
          <h1 className="border-m-green border-l-[6px] text-xl p-0 pl-2 mb-3 font-bold ">
            予約カレンダー（日表示）
          </h1>
          <p className="text-sm">
            表示した日付の全イベントに入った予約者をタイムスケジュールで全て確認でき、予約可能数の変更が行えます。<br></br>
            「お客様名」をクリックすると予約情報の詳細が表示されます。
          </p>
        </div>
        <div className="bg-white w-full p-5">
          <h2 className="flex justify-center items-center pb-3 gap-x-1 py-1 border-b-[1px] border-[#ddd]">
            <Button
              className="prev_btn"
              onClick={handlePreviousDay}
            >
              <KeyboardArrowLeftRoundedIcon className="arrow_icon" />
            </Button>
            <p className="text-2xl font-bold">
              {selectedDate.month}月{selectedDate.date}日({dayStrOfWeek(new Date(selectedDate.year, selectedDate.month - 1, selectedDate.date))})
            </p>
            <Button
              className="nxt_btn"
              onClick={handleNextDay}
            >
              <KeyboardArrowRightRoundedIcon className="arrow_icon" />
            </Button>
          </h2>
          {groupedEvents.map(event =>
            <ReservationGroupEvent key={event.eventId} event={event} />
          )}
        </div>
      </div>
    </>
  );
};

export default ReservationCalendarDateDetailPage;
