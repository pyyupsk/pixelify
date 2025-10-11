type DitheringMode = "none" | "floyd-steinberg" | "ordered";

/**
 * Clamp a value between 0 and 255
 */
function clamp(value: number): number {
  return Math.min(255, Math.max(0, value));
}

/**
 * Distribute Floyd-Steinberg error to a neighboring pixel
 */
function distributeError(
  data: Uint8ClampedArray,
  idx: number,
  errR: number,
  errG: number,
  errB: number,
  factor: number,
) {
  data[idx] = clamp(data[idx] + errR * factor);
  data[idx + 1] = clamp(data[idx + 1] + errG * factor);
  data[idx + 2] = clamp(data[idx + 2] + errB * factor);
}

/**
 * Apply Floyd-Steinberg dithering to a pixel
 */
function applyFloydSteinberg(
  data: Uint8ClampedArray,
  i: number,
  errR: number,
  errG: number,
  errB: number,
  scaledWidth: number,
  scaledHeight: number,
) {
  const x = (i / 4) % scaledWidth;
  const y = Math.floor(i / 4 / scaledWidth);

  // Right pixel
  if (x + 1 < scaledWidth) {
    distributeError(data, i + 4, errR, errG, errB, 7 / 16);
  }

  // Bottom-left pixel
  if (x - 1 >= 0 && y + 1 < scaledHeight) {
    distributeError(data, i + scaledWidth * 4 - 4, errR, errG, errB, 3 / 16);
  }

  // Bottom pixel
  if (y + 1 < scaledHeight) {
    distributeError(data, i + scaledWidth * 4, errR, errG, errB, 5 / 16);
  }

  // Bottom-right pixel
  if (x + 1 < scaledWidth && y + 1 < scaledHeight) {
    distributeError(data, i + scaledWidth * 4 + 4, errR, errG, errB, 1 / 16);
  }
}

/**
 * Apply ordered (Bayer) dithering to a pixel
 */
function applyOrderedDithering(
  data: Uint8ClampedArray,
  i: number,
  original: { r: number; g: number; b: number },
  quantized: { r: number; g: number; b: number },
  scaledWidth: number,
) {
  const x = (i / 4) % scaledWidth;
  const y = Math.floor(i / 4 / scaledWidth);
  const threshold = [
    [0, 128],
    [192, 64],
  ][y % 2][x % 2];

  data[i] =
    quantized.r + (original.r < quantized.r ? -threshold / 4 : threshold / 4);
  data[i + 1] =
    quantized.g + (original.g < quantized.g ? -threshold / 4 : threshold / 4);
  data[i + 2] =
    quantized.b + (original.b < quantized.b ? -threshold / 4 : threshold / 4);
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
  if (colorDepth >= 256) return;

  const data = imageData.data;
  const levels = colorDepth;
  const step = 255 / (levels - 1);

  for (let i = 0; i < data.length; i += 4) {
    // Quantize RGB channels
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];

    const qr = Math.round(r / step) * step;
    const qg = Math.round(g / step) * step;
    const qb = Math.round(b / step) * step;

    // Apply dithering
    if (dithering === "floyd-steinberg") {
      const errR = r - qr;
      const errG = g - qg;
      const errB = b - qb;

      applyFloydSteinberg(data, i, errR, errG, errB, scaledWidth, scaledHeight);
    } else if (dithering === "ordered") {
      applyOrderedDithering(
        data,
        i,
        { r, g, b },
        { r: qr, g: qg, b: qb },
        scaledWidth,
      );
    } else {
      data[i] = qr;
      data[i + 1] = qg;
      data[i + 2] = qb;
    }
  }
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
