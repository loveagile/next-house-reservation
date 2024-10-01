import { connectToDatabase } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

interface ResultSetHeader {
  fieldCount: number;
  affectedRows: number;
  insertId: number;
  info: string;
  serverStatus: number;
  warningStatus: number;
  changedRows: number;
}

export async function POST(req: NextRequest) {
  const data = await req.json();
  const {
    customerId,
    eventId,
    reserveDate,
    startTime,
    endTime,
    status,
    route,
  } = data;

  let queryStr = `INSERT INTO reservations 
    (customerId, eventId, reserveDate, startTime, endTime, status, route) VALUES 
    (${customerId}, ${eventId}, '${reserveDate}', '${startTime}', '${endTime}', '${status}', '${route}')
  `;

  try {
    const db = await connectToDatabase();
    const [result] = (await db.query(queryStr)) as ResultSetHeader[];
    const lastReservationId = result.insertId;
    return NextResponse.json({ lastReservationId });
  } catch (error) {
    console.error("Error connecting to database:", error);
  }
}
