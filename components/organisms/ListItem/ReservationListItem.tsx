import Link from "next/link";
import axios from "axios";
import { useState } from "react";

import Button from "@mui/material/Button";

import CancelBtn from "@/components/atoms/Button/CancelBtn";
import NotVisitedBtn from "@/components/atoms/Button/NotVisitedBtn";
import ChangeDateBtn from "@/components/atoms/Button/ChangeDateBtn";

import { IReserveDateTime } from "@/utils/types";
import { formatReservationDateToJapaneseString, formatSlashSplitDateString, getFormatDate } from "@/utils/convert";

export interface IReservationListItem {
  id: number;
  customerId: string;
  eventId: number;
  reserveDate: string;
  startTime: string;
  endTime: string;
  status: string;
  reservationTimes: number;
  receptionAt: string;          // Reservation

  title: string;
  type: string;
  format: string;               // Event

  lastName: string;
  firstName: string;
  employee: string;
  seiName: string;
  meiName: string;
  prefecture: string;
  city: string;
  street: string;
  building: string;
  email: string;
  phone: string;
  memo: string;
  note: string;                 // Customer
}

interface ThisFCProps {
  values: IReservationListItem;
}

const ReservationListItem: React.FC<ThisFCProps> = ({ values }) => {
  const {
    id, reserveDate, startTime, endTime,
    lastName, firstName, customerId, employee,
    reservationTimes, receptionAt,
    type, format, title, eventId, status
  } = values;

  const [currentStatus, setCurrentStatus] = useState<string>(status);
  const [reserveDateTime, setReserveDateTime] = useState<IReserveDateTime>({
    date: reserveDate,
    startTime,
    endTime,
  });

  // Check if reservation was passed
  const { date: receptionDate, time: receptionTime } = formatReservationDateToJapaneseString(receptionAt);
  if (new Date() > getFormatDate(reserveDate, startTime) && currentStatus === "active") {
    const handleVisited = async () => {
      await axios.post("/api/reservations/update", {
        id,
        field_names: ['status'],
        field_values: ['visited'],
      })
      setCurrentStatus("visited");
    };
    handleVisited();
  }

  return (
    <tr className={`w-full ${currentStatus === 'active' ? "" : "bg-[#d6d6d6]"}`}>
      <td className="w-[90px] p-2">
        <Button href={`/reservations/${id}`} variant="contained" sx={{
          display: "block",
          backgroundColor: "#ea9b54",
          fontSize: "12px",
          padding: "4px 5px 2px",
          textAlign: "center",
          borderRadius: "1px",
          '&:hover': {
            backgroundColor: "#ea9b54",
            opacity: 0.9,
          }
        }}>
          予約詳細
        </Button>
      </td>
      <td className="p-3 w-[135px] font-bold text-[15px]">
        {formatSlashSplitDateString(reserveDateTime.date)}<br></br>{reserveDateTime.startTime}
      </td>
      <td className="p-3 text-[15px]">
        <p>
          お客様名: <Link href={`/customers/${customerId}`} className="text-m-blue underline font-semibold">{lastName}{firstName}</Link> <br></br>
          担当者名: {employee} <br></br>
          予約回数: {reservationTimes}回 <br></br>
          受付日時: {receptionDate} {receptionTime}
        </p>
      </td>
      <td className="p-3">
        <span className="text-[10px] text-white bg-black px-2 py-[2px]">
          {type}
        </span>
        <span className="text-xs border-[1px] border-[#737373] px-2 py-[2px] ml-1">
          {format}
        </span>
        <p className="mt-2 text-[15px]">
          <Link href={`/events/${eventId}`} className="text-m-blue text-sm underline font-semibold">{title}</Link>
        </p>
      </td>
      <td className="w-20 p-2">
        <p className="text-xs text-white bg-[#29ac6d] px-2 py-[3px] text-center">
          手入力
        </p>
      </td>
      <td className="w-[120px] p-2">
        {currentStatus === "active" && (
          <div className="p-2">
            <ChangeDateBtn
              reserveDateTime={reserveDateTime}
              setReserveDateTime={setReserveDateTime}
              reserveId={id}
              eventId={eventId}
            />
            <CancelBtn setCurrentStatus={setCurrentStatus} id={id} />
          </div>
        )}
        {currentStatus === "canceled" && <p className="text-sm text-center">キャンセル済</p>}
        {currentStatus === "visited" && (
          <div className="p-2">
            <p className="text-sm text-center">来場済み</p>
            <NotVisitedBtn setCurrentStatus={setCurrentStatus} id={id} />
          </div>
        )}
        {currentStatus === "not_visited" && <p className="text-sm text-center">来場確認できず</p>}
      </td>
    </tr>
  );
};

export default ReservationListItem;