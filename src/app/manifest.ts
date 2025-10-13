import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Pixelify - Transform Your Photos Into Pixel Art",
    short_name: "Pixelify",
    description:
      "Upload any image and watch it transform into stunning pixel art. Fast, simple, and beautifully crafted for creators.",
    start_url: "/",
    display: "standalone",
    background_color: "#121212",
    theme_color: "#121212",
    orientation: "portrait-primary",
    icons: [
      {
        src: "/icon?size=192",
        sizes: "192x192",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/icon?size=512",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/icon?size=192",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icon?size=512",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
    ],
    categories: [
      "graphics",
      "photo",
      "utilities",
      "productivity",
      "entertainment",
    ],
    shortcuts: [
      {
        name: "Create Pixel Art",
        short_name: "Create",
        description: "Upload and transform your image into pixel art",
        url: "/create",
        icons: [
          {
            src: "/icon?size=192",
            sizes: "192x192",
            type: "image/png",
          },
        ],
      },
      {
        name: "View Examples",
        short_name: "Examples",
        description: "Explore pixel art examples and inspiration",
        url: "/examples",
        icons: [
          {
            src: "/icon?size=192",
            sizes: "192x192",
            type: "image/png",
          },
        ],
      },
      {
        name: "Documentation",
        short_name: "Docs",
        description: "Learn how to use Pixelify",
        url: "/docs",
        icons: [
          {
            src: "/icon?size=192",
            sizes: "192x192",
            type: "image/png",
          },
        ],
      },
    ],
    screenshots: [
      {
        src: "/opengraph-image",
        sizes: "1200x630",
        type: "image/png",
        form_factor: "wide",
      },
    ],
  };
}
