import { withDatabase } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { id, field_names, field_values } = await req.json();

    if (field_names.length !== field_values.length) {
      throw new Error(
        "The length of field_names and field_values must be the same."
      );
    }

    const updates = field_names.map(() => "?? = ?").join(", ");
    const queryStr = `UPDATE forms SET ${updates} WHERE id = ?`;

    const queryParams = [
      ...field_names.flatMap((field: string, index: number) => [
        field,
        field_values[index],
      ]),
      id,
    ];

    const result = await withDatabase(async (db) => {
      const [res] = await db.query(queryStr, queryParams);
      return res;
    });

    return NextResponse.json(result);
  } catch (error) {
    console.error("Error in POST /api/events/update: ", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
