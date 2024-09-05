import { connectToDatabase } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  let queryStr = `
  SELECT 
    e.*,
    COUNT(r.eventId) AS attend
  FROM 
    events e
  LEFT JOIN
    reservations r ON r.eventId = e.id
  GROUP By
    e.id`;

  try {
    const db = await connectToDatabase();
    const [rows] = await db.query(queryStr);
    return NextResponse.json(rows);
  } catch (error) {
    console.error("Error connecting to database:", error);
  }
}
