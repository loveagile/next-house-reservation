import { withDatabase } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { convEventStatus, eventHoldingPeriod } from "@/utils/convert";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL as string;

interface IPublishEvent {
  id: number;
  title: string;
  type: string;
  format: string;
  eventDate: string;
  status: string;
  prefecture: string;
  address1: string;
  address2: string;
  images: string;
  mainIndex: number;
  name: string;
  eventURL: string;
}

export async function POST(req: NextRequest) {
  const queryStr = `
    SELECT 
      e.id, e.title, e.type, e.format, e.eventDate, e.status, 
      e.prefecture, e.address1, e.address2, e.images, e.mainIndex,
      u.name AS companyName, u.eventURL
    FROM 
      events e
    JOIN
      users u ON u.id = e.userID
  `;

  try {
    const events: IPublishEvent[] = await withDatabase(async (db) => {
      const [rows] = await db.query(queryStr);
      return rows as IPublishEvent[];
    });

    const publishEvents = events.filter((event: IPublishEvent) => {
      const { status, eventDate } = event;
      const convStatus = convEventStatus(status, JSON.parse(eventDate));
      return convStatus === "公開" || convStatus === "限定公開";
    });

    const convPublishEvents = publishEvents.map((event: IPublishEvent) => {
      const {
        id,
        eventURL,
        status,
        eventDate,
        images,
        mainIndex,
        prefecture,
        address1,
        address2,
        ...rest
      } = event;

      const address = `${prefecture || ""}${address1 || ""}${address2 || ""}`;
      const link = `${SITE_URL}/${eventURL}/events/${id}`;
      const mainImg = `${SITE_URL}${
        images?.split(",").map((img) => img.trim())[mainIndex] ||
        "/imgs/events/no_image.png"
      }`;
      const holdingPeriod = eventHoldingPeriod(JSON.parse(eventDate));

      return { ...rest, link, address, holdingPeriod, mainImg };
    });

    return NextResponse.json(convPublishEvents);
  } catch (error) {
    console.error("Error in POST /api/events/publish: ", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
