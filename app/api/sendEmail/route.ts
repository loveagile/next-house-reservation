import { NextRequest, NextResponse } from "next/server";
import sgMail from "@sendgrid/mail";

sgMail.setApiKey(process.env.SENDGRID_API_KEY as string);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { to, subject, content } = body;
    const msg = {
      to,
      from: "support@spocul-bank.jp",
      subject,
      text: content,
    };

    const res = await sgMail.send(msg);
    return NextResponse.json(res);
  } catch (error) {
    throw error;
  }
}
