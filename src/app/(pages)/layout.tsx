import type { PropsWithChildren } from "react";
import { Header } from "@/components/layout/header";

export default function PagesLayout({ children }: Readonly<PropsWithChildren>) {
  return (
    <>
      <Header />
      <main className="flex-1">{children}</main>
    </>
  );
}
