import { useAtom, useAtomValue } from "jotai";
import { useCallback, useRef } from "react";
import {
  brightnessAtom,
  colorDepthAtom,
  contrastAtom,
  ditheringAtom,
  isProcessingAtom,
  pixelSizeAtom,
  saturationAtom,
} from "@/atoms/pixel-art";
import {
  applyColorAdjustments,
  applyColorQuantization,
  calculateScaledDimensions,
  createTempCanvas,
} from "@/utils/pixel-art";

export function usePixelArt() {
  const pixelSize = useAtomValue(pixelSizeAtom);
  const colorDepth = useAtomValue(colorDepthAtom);
  const dithering = useAtomValue(ditheringAtom);
  const brightness = useAtomValue(brightnessAtom);
  const contrast = useAtomValue(contrastAtom);
  const saturation = useAtomValue(saturationAtom);
  const [isProcessing, setIsProcessing] = useAtom(isProcessingAtom);

  const pixelatedCanvasRef = useRef<HTMLCanvasElement>(null);
  const sourceImageRef = useRef<HTMLImageElement | null>(null);

  // Process image into pixel art
  const processPixelArt = useCallback(() => {
    const canvas = pixelatedCanvasRef.current;
    const sourceImage = sourceImageRef.current;

    if (!canvas || !sourceImage) return;

    setIsProcessing(true);

    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) {
      setIsProcessing(false);
      return;
    }

    // Calculate canvas dimensions
    const { width, height } = calculateScaledDimensions(
      sourceImage.width,
      sourceImage.height,
    );
    canvas.width = width;
    canvas.height = height;

    // Calculate pixelated dimensions
    const scaledWidth = Math.floor(width / pixelSize);
    const scaledHeight = Math.floor(height / pixelSize);

    // Create temporary canvas for processing
    const tempCanvasResult = createTempCanvas(scaledWidth, scaledHeight);
    if (!tempCanvasResult) {
      setIsProcessing(false);
      return;
    }

    const { canvas: tempCanvas, ctx: tempCtx } = tempCanvasResult;

    // Draw image scaled down to temp canvas
    tempCtx.drawImage(sourceImage, 0, 0, scaledWidth, scaledHeight);

    // Get and process image data
    const imageData = tempCtx.getImageData(0, 0, scaledWidth, scaledHeight);

    // Apply color adjustments first
    if (brightness !== 0 || contrast !== 0 || saturation !== 0) {
      applyColorAdjustments(imageData, brightness, contrast, saturation);
    }

    // Then apply color quantization
    applyColorQuantization(
      imageData,
      colorDepth,
      dithering,
      scaledWidth,
      scaledHeight,
    );

    // Put processed image data back to temp canvas
    tempCtx.putImageData(imageData, 0, 0);

    // Clear main canvas and scale up with sharp edges
    ctx.clearRect(0, 0, width, height);
    ctx.imageSmoothingEnabled = false;
    ctx.drawImage(
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

    setIsProcessing(false);
  }, [
    pixelSize,
    colorDepth,
    dithering,
    brightness,
    contrast,
    saturation,
    setIsProcessing,
  ]);

  // Load image from data URL
  const loadImage = useCallback(
    (imageDataUrl: string) => {
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.onload = () => {
        sourceImageRef.current = img;
        processPixelArt();
      };
      img.src = imageDataUrl;
    },
    [processPixelArt],
  );

  // Download pixel art
  const downloadPixelArt = useCallback(() => {
    const canvas = pixelatedCanvasRef.current;
    if (!canvas) return;

    canvas.toBlob((blob) => {
      if (!blob) return;
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `pixelart-${Date.now()}.png`;
      a.click();
      URL.revokeObjectURL(url);
    });
  }, []);

  // Reset canvas refs
  const reset = useCallback(() => {
    sourceImageRef.current = null;
  }, []);

  return {
    isProcessing,
    pixelatedCanvasRef,
    loadImage,
    downloadPixelArt,
    reset,
  };
}
