import { connectToDatabase } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { id, field_names, field_values } = await req.json();

    if (field_names.length !== field_values.length) {
      throw new Error(
        "The length of field_names and field_values must be the same."
      );
    }

    const updates = field_names
      .map(
        (field: string, index: number) => `${field} = '${field_values[index]}'`
      )
      .join(", ");
    const queryStr = `UPDATE reservations SET ${updates} WHERE id = ${id}`;

    const db = await connectToDatabase();
    const [row] = await db.query(queryStr);

    return NextResponse.json(row);
  } catch (error) {
    console.error("Error connecting to database:", error);
  }
}
