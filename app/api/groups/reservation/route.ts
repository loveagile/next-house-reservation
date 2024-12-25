import { withDatabase } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { id } = await req.json();

    const childQuery = `
      SELECT 
        r.id, r.customerId, r.eventId, r.reserveDate, r.startTime, r.endTime, r.status, r.route, r.receptionAt,
        e.title, e.type, e.format, 
        c.lastName, c.firstName, c.employee, c.seiName, c.meiName, c.prefecture, c.city, c.street, c.building, c.email, c.phone, c.memo, c.note, c.delivery,
        u.name as companyName,
        (SELECT COUNT(eventId) FROM reservations WHERE customerId = r.customerId) AS reservationTimes
      FROM
        usersgroup ug
      JOIN
        reservations r ON ug.userID = r.groupID
      JOIN
        users u ON u.id = r.groupID
      JOIN
        customers c ON r.customerId = c.id 
      JOIN
        events e ON r.eventId = e.id 
      WHERE ug.groupID = ?
    `;

    const parentQuery = `
      SELECT 
        r.id, r.customerId, r.eventId, r.reserveDate, r.startTime, r.endTime, r.status, r.route, r.receptionAt,
        e.title, e.type, e.format, 
        c.lastName, c.firstName, c.employee, c.seiName, c.meiName, c.prefecture, c.city, c.street, c.building, c.email, c.phone, c.memo, c.note, c.delivery,
        u.name as companyName,
        (SELECT COUNT(eventId) FROM reservations WHERE customerId = r.customerId) AS reservationTimes
      FROM 
        reservations r 
      JOIN
        users u ON u.id = r.groupID
      JOIN
        customers c ON r.customerId = c.id 
      JOIN
        events e ON r.eventId = e.id 
      WHERE r.groupID = ?
    `;

    const result = await withDatabase(async (db) => {
      const [parents] = await db.query(parentQuery, [id]);
      const [childs] = await db.query(childQuery, [id]);
      return (Array.isArray(parents) ? parents : []).concat(
        Array.isArray(childs) ? childs : []
      );
    });

    return NextResponse.json(result);
  } catch (error) {
    console.error("Error in POST /api/groups/reservation: ", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
