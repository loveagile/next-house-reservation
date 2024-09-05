import Link from "next/link";

import { IReservationGroupedEvent } from "@/utils/types";
import { formatSlashSplitDateString } from "@/utils/convert";
import "./ReservationGroupEvent.css";

interface ThisFCProps {
  event: IReservationGroupedEvent;
}

const ReservationGroupEvent: React.FC<ThisFCProps> = ({ event }) => {
  const customers = event.customers;
  customers.sort((a, b) => {
    const timeA = a.startTime.split(':').map(Number);
    const timeB = b.startTime.split(':').map(Number);

    return timeA[0] - timeB[0] || timeA[1] - timeB[1];
  });
  const startTimes = Array.from(new Set(customers.map(customer => customer.startTime)));

  return (
    <div className="mt-5 mb-12">
      <h2 className="my-3 text-xl font-semibold">{event.title}</h2>
      <div>
        <table className="w-full">
          <thead>
            <tr>
              <th className="reserve_th">時刻</th>
              {startTimes.map((time, index) => (
                <th key={index} className="reserve_th reserve_time">{time}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {customers.map((customer, index) => (
              <tr key={index}>
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
                  return <td key={index} className={`reserve_time ${bgColor}`}></td>
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ReservationGroupEvent;