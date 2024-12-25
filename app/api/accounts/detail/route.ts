import { withDatabase } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const { field_name, field_value } = data;

    // Validate input to prevent SQL injection
    const allowedFields = ["id", "email", "name", "phone"]; // List of allowed fields
    if (!allowedFields.includes(field_name)) {
      return NextResponse.json(
        { error: "Invalid field name" },
        { status: 400 }
      );
    }

    const queryStr = `SELECT * FROM accounts WHERE ?? = ?`;

    // Use garbage-collected connection for database query
    const row = await withDatabase(async (db) => {
      const [result] = await db.query(queryStr, [field_name, field_value]);
      return result;
    });

    return NextResponse.json(row);
  } catch (error) {
    console.error("Error in POST /api/accounts/detail:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
