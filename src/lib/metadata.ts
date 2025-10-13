import type { Metadata } from "next";
import type { TemplateString } from "next/dist/lib/metadata/types/metadata-types";
import { getSiteUrl } from "@/env";

type MetadataOptions = {
  additionalMetadata?: Partial<Metadata>;
  description?: string;
  image?: string;
  title: string | TemplateString;
  canonicalPath?: string;
  keywords?: string[];
  publishedTime?: string;
  modifiedTime?: string;
  authors?: string[];
  type?: "website" | "writing";
};

type ImageDimensions = {
  width: number;
  height: number;
};

const DEFAULT_IMAGE_DIMENSIONS: ImageDimensions = {
  width: 1200,
  height: 630,
};

export function commonMetadata({
  additionalMetadata = {},
  description = "Transform your images into stunning pixel art instantly. Fast, simple, and beautifully crafted for creators.",
  image,
  title,
  canonicalPath = "",
  keywords = [],
  publishedTime,
  modifiedTime,
  authors = ["Pongsakorn Thipayanate"],
  type = "website",
}: MetadataOptions): Metadata {
  const titleText =
    typeof title === "string"
      ? title
      : "Pixelify - Transform Images to Pixel Art";

  const siteUrl = getSiteUrl();
  const canonical = canonicalPath ? `${siteUrl}${canonicalPath}` : siteUrl;

  const baseMetadata: Metadata = {
    title,
    description: description,
    keywords: [
      ...keywords,
      "pixel art",
      "pixel art converter",
      "image to pixel art",
      "retro art",
      "8-bit art",
      "pixelate image",
      "dithering",
      "color quantization",
      "pyyupsk",
    ],
    authors: authors.map((name) => ({ name })),
    creator: "Pongsakorn Thipayanate (พงศกร ทิพยเนตร)",
    metadataBase: new URL(siteUrl),
    alternates: {
      canonical,
      languages: {
        "en-US": canonical,
      },
    },
    icons: {
      icon: [{ url: "/icon", type: "image/png", sizes: "32x32" }],
      apple: [{ url: "/apple-icon", type: "image/png", sizes: "180x180" }],
    },
    openGraph: {
      title:
        typeof title === "string"
          ? title
          : "Pixelify - Transform Images to Pixel Art",
      description: description,
      url: canonical,
      siteName: "Pixelify",
      locale: "en-US",
      type: type === "website" ? "website" : "article",
      ...(image
        ? {
            images: [
              {
                url: image,
                alt: description || titleText,
                type: "image/png",
                ...DEFAULT_IMAGE_DIMENSIONS,
              },
            ],
          }
        : {}),
      ...(type !== "website" && publishedTime
        ? {
            publishedTime,
            modifiedTime: modifiedTime || publishedTime,
            authors,
          }
        : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: titleText,
      description: description,
      site: "@pyyupsk",
      creator: "@pyyupsk",
      ...(image ? { images: [image] } : {}),
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };

  return {
    ...baseMetadata,
    ...additionalMetadata,
    openGraph: {
      ...baseMetadata.openGraph,
      ...additionalMetadata.openGraph,
    },
    twitter: {
      ...baseMetadata.twitter,
      ...additionalMetadata.twitter,
    },
    robots: additionalMetadata.robots || baseMetadata.robots,
  };
}
