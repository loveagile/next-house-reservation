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
    route,
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
    employee,
    delivery,
  } = data;

  let queryStr = `INSERT INTO customers (
    status, route, lastName, firstName, seiName, meiName, 
    zipCode, prefecture, city, street, building, 
    phone, email, note, memo,
    birthYear, birthMonth, birthDate,
    employee, delivery
    ) VALUES (
  `;
  queryStr += "'" + (status || "") + "', ";
  queryStr += "'" + (route || "") + "', ";
  queryStr += "'" + (lastName || "") + "', ";
  queryStr += "'" + (firstName || "") + "'";
  queryStr += ", '" + (seiName || "") + "'";
  queryStr += ", '" + (meiName || "") + "'";
  queryStr += ", '" + (zipCode || "") + "'";
  queryStr += ", '" + (prefecture || "") + "'";
  queryStr += ", '" + (city || "") + "'";
  queryStr += ", '" + (street || "") + "'";
  queryStr += ", '" + (building || "") + "'";
  queryStr += ", '" + (phone || "") + "'";
  queryStr += ", '" + (email || "") + "'";
  queryStr += ", '" + (note || "") + "'";
  queryStr += ", '" + (memo || "") + "'";
  queryStr += ", " + (birthYear || -1);
  queryStr += ", " + (birthMonth || -1);
  queryStr += ", " + (birthDate || -1);
  queryStr += ", '" + (employee || "未設定") + "'";
  queryStr += ", '" + (delivery || "") + "'";
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
