import { NextRequest, NextResponse } from "next/server";
import path from "path";
import { writeFile } from "fs/promises";

export async function POST(req: NextRequest) {
  try {
    // Get the image from form data
    const image = (await req.formData()).get("image");

    // Validate the image
    if (!image || !(image instanceof File)) {
      return NextResponse.json(
        { error: "No files received or incorrect type." },
        { status: 400 }
      );
    }

    // Convert the image to a buffer
    const buffer = Buffer.from(await image.arrayBuffer());

    // Generate a unique name for the image
    const imageName = Date.now() + "_" + image.name.replace(/\s+/g, "_");

    // Construct the full path where the image will be saved
    const imagePath = path.join(
      process.cwd(),
      "public/imgs/campaigns",
      imageName
    );

    // Write the image to the file system
    await writeFile(imagePath, buffer);

    // Construct the URL for the saved image
    const imgUrl = `/imgs/campaigns/${imageName}`;

    return NextResponse.json({ url: imgUrl });
  } catch (error) {
    console.error("Error occurred while uploading the image:", error);
    return NextResponse.json(
      { error: "Failed to upload the image" },
      { status: 500 }
    );
  }
}
