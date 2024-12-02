import { withDatabase } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { groupID, searchStr, eventId } = await req.json();

    let queryStr = `
      SELECT 
        r.id,
        e.title,
        c.lastName,
        c.firstName,
        r.eventId,
        r.customerId,
        r.reserveDate,
        r.startTime,
        r.endTime,
        r.status
      FROM 
        reservations r
      JOIN
        events e ON r.eventId = e.id
      JOIN
        customers c ON r.customerId = c.id
      WHERE
        r.reserveDate LIKE ? AND r.groupID = ?
    `;

    const queryParams = [`${searchStr}%`, groupID];

    if (eventId) {
      queryStr += ` AND r.eventId = ?`;
      queryParams.push(eventId);
    }

    const rows = await withDatabase(async (db) => {
      const [result] = await db.query(queryStr, queryParams);
      return result;
    });

    return NextResponse.json(rows);
  } catch (error) {
    console.error("Error in POST /api/reservations/search: ", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
