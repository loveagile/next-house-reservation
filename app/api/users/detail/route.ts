import { withDatabase } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { userID } = await req.json();

    const queryStr = `
      SELECT * FROM users 
      WHERE id = ?
    `;

    const row = await withDatabase(async (db) => {
      const [result] = await db.query(queryStr, [userID]);
      return result;
    });

    return NextResponse.json(row);
  } catch (error) {
    console.error("Error in POST /api/users/detail: ", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
