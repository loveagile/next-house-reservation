import path from "path";
import { writeFile } from "fs/promises";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const image = (await req.formData()).get("image");
  if (!image || !(image instanceof File)) {
    return NextResponse.json(
      { error: "No files received or incorrect type." },
      { status: 400 }
    );
  }
  const buffer = Buffer.from(await image.arrayBuffer());
  const imageName = Date.now() + image.name.replace(/\s+/g, "_");
  try {
    await writeFile(
      path.join(process.cwd(), "public/imgs/events/" + imageName),
      buffer
    );
    const imgUrl = "/imgs/events/" + imageName;
    return NextResponse.json({ url: imgUrl });
  } catch (error) {
    console.log("Error occured ", error);
    return NextResponse.json({ Message: "Failed", status: 500 });
  }
}
