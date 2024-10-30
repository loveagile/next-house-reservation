import { connectToDatabase } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const data = await req.json();
  const { id } = data;

  let childQuery = `
  SELECT 
    c.*,
    u.name AS companyName
  FROM 
    usersgroup ug
  JOIN
    customers c ON ug.userID = c.groupID
  JOIN
    users u ON c.groupID = u.id
  WHERE
    ug.groupID = ${id}`;

  let parentQuery = `
    SELECT 
      c.*,
      u.name AS companyName
    FROM
      customers c
    JOIN
      users u ON c.groupID = u.id
    WHERE
      c.groupID = ${id}`;

  try {
    const db = await connectToDatabase();
    const [parents] = await db.query(parentQuery);
    const [childs] = await db.query(childQuery);
    const result = (Array.isArray(parents) ? parents : []).concat(
      Array.isArray(childs) ? childs : []
    );
    return NextResponse.json(result);
  } catch (error) {
    console.error("Error connecting to database:", error);
  }
}
