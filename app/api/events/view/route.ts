import { connectToDatabase } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const data = await req.json();
  const { keyword, type, status } = data;
  let queryStr = "SELECT * FROM events";
  let isAppend = false;
  if (
    keyword ||
    type !== "イベント種別 - 全て" ||
    status !== "ステータス - 全て"
  )
    queryStr += " WHERE";

  if (type && type !== "イベント種別 - 全て") {
    queryStr += " type = '" + type + "'";
    isAppend = true;
  }
  if (status && status !== "ステータス - 全て") {
    let updated_status =
      status === "公開中"
        ? "公開"
        : status === "公開中(開催終了)"
        ? "公開(開催終了)"
        : "非公開(下書き)";
    if (isAppend) queryStr += " and";
    queryStr += " status = '" + updated_status + "'";
  }

  try {
    const db = await connectToDatabase();
    const [rows] = await db.query(queryStr);
    return NextResponse.json(rows);
  } catch (error) {
    console.error("Error connecting to database:", error);
  }
}
