import { Icon } from "@iconify/react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { pills } from "@/constants/pills";

export function Hero() {
  return (
    <section className="container py-20 md:py-32">
      <div className="flex flex-col items-center space-y-8 text-center">
        {/* Badge */}
        <Badge variant="outline">
          <span className="relative flex size-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
            <span className="relative inline-flex size-2 rounded-full bg-primary" />
          </span>
          <span className="text-muted-foreground text-sm">
            Transform images instantly
          </span>
        </Badge>

        {/* Heading */}
        <div className="max-w-4xl space-y-4">
          <h1 className="font-bold text-4xl tracking-tight md:text-6xl lg:text-7xl">
            Turn Your Photos Into{" "}
            <span className="animate-gradient bg-gradient-to-r from-primary via-primary/70 to-primary bg-clip-text text-transparent">
              Pixel Art
            </span>
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground md:text-xl">
            Upload any image and watch it transform into stunning pixel art.
            Fast, simple, and beautifully crafted for creators.
          </p>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col gap-4 pt-4 sm:flex-row">
          <Button asChild>
            <Link href="/create" aria-label="Start Creating">
              Start Creating
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/examples" aria-label="View Examples">
              View Examples
            </Link>
          </Button>
        </div>

        {/* Feature Pills */}
        <div className="flex flex-wrap justify-center gap-3 pt-8">
          {pills.map((pill) => (
            <div
              key={pill.label}
              className="flex items-center gap-2 px-3 text-sm"
            >
              <Icon icon={pill.icon} width={16} height={16} />
              {pill.label}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
