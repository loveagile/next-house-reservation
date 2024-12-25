import { withDatabase } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const {
      groupID,
      customerId,
      eventId,
      reserveDate,
      startTime,
      endTime,
      status,
      route,
    } = await req.json();

    const queryStr = `
      INSERT INTO reservations 
        (groupID, customerId, eventId, reserveDate, startTime, endTime, status, route) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const queryParams = [
      groupID,
      customerId,
      eventId,
      reserveDate,
      startTime,
      endTime,
      status,
      route,
    ];

    const lastReservationId = await withDatabase(async (db) => {
      const [result] = await db.execute(queryStr, queryParams);
      return (result as any).insertId;
    });

    return NextResponse.json({ lastReservationId });
  } catch (error) {
    console.error("Error in POST /api/reservations/create: ", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
