import { ImageResponse } from "next/og";
import {
  OG_IMAGE_CONTENT_TYPE,
  OG_IMAGE_SIZE,
  OGImageTemplate,
} from "@/lib/og-image";

export const alt = "Page Not Found - 404 | Pixelify";
export const size = OG_IMAGE_SIZE;
export const contentType = OG_IMAGE_CONTENT_TYPE;

export default async function Image() {
  return new ImageResponse(
    OGImageTemplate({
      title: "Page Not Found",
      description:
        "The page you're looking for doesn't exist or has been moved.",
      badge: "404 Error",
    }),
    { ...size },
  );
}
