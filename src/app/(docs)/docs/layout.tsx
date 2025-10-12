import type { PropsWithChildren } from "react";
import { AppSidebar } from "@/components/layout/sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

export default function DocsLayout({ children }: Readonly<PropsWithChildren>) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <main className="container flex flex-1 flex-col gap-2 py-12 md:py-20">
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
