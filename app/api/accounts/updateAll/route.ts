import { connectToDatabase } from "@/lib/db";
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
  const data = await req.json();
  const { id, name, email, phone, privilege } = data;

  let queryStr = `UPDATE accounts SET
    name = '${name || ""}', 
    email = '${email || ""}', 
    phone = '${phone || ""}',
    privilege = '${privilege || ""}'
    WHERE id = ${id};`;

  try {
    const db = await connectToDatabase();
    const [result] = (await db.query(queryStr)) as ResultSetHeader[];
    const lastCustomerId = result.insertId;
    return NextResponse.json({ lastCustomerId });
  } catch (error) {
    console.error("Error connecting to database:", error);
  }
}
