import type { Metadata } from "next";
import type { PropsWithChildren } from "react";
import { JsonLd } from "@/components/layout/json-ld";
import { getSiteUrl } from "@/env";
import { createBreadcrumbJsonLd, createWebPageJsonLd } from "@/lib/json-ld";
import { commonMetadata } from "@/lib/metadata";

export const metadata: Metadata = commonMetadata({
  title: "Example Gallery",
  description:
    "Explore different pixel art styles and settings to inspire your creations. See examples of various dithering modes, color depths, and pixel sizes.",
  canonicalPath: "/examples",
  keywords: [
    "pixel art examples",
    "pixel art gallery",
    "dithering examples",
    "retro art inspiration",
    "pixel art styles",
  ],
});

export default function ExamplesLayout({
  children,
}: Readonly<PropsWithChildren>) {
  const siteUrl = getSiteUrl();

  return (
    <>
      <JsonLd
        data={createWebPageJsonLd(
          "Example Gallery",
          "Explore different pixel art styles and settings to inspire your creations. See examples of various dithering modes, color depths, and pixel sizes.",
          `${siteUrl}/examples`,
        )}
        id="examples-page-schema"
      />
      <JsonLd
        data={createBreadcrumbJsonLd([
          { name: "Home", url: "/" },
          { name: "Example Gallery", url: "/examples" },
        ])}
        id="examples-breadcrumb-schema"
      />
      {children}
    </>
  );
}
