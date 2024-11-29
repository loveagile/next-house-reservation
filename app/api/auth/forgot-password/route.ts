import { withDatabase } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    }

    const queryStr = `SELECT * FROM users WHERE email = ?`;

    // Use scoped database connection with garbage collection
    const user = await withDatabase(async (db) => {
      const [rows]: any = await db.query(queryStr, [email]);
      return rows.length === 1 ? rows[0] : null;
    });

    if (!user) {
      return NextResponse.json({ error: "Invalid email" }, { status: 400 });
    }

    return NextResponse.json({
      result: "success",
    });
  } catch (error) {
    console.error("Error in POST /api/auth/forgot-password: ", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
