import { Icon } from "@iconify/react";
import Link from "next/link";
import { Logo } from "@/components/brand/logo";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { navigates } from "@/constants/navigates";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container relative flex h-16 items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 font-bold text-xl"
          aria-label="Pixelify"
        >
          <Logo size={32} />
          Pixelify
        </Link>

        {/* Navigation */}
        <nav className="-translate-x-1/2 absolute left-1/2 hidden items-center gap-6 md:flex">
          {navigates.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-muted-foreground text-sm transition-colors hover:text-foreground"
              aria-label={item.label}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* CTA Button */}
        <div className="flex items-center gap-4">
          <Button asChild className="hidden sm:flex">
            <Link href="/create" aria-label="Get Started">
              <Icon
                icon="pixelarticons:sparkles"
                width={16}
                height={16}
                className="mr-2"
              />
              Get Started
            </Link>
          </Button>

          {/* Mobile Menu */}
          <Sheet>
            <SheetTrigger asChild>
              <div className="md:hidden">
                <Icon icon="pixelarticons:menu" width={24} height={24} />
                <span className="sr-only">Toggle menu</span>
              </div>
            </SheetTrigger>
            <SheetContent side="right">
              <SheetHeader className="border-b">
                <SheetTitle className="flex items-center gap-2">
                  <Logo size={28} />
                  Pixelify
                </SheetTitle>
                <SheetDescription>
                  Transform your images into beautiful pixel art
                </SheetDescription>
              </SheetHeader>
              <nav className="flex flex-col gap-4">
                {navigates.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                    aria-label={item.label}
                  >
                    <Icon icon={item.icon} width={20} height={20} />
                    {item.label}
                  </Link>
                ))}
              </nav>
              <div className="mt-4 flex justify-center px-3">
                <Button asChild className="w-full">
                  <Link href="/create" aria-label="Get Started">
                    <Icon
                      icon="pixelarticons:zap"
                      width={16}
                      height={16}
                      className="mr-2"
                    />
                    Get Started
                  </Link>
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
