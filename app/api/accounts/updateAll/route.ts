import { withDatabase } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

interface ResultSetHeader {
  fieldCount: number;
  affectedRows: number;
  insertId: number;
  info: string;
  serverStatus: number;
  warningStatus: number;
  changedRows: number;
}

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const { id, name, email, phone, privilege } = data;

    const queryStr = `
      UPDATE accounts SET
        name = ?,
        email = ?,
        phone = ?,
        privilege = ?
      WHERE id = ?;
    `;

    // Use scoped database connection with garbage collection
    const result = await withDatabase(async (db) => {
      const [res] = await db.query(queryStr, [
        name || "",
        email || "",
        phone || "",
        privilege || "",
        id,
      ]);
      return res;
    });

    return NextResponse.json(result);
  } catch (error) {
    console.error("Error in POST /api/accounts/updateAll: ", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
