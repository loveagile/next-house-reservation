import Link from "next/link";
import { useState } from "react";
import axios from "axios";

import Button from "@mui/material/Button";

import CancelBtn from "@/components/atoms/Button/CancelBtn";
import ChangeDateBtn, { IChangeDateForm } from "@/components/atoms/Button/ChangeDateBtn";
import NotVisitedBtn from "@/components/atoms/Button/NotVisitedBtn";

import { formatReservationDateToJapaneseString, formatSlashSplitDateString } from "@/utils/convert";

import "./ReservationListItem.css";

export interface IReservationListItem {
  id: number;
  lastName: string;
  firstName: string;
  customerId: string;
  employee: string;
  reserveDate: string;
  startTime: string;
  endTime: string;
  reservationTimes: number;
  receptionAt: string;
  type: string;
  format: string;
  title: string;
  eventId: number;
  status: string;
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
  const [currentReserveDateAndTime, setCurrentReserveDateAndTime] = useState<IChangeDateForm>({
    reserveDate,
    startTime,
    endTime,
  })
  const { date: receptionDate, time: receptionTime } = formatReservationDateToJapaneseString(receptionAt);

  const reservationTime = new Date(`${reserveDate} ${startTime}:00`);
  if (new Date() > reservationTime && currentStatus === "active") {
    const handleVisited = async () => {
      await axios.post("/api/reservations/update", {
        id,
        field_name: 'status',
        field_value: 'visited',
      })
      setCurrentStatus("visited");
    };
    handleVisited();
  }

  return (
    <tr className={`w-full ${currentStatus === 'active' ? "" : "bg-[#d6d6d6]"}`}>
      <td className="detail_column p-2">
        <Button href={`/reservations/${id}`} className="detail_btn" variant="contained">
          予約詳細
        </Button>
      </td>
      <td className="p-3 date_column font-bold text-[15px]">
        {formatSlashSplitDateString(currentReserveDateAndTime.reserveDate)}<br></br>{currentReserveDateAndTime.startTime}
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
          <Link href={`/events/${eventId}`} className="text-m-blue underline font-semibold">{title}</Link>
        </p>
      </td>
      <td className="method_column p-2">
        <p className="text-xs text-white bg-[#29ac6d] px-2 py-[3px] text-center">
          手入力
        </p>
      </td>
      <td className="status_column p-2">
        {currentStatus === "active" && (
          <div className="p-2">
            <ChangeDateBtn
              reserveDate={currentReserveDateAndTime.reserveDate}
              startTime={currentReserveDateAndTime.startTime}
              endTime={currentReserveDateAndTime.endTime}
              setCurrentReserveDateAndTime={setCurrentReserveDateAndTime}
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