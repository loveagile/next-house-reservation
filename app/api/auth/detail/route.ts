import { connectToDatabase } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { comparePassword } from "@/utils/auth";
import jwt, { sign, verify } from "jsonwebtoken";

export async function POST(req: NextRequest) {
  const { id } = await req.json();

  let queryStr = `SELECT * FROM users WHERE id = ?`; // Use parameterized query for security

  try {
    const db = await connectToDatabase();
    const [rows]: any = await db.query(queryStr, [id]);
    return NextResponse.json({
      eventURL: rows[0].eventURL,
      phone: rows[0].phone,
    });
  } catch (error) {
    console.error("Error connecting to database:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
