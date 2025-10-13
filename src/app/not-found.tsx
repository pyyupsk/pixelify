import { Icon } from "@iconify/react";
import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "404 - Page Not Found",
  description: "The page you're looking for doesn't exist or has been moved.",
};

export default function NotFound() {
  return (
    <section className="container grid min-h-screen place-items-center space-y-8 py-12 md:py-20">
      {/* Page Header */}
      <div className="space-y-4 text-center">
        <div className="flex justify-center">
          <Icon
            icon="pixelarticons:close"
            width={80}
            height={80}
            className="text-primary"
          />
        </div>
        <h1 className="font-bold text-6xl text-primary tracking-tight md:text-8xl lg:text-9xl">
          404
        </h1>
        <div className="space-y-2">
          <h2 className="font-bold text-3xl tracking-tight md:text-4xl lg:text-5xl">
            Page Not Found
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            Oops! The page you're looking for doesn't exist or has been moved.
            Let's get you back on track.
          </p>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col items-center gap-4 pt-4 sm:flex-row sm:justify-center">
          <Button asChild>
            <Link href="/" aria-label="Go to Home">
              <Icon icon="pixelarticons:home" width={16} height={16} />
              Go to Home
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/create" aria-label="Start Creating">
              <Icon icon="pixelarticons:image" width={16} height={16} />
              Start Creating
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
