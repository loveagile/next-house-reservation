import { withDatabase } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { userID, formTitle, formDetail, formType, formChoice } =
      await req.json();

    const queryStr = `
      INSERT INTO forms 
        (userID, formTitle, formDetail, formType, formChoice) 
      VALUES (?, ?, ?, ?, ?)
    `;

    const queryParams = [
      userID,
      formTitle,
      formDetail || "",
      formType,
      formChoice || "",
    ];

    const lastInsertedId = await withDatabase(async (db) => {
      const [result] = await db.execute(queryStr, queryParams);
      return (result as any).insertId;
    });

    return NextResponse.json({ lastInsertedId });
  } catch (error) {
    console.error("Error in POST /api/forms/create: ", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
