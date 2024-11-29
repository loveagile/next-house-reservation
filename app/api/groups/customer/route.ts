import { withDatabase } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { id } = await req.json();

    const childQuery = `
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
        ug.groupID = ?
    `;

    const parentQuery = `
      SELECT 
        c.*,
        u.name AS companyName
      FROM
        customers c
      JOIN
        users u ON c.groupID = u.id
      WHERE
        c.groupID = ?
    `;

    const result = await withDatabase(async (db) => {
      const [parents] = await db.query(parentQuery, [id]);
      const [childs] = await db.query(childQuery, [id]);
      return (Array.isArray(parents) ? parents : []).concat(
        Array.isArray(childs) ? childs : []
      );
    });

    return NextResponse.json(result);
  } catch (error) {
    console.error("Error in POST /api/groups/customer: ", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
