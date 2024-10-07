import { connectToDatabase } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const data = await req.json();
  const { groupID, userID } = data;

  let queryStr = `DELETE FROM groups WHERE groupID = ${groupID} AND userID = ${userID}`;

  try {
    const db = await connectToDatabase();
    const [result] = await db.query(queryStr);
    return NextResponse.json(result);
  } catch (error) {
    console.error("Error connecting to database:", error);
  }
}
