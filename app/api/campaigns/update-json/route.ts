import { withDatabase } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const { id, field_name, field_value } = data;

    // Validate input
    if (!id || !field_name || field_value === undefined) {
      return NextResponse.json(
        { error: "ID, field_name, and field_value are required" },
        { status: 400 }
      );
    }

    const queryStr = `UPDATE campaigns SET ?? = ? WHERE id = ?`;

    const result = await withDatabase(async (db) => {
      const [res] = await db.query(queryStr, [
        field_name,
        JSON.stringify(field_value),
        id,
      ]);
      return res;
    });

    return NextResponse.json(result);
  } catch (error) {
    console.error("Error in POST /api/campaigns/update-json: ", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
