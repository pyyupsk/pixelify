import type {
  Article,
  BreadcrumbList,
  SoftwareApplication,
  WebPage,
  WebSite,
  WithContext,
} from "schema-dts";
import { getSiteUrl } from "@/env";

export function createWebSiteJsonLd(): WithContext<WebSite> {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Pixelify",
    alternateName: ["Pixel Art Converter", "Pixelify Art"],
    url: getSiteUrl(),
    description:
      "Transform your images into stunning pixel art instantly. Fast, simple, and beautifully crafted for creators.",
    author: {
      "@type": "Person",
      name: "Pongsakorn Thipayanate",
      alternateName: ["พงศกร ทิพยเนตร", "pyyupsk"],
      url: getSiteUrl(),
    },
  };
}

export function createSoftwareApplicationJsonLd(): WithContext<SoftwareApplication> {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Pixelify",
    applicationCategory: "MultimediaApplication",
    operatingSystem: "Web Browser",
    description:
      "Free online pixel art converter that transforms your images into retro-style pixel art with customizable settings.",
    url: getSiteUrl(),
    screenshot: `${getSiteUrl()}/opengraph-image`,
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    featureList: [
      "Instant pixel art conversion",
      "Customizable pixel size",
      "Multiple color depth options (8, 16, 32, 256 colors)",
      "Dithering modes (None, Floyd-Steinberg, Ordered/Bayer)",
      "Brightness, contrast, and saturation adjustments",
      "PNG export",
      "REST API access",
      "Client-side processing for privacy",
    ],
    author: {
      "@type": "Person",
      name: "Pongsakorn Thipayanate",
      url: getSiteUrl(),
    },
  };
}

export function createWebPageJsonLd(
  title: string,
  description: string,
  url: string,
): WithContext<WebPage> {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: title,
    description,
    url,
    isPartOf: {
      "@type": "WebSite",
      name: "Pixelify",
      url: getSiteUrl(),
    },
    author: {
      "@type": "Person",
      name: "Pongsakorn Thipayanate",
      url: getSiteUrl(),
    },
  };
}

type ArticleJsonLdOptions = {
  title: string;
  description: string;
  url: string;
  datePublished: string;
  dateModified?: string;
  image?: string;
  tags?: string[];
  readingTime?: number;
  path?: string;
};

export function createArticleJsonLd({
  title,
  description,
  url,
  datePublished,
  dateModified,
  image,
  tags,
  readingTime,
  path,
}: ArticleJsonLdOptions): WithContext<Article> {
  const siteUrl = getSiteUrl();
  const ogImageUrl = image || `${siteUrl}${path}/opengraph-image`;

  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    url,
    datePublished,
    dateModified: dateModified || datePublished,
    author: {
      "@type": "Person",
      name: "Pongsakorn Thipayanate",
      url: getSiteUrl(),
    },
    publisher: {
      "@type": "Organization",
      name: "Pixelify",
      url: getSiteUrl(),
      logo: {
        "@type": "ImageObject",
        url: `${siteUrl}/icon`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
    image: {
      "@type": "ImageObject",
      url: ogImageUrl,
      width: "1200",
      height: "630",
    },
    ...(tags &&
      tags.length > 0 && {
        keywords: tags.join(", "),
        about: tags.map((tag) => ({
          "@type": "Thing",
          name: tag,
        })),
      }),
    ...(readingTime && {
      timeRequired: `PT${readingTime}M`,
    }),
    inLanguage: "en-US",
    isAccessibleForFree: true,
  };
}

type BreadcrumbItem = {
  name: string;
  url?: string;
};

export function createBreadcrumbJsonLd(
  items: BreadcrumbItem[],
): WithContext<BreadcrumbList> {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      ...(item.url && {
        item: {
          "@id": item.url.startsWith("http")
            ? item.url
            : `${getSiteUrl()}${item.url}`,
          name: item.name,
        },
      }),
    })),
  };
}
