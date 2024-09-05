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
    r.id, c.lastName, c.firstName, r.customerId, c.employee, r.reserveDate, r.startTime, r.endTime, r.receptionAt, e.type, e.format, e.title, r.eventId, r.status,
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
