import type { DitheringMode } from "./schema";

/**
 * Clamp a value between 0 and 255
 */
export function clamp(value: number): number {
  return Math.min(255, Math.max(0, value));
}

/**
 * Distribute Floyd-Steinberg error to a neighboring pixel
 */
export function distributeError(
  data: Uint8ClampedArray,
  idx: number,
  errR: number,
  errG: number,
  errB: number,
  factor: number,
): void {
  data[idx] = clamp(data[idx] + errR * factor);
  data[idx + 1] = clamp(data[idx + 1] + errG * factor);
  data[idx + 2] = clamp(data[idx + 2] + errB * factor);
}

/**
 * Apply Floyd-Steinberg dithering to a pixel
 */
export function applyFloydSteinberg(
  data: Uint8ClampedArray,
  i: number,
  errR: number,
  errG: number,
  errB: number,
  scaledWidth: number,
  scaledHeight: number,
): void {
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
export function applyOrderedDithering(
  data: Uint8ClampedArray,
  i: number,
  original: { r: number; g: number; b: number },
  quantized: { r: number; g: number; b: number },
  scaledWidth: number,
): void {
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
 * Convert RGB to HSL
 */
export function rgbToHsl(
  r: number,
  g: number,
  b: number,
): [number, number, number] {
  r /= 255;
  g /= 255;
  b /= 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

    switch (max) {
      case r:
        h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
        break;
      case g:
        h = ((b - r) / d + 2) / 6;
        break;
      case b:
        h = ((r - g) / d + 4) / 6;
        break;
    }
  }

  return [h, s, l];
}

/**
 * Convert HSL to RGB
 */
export function hslToRgb(
  h: number,
  s: number,
  l: number,
): [number, number, number] {
  let r: number;
  let g: number;
  let b: number;

  if (s === 0) {
    r = g = b = l;
  } else {
    const hue2rgb = (p: number, q: number, t: number) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1 / 6) return p + (q - p) * 6 * t;
      if (t < 1 / 2) return q;
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
      return p;
    };

    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;

    r = hue2rgb(p, q, h + 1 / 3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1 / 3);
  }

  return [r * 255, g * 255, b * 255];
}

/**
 * Apply color adjustments to image data (brightness, contrast, saturation)
 */
export function applyColorAdjustmentsToData(
  data: Uint8ClampedArray,
  brightness: number,
  contrast: number,
  saturation: number,
): void {
  // Normalize values from -100/100 to usable ranges
  const brightnessFactor = brightness / 100;
  const contrastFactor = (contrast + 100) / 100;
  const saturationFactor = (saturation + 100) / 100;

  for (let i = 0; i < data.length; i += 4) {
    let r = data[i];
    let g = data[i + 1];
    let b = data[i + 2];

    // Apply brightness
    r += brightnessFactor * 255;
    g += brightnessFactor * 255;
    b += brightnessFactor * 255;

    // Apply contrast
    r = ((r / 255 - 0.5) * contrastFactor + 0.5) * 255;
    g = ((g / 255 - 0.5) * contrastFactor + 0.5) * 255;
    b = ((b / 255 - 0.5) * contrastFactor + 0.5) * 255;

    // Apply saturation
    if (saturation !== 0) {
      const [h, s, l] = rgbToHsl(clamp(r), clamp(g), clamp(b));
      const newS = Math.max(0, Math.min(1, s * saturationFactor));
      [r, g, b] = hslToRgb(h, newS, l);
    }

    // Clamp and update
    data[i] = clamp(r);
    data[i + 1] = clamp(g);
    data[i + 2] = clamp(b);
  }
}

/**
 * Apply color quantization and dithering to image data
 */
export function applyColorQuantizationToData(
  data: Uint8ClampedArray,
  colorDepth: number,
  dithering: DitheringMode,
  width: number,
  height: number,
): void {
  if (colorDepth >= 256) return;

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

      applyFloydSteinberg(data, i, errR, errG, errB, width, height);
    } else if (dithering === "ordered") {
      applyOrderedDithering(
        data,
        i,
        { r, g, b },
        { r: qr, g: qg, b: qb },
        width,
      );
    } else {
      data[i] = qr;
      data[i + 1] = qg;
      data[i + 2] = qb;
    }
  }
}
