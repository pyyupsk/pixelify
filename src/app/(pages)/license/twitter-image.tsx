import { ImageResponse } from "next/og";
import {
  OG_IMAGE_CONTENT_TYPE,
  OG_IMAGE_SIZE,
  OGImageTemplate,
} from "@/lib/og-image";

export const alt = "Pixelify License - Free Forever";
export const size = OG_IMAGE_SIZE;
export const contentType = OG_IMAGE_CONTENT_TYPE;

export default async function Image() {
  return new ImageResponse(
    OGImageTemplate({
      title: "License",
      description:
        "Free forever for personal and non-commercial use. Licensed under PolyForm Noncommercial License 1.0.0.",
      badge: "Free Forever",
    }),
    { ...size },
  );
}
