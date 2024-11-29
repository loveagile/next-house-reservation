import { withDatabase } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { id, isApproved } = await req.json();

    const queryStr = `
      SELECT 
        e.*,
        u.name AS companyName,
        u.eventURL
      FROM 
        events e
      JOIN
        usersgroup g ON g.userID = e.userID
      JOIN
        users u ON g.userID = u.id
      WHERE
        g.groupID = ? AND e.isApproved = ?
    `;

    const rows = await withDatabase(async (db) => {
      const [result] = await db.query(queryStr, [id, isApproved]);
      return result;
    });

    return NextResponse.json(rows);
  } catch (error) {
    console.error("Error in POST /api/groups/event: ", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
