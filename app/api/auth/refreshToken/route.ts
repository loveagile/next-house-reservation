import { connectToDatabase } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { verify, sign } from "jsonwebtoken";

export async function POST(req: NextRequest) {
  const data = await req.json();
  const { refresh_token } = data;
  const payload = verify(refresh_token, "refresh_token") as any;

  const access_token = sign(
    {
      id: payload.id,
      name: payload.name,
      email: payload.email,
    },
    "access_token",
    { expiresIn: 60 * 60 }
  );

  return NextResponse.json(access_token);
}
