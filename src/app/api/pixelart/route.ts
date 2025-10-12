import { type NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";
import { pixelArtQuerySchema, postRequestSchema } from "@/lib/pixel-art/schema";
import { processPixelArt } from "@/lib/pixel-art/server";

/**
 * POST /api/pixelart
 * Convert base64 image to pixel art
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const validatedData = postRequestSchema.parse(body);

    const base64Data = validatedData.image.split(",")[1];
    const imageBuffer = Buffer.from(base64Data, "base64");

    const pixelArtBuffer = await processPixelArt(
      imageBuffer,
      validatedData.options,
    );

    return new NextResponse(pixelArtBuffer as unknown as BodyInit, {
      headers: {
        "Content-Type": "image/png",
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch (error) {
    if (error instanceof ZodError) {
      const firstError = error.issues[0];
      return NextResponse.json(
        {
          error: firstError.message,
          field: firstError.path.join("."),
        },
        { status: 400 },
      );
    }

    console.error("Error processing image:", error);
    return NextResponse.json(
      { error: "Failed to process image" },
      { status: 500 },
    );
  }
}

/**
 * GET /api/pixelart?url=<image_url>&pixelSize=8&colorDepth=32&dithering=none
 * Convert image from URL to pixel art
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    const queryObject = Object.fromEntries(searchParams.entries());

    const validatedQuery = pixelArtQuerySchema.parse(queryObject);

    const imageResponse = await fetch(validatedQuery.url);
    if (!imageResponse.ok) {
      return NextResponse.json(
        { error: "Failed to fetch image from URL" },
        { status: 400 },
      );
    }

    const contentType = imageResponse.headers.get("content-type");
    if (!contentType?.startsWith("image/")) {
      return NextResponse.json(
        { error: "URL does not point to an image" },
        { status: 400 },
      );
    }

    const arrayBuffer = await imageResponse.arrayBuffer();
    const imageBuffer = Buffer.from(arrayBuffer);

    const pixelArtBuffer = await processPixelArt(imageBuffer, {
      pixelSize: validatedQuery.pixelSize,
      colorDepth: validatedQuery.colorDepth,
      dithering: validatedQuery.dithering,
      brightness: validatedQuery.brightness,
      contrast: validatedQuery.contrast,
      saturation: validatedQuery.saturation,
      maxSize: validatedQuery.maxSize,
    });

    return new NextResponse(pixelArtBuffer as unknown as BodyInit, {
      headers: {
        "Content-Type": "image/png",
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch (error) {
    if (error instanceof ZodError) {
      const firstError = error.issues[0];
      return NextResponse.json(
        {
          error: firstError.message,
          field: firstError.path.join("."),
        },
        { status: 400 },
      );
    }

    console.error("Error processing image:", error);
    return NextResponse.json(
      { error: "Failed to process image" },
      { status: 500 },
    );
  }
}
