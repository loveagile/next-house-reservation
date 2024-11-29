import { withDatabase } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const { id, field_name, field_value } = data;

    // Validate input to prevent SQL injection
    const allowedFields = ["email", "name", "phone", "password"]; // Define allowed fields
    if (!allowedFields.includes(field_name)) {
      return NextResponse.json(
        { error: "Invalid field name" },
        { status: 400 }
      );
    }

    const queryStr = `UPDATE accounts SET ?? = ? WHERE id = ?`;

    // Use scoped database connection with garbage collection
    const result = await withDatabase(async (db) => {
      const [res] = await db.query(queryStr, [field_name, field_value, id]);
      return res;
    });

    return NextResponse.json(result);
  } catch (error) {
    console.error("Error in POST /api/accounts/update: ", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
