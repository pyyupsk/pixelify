import { z } from "zod";

/**
 * Color depth enum
 */
export const colorDepthEnum = z.enum(["8", "16", "32", "256"]);

/**
 * Dithering mode enum
 */
export const ditheringEnum = z.enum(["none", "floyd-steinberg", "ordered"]);

/**
 * Pixel art options schema for query parameters (GET request)
 */
export const pixelArtQuerySchema = z.object({
  url: z.url({ message: "Invalid image URL" }),
  pixelSize: z
    .string()
    .optional()
    .default("8")
    .transform((val) => Number.parseInt(val, 10))
    .pipe(
      z
        .number()
        .int()
        .min(1, { message: "pixelSize must be at least 1" })
        .max(100, { message: "pixelSize must be at most 100" }),
    ),
  colorDepth: colorDepthEnum
    .optional()
    .default("32")
    .transform((val) => Number.parseInt(val, 10) as 8 | 16 | 32 | 256),
  dithering: ditheringEnum.optional().default("none"),
  brightness: z
    .string()
    .optional()
    .default("0")
    .transform((val) => Number.parseInt(val, 10))
    .pipe(
      z
        .number()
        .int()
        .min(-100, { message: "brightness must be at least -100" })
        .max(100, { message: "brightness must be at most 100" }),
    ),
  contrast: z
    .string()
    .optional()
    .default("0")
    .transform((val) => Number.parseInt(val, 10))
    .pipe(
      z
        .number()
        .int()
        .min(-100, { message: "contrast must be at least -100" })
        .max(100, { message: "contrast must be at most 100" }),
    ),
  saturation: z
    .string()
    .optional()
    .default("0")
    .transform((val) => Number.parseInt(val, 10))
    .pipe(
      z
        .number()
        .int()
        .min(-100, { message: "saturation must be at least -100" })
        .max(100, { message: "saturation must be at most 100" }),
    ),
  maxSize: z
    .string()
    .optional()
    .default("800")
    .transform((val) => Number.parseInt(val, 10))
    .pipe(
      z
        .number()
        .int()
        .min(1, { message: "maxSize must be at least 1" })
        .max(4096, { message: "maxSize must be at most 4096" }),
    ),
});

/**
 * Pixel art options schema for request body (POST request)
 */
export const pixelArtOptionsSchema = z.object({
  pixelSize: z
    .number()
    .int()
    .min(1, { message: "pixelSize must be at least 1" })
    .max(100, { message: "pixelSize must be at most 100" })
    .optional()
    .default(8),
  colorDepth: z
    .union([z.literal(8), z.literal(16), z.literal(32), z.literal(256)])
    .optional()
    .default(32),
  dithering: z
    .enum(["none", "floyd-steinberg", "ordered"])
    .optional()
    .default("none"),
  brightness: z
    .number()
    .int()
    .min(-100, { message: "brightness must be at least -100" })
    .max(100, { message: "brightness must be at most 100" })
    .optional()
    .default(0),
  contrast: z
    .number()
    .int()
    .min(-100, { message: "contrast must be at least -100" })
    .max(100, { message: "contrast must be at most 100" })
    .optional()
    .default(0),
  saturation: z
    .number()
    .int()
    .min(-100, { message: "saturation must be at least -100" })
    .max(100, { message: "saturation must be at most 100" })
    .optional()
    .default(0),
  maxSize: z
    .number()
    .int()
    .min(1, { message: "maxSize must be at least 1" })
    .max(4096, { message: "maxSize must be at most 4096" })
    .optional()
    .default(800),
});

/**
 * POST request body schema
 */
export const postRequestSchema = z.object({
  image: z
    .string()
    .startsWith("data:image/", {
      message: "Image must be a base64 data URL starting with 'data:image/'",
    })
    .refine(
      (val) => {
        const base64Data = val.split(",")[1];
        return base64Data && base64Data.length > 0;
      },
      { message: "Invalid base64 image data" },
    ),
  options: pixelArtOptionsSchema.optional(),
});

// Type exports
export type PixelArtQuery = z.infer<typeof pixelArtQuerySchema>;
export type PixelArtOptions = z.infer<typeof pixelArtOptionsSchema>;
export type PostRequest = z.infer<typeof postRequestSchema>;

export type ColorDepth = 8 | 16 | 32 | 256;
export type DitheringMode = "none" | "floyd-steinberg" | "ordered";
