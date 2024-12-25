import { withDatabase } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { userID: groupID } = await req.json();

    const queryStr = `SELECT * FROM customers WHERE groupID = ?`;

    const rows = await withDatabase(async (db) => {
      const [result] = await db.query(queryStr, [groupID]);
      return result;
    });

    return NextResponse.json(rows);
  } catch (error) {
    console.error("Error in POST /api/customers/view: ", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
