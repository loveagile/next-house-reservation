import { connectToDatabase } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { comparePassword } from "@/utils/auth";
import jwt, { sign, verify } from "jsonwebtoken";

export async function POST(req: NextRequest) {
  const data = await req.json();
  const { email, password } = data;

  let queryStr = `SELECT * FROM users WHERE email = ?`; // Use parameterized query for security

  try {
    const db = await connectToDatabase();
    const [rows]: any = await db.query(queryStr, [email]);

    if (rows.length !== 1) {
      return NextResponse.json({ error: "Invalid email" });
    } else {
      return NextResponse.json({
        result: "success",
      });
    }
  } catch (error) {
    console.error("Error connecting to database:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
