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

  let queryStr = `
    INSERT INTO events (
      userID, title, type, format, note, status, statusBit, priority, 
      prefecture, address1, address2, hiddenAddress, mapFormat, mailFormat,
      images, mainIndex, FPImages, 
      tag, feature, benefit, propertyType) 
    SELECT 
      userID, title, type, format, note, status, statusBit, priority, 
      prefecture, address1, address2, hiddenAddress, mapFormat, mailFormat,
      images, mainIndex, FPImages, 
      tag, feature, benefit, propertyType
    FROM events 
    WHERE id = ${id}`;

  try {
    const db = await connectToDatabase();
    const [result] = (await db.query(queryStr)) as ResultSetHeader[];
    const lastInsertedId = result.insertId;
    return NextResponse.json({ lastInsertedId });
  } catch (error) {
    console.error("Error connecting to database:", error);
  }
}
