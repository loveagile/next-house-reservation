"use client";

import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";

import { ICalendarProps } from "@/features/reservations/ReservationCalendarMonthPage";
import { dayStrOfWeek, getDateStr, groupEventsByEventId } from "@/utils/convert";

export interface IReservationEvent {
  eventId: number;
  customerId: number;
  title: string;
  reserveDate: string;
  startTime: string;
  endTime: string;
  lastName: string;
  firstName: string;
}

export interface IReservationGroupedEvent {
  eventId: number;
  title: string;
  customers: {
    customerId: number;
    firstName: string;
    lastName: string;
    reserveDate: string;
    startTime: string;
    endTime: string;
  }[];
}

interface IReservationCustomer {
  customerId: number;
  firstName: string;
  lastName: string;
  reserveDate: string;
  startTime: string;
  endTime: string;
}

interface ThisFCProps {
  currentCalendar: ICalendarProps;
}
const CalendarBody: React.FC<ThisFCProps> = ({ currentCalendar }) => {

  const [groupedEvents, setGroupedEvents] = useState<IReservationGroupedEvent[]>([]);

  useEffect(() => {
    const fetchEventData = async () => {
      const res = await axios.post('/api/reservations/search', {
        searchStr: `${currentCalendar.year}-${String(currentCalendar.month).padStart(2, "0")}`,
      })
      const events: IReservationEvent[] = res.data;
      const groupedEvents: IReservationGroupedEvent[] = groupEventsByEventId(events);
      setGroupedEvents(groupedEvents);
    }
    fetchEventData();
  }, [currentCalendar]);

  const getReservationCountByDay = (customers: IReservationCustomer[], itemDayStr: string) =>
    customers.filter(customer => customer.reserveDate === itemDayStr).length;

  return (
    <tbody>
      {groupedEvents.map((event) => (
        <tr key={event.eventId}>
          <td className="p-2">
            <Link href={`/events/${event.eventId}`} className="text-sm mb-5 text-link-color underline">{event.title}</Link>
          </td>
          {Array.from({ length: currentCalendar.days }, (_, i) => i + 1).map((index) => {

            const dayStr = dayStrOfWeek(new Date(currentCalendar.year, currentCalendar.month - 1, index));
            const bgColor = dayStr === "土" ? "bg-[#eaf7ff]" : dayStr === "日" ? "bg-[#fff2f2]" : "";
            const itemDayStr = getDateStr(currentCalendar.year, currentCalendar.month, index);
            const reservationCounts = getReservationCountByDay(event.customers, itemDayStr);

            return (
              <td key={index}
                style={{ width: `${100 / currentCalendar.days}%` }}
                className={`${bgColor} text-center`}
              >
                {reservationCounts > 0 && (
                  <Link
                    href={`/reservations/calendars/${itemDayStr}/events/${event.eventId}`}
                    target="_blank"
                    className="text-link-color text-sm underline bg-[#f2cf01] block py-1"
                  >
                    {reservationCounts}
                  </Link>
                )}
              </td>
            )
          })}
        </tr>
      ))}
    </tbody>
  )
}

export default CalendarBody;