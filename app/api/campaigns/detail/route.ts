import { withDatabase } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { id } = await req.json();

    const queryStr = `SELECT * FROM campaigns WHERE id = ?`;

    const row = await withDatabase(async (db) => {
      const [result] = await db.query(queryStr, [id]);
      return result;
    });

    return NextResponse.json(row);
  } catch (error) {
    console.error("Error in POST /api/campaigns/detail: ", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
