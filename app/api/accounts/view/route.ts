import { withDatabase } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const queryStr = "SELECT * FROM accounts";

  try {
    // Use scoped database connection with garbage collection
    const rows = await withDatabase(async (db) => {
      const [result] = await db.query(queryStr);
      return result;
    });

    return NextResponse.json(rows);
  } catch (error) {
    console.error("Error in POST /api/accounts/view: ", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
