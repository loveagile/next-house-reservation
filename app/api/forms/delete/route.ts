import { withDatabase } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { id } = await req.json();

    const queryStr = `DELETE FROM forms WHERE id = ?`;

    const result = await withDatabase(async (db) => {
      const [res] = await db.query(queryStr, [id]);
      return res;
    });

    return NextResponse.json(result);
  } catch (error) {
    console.error("Error in POST /api/customers/delete: ", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
