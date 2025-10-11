import type { PropsWithChildren } from "react";

export default function PagesLayout({ children }: Readonly<PropsWithChildren>) {
  return <main className="flex-1">{children}</main>;
}
