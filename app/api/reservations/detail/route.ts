import { withDatabase } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { id } = await req.json();

    const queryStr = `
      SELECT 
        e.id as eventId, c.id as customerId, 
        e.title, e.type, e.format, e.eventDate, e.images, e.mainIndex,
        r.reserveDate, r.startTime, r.endTime, r.receptionAt,
        c.note, c.memo,
        c.lastName, c.firstName, c.seiName, c.meiName,
        c.zipCode, c.prefecture, c.city, c.street, c.building,
        c.email, c.phone, c.employee
      FROM 
        reservations r 
      JOIN
        customers c ON r.customerId = c.id 
      JOIN
        events e ON r.eventId = e.id
      WHERE
        r.id = ?
    `;

    const row = await withDatabase(async (db) => {
      const [result] = await db.query(queryStr, [id]);
      return result;
    });

    return NextResponse.json(row);
  } catch (error) {
    console.error("Error in POST /api/reservations/details: ", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
