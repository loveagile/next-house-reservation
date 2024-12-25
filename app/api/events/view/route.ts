import { withDatabase } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { userID } = await req.json();

    const queryStr = `
      SELECT 
        e.*,
        COUNT(r.eventId) AS attend
      FROM 
        events e
      LEFT JOIN
        reservations r ON r.eventId = e.id
      WHERE e.userID = ?
      GROUP BY e.id
    `;

    const rows = await withDatabase(async (db) => {
      const [result] = await db.query(queryStr, [userID]);
      return result;
    });

    return NextResponse.json(rows);
  } catch (error) {
    console.error("Error in POST /api/events/view: ", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
