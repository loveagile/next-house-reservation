import { withDatabase } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { verify } from "jsonwebtoken";

export async function POST(req: NextRequest) {
  try {
    const { access_token } = await req.json();

    if (!access_token) {
      return NextResponse.json({ isAuthenticated: false });
    }

    // Verify the JWT token
    let payload;
    try {
      payload = verify(
        access_token,
        process.env.ACCESS_TOKEN_SECRET || "access_token_secret"
      ) as any;
    } catch (error) {
      console.error("JWT verification failed:", error);
      return NextResponse.json({ isAuthenticated: false });
    }

    const { id, email } = payload;

    const user = await withDatabase(async (db) => {
      const queryStr = `SELECT * FROM users WHERE email = ?`;
      const [rows]: any = await db.query(queryStr, [email]);
      return rows.length === 1 ? rows[0] : null;
    });

    if (!user) {
      return NextResponse.json({ isAuthenticated: false });
    }

    const isAuthenticated = id === user.id;

    return NextResponse.json({
      isAuthenticated,
      companyName: user.name,
    });
  } catch (error) {
    console.error("Error in POST /api/auth/verify: ", error);
    return NextResponse.json({ isAuthenticated: false }, { status: 500 });
  }
}
