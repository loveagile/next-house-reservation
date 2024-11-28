import { NextRequest, NextResponse } from "next/server";
import sgMail from "@sendgrid/mail";

sgMail.setApiKey(process.env.SENDGRID_API_KEY as string);

export async function POST(request: NextRequest) {
  try {
    const { content } = await request.json();
    const msg = {
      from: {
        email: "info@smile-builders-hiraya.com",
        name: "スマイルビルダーズ",
      },
      to: [
        { email: "info@smile-builders-hiraya.com" },
        { email: "info@wazeka.co.jp" },
      ],
      subject: "【スマイルビルダーズ】新しい新規ごお問い合わせがございました。",
      text: content,
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
