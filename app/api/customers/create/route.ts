import { withDatabase } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const {
      groupID,
      status,
      route,
      lastName,
      firstName,
      seiName,
      meiName,
      zipCode,
      prefecture,
      city,
      street,
      building,
      phone,
      email,
      birthYear,
      birthMonth,
      birthDate,
      note,
      memo,
      employee,
      delivery,
    } = await req.json();

    const queryStr = `
      INSERT INTO customers (
        groupID, status, route, lastName, firstName, seiName, meiName, 
        zipCode, prefecture, city, street, building, 
        phone, email, note, memo,
        birthYear, birthMonth, birthDate,
        employee, delivery
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const queryParams = [
      groupID || -1,
      status || "",
      route || "",
      lastName || "",
      firstName || "",
      seiName || "",
      meiName || "",
      zipCode || "",
      prefecture || "",
      city || "",
      street || "",
      building || "",
      phone || "",
      email || "",
      note || "",
      memo || "",
      birthYear || -1,
      birthMonth || -1,
      birthDate || -1,
      employee || "未設定",
      delivery || "",
    ];

    const lastCustomerId = await withDatabase(async (db) => {
      const [result] = await db.execute(queryStr, queryParams);
      return (result as any).insertId;
    });

    return NextResponse.json({ lastCustomerId });
  } catch (error) {
    console.error("Error in POST /api/customers/create: ", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
