import { connectToDatabase } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  let queryStr = "DELETE FROM customers";

  try {
    const db = await connectToDatabase();
    const [result] = await db.query(queryStr);
    return NextResponse.json(result);
  } catch (error) {
    console.error("Error connecting to database:", error);
  }
}
