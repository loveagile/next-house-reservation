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
  const { title, type, format, note } = data;

  let queryStr =
    "INSERT INTO events (title, type, format" + (note ? ", note" : "") + ") ";
  queryStr += "VALUES (";
  queryStr += "'" + title + "', ";
  queryStr += "'" + type + "', ";
  queryStr += "'" + format + "'";
  if (note) queryStr += ", '" + note + "'";
  queryStr += ");";

  try {
    const db = await connectToDatabase();
    const [result] = (await db.query(queryStr)) as ResultSetHeader[];
    const lastInsertedId = result.insertId;
    return NextResponse.json({ lastInsertedId });
  } catch (error) {
    console.error("Error connecting to database:", error);
  }
}
