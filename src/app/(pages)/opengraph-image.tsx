import { ImageResponse } from "next/og";
import {
  OG_IMAGE_CONTENT_TYPE,
  OG_IMAGE_SIZE,
  OGImageTemplate,
} from "@/lib/og-image";

export const alt = "Pixelify - Transform Your Photos Into Pixel Art";
export const size = OG_IMAGE_SIZE;
export const contentType = OG_IMAGE_CONTENT_TYPE;

export default async function Image() {
  return new ImageResponse(
    OGImageTemplate({
      title: "Turn Your Photos Into Pixel Art",
      description:
        "Upload any image and watch it transform into stunning pixel art. Fast, simple, and beautifully crafted for creators.",
      badge: "Transform images instantly",
    }),
    { ...size },
  );
}
