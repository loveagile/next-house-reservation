import { connectToDatabase } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const data = await req.json();
  const { id, isApproved } = data;

  let queryStr = `
  SELECT 
    e.*,
    u.name AS companyName,
    u.eventURL
  FROM 
    events e
  JOIN
    usersgroup g ON g.userID = e.userID
  JOIN
    users u ON g.userID = u.id
  WHERE
    g.groupID = ${id} AND e.isApproved = ${isApproved}`;

  try {
    const db = await connectToDatabase();
    const [rows] = await db.query(queryStr);
    return NextResponse.json(rows);
  } catch (error) {
    console.error("Error connecting to database:", error);
  }
}
