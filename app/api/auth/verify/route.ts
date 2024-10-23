import { connectToDatabase } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { verify } from "jsonwebtoken";

export async function POST(req: NextRequest) {
  const data = await req.json();
  const { access_token } = data;

  if (!access_token) {
    return NextResponse.json({ isAuthenticated: false });
  }

  try {
    const payload = verify(access_token, "access_token") as any;
    const { id, name, email } = payload;

    const db = await connectToDatabase();
    let queryStr = `SELECT * FROM users WHERE email = ?`;
    const [rows]: any = await db.query(queryStr, [email]);

    if (rows.length !== 1) {
      return NextResponse.json({ isAuthenticated: false });
    } else {
      const user = rows[0];
      const isAuthenticated = id === user.id && name === user.name;
      return NextResponse.json({
        isAuthenticated,
      });
    }
  } catch (error) {
    console.error("JWT verification failed:", error);
    return NextResponse.json({ isAuthenticated: false });
  }
}
