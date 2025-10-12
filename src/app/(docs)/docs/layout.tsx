import type { PropsWithChildren } from "react";
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
        <div className="relative">
          <SidebarTrigger className="absolute top-4 left-4" />
        </div>
        <main className="flex flex-1 flex-col gap-3 px-6 py-12">
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
