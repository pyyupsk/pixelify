import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

const env = createEnv({
  server: {
    NODE_ENV: z
      .enum(["development", "production", "test"])
      .default("development"),
    VERCEL_URL: z.string().optional(),
  },
  client: {
    NEXT_PUBLIC_SITE_URL: z.url().optional(),
  },
  runtimeEnv: {
    NODE_ENV: process.env.NODE_ENV,
    VERCEL_URL: process.env.VERCEL_URL,
    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
  },
  skipValidation: !!process.env.SKIP_ENV_VALIDATION,
  emptyStringAsUndefined: true,
});

export function getSiteUrl() {
  if (env.NEXT_PUBLIC_SITE_URL) {
    return env.NEXT_PUBLIC_SITE_URL;
  }

  if (env.VERCEL_URL) {
    const cleanUrl = env.VERCEL_URL.replace(/^https?:\/\//, "");
    if (!/^[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/.test(cleanUrl)) {
      console.error("Invalid VERCEL_URL format");
      return "https://pixelify.fasu.dev";
    }
    return `https://${cleanUrl}`;
  }

  return env.NODE_ENV === "production"
    ? "https://pixelify.fasu.dev"
    : "http://localhost:3000";
}
