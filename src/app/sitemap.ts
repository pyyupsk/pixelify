import type { MetadataRoute } from "next";
import { navigates } from "@/constants/navigates";
import { getSiteUrl } from "@/env";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = getSiteUrl();

  const pages = navigates.map((navigate) => ({
    url: `${baseUrl}${navigate.href}`,
    lastModified: new Date(),
    changeFrequency: navigate.changeFrequency,
    priority: navigate.priority,
  }));

  return [...pages];
}
