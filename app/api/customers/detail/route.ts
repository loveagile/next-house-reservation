import { connectToDatabase } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const data = await req.json();

  const { field_name, field_value } = data;

  let queryStr = `SELECT * FROM customers WHERE ${field_name} = '${field_value}';`;

  try {
    const db = await connectToDatabase();
    const [row] = await db.query(queryStr);
    return NextResponse.json(row);
  } catch (error) {
    console.error("Error connecting to database:", error);
  }
}
