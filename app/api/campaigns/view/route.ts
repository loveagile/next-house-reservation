import { connectToDatabase } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const data = await req.json();
  const { userID } = data;

  let queryStr = `SELECT * FROM campaigns WHERE userID = ${userID}`;

  try {
    const db = await connectToDatabase();
    const [rows] = await db.query(queryStr);
    return NextResponse.json(rows);
  } catch (error) {
    console.error("Error connecting to database:", error);
  }
}
