import type { ComponentType, PropsWithChildren, SVGProps } from "react";

export function FeatureGrid({ children }: Readonly<PropsWithChildren>) {
  return <div className="my-6 grid gap-4 lg:grid-cols-2">{children}</div>;
}

export function Feature({
  title,
  icon: IconComponent,
  children,
}: Readonly<
  PropsWithChildren<{
    title: string;
    icon?: ComponentType<SVGProps<SVGSVGElement>>;
  }>
>) {
  return (
    <div className="space-y-4 border bg-card p-6">
      {IconComponent && (
        <div className="flex size-12 items-center justify-center bg-primary/10">
          <IconComponent width={24} height={24} className="text-primary" />
        </div>
      )}
      <h3 className="font-semibold text-xl">{title}</h3>
      <div className="text-muted-foreground">{children}</div>
    </div>
  );
}
