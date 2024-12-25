import { withDatabase } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { comparePassword } from "@/utils/auth";
import { sign } from "jsonwebtoken";

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    const queryStr = `SELECT * FROM users WHERE email = ?`;

    // Use scoped database connection with garbage collection
    const user = await withDatabase(async (db) => {
      const [rows]: any = await db.query(queryStr, [email]);
      return rows.length === 1 ? rows[0] : null;
    });

    if (!user) {
      return NextResponse.json({ error: "Invalid email" });
    }

    // Compare password
    const isPasswordValid = await comparePassword(password, user.password);
    if (!isPasswordValid) {
      return NextResponse.json({ error: "Invalid password" });
    }

    // Generate access and refresh tokens
    const accessToken = sign(
      { id: user.id, email: user.email },
      process.env.ACCESS_TOKEN_SECRET || "access_token_secret",
      { expiresIn: 60 * 60 }
    );

    const refreshToken = sign(
      { id: user.id, email: user.email },
      process.env.REFRESH_TOKEN_SECRET || "refresh_token_secret",
      { expiresIn: 24 * 60 * 60 }
    );

    return NextResponse.json({
      id: user.id,
      isParent: user.isParent,
      subId: -1,
      access_token: accessToken,
      refresh_token: refreshToken,
    });
  } catch (error) {
    console.error("Error in POST /api/login: ", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
