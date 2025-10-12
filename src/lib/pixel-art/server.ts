import { createCanvas, loadImage } from "canvas";
import {
  applyColorAdjustmentsToData,
  applyColorQuantizationToData,
} from "./core";
import type { PixelArtOptions } from "./schema";

/**
 * Server-side pixel art processing using Node Canvas
 */

/**
 * Process an image into pixel art
 */
export async function processPixelArt(
  imageSource: string | Buffer,
  options?: Partial<PixelArtOptions>,
): Promise<Buffer> {
  const {
    pixelSize = 8,
    colorDepth = 32,
    dithering = "none",
    brightness = 0,
    contrast = 0,
    saturation = 0,
    maxSize = 800,
  } = options || {};

  // Load the image
  const image = await loadImage(imageSource);

  // Calculate scaled dimensions
  const scale = Math.min(maxSize / image.width, maxSize / image.height, 1);
  const width = Math.floor(image.width * scale);
  const height = Math.floor(image.height * scale);

  // Calculate pixelated dimensions
  const scaledWidth = Math.floor(width / pixelSize);
  const scaledHeight = Math.floor(height / pixelSize);

  // Create temporary canvas for processing
  const tempCanvas = createCanvas(scaledWidth, scaledHeight);
  const tempCtx = tempCanvas.getContext("2d");

  // Draw image scaled down
  tempCtx.imageSmoothingEnabled = false;
  tempCtx.drawImage(image, 0, 0, scaledWidth, scaledHeight);

  // Get image data for processing
  const imageData = tempCtx.getImageData(0, 0, scaledWidth, scaledHeight);

  // Apply color adjustments
  if (brightness !== 0 || contrast !== 0 || saturation !== 0) {
    applyColorAdjustmentsToData(
      imageData.data,
      brightness,
      contrast,
      saturation,
    );
  }

  // Apply color quantization
  applyColorQuantizationToData(
    imageData.data,
    colorDepth,
    dithering,
    scaledWidth,
    scaledHeight,
  );

  // Put processed data back to canvas
  tempCtx.putImageData(imageData, 0, 0);

  // Create final canvas and scale up with sharp edges
  const finalCanvas = createCanvas(width, height);
  const finalCtx = finalCanvas.getContext("2d");
  finalCtx.imageSmoothingEnabled = false;
  finalCtx.drawImage(
    tempCanvas,
    0,
    0,
    scaledWidth,
    scaledHeight,
    0,
    0,
    width,
    height,
  );

  // Return PNG buffer
  return finalCanvas.toBuffer("image/png");
}
