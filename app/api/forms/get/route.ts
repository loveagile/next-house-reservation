import { withDatabase } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { IForm } from "@/utils/types";

export async function POST(req: NextRequest) {
  try {
    const { userID } = await req.json();

    const queryStr = `SELECT * FROM forms WHERE userID = ? AND isHidden = 0`;

    const rows = await withDatabase(async (db) => {
      const [result] = await db.query(queryStr, [userID]);
      return result;
    });

    return NextResponse.json(rows);
  } catch (error) {
    console.error("Error in POST /api/forms/get: ", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
