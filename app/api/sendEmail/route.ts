import { NextRequest, NextResponse } from "next/server";
import sgMail from "@sendgrid/mail";

sgMail.setApiKey(process.env.SENDGRID_API_KEY as string);

export async function POST(request: NextRequest) {
  try {
    const { to, subject, text } = await request.json();
    const msg = {
      to,
      from: {
        email: "info@smile-builders-hiraya.com",
        name: "スマイルビルダーズ",
      },
      subject,
      text,
      tracking_settings: {
        click_tracking: {
          enable: false,
        },
      },
    };

    const res = await sgMail.send(msg);
    return NextResponse.json(res);
  } catch (error) {
    throw error;
  }
}
