import { withDatabase } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { groupID, customerId } = await req.json();

    let queryStr = `
      SELECT 
        r.id, r.customerId, r.eventId, r.reserveDate, r.startTime, r.endTime, r.status, r.route, r.receptionAt,
        e.title, e.type, e.format, 
        c.lastName, c.firstName, c.employee, c.seiName, c.meiName, c.prefecture, c.city, c.street, c.building, c.email, c.phone, c.memo, c.note, c.delivery,
        (SELECT COUNT(eventId) FROM reservations WHERE customerId = r.customerId) AS reservationTimes
      FROM 
        reservations r 
      JOIN
        customers c ON r.customerId = c.id 
      JOIN
        events e ON r.eventId = e.id 
      WHERE r.groupID = ?
    `;

    const queryParams = [groupID];

    if (customerId !== -1) {
      queryStr += ` AND customerId = ?`;
      queryParams.push(customerId);
    }

    const rows = await withDatabase(async (db) => {
      const [result] = await db.query(queryStr, queryParams);
      return result;
    });

    return NextResponse.json(rows);
  } catch (error) {
    console.error("Error in POST /api/reservations/view: ", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
