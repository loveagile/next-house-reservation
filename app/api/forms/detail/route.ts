import { withDatabase } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { field_name, field_value } = await req.json();

    const queryStr = `SELECT * FROM forms WHERE ?? = ?`;

    const rows = await withDatabase(async (db) => {
      const [result] = await db.query(queryStr, [field_name, field_value]);
      return result;
    });

    return NextResponse.json(rows);
  } catch (error) {
    console.error("Error in POST /api/forms/detail: ", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
