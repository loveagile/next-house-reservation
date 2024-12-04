import { withDatabase } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import sgMail from "@sendgrid/mail";
import { formatDateToJapaneseString } from "@/utils/convert";

interface IEmailUser {
  groupID: string;
  reserveDate: string;
  startTime: string;
  lastName: string;
  firstName: string;
  note: string;
  email: string;
  prefecture: string;
  address1: string;
  address2: string;
  title: string;
  eventId: string;
  eventURL: string;
}

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL as string;

export async function POST(req: NextRequest) {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY || "");

  try {
    const queryStr = `
      SELECT 
        r.groupID, r.reserveDate, r.startTime,
        c.lastName, c.firstName, c.note, c.email,
        e.prefecture, e.address1, e.address2,
        e.id AS eventId, e.title,
        u.eventURL
      FROM 
        reservations r
      JOIN
        customers c ON r.customerId = c.id
      JOIN 
        events e ON r.eventId = e.id
      JOIN 
        users u ON r.groupID = u.id
      WHERE 
        r.reserveDate = DATE_ADD(CURDATE(), INTERVAL 1 DAY)
    `;

    const rows = (await withDatabase(async (db) => {
      const [result] = await db.query(queryStr);
      return result;
    })) as IEmailUser[];

    for (const record of rows) {
      const {
        groupID,
        reserveDate,
        startTime,
        lastName,
        firstName,
        note,
        email,
        prefecture,
        address1,
        address2,
        eventId,
        eventURL,
        title,
      } = record;

      const webAddress =
        (prefecture || "") + (address1 || "") + (address2 || "");

      const content = `
      ${lastName}${firstName}様
  
      先日は、「${title}」にご予約いただきありがとうございます。
      ご予約いただきましたイベント前日となりましたのでご連絡いたします。
      当日は、お気をつけてお越しください。
      ご不明点ございましたらご連絡いただけますと幸いです。
      どうぞよろしくお願いいたします。
  
      ────────────────────────────────
      ◆ 予約受付詳細 ◆
      ────────────────────────────────
      ■【お名前】
      ${lastName}${firstName}様
  
      ■【予約イベント】
      ${title}

      ■【予約希望日】
      ${formatDateToJapaneseString(new Date(reserveDate))} ${startTime}
  
      ■【その他連絡事項】
      ${note}
  
      ■【イベント開催場所】
      ${webAddress}
  
  
      ＜当日チェックしてほしいポイント＞
      ▼ イベント内容はコチラからご確認ください ▼
      ${SITE_URL}/${eventURL}/events/${eventId}
    `;

      const msg = {
        to: [{ email }, { email: "info@wazeka.co.jp" }],
        from: {
          email: "info@smile-builders-hiraya.com",
          name: "スマイルビルダーズ",
        },
        subject: "【スマイルビルダーズ】イベント前日のご連絡",
        text: content,
        tracking_settings: {
          click_tracking: {
            enable: false,
          },
        },
      };

      try {
        await sgMail.send(msg);
      } catch (emailError) {
        console.error(`Failed to send email to: ${email}`);
      }
    }

    // Return success response
    return NextResponse.json(rows);
  } catch (error) {
    console.error("Error in POST /api/sendEmail/user: ", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
