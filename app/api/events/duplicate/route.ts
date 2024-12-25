import { withDatabase } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { id } = await req.json();

    const queryStr = `
      INSERT INTO events (
        userID, title, type, format, note, status, statusBit, priority, 
        prefecture, address1, address2, hiddenAddress, mapFormat, mailFormat,
        images, mainIndex, FPImages, 
        tag, feature, benefit, propertyType
      ) 
      SELECT 
        userID, title, type, format, note, status, statusBit, priority, 
        prefecture, address1, address2, hiddenAddress, mapFormat, mailFormat,
        images, mainIndex, FPImages, 
        tag, feature, benefit, propertyType
      FROM events 
      WHERE id = ?
    `;

    const lastInsertedId = await withDatabase(async (db) => {
      const [result] = await db.execute(queryStr, [id]);
      return (result as any).insertId;
    });

    return NextResponse.json({ lastInsertedId });
  } catch (error) {
    console.error("Error in POST /api/events/duplicate: ", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
