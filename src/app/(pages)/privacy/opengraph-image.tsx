import { ImageResponse } from "next/og";
import {
  OG_IMAGE_CONTENT_TYPE,
  OG_IMAGE_SIZE,
  OGImageTemplate,
} from "@/lib/og-image";

export const alt = "Pixelify Privacy Policy - Your Data, Your Control";
export const size = OG_IMAGE_SIZE;
export const contentType = OG_IMAGE_CONTENT_TYPE;

export default async function Image() {
  return new ImageResponse(
    OGImageTemplate({
      title: "Privacy Policy",
      description:
        "Your privacy matters. Learn how Pixelify protects your data with client-side processing.",
      badge: "Privacy First",
    }),
    { ...size },
  );
}
