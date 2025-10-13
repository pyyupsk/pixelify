import { ImageResponse } from "next/og";
import {
  OG_IMAGE_CONTENT_TYPE,
  OG_IMAGE_SIZE,
  OGImageTemplate,
} from "@/lib/og-image";

export const alt = "Example Gallery - Pixelify";
export const size = OG_IMAGE_SIZE;
export const contentType = OG_IMAGE_CONTENT_TYPE;

export default async function Image() {
  return new ImageResponse(
    OGImageTemplate({
      title: "Example Gallery",
      description:
        "Explore different styles and settings to inspire your pixel art creations.",
      badge: "Interactive Examples",
    }),
    { ...size },
  );
}
