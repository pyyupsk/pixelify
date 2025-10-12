import createMDX from "@next/mdx";
import type { NextConfig } from "next";

const withMDX = createMDX({
  extension: /\.(md|mdx)$/,
  options: {
    rehypePlugins: [
      [
        "@shikijs/rehype",
        {
          themes: {
            light: "github-light",
            dark: "github-dark",
          },
        },
      ],
    ],
  },
});

const nextConfig: NextConfig = {
  pageExtensions: ["ts", "tsx", "md", "mdx"],
  images: {
    localPatterns: [
      {
        pathname: "/api/pixelart/**",
      },
    ],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
    ],
  },
};

export default withMDX(nextConfig);
