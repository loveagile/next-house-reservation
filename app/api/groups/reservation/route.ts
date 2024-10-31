import { connectToDatabase } from "@/lib/db";
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
  const { id } = data;

  const childQuery = `
  SELECT 
    r.id, r.customerId, r.eventId, r.reserveDate, r.startTime, r.endTime, r.status, r.route, r.receptionAt,
    e.title, e.type, e.format, 
    c.lastName, c.firstName, c.employee, c.seiName, c.meiName, c.prefecture, c.city, c.street, c.building, c.email, c.phone, c.memo, c.note, c.delivery,
    u.name as companyName,
    (SELECT COUNT(eventId) FROM reservations WHERE customerId = r.customerId) AS reservationTimes
  FROM
    usersgroup ug
  JOIN
    reservations r ON ug.userID = r.groupID
  JOIN
    users u ON u.id = r.groupID
  JOIN
    customers c ON r.customerId = c.id 
  JOIN
    events e ON r.eventId = e.id 
  WHERE ug.groupID = ${id}`;

  const parentQuery = `
  SELECT 
    r.id, r.customerId, r.eventId, r.reserveDate, r.startTime, r.endTime, r.status, r.route, r.receptionAt,
    e.title, e.type, e.format, 
    c.lastName, c.firstName, c.employee, c.seiName, c.meiName, c.prefecture, c.city, c.street, c.building, c.email, c.phone, c.memo, c.note, c.delivery,
    u.name as companyName,
    (SELECT COUNT(eventId) FROM reservations WHERE customerId = r.customerId) AS reservationTimes
  FROM 
    reservations r 
  JOIN
    users u ON u.id = r.groupID
  JOIN
    customers c ON r.customerId = c.id 
  JOIN
    events e ON r.eventId = e.id WHERE r.groupID = ${id}`;

  try {
    const db = await connectToDatabase();
    const [parents] = await db.query(parentQuery);
    const [childs] = await db.query(childQuery);
    const result = (Array.isArray(parents) ? parents : []).concat(
      Array.isArray(childs) ? childs : []
    );
    return NextResponse.json(result);
  } catch (error) {
    console.error("Error connecting to database:", error);
  }
}
