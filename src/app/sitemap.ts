import type { MetadataRoute } from "next";
import { legal } from "@/constants/legal";
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

  const legalPages = legal.map((item) => ({
    url: `${baseUrl}${item.href}`,
    lastModified: new Date(),
    changeFrequency: item.changeFrequency,
    priority: item.priority,
  }));

  return [...pages, ...legalPages];
}
