import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/env";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = getSiteUrl();

  return {
    rules: [
      {
        userAgent: ["*"],
        allow: "/",
        disallow: [
          "/api/", // API routes (except OG image)
          "/_next/", // Next.js internals
        ],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
}
