import { connectToDatabase } from "@/lib/db";
import { ICustomer, IEvent } from "@/utils/types";
import { NextRequest, NextResponse } from "next/server";

interface IReservationProps {
  id: number;
  reservationDate: string;
  reservationTime: string;
  customerId: number;
  eventId: number;
  status: string;
  receptionAt: Date;
  canceledAt?: Date;
}

export async function POST(req: NextRequest) {
  const data = await req.json();
  // let isAppend = false;
  // if (
  //   keyword ||
  //   type !== "イベント種別 - 全て" ||
  //   status !== "ステータス - 全て"
  // )
  //   queryStr += " WHERE";

  // if (type && type !== "イベント種別 - 全て") {
  //   queryStr += " type = '" + type + "'";
  //   isAppend = true;
  // }
  // if (status && status !== "ステータス - 全て") {
  //   let updated_status =
  //     status === "公開中"
  //       ? "公開"
  //       : status === "公開中(開催終了)"
  //       ? "公開(開催終了)"
  //       : "非公開(下書き)";
  //   if (isAppend) queryStr += " and";
  //   queryStr += " status = '" + updated_status + "'";
  // }

  let queryStr = `
  SELECT 
    r.id, c.lastName, c.firstName, r.customerId, c.employee, r.reservationAt, r.receptionAt, e.type, e.format, e.title, r.eventId, r.status,
    (SELECT COUNT(eventId) FROM reservations WHERE customerId = r.customerId) AS reservationTimes
  FROM 
    reservations r 
  JOIN
    customers c ON r.customerId = c.id 
  JOIN
    events e ON r.eventId = e.id`;

  try {
    const db = await connectToDatabase();
    const [rows] = await db.query(queryStr);
    return NextResponse.json(rows);
  } catch (error) {
    console.error("Error connecting to database:", error);
  }
}
