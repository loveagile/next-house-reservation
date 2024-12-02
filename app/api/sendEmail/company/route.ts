import { withDatabase } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import sgMail from "@sendgrid/mail";

interface IEmailCompany {
  groupID: string;
  userName: string;
  userEmail: string;
  eventTitles: string;
}

export async function POST(req: NextRequest) {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY || "");

  try {
    const queryStr = `
      SELECT 
        r.groupID,
        u.name AS userName,
        u.email AS userEmail,
        GROUP_CONCAT(DISTINCT e.title SEPARATOR ', ') AS eventTitles
      FROM 
        reservations r
      JOIN 
        events e ON r.eventId = e.id
      JOIN 
        users u ON r.groupID = u.id
      WHERE 
        r.reserveDate = CURDATE()
      GROUP BY 
        r.groupID, u.name, u.email;
    `;

    const rows = (await withDatabase(async (db) => {
      const [result] = await db.query(queryStr);
      return result;
    })) as IEmailCompany[];

    for (const record of rows) {
      const { groupID, userName, userEmail, eventTitles } = record;

      const content = `
${userName} 様
本日開催のイベントに予約が入っております。
${eventTitles
  .split(", ")
  .map(
    (event) => `
《イベントタイトル》
 ・${event}
──────────────────────────────────────────────────────
`
  )
  .join("")}
予約内容の詳細については、
管理画面にログイン後、「予約」→「予約一覧」をご確認ください。
https://smile-builders-system.com/reservations/list



※本メールアドレスは送信専用となっております。
──────────────────────────────────────────────────────
平屋だけの姶良総合住宅展示場スマイルビルダーズ
住所：鹿児島県姶良市加治木町木田2511-1
営業時間：10:00〜18:00
定休日：水曜日
FAX：0995-55-8818
MAIL：info@smile-builders-hiraya.com
TEL：0995-55-8900
──────────────────────────────────────────────────────
`;

      const msg = {
        to: [{ email: userEmail }, { email: "info@wazeka.co.jp" }],
        from: {
          email: "info@smile-builders-hiraya.com",
          name: "スマイルビルダーズ",
        },
        subject:
          "【スマイルビルダーズ】本日開催のイベントの予約状況を確認してください",
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
        console.error(`Failed to send email to: ${userEmail}`);
      }
    }

    // Return success response
    return NextResponse.json(rows);
  } catch (error) {
    console.error("Error in POST /api/sendEmail/company: ", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
