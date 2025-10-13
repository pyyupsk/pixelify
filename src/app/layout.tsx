import "@/assets/css/globals.css";

import type { Metadata } from "next";
import type { PropsWithChildren } from "react";
import { mono, sans } from "@/assets/fonts";
import { JsonLd } from "@/components/layout/json-ld";
import {
  createSoftwareApplicationJsonLd,
  createWebSiteJsonLd,
} from "@/lib/json-ld";
import { commonMetadata } from "@/lib/metadata";
import { cn } from "@/lib/utils";

export const metadata: Metadata = commonMetadata({
  title: {
    template: "%s | Pixelify",
    default: "Pixelify - Transform Your Photos Into Pixel Art",
  },
  description:
    "Upload any image and watch it transform into stunning pixel art. Fast, simple, and beautifully crafted for creators.",
});

export default function RootLayout({ children }: Readonly<PropsWithChildren>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <JsonLd data={createWebSiteJsonLd()} id="website-schema" />
        <JsonLd
          data={createSoftwareApplicationJsonLd()}
          id="software-application-schema"
        />
      </head>
      <body className={cn(sans.variable, mono.variable)}>{children}</body>
    </html>
  );
}
