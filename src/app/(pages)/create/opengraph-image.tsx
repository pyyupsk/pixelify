import { ImageResponse } from "next/og";
import {
  OG_IMAGE_CONTENT_TYPE,
  OG_IMAGE_SIZE,
  OGImageTemplate,
} from "@/lib/og-image";

export const alt = "Create Pixel Art - Pixelify";
export const size = OG_IMAGE_SIZE;
export const contentType = OG_IMAGE_CONTENT_TYPE;

export default async function Image() {
  return new ImageResponse(
    OGImageTemplate({
      title: "Create Pixel Art",
      description:
        "Upload your image and transform it into retro pixel art with customizable settings.",
      badge: "Free Online Tool",
    }),
    { ...size },
  );
}
