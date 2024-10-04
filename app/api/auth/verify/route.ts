import { NextRequest, NextResponse } from "next/server";
import { verify } from "jsonwebtoken";

export async function POST(req: NextRequest) {
  const data = await req.json();
  const { id, name, email, accessToken } = data;

  if (!accessToken) {
    return NextResponse.json({ isAuthenticated: false });
  }

  try {
    const payload = verify(accessToken, "access_token") as any;
    const isAuthenticated =
      id === payload.id && name === payload.name && email === payload.email;

    return NextResponse.json({
      isAuthenticated,
    });
  } catch (error) {
    console.error("JWT verification failed:", error);
    return NextResponse.json({ isAuthenticated: false });
  }
}
