import { ImageResponse } from "next/og";
import {
  OG_IMAGE_CONTENT_TYPE,
  OG_IMAGE_SIZE,
  OGImageTemplate,
} from "@/lib/og-image";

export const alt = "Pixelify Terms of Service";
export const size = OG_IMAGE_SIZE;
export const contentType = OG_IMAGE_CONTENT_TYPE;

export default async function Image() {
  return new ImageResponse(
    OGImageTemplate({
      title: "Terms of Service",
      description:
        "Read the terms and conditions for using Pixelify and our pixel art conversion services.",
      badge: "Legal",
    }),
    { ...size },
  );
}
