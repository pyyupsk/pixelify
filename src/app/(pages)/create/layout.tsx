import type { Metadata } from "next";
import type { PropsWithChildren } from "react";
import { JsonLd } from "@/components/layout/json-ld";
import { getSiteUrl } from "@/env";
import { createBreadcrumbJsonLd, createWebPageJsonLd } from "@/lib/json-ld";
import { commonMetadata } from "@/lib/metadata";

export const metadata: Metadata = commonMetadata({
  title: "Create Pixel Art",
  description:
    "Upload your image and transform it into retro pixel art with customizable settings for pixel size, color depth, and dithering modes.",
  canonicalPath: "/create",
  keywords: [
    "create pixel art",
    "upload image",
    "pixel art creator",
    "online pixel art tool",
    "retro art maker",
  ],
});

export default function CreateLayout({
  children,
}: Readonly<PropsWithChildren>) {
  const siteUrl = getSiteUrl();

  return (
    <>
      <JsonLd
        data={createWebPageJsonLd(
          "Create Pixel Art",
          "Upload your image and transform it into retro pixel art with customizable settings for pixel size, color depth, and dithering modes.",
          `${siteUrl}/create`,
        )}
        id="create-page-schema"
      />
      <JsonLd
        data={createBreadcrumbJsonLd([
          { name: "Home", url: "/" },
          { name: "Create Pixel Art", url: "/create" },
        ])}
        id="create-breadcrumb-schema"
      />
      {children}
    </>
  );
}
