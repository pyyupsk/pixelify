import type { PropsWithChildren } from "react";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { JotaiProvider } from "@/components/providers/jotai";

export default function PagesLayout({ children }: Readonly<PropsWithChildren>) {
  return (
    <JotaiProvider>
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </JotaiProvider>
  );
}
