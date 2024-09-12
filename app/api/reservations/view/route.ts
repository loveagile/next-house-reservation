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
  const { customerId } = data;

  let queryStr = `
  SELECT 
    r.id, r.customerId, r.eventId, r.reserveDate, r.startTime, r.endTime, r.status, r.receptionAt,
    e.title, e.type, e.format, 
    c.lastName, c.firstName, c.employee, c.seiName, c.meiName, c.prefecture, c.city, c.street, c.building, c.email, c.phone, c.memo, c.note,
    (SELECT COUNT(eventId) FROM reservations WHERE customerId = r.customerId) AS reservationTimes
  FROM 
    reservations r 
  JOIN
    customers c ON r.customerId = c.id 
  JOIN
    events e ON r.eventId = e.id`;

  if (customerId !== -1) queryStr += ` WHERE customerId = ${customerId}`;

  try {
    const db = await connectToDatabase();
    const [rows] = await db.query(queryStr);
    return NextResponse.json(rows);
  } catch (error) {
    console.error("Error connecting to database:", error);
  }
}
