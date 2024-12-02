import Link from "next/link";
import axios from "axios";
import { useState } from "react";

import Button from "@mui/material/Button";

import CancelBtn from "@/components/atoms/Button/CancelBtn";
import NotVisitedBtn from "@/components/atoms/Button/NotVisitedBtn";
import ChangeDateBtn from "@/components/atoms/Button/ChangeDateBtn";

import { IReserveDateTime } from "@/utils/types";
import { formatReservationDateToJapaneseString, formatSlashSplitDateString, getFormatDate } from "@/utils/convert";

interface ICustomer {
  customerId: number;
  firstName: string;
  lastName: string;
  reserveDate: string;
  startTime: string;
  endTime: string;
  status: string;
}

interface ThisFCProps {
  resId: number;
  customer: ICustomer;
  startTimes: string[];
}

const ReservationGroupEventItem: React.FC<ThisFCProps> = ({ resId, customer, startTimes }) => {
  const {
    customerId, firstName, lastName, reserveDate, startTime, endTime, status
  } = customer;

  const [currentStatus, setCurrentStatus] = useState<string>(status);

  // Check if reservation was passed
  if (new Date() > getFormatDate(reserveDate, startTime) && currentStatus === "active") {
    const handleVisited = async () => {
      await axios.post("/api/reservations/update", {
        id: resId,
        field_names: ['status'],
        field_values: ['visited'],
      })
      setCurrentStatus("visited");
    };
    handleVisited();
  }

  return (
    <tr className={`w-full ${currentStatus === 'active' ? "" : "bg-[#d6d6d6]"}`}>
      <td className="px-3 py-2 text-[15px]">
        <Link href={`/customers/${customer.customerId}`} className="text-link-color underline font-semibold">
          {customer.lastName}{customer.firstName}
        </Link> 氏
        <p>
          {formatSlashSplitDateString(customer.reserveDate)} {customer.startTime} 〜 {formatSlashSplitDateString(customer.reserveDate)} {customer.endTime}
        </p>
      </td>
      {startTimes.map((time, index) => {
        const bgColor = time === customer.startTime ? "bg-[#f2cf01]" : "";
        return <td key={index} className={`w-[300px] ${bgColor}`}></td>
      })}
    </tr>
  );
};

export default ReservationGroupEventItem;