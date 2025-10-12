import {
  applyColorAdjustmentsToData,
  applyColorQuantizationToData,
} from "./core";
import type { DitheringMode } from "./schema";

/**
 * Client-side pixel art utilities
 */

/**
 * Apply color adjustments (brightness, contrast, saturation) to image data
 */
export function applyColorAdjustments(
  imageData: ImageData,
  brightness: number,
  contrast: number,
  saturation: number,
): void {
  applyColorAdjustmentsToData(imageData.data, brightness, contrast, saturation);
}

/**
 * Apply color quantization and dithering to image data
 */
export function applyColorQuantization(
  imageData: ImageData,
  colorDepth: number,
  dithering: DitheringMode,
  scaledWidth: number,
  scaledHeight: number,
): void {
  applyColorQuantizationToData(
    imageData.data,
    colorDepth,
    dithering,
    scaledWidth,
    scaledHeight,
  );
}

/**
 * Calculate scaled dimensions for canvas
 */
export function calculateScaledDimensions(
  sourceWidth: number,
  sourceHeight: number,
  maxSize = 800,
): { width: number; height: number; scale: number } {
  const scale = Math.min(maxSize / sourceWidth, maxSize / sourceHeight, 1);
  const width = Math.floor(sourceWidth * scale);
  const height = Math.floor(sourceHeight * scale);

  return { width, height, scale };
}

/**
 * Create and configure a temporary canvas for image processing
 */
export function createTempCanvas(
  width: number,
  height: number,
): { canvas: HTMLCanvasElement; ctx: CanvasRenderingContext2D } | null {
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;

  const ctx = canvas.getContext("2d", { willReadFrequently: true });
  if (!ctx) return null;

  ctx.imageSmoothingEnabled = false;
  return { canvas, ctx };
}
