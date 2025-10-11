import { Icon } from "@iconify/react";
import Link from "next/link";
import { Logo } from "@/components/brand/logo";
import { navigates } from "@/constants/navigates";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t bg-background">
      <div className="container py-12 md:py-16">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand Section */}
          <div className="space-y-4">
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
          </div>

          {/* Navigation */}
          <div className="space-y-4">
            <h3 className="font-semibold text-sm">Navigation</h3>
            <nav className="flex flex-col gap-3">
              {navigates.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex items-center gap-2 text-muted-foreground text-sm transition-colors hover:text-foreground"
                  aria-label={item.label}
                >
                  <Icon icon={item.icon} width={16} height={16} />
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Resources */}
          <div className="space-y-4">
            <h3 className="font-semibold text-sm">Resources</h3>
            <nav className="flex flex-col gap-3">
              <Link
                href="/docs"
                className="text-muted-foreground text-sm transition-colors hover:text-foreground"
                aria-label="Documentation"
              >
                Documentation
              </Link>
              <Link
                href="/faq"
                className="text-muted-foreground text-sm transition-colors hover:text-foreground"
                aria-label="FAQ"
              >
                FAQ
              </Link>
              <Link
                href="/blog"
                className="text-muted-foreground text-sm transition-colors hover:text-foreground"
                aria-label="Blog"
              >
                Blog
              </Link>
              <Link
                href="/api"
                className="text-muted-foreground text-sm transition-colors hover:text-foreground"
                aria-label="API"
              >
                API
              </Link>
            </nav>
          </div>

          {/* Legal */}
          <div className="space-y-4">
            <h3 className="font-semibold text-sm">Legal</h3>
            <nav className="flex flex-col gap-3">
              <Link
                href="/privacy"
                className="text-muted-foreground text-sm transition-colors hover:text-foreground"
                aria-label="Privacy Policy"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                className="text-muted-foreground text-sm transition-colors hover:text-foreground"
                aria-label="Terms of Service"
              >
                Terms of Service
              </Link>
              <Link
                href="/license"
                className="text-muted-foreground text-sm transition-colors hover:text-foreground"
                aria-label="License"
              >
                License
              </Link>
              <Link
                href="/contact"
                className="text-muted-foreground text-sm transition-colors hover:text-foreground"
                aria-label="Contact"
              >
                Contact
              </Link>
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
            <Icon
              icon="pixelarticons:heart"
              width={16}
              height={16}
              className="text-red-500"
            />
            for pixel art lovers
          </p>
        </div>
      </div>
    </footer>
  );
}
