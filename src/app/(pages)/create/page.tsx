"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { PreviewArea } from "@/components/section/create/preview-area";
import { SettingsPanel } from "@/components/section/create/settings-panel";
import { TipsPanel } from "@/components/section/create/tips-panel";
import { UploadArea } from "@/components/section/create/upload-area";
import {
  applyColorQuantization,
  calculateScaledDimensions,
  createTempCanvas,
} from "@/utils/pixel-art";

type ColorDepth = 8 | 16 | 32 | 256;
type DitheringMode = "none" | "floyd-steinberg" | "ordered";

export default function CreatePage() {
  const [image, setImage] = useState<string | null>(null);
  const [pixelSize, setPixelSize] = useState(8);
  const [colorDepth, setColorDepth] = useState<ColorDepth>(32);
  const [dithering, setDithering] = useState<DitheringMode>("none");
  const [isDragging, setIsDragging] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const originalCanvasRef = useRef<HTMLCanvasElement>(null);
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
  }, [pixelSize, colorDepth, dithering]);

  // Draw original image to canvas
  const drawOriginalImage = useCallback((img: HTMLImageElement) => {
    const originalCanvas = originalCanvasRef.current;
    if (!originalCanvas) return;

    const ctx = originalCanvas.getContext("2d");
    if (!ctx) return;

    const { width, height } = calculateScaledDimensions(img.width, img.height);

    originalCanvas.width = width;
    originalCanvas.height = height;
    ctx.drawImage(img, 0, 0, width, height);
  }, []);

  // Load and process image when changed
  useEffect(() => {
    if (!image) return;

    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      sourceImageRef.current = img;
      drawOriginalImage(img);
      processPixelArt();
    };
    img.src = image;
  }, [image, drawOriginalImage, processPixelArt]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const file = e.dataTransfer.files[0];
    if (file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setImage(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  }, []);

  const handleFileInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
          setImage(event.target?.result as string);
        };
        reader.readAsDataURL(file);
      }
    },
    [],
  );

  const handleReset = useCallback(() => {
    setImage(null);
    setPixelSize(8);
    setColorDepth(32);
    setDithering("none");
    sourceImageRef.current = null;
  }, []);

  const handleDownload = useCallback(() => {
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

  return (
    <section className="container max-w-6xl space-y-8 py-12 md:py-20">
      <div className="space-y-4 text-center">
        <h1 className="font-bold text-3xl tracking-tight md:text-4xl lg:text-5xl">
          Create Pixel Art
        </h1>
        <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
          Upload your image and transform it into retro pixel art
        </p>
      </div>

      {/* Main Content Grid */}
      <div className="grid gap-8 lg:grid-cols-[1fr,320px]">
        {/* Left Column - Upload & Preview */}
        <div className="space-y-6">
          {!image ? (
            <UploadArea
              isDragging={isDragging}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onFileInput={handleFileInput}
            />
          ) : (
            <PreviewArea
              originalCanvasRef={originalCanvasRef}
              pixelatedCanvasRef={pixelatedCanvasRef}
              isProcessing={isProcessing}
              onReset={handleReset}
              onDownload={handleDownload}
            />
          )}
        </div>

        {/* Right Column - Controls */}
        <div className="space-y-6">
          <SettingsPanel
            pixelSize={pixelSize}
            colorDepth={colorDepth}
            dithering={dithering}
            hasImage={!!image}
            onPixelSizeChange={setPixelSize}
            onColorDepthChange={setColorDepth}
            onDitheringChange={setDithering}
          />
          <TipsPanel />
        </div>
      </div>
    </section>
  );
}
