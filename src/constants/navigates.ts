import type { MetadataRoute } from "next";
import type { ComponentType, SVGProps } from "react";
import { Book, Gamepad, Home, ImageGallery } from "@/components/icons";

type Sitemap = MetadataRoute.Sitemap[0];

type NavigationItem = {
  href: string;
  label: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  match: (pathname: string) => boolean;
  changeFrequency: Sitemap["changeFrequency"];
  priority: Sitemap["priority"];
};

export const navigates: NavigationItem[] = [
  {
    href: "/",
    label: "Home",
    icon: Home,
    match: (pathname: string) => pathname === "/",
    changeFrequency: "monthly",
    priority: 1,
  },
  {
    href: "/create",
    label: "Create",
    icon: Gamepad,
    match: (pathname: string) => pathname === "/create",
    changeFrequency: "monthly",
    priority: 0.9,
  },
  {
    href: "/examples",
    label: "Examples",
    icon: ImageGallery,
    match: (pathname: string) => pathname === "/examples",
    changeFrequency: "monthly",
    priority: 0.9,
  },
  {
    href: "/docs",
    label: "Documentation",
    icon: Book,
    match: (pathname: string) => pathname.startsWith("/docs"),
    changeFrequency: "daily",
    priority: 0.7,
  },
];
