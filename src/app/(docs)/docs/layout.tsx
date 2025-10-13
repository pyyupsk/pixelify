import Link from "next/link";
import type { PropsWithChildren } from "react";
import { Logo } from "@/components/brand/logo";
import { AppSidebar } from "@/components/layout/sidebar";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

export default function DocsLayout({ children }: Readonly<PropsWithChildren>) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 md:hidden">
          <div className="container relative flex h-16 items-center justify-between">
            <Link
              href="/"
              className="flex items-center gap-2 font-bold text-xl"
              aria-label="Pixelify"
            >
              <Logo size={32} />
              Pixelify
            </Link>
            <SidebarTrigger />
          </div>
        </header>
        <main className="container flex max-w-6xl flex-1 flex-col gap-2 py-12 md:px-8 md:py-20">
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
