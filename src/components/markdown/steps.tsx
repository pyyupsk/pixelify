import type { PropsWithChildren } from "react";

export function Steps({ children }: Readonly<PropsWithChildren>) {
  return <div className="my-6 space-y-4 [counter-reset:step]">{children}</div>;
}

export function Step({
  title,
  children,
}: Readonly<PropsWithChildren<{ title: string }>>) {
  return (
    <div className="relative flex gap-6 [counter-increment:step] before:absolute before:top-[2.625rem] before:left-[1.125rem] before:h-full before:w-px before:bg-border after:absolute after:top-0 after:left-0 after:flex after:h-9 after:w-9 after:items-center after:justify-center after:rounded-full after:border after:bg-background after:font-bold after:text-sm after:content-[counter(step)] last:pb-0 last:before:hidden">
      <div className="flex-1 pt-1 pl-12">
        <h3 className="font-semibold text-xl">{title}</h3>
        {children}
      </div>
    </div>
  );
}
