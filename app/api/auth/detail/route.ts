import { withDatabase } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { id } = await req.json();

    const queryStr = `SELECT name, email, eventURL, phone FROM users WHERE id = ?`;

    const user = await withDatabase(async (db) => {
      const [rows]: any = await db.query(queryStr, [id]);
      return rows.length === 1 ? rows[0] : null;
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({
      name: user.name,
      email: user.email,
      eventURL: user.eventURL,
      phone: user.phone,
    });
  } catch (error) {
    console.error("Error in POST /api/auth/detail: ", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
