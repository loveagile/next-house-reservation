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
  const {
    id,
    status,
    lastName,
    firstName,
    seiName,
    meiName,
    zipCode,
    prefecture,
    city,
    street,
    building,
    phone,
    email,
    birthYear,
    birthMonth,
    birthDate,
    note,
    memo,
    delivery,
  } = data;

  let queryStr = `UPDATE customers SET
    status = '${status || ""}', 
    lastName = '${lastName || ""}', 
    firstName = '${firstName || ""}', 
    seiName = '${seiName || ""}', 
    meiName = '${meiName || ""}', 
    zipCode = '${zipCode || ""}',
    prefecture = '${prefecture || ""}',
    city = '${city || ""}',
    street = '${street || ""}',
    building = '${building || ""}',
    phone = '${phone || ""}',
    email = '${email || ""}', 
    note = '${note || ""}', 
    memo = '${memo || ""}', 
    birthYear = ${birthYear || -1}, 
    birthMonth = ${birthMonth || -1}, 
    birthDate = ${birthDate || -1}, 
    delivery = '${delivery || ""}'
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
