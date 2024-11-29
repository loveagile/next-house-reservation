import { withDatabase } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { id } = await req.json();

    const queryStr = `
      SELECT 
        u.*,
        g.createdAt,
        g.updatedAt
      FROM 
        users u
      LEFT JOIN
        usersgroup g ON g.userID = u.id
      WHERE
        g.groupID = ?
    `;

    const rows = await withDatabase(async (db) => {
      const [result] = await db.query(queryStr, [id]);
      return result;
    });

    return NextResponse.json(rows);
  } catch (error) {
    console.error("Error in POST /api/groups/view: ", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
