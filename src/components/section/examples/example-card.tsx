"use client";

import { Icon } from "@iconify/react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Props = {
  title: string;
  description: string;
  category: string;
  settings: {
    pixelSize: number;
    colorDepth: number;
    dithering: string;
  };
  originalUrl: string;
};

export function ExampleCard({
  title,
  description,
  category,
  settings,
  originalUrl,
}: Readonly<Props>) {
  const [isHovered, setIsHovered] = useState(false);
  const [imageError, setImageError] = useState(false);

  const pixelArtUrl = `/api/pixelart?url=${encodeURIComponent(originalUrl)}&pixelSize=${settings.pixelSize}&colorDepth=${settings.colorDepth}&dithering=${settings.dithering}`;
  const createPageUrl = `/create?pixelSize=${settings.pixelSize}&colorDepth=${settings.colorDepth}&dithering=${settings.dithering}`;

  return (
    <div className="group space-y-4 border bg-card">
      <button
        type="button"
        className="relative aspect-square w-full overflow-hidden bg-muted/20"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => setIsHovered(!isHovered)}
        aria-label={`Toggle between original and pixel art version of ${title}`}
      >
        {!imageError ? (
          <>
            {/* Original Image */}
            <Image
              src={`${originalUrl}?w=600&h=600&fit=crop`}
              alt={title}
              fill
              className={cn(
                "object-cover transition-opacity duration-300",
                isHovered ? "opacity-0" : "opacity-100",
              )}
              onError={() => setImageError(true)}
              loading="lazy"
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
            {/* Pixelated Image */}
            <Image
              src={pixelArtUrl}
              alt={`${title} - Pixel Art`}
              fill
              className={cn(
                "object-cover transition-opacity duration-300",
                isHovered ? "opacity-100" : "opacity-0",
              )}
              style={{ imageRendering: "pixelated" }}
              loading="lazy"
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
              unoptimized
            />
            {/* Hover Indicator */}
            <div
              className={cn(
                "absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-3 transition-opacity duration-300",
                isHovered ? "opacity-100" : "opacity-0",
              )}
            >
              <p className="text-center text-white text-xs">
                Pixel Art Version
              </p>
            </div>
          </>
        ) : (
          <div className="flex size-full items-center justify-center">
            <Icon
              icon="pixelarticons:image-x"
              width={48}
              height={48}
              className="text-muted-foreground"
            />
          </div>
        )}
      </button>

      {/* Content */}
      <div className="space-y-3 px-4 pb-4">
        <div className="flex items-start justify-between gap-2">
          <div className="space-y-1">
            <h3 className="font-semibold text-lg">{title}</h3>
            <p className="text-muted-foreground text-sm">{description}</p>
          </div>
          <Badge variant="outline" className="shrink-0 capitalize">
            {category}
          </Badge>
        </div>

        <div className="flex flex-wrap gap-2 text-xs">
          <div className="flex items-center gap-1 bg-muted/50 px-2 py-1">
            <Icon icon="pixelarticons:grid" width={12} height={12} />
            <span>{settings.pixelSize}px</span>
          </div>
          <div className="flex items-center gap-1 bg-muted/50 px-2 py-1">
            <Icon icon="pixelarticons:paintbrush" width={12} height={12} />
            <span>{settings.colorDepth}-bit</span>
          </div>
          <div className="flex items-center gap-1 bg-muted/50 px-2 py-1">
            <Icon icon="pixelarticons:sliders" width={12} height={12} />
            <span className="capitalize">
              {settings.dithering === "floyd-steinberg"
                ? "F-S"
                : settings.dithering}
            </span>
          </div>
        </div>

        <Button size="sm" className="w-full" asChild>
          <Link href={createPageUrl} aria-label={`Try settings from ${title}`}>
            <Icon icon="pixelarticons:copy" width={14} height={14} />
            Try These Settings
          </Link>
        </Button>
      </div>
    </div>
  );
}
