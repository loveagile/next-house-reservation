import path from "path";
import { writeFile } from "fs/promises";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const file = (await req.formData()).get("file");
  if (!file || !(file instanceof File)) {
    return NextResponse.json(
      { error: "No files received or incorrect type." },
      { status: 400 }
    );
  }
  const buffer = Buffer.from(await file.arrayBuffer());
  const fileName = Date.now() + file.name.replace(/\s+/g, "_");
  try {
    await writeFile(
      path.join(process.cwd(), "public/imgs/upload/" + fileName),
      buffer
    );
    const imgUrl = "/imgs/upload/" + fileName;
    return NextResponse.json({ url: imgUrl });
  } catch (error) {
    console.log("Error occured ", error);
    return NextResponse.json({ Message: "Failed", status: 500 });
  }
}
