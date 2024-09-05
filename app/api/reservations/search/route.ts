import { connectToDatabase } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const data = await req.json();
  const { searchStr, eventId } = data;
  let queryStr = `
  SELECT 
    e.title,
    c.lastName,
    c.firstName,
    r.eventId,
    r.customerId,
    r.reserveDate,
    r.startTime,
    r.endTime
  FROM 
    reservations r
  JOIN
    events e ON r.eventId = e.id
  JOIN
    customers c ON r.customerId = c.id
  WHERE
    reserveDate LIKE '${searchStr}%'`;
  if (eventId) queryStr += ` AND eventId = ${eventId}`;

  try {
    const db = await connectToDatabase();
    const [row] = await db.query(queryStr);
    return NextResponse.json(row);
  } catch (error) {
    console.error("Error connecting to database:", error);
  }
}
