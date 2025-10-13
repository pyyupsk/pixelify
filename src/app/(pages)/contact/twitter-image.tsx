import { ImageResponse } from "next/og";
import {
  OG_IMAGE_CONTENT_TYPE,
  OG_IMAGE_SIZE,
  OGImageTemplate,
} from "@/lib/og-image";

export const alt = "Contact Pixelify - Get in Touch";
export const size = OG_IMAGE_SIZE;
export const contentType = OG_IMAGE_CONTENT_TYPE;

export default async function Image() {
  return new ImageResponse(
    OGImageTemplate({
      title: "Contact Us",
      description:
        "Have questions, feedback, or need support? Get in touch with the Pixelify team.",
      badge: "We're here to help",
    }),
    { ...size },
  );
}
