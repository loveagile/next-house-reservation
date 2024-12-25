import { withDatabase } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { id, field_name, field_value } = await req.json();

    const queryStr = `
      UPDATE events 
      SET ?? = ? 
      WHERE id = ?
    `;

    const queryParams = [field_name, JSON.stringify(field_value), id];

    const result = await withDatabase(async (db) => {
      const [res] = await db.query(queryStr, queryParams);
      return res;
    });

    return NextResponse.json(result);
  } catch (error) {
    console.error("Error in POST /api/events/update-json: ", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
