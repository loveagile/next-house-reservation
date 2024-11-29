import { withDatabase } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const { name, email, phone, privilege } = data;

    const queryStr = `
      INSERT INTO accounts 
        (name, email, phone, privilege) 
      VALUES (?, ?, ?, ?)
    `;

    const lastInsertedId = await withDatabase(async (db) => {
      const [result] = await db.execute(queryStr, [
        name,
        email || "",
        phone || "",
        privilege,
      ]);
      return (result as any).insertId;
    });

    return NextResponse.json({ lastInsertedId });
  } catch (error) {
    console.error("Error in POST /api/accounts/create: ", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
