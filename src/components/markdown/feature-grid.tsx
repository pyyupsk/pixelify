import { Icon } from "@iconify/react";
import type { PropsWithChildren } from "react";

export function FeatureGrid({ children }: Readonly<PropsWithChildren>) {
  return (
    <div className="not-prose my-6 grid gap-4 sm:grid-cols-2">{children}</div>
  );
}

export function Feature({
  title,
  icon,
  children,
}: Readonly<PropsWithChildren<{ title: string; icon?: string }>>) {
  return (
    <div className="space-y-4 border bg-card p-6">
      {icon && (
        <div className="flex size-12 items-center justify-center bg-primary/10">
          <Icon icon={icon} width={24} height={24} className="text-primary" />
        </div>
      )}
      <h3 className="font-semibold text-xl">{title}</h3>
      <p className="text-muted-foreground">{children}</p>
    </div>
  );
}
