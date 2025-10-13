import Link from "next/link";
import { Logo } from "@/components/brand/logo";
import { Heart } from "@/components/icons";
import { contacts } from "@/constants/contats";
import { legal } from "@/constants/legal";
import { navigates } from "@/constants/navigates";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t bg-background">
      <div className="container py-12 md:py-16">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-3">
          {/* Brand Section */}
          <div className="col-span-2 space-y-4 md:col-span-1">
            <Link
              href="/"
              className="flex items-center gap-2 font-bold text-xl"
              aria-label="Pixelify"
            >
              <Logo size={32} />
              Pixelify
            </Link>
            <p className="text-muted-foreground text-sm">
              Transform your images into beautiful pixel art. Fast, simple, and
              free forever.
            </p>

            <div className="flex gap-4">
              {contacts.map((item) => {
                const IconComponent = item.icon;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="text-foreground transition-colors hover:text-foreground/80"
                    aria-label={item.label}
                  >
                    <IconComponent width={24} height={24} />
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Navigation */}
          <div className="space-y-4">
            <h3 className="font-semibold text-sm">Navigation</h3>
            <nav className="flex flex-col gap-3">
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
          </div>

          {/* Legal */}
          <div className="space-y-4">
            <h3 className="font-semibold text-sm">Legal</h3>
            <nav className="flex flex-col gap-3">
              {legal.map((item) => (
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
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t pt-8 text-muted-foreground text-sm md:flex-row">
          <p>
            <span className="font-mono">©</span> {currentYear} Pixelify. All
            rights reserved.
          </p>
          <p className="flex items-center gap-2">
            Made with
            <Heart width={16} height={16} className="text-red-500" />
            for pixel art lovers
          </p>
        </div>
      </div>
    </footer>
  );
}
