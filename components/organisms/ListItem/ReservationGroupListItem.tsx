import Link from "next/link";
import axios from "axios";
import { useState } from "react";
import { FaMapMarker, FaPhoneAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

import { formatReservationDateToJapaneseString, formatSlashSplitDateString, getFormatDate } from "@/utils/convert";

export interface IGroupReservation {
  companyName: string;          // Users

  id: number;
  customerId: number;
  eventId: number;
  reserveDate: string;
  startTime: string;
  endTime: string;
  status: string;
  route: string;
  receptionAt: string;          // Reservation

  title: string;
  type: string;
  format: string;               // Event

  lastName: string;
  firstName: string;
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
  item: IGroupReservation;
}

const ReservationGroupListItem: React.FC<ThisFCProps> = ({ item }) => {
  const {
    companyName, id, reserveDate, startTime, endTime,
    lastName, firstName, customerId,
    receptionAt,
    phone, email, note,
    prefecture, city, street, building,
    type, format, title, eventId, status, route,
  } = item;

  const [currentStatus, setCurrentStatus] = useState<string>(status);
  const address = (prefecture || "") + (city || "") + (street || "") + (building || "");

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
      <td className="p-2 text-sm text-center">
        {companyName}
      </td>
      <td className="p-2">
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
      <td className="p-2">
        <p className="text-xs text-white bg-[#29ac6d] px-2 py-[3px] text-center">
          {route}
        </p>
      </td>
      <td className="p-2 text-sm">
        {formatSlashSplitDateString(reserveDate)}<br></br>{startTime}
      </td>
      <td className="p-2">
        <p className="text-sm text-center">
          <Link href={`/customers/${customerId}`} className="text-m-blue underline font-semibold">{lastName}{firstName}</Link>
        </p>
      </td>
      <td className="px-3 py-2 text-sm">
        <p className="flex items-center">
          <FaMapMarker />
          <span className="ml-1">{address ? address : <br />}</span>
        </p>
        <p className="flex items-center">
          <MdEmail />
          <span className="ml-1">{email ? email : <br />}</span>
        </p>
        <p className="flex items-center">
          <FaPhoneAlt />
          <span className="ml-1">{phone ? phone : <br />}</span>
        </p>
      </td>
      <td className="p-2 text-sm">
        {receptionDate} {receptionTime}
      </td>
      <td className="text-center">
        {note}
      </td>
      <td className="p-2 text-sm text-center">{customerId}</td>
    </tr>
  );
};

export default ReservationGroupListItem;
