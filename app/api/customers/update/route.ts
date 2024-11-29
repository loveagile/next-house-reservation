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

    const updates = field_names.map((field: string) => `?? = ?`).join(", ");
    const queryStr = `UPDATE customers SET ${updates} WHERE id = ?`;

    const queryParams = [
      ...field_names.flatMap((_: string, index: number) => [
        field_names[index],
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
    console.error("Error in POST /api/customers/update: ", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
