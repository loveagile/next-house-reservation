import path from "path";
import { writeFile } from "fs/promises";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    // Retrieve file from the request
    const file = (await req.formData()).get("file");

    // Validate the file
    if (!file || !(file instanceof File)) {
      return NextResponse.json(
        { error: "No file received or incorrect type." },
        { status: 400 }
      );
    }

    // Convert file to buffer
    const buffer = Buffer.from(await file.arrayBuffer());

    // Generate a unique file name
    const fileName = `${Date.now()}_${file.name.replace(/\s+/g, "_")}`;

    // Define the path to save the file
    const filePath = path.join(process.cwd(), "public/imgs/upload", fileName);

    // Write the file to the file system
    await writeFile(filePath, buffer);

    // Generate the file URL
    const fileUrl = `/imgs/upload/${fileName}`;

    return NextResponse.json({ url: fileUrl });
  } catch (error) {
    console.error("Error occurred while handling the file upload:", error);
    return NextResponse.json(
      { error: "Failed to upload file." },
      { status: 500 }
    );
  }
}
