import type { MetadataRoute } from "next";

type Sitemap = MetadataRoute.Sitemap[0];

type LegalItem = {
  href: string;
  label: string;
  changeFrequency: Sitemap["changeFrequency"];
  priority: Sitemap["priority"];
};

export const legal: LegalItem[] = [
  {
    href: "/privacy",
    label: "Privacy Policy",
    changeFrequency: "monthly",
    priority: 0.5,
  },
  {
    href: "/terms",
    label: "Terms of Service",
    changeFrequency: "monthly",
    priority: 0.5,
  },
  {
    href: "/license",
    label: "License",
    changeFrequency: "yearly",
    priority: 0.3,
  },
  {
    href: "/contact",
    label: "Contact",
    changeFrequency: "monthly",
    priority: 0.6,
  },
];
