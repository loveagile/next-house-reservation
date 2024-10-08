"use client";

import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import Button from "@mui/material/Button";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";

import Loading from "@/components/molecules/loading";
import ReservationGroupEvent from "@/components/organisms/ListItem/ReservationGroupEvent";
import { IReservationEvent, IReservationGroupedEvent } from "@/components/organisms/Calendar/Month/CalendarBody";
import { groupEventsByEventId, dayStrOfWeek, getDateStr } from "@/utils/convert";

const ReservationCalendarDatePage: React.FC = () => {
  const { id } = useParams();
  const [year, month, date] = String(id).split("-").map(Number);
  const router = useRouter();

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [groupedEvents, setGroupedEvents] = useState<IReservationGroupedEvent[]>([]);

  useEffect(() => {
    const fetchEventData = async () => {
      setIsLoading(true);
      const res = await axios.post('/api/reservations/search', {
        searchStr: id,
      })
      const events: IReservationEvent[] = res.data;
      const groupedEvents: IReservationGroupedEvent[] = groupEventsByEventId(events);
      setGroupedEvents(groupedEvents);
    }
    fetchEventData();
    setIsLoading(false);
  }, [])

  const handlePreviousDay = () => {
    const currentDate = new Date(year, month - 1, date);
    const previousDate = new Date(currentDate);
    previousDate.setDate(currentDate.getDate() - 1);
    const previousDateStr = getDateStr(previousDate.getFullYear(), previousDate.getMonth() + 1, previousDate.getDate());
    router.push(`/reservations/calendars/${previousDateStr}`);
  }

  const handleNextDay = () => {
    const currentDate = new Date(year, month - 1, date);
    const nextDate = new Date(currentDate);
    nextDate.setDate(currentDate.getDate() + 1);
    const nextDateStr = getDateStr(nextDate.getFullYear(), nextDate.getMonth() + 1, nextDate.getDate());
    router.push(`/reservations/calendars/${nextDateStr}`);
  }

  return (
    isLoading ? <Loading /> : (
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
              onClick={handlePreviousDay}
            >
              <MdKeyboardArrowLeft className="text-4xl" />
            </Button>
            <span className="text-2xl font-bold">
              {month}月{date}日({dayStrOfWeek(new Date(year, month - 1, date))})
            </span>
            <Button
              onClick={handleNextDay}
            >
              <MdKeyboardArrowRight className="text-4xl" />
            </Button>
          </h2>
          {groupedEvents.map(event =>
            <ReservationGroupEvent key={event.eventId} event={event} />
          )}
        </div>
      </div>
    )
  );
};

export default ReservationCalendarDatePage;
