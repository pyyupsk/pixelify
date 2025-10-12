import Link from "next/link";
import type { PropsWithChildren } from "react";

export function CardGrid({ children }: Readonly<PropsWithChildren>) {
  return (
    <div className="not-prose my-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {children}
    </div>
  );
}

export function Card({
  title,
  href,
  children,
}: Readonly<PropsWithChildren<{ title: string; href: string }>>) {
  return (
    <Link
      href={href}
      className="group block rounded-lg border bg-card p-6 transition-all hover:border-primary/50 hover:shadow-md"
    >
      <h3 className="mb-2 font-semibold text-base group-hover:text-primary">
        {title}
      </h3>
      <div className="text-muted-foreground text-sm">{children}</div>
    </Link>
  );
}
