import { withDatabase } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { id, field_names, field_values } = await req.json();

    // Validate input
    if (!id || !Array.isArray(field_names) || !Array.isArray(field_values)) {
      return NextResponse.json(
        { error: "Invalid input data" },
        { status: 400 }
      );
    }

    if (field_names.length !== field_values.length) {
      return NextResponse.json(
        { error: "field_names and field_values must have the same length" },
        { status: 400 }
      );
    }

    const updates = field_names
      .map((field, index) => `${field} = ?`)
      .join(", ");
    const queryStr = `UPDATE campaigns SET ${updates} WHERE id = ?`;

    const queryParams = [...field_values, id];

    const result = await withDatabase(async (db) => {
      const [res] = await db.query(queryStr, queryParams);
      return res;
    });

    return NextResponse.json(result);
  } catch (error) {
    console.error("Error in POST /api/campaigns/update: ", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
