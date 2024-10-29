import { connectToDatabase } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { userID: groupID } = await req.json();
  let queryStr = `SELECT * FROM customers WHERE groupID = ${groupID}`;

  try {
    const db = await connectToDatabase();
    const [rows] = await db.query(queryStr);
    return NextResponse.json(rows);
  } catch (error) {
    console.error("Error connecting to database:", error);
  }
}
