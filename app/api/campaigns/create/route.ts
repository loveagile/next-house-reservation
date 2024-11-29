import { withDatabase } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { userID, title, type, format } = await req.json();

    const queryStr = `
      INSERT INTO campaigns 
        (userID, title, type, format) 
      VALUES
        (?, ?, ?, ?)
    `;

    const lastInsertedId = await withDatabase(async (db) => {
      const [result] = await db.execute(queryStr, [
        userID,
        title,
        type,
        format,
      ]);
      return (result as any).insertId;
    });

    return NextResponse.json({ lastInsertedId });
  } catch (error) {
    console.error("Error in POST /api/campaigns/create: ", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
