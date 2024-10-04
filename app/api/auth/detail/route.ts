import { connectToDatabase } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const data = await req.json();
  const { email } = data;
  let queryStr = `SELECT * FROM companies WHERE email = '${email}'`;

  try {
    const db = await connectToDatabase();
    const [row] = await db.query(queryStr);
    return NextResponse.json(row);
  } catch (error) {
    console.error("Error connecting to database:", error);
  }
}
