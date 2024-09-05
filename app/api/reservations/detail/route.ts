import { connectToDatabase } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const data = await req.json();
  const { id } = data;
  let queryStr = `
  SELECT 
    e.id as eventId, c.id as customerId, 
    e.title, e.type, e.format,
    r.reserveDate, r.startTime, r.endTime,
    c.note, c.memo,
    c.lastName, c.firstName, c.seiName, c.meiName,
    c.zipCode, c.prefecture, c.city, c.street, c.building,
    c.email, c.phone, c.employee,
    r.receptionAt
  FROM 
    reservations r 
  JOIN
    customers c ON r.customerId = c.id 
  JOIN
    events e ON r.eventId = e.id
  WHERE
    r.id = ${id.toString()}`;

  try {
    const db = await connectToDatabase();
    const [row] = await db.query(queryStr);
    return NextResponse.json(row);
  } catch (error) {
    console.error("Error connecting to database:", error);
  }
}
