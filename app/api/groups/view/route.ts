import { connectToDatabase } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const data = await req.json();
  const { id } = data;
  let queryStr = `
  SELECT 
    u.*,
    g.createdAt,
    g.updatedAt
  FROM 
    users u
  LEFT JOIN
    usersgroup g ON g.userID = u.id
  WHERE
    g.groupID = ${id}`;

  try {
    const db = await connectToDatabase();
    const [rows] = await db.query(queryStr);
    return NextResponse.json(rows);
  } catch (error) {
    console.error("Error connecting to database:", error);
  }
}
