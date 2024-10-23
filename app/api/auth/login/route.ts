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
      const user = rows[0];
      if (!(await comparePassword(password, user.password))) {
        return NextResponse.json({ error: "Invalid password" });
      } else {
        const access_token = sign(
          {
            id: user.id,
            name: user.name,
            email: user.email,
          },
          "access_token",
          { expiresIn: 60 * 60 }
        );

        const refresh_token = sign(
          {
            id: user.id,
            name: user.name,
            email: user.email,
          },
          "refresh_token",
          { expiresIn: 24 * 60 * 60 }
        );
        return NextResponse.json({
          id: user.id,
          isParent: user.isParent,
          subId: -1,
          access_token,
          refresh_token,
        });
      }
    }
  } catch (error) {
    console.error("Error connecting to database:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
