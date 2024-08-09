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
  const { id } = data;

  let queryStr = `INSERT INTO events (title, type, format, attend, note, status, priority, prefecture, address1, address2, imgUrl, mainImg, tag, feature, benefit) SELECT title, type, format, attend, note, status, priority, prefecture, address1, address2, imgUrl, mainImg, tag, feature, benefit FROM events WHERE id = ${id}`;

  try {
    const db = await connectToDatabase();
    const [result] = (await db.query(queryStr)) as ResultSetHeader[];
    const lastInsertedId = result.insertId;
    return NextResponse.json({ lastInsertedId });
  } catch (error) {
    console.error("Error connecting to database:", error);
  }
}
