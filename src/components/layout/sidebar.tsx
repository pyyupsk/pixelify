"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ComponentProps } from "react";
import { Logo } from "@/components/brand/logo";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";

const sidebars = [
  {
    title: "Getting Started",
    url: "#",
    items: [
      {
        title: "Introduction",
        url: "/docs",
      },
      {
        title: "Quick Start",
        url: "/docs/quick-start",
      },
    ],
  },
  {
    title: "Features",
    url: "#",
    items: [
      {
        title: "Pixel Art Conversion",
        url: "/docs/features/pixel-art",
      },
      {
        title: "Color Adjustments",
        url: "/docs/features/color-adjustments",
      },
      {
        title: "Dithering Effects",
        url: "/docs/features/dithering",
      },
      {
        title: "Export Options",
        url: "/docs/features/export",
      },
    ],
  },
  {
    title: "API Reference",
    url: "#",
    items: [
      {
        title: "Overview",
        url: "/docs/api/overview",
      },
      {
        title: "POST /api/pixelart",
        url: "/docs/api/post",
      },
      {
        title: "GET /api/pixelart",
        url: "/docs/api/get",
      },
      {
        title: "Parameters",
        url: "/docs/api/parameters",
      },
      {
        title: "Examples",
        url: "/docs/api/examples",
      },
    ],
  },
  {
    title: "Advanced",
    url: "#",
    items: [
      {
        title: "Client-Side Processing",
        url: "/docs/advanced/client-side",
      },
      {
        title: "Server-Side Processing",
        url: "/docs/advanced/server-side",
      },
      {
        title: "Performance",
        url: "/docs/advanced/performance",
      },
      {
        title: "Best Practices",
        url: "/docs/advanced/best-practices",
      },
    ],
  },
];

export function AppSidebar({ ...props }: ComponentProps<typeof Sidebar>) {
  const pathname = usePathname();
  const { open } = useSidebar();

  return (
    <Sidebar {...props}>
      <SidebarHeader className="px-4">
        <Link
          href="/"
          className="flex items-center gap-2 font-bold text-xl"
          aria-label="Pixelify"
        >
          <Logo size={32} />
          Pixelify
        </Link>
        <SidebarTrigger
          className={cn(
            "absolute top-4 hidden transition-all md:block",
            open ? "right-4" : "-right-[44.9px]",
          )}
        />
      </SidebarHeader>
      <SidebarContent className="px-2">
        {sidebars.map((sidebar) => (
          <SidebarGroup key={sidebar.title}>
            <SidebarGroupLabel>{sidebar.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {sidebar.items.map((subItem) => (
                  <SidebarMenuItem key={subItem.title}>
                    <SidebarMenuButton
                      variant={pathname === subItem.url ? "active" : "default"}
                      asChild
                    >
                      <Link href={subItem.url}>{subItem.title}</Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
