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
    email,
    note,
    memo,
  } = data;

  let queryStr =
    "INSERT INTO customers (status, lastName, firstName, seiName, meiName, zipCode, prefecture, city, street, building, email, note, memo) VALUES (";
  queryStr += "'" + (status || "") + "', ";
  queryStr += "'" + (lastName || "") + "', ";
  queryStr += "'" + (firstName || "") + "'";
  queryStr += ", '" + (seiName || "") + "'";
  queryStr += ", '" + (meiName || "") + "'";
  queryStr += ", '" + (zipCode || "") + "'";
  queryStr += ", '" + (prefecture || "") + "'";
  queryStr += ", '" + (city || "") + "'";
  queryStr += ", '" + (street || "") + "'";
  queryStr += ", '" + (building || "") + "'";
  queryStr += ", '" + (email || "") + "'";
  queryStr += ", '" + (note || "") + "'";
  queryStr += ", '" + (memo || "") + "'";
  queryStr += ");";

  try {
    const db = await connectToDatabase();
    const [result] = (await db.query(queryStr)) as ResultSetHeader[];
    const lastCustomerId = result.insertId;
    return NextResponse.json({ lastCustomerId });
  } catch (error) {
    console.error("Error connecting to database:", error);
  }
}
