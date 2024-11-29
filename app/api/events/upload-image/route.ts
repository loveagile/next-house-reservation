import path from "path";
import { writeFile } from "fs/promises";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const image = (await req.formData()).get("image");

    if (!image || !(image instanceof File)) {
      return NextResponse.json(
        { error: "No files received or incorrect type." },
        { status: 400 }
      );
    }

    const buffer = Buffer.from(await image.arrayBuffer());
    const imageName = `${Date.now()}_${image.name.replace(/\s+/g, "_")}`;
    const imagePath = path.join(process.cwd(), "public/imgs/events", imageName);

    await writeFile(imagePath, buffer);

    const imgUrl = `/imgs/events/${imageName}`;
    return NextResponse.json({ url: imgUrl });
  } catch (error) {
    console.error("Error occurred while saving the file: ", error);
    return NextResponse.json(
      { error: "Failed to upload image." },
      { status: 500 }
    );
  }
}
