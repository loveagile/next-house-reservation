import { withDatabase } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { userID, title, type, format, note } = await req.json();

    const queryStr = `
      INSERT INTO events 
        (userID, title, type, format, note) 
      VALUES (?, ?, ?, ?, ?)
    `;

    const queryParams = [userID, title, type, format, note || ""];

    const lastInsertedId = await withDatabase(async (db) => {
      const [result] = await db.execute(queryStr, queryParams);
      return (result as any).insertId;
    });

    return NextResponse.json({ lastInsertedId });
  } catch (error) {
    console.error("Error in POST /api/events/create: ", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
