import Link from "next/link";
import { useState } from "react";

import Button from "@mui/material/Button";

import CancelBtn from "@/components/atoms/CancelBtn";
import ChangeDateBtn from "@/components/atoms/ChangeDateBtn";

import { formatReservationDateToJapaneseString } from "@/utils/convert";

import "./ReservationListItem.css";

export interface IReservationListItem {
  id: number;
  lastName: string;
  firstName: string;
  customerId: string;
  employee: string;
  reservationAt: string;
  reservationTimes: number;
  receptionAt: string;
  type: string;
  format: string;
  title: string;
  eventId: number;
  status: string;
}

const ReservationListItem: React.FC<{ values: IReservationListItem }> = ({ values }) => {
  const {
    id, reservationAt,
    lastName, firstName, customerId, employee,
    reservationTimes, receptionAt,
    type, format, title, eventId, status
  } = values;

  const [currentStatus, setCurrentStatus] = useState<string>(status);

  const { date: receptionDate, time: receptionTime } = formatReservationDateToJapaneseString(receptionAt);
  const { date: reservationDate, time: reservationTime } = formatReservationDateToJapaneseString(reservationAt);

  return (
    <tr className="w-full">
      <td className="w-[90px] p-2">
        <Button href={`/reservations/${id}`} className="detail_btn" variant="contained">
          予約詳細
        </Button>
      </td>
      <td className="p-3 w-[135px] font-bold text-[15px] tracking-[0.75px]">
        {reservationDate}<br></br>{reservationTime}
      </td>
      <td className="p-3 text-[15px]">
        <p>
          お客様名: <Link href={`/customers/${customerId}`} className="text-m-blue underline font-bold">{lastName}{firstName}</Link> <br></br>
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
          <Link href={`/events/${eventId}`} className="text-m-blue underline font-bold">{title}</Link>
        </p>
      </td>
      <td className="w-[80px] p-2">
        <p className="text-sm text-white bg-[#29ac6d] px-2 py-[3px] text-center">
          手入力
        </p>
      </td>
      <td className="w-[120px] p-4">
        {currentStatus === "active" && (
          <>
            <ChangeDateBtn reservationAt={reservationAt} id={Number(id)} />
            <CancelBtn setCurrentStatus={setCurrentStatus} id={Number(id)} />
          </>
        )}
        {currentStatus === "canceled" && <p className="text-sm">キャンセル済</p>}
      </td>
    </tr>
  );
};

export default ReservationListItem;