import type { MetadataRoute } from "next";

type Sitemap = MetadataRoute.Sitemap[0];

type NavigationItem = {
  href: string;
  label: string;
  icon: string;
  match: (pathname: string) => boolean;
  changeFrequency: Sitemap["changeFrequency"];
  priority: Sitemap["priority"];
};

export const navigates: NavigationItem[] = [
  {
    href: "/",
    label: "Home",
    icon: "pixelarticons:home",
    match: (pathname: string) => pathname === "/",
    changeFrequency: "monthly",
    priority: 1,
  },
  {
    href: "/create",
    label: "Create",
    icon: "pixelarticons:gamepad",
    match: (pathname: string) => pathname === "/create",
    changeFrequency: "monthly",
    priority: 0.9,
  },
  {
    href: "/examples",
    label: "Examples",
    icon: "pixelarticons:image-gallery",
    match: (pathname: string) => pathname === "/examples",
    changeFrequency: "monthly",
    priority: 0.9,
  },
  {
    href: "/docs",
    label: "Documentation",
    icon: "pixelarticons:book",
    match: (pathname: string) => pathname.startsWith("/docs"),
    changeFrequency: "daily",
    priority: 0.7,
  },
];
