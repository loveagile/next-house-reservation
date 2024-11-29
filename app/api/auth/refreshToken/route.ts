import { NextRequest, NextResponse } from "next/server";
import { verify, sign } from "jsonwebtoken";

export async function POST(req: NextRequest) {
  try {
    const { refresh_token } = await req.json();

    // Verify the refresh token
    let payload;
    try {
      payload = verify(
        refresh_token,
        process.env.REFRESH_TOKEN_SECRET || "refresh_token_secret"
      ) as any;
    } catch (error) {
      console.error("Invalid refresh token:", error);
      return NextResponse.json(
        { error: "Invalid refresh token" },
        { status: 401 }
      );
    }

    // Generate a new access token
    const access_token = sign(
      {
        id: payload.id,
        email: payload.email,
      },
      process.env.ACCESS_TOKEN_SECRET || "access_token_secret",
      { expiresIn: 60 * 60 } // Expires in 1 hour
    );

    return NextResponse.json(access_token);
  } catch (error) {
    console.error("Error in POST /api/auth/refreshToken: ", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
