import Link from "next/link";
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
} from "@/components/ui/sidebar";

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
  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <Link
          href="/"
          className="flex items-center gap-2 font-bold text-xl"
          aria-label="Pixelify"
        >
          <Logo size={32} />
          Pixelify
        </Link>
        <SidebarTrigger className="-right-[44.9px] absolute top-4" />
      </SidebarHeader>
      <SidebarContent>
        {sidebars.map((sidebar) => (
          <SidebarGroup key={sidebar.title}>
            <SidebarGroupLabel>{sidebar.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {sidebar.items.map((subItem) => (
                  <SidebarMenuItem key={subItem.title}>
                    <SidebarMenuButton asChild>
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
