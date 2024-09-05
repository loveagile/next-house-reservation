import { connectToDatabase } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const data = await req.json();
  const { id } = data;
  let queryStr = `SELECT * FROM customers WHERE id = ${id.toString()};`;

  try {
    const db = await connectToDatabase();
    const [row] = await db.query(queryStr);
    return NextResponse.json(row);
  } catch (error) {
    console.error("Error connecting to database:", error);
  }
}
