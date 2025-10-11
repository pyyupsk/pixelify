"use client";

import { Icon } from "@iconify/react";
import { useCallback, useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";

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

    // Set canvas size
    const maxSize = 800;
    const scale = Math.min(
      maxSize / sourceImage.width,
      maxSize / sourceImage.height,
      1,
    );
    const width = Math.floor(sourceImage.width * scale);
    const height = Math.floor(sourceImage.height * scale);

    canvas.width = width;
    canvas.height = height;

    // Calculate pixelated dimensions
    const scaledWidth = Math.floor(width / pixelSize);
    const scaledHeight = Math.floor(height / pixelSize);

    // Create temporary canvas for processing
    const tempCanvas = document.createElement("canvas");
    tempCanvas.width = scaledWidth;
    tempCanvas.height = scaledHeight;
    const tempCtx = tempCanvas.getContext("2d", { willReadFrequently: true });

    if (!tempCtx) {
      setIsProcessing(false);
      return;
    }

    // Draw image scaled down to temp canvas
    tempCtx.imageSmoothingEnabled = false;
    tempCtx.drawImage(sourceImage, 0, 0, scaledWidth, scaledHeight);

    // Get image data for color processing
    const imageData = tempCtx.getImageData(0, 0, scaledWidth, scaledHeight);
    const data = imageData.data;

    // Apply color quantization
    if (colorDepth < 256) {
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

          // Distribute error to neighboring pixels
          const x = (i / 4) % scaledWidth;
          const y = Math.floor(i / 4 / scaledWidth);

          // Right pixel
          if (x + 1 < scaledWidth) {
            const idx = i + 4;
            data[idx] = Math.min(255, Math.max(0, data[idx] + errR * (7 / 16)));
            data[idx + 1] = Math.min(
              255,
              Math.max(0, data[idx + 1] + errG * (7 / 16)),
            );
            data[idx + 2] = Math.min(
              255,
              Math.max(0, data[idx + 2] + errB * (7 / 16)),
            );
          }

          // Bottom-left pixel
          if (x - 1 >= 0 && y + 1 < scaledHeight) {
            const idx = i + scaledWidth * 4 - 4;
            data[idx] = Math.min(255, Math.max(0, data[idx] + errR * (3 / 16)));
            data[idx + 1] = Math.min(
              255,
              Math.max(0, data[idx + 1] + errG * (3 / 16)),
            );
            data[idx + 2] = Math.min(
              255,
              Math.max(0, data[idx + 2] + errB * (3 / 16)),
            );
          }

          // Bottom pixel
          if (y + 1 < scaledHeight) {
            const idx = i + scaledWidth * 4;
            data[idx] = Math.min(255, Math.max(0, data[idx] + errR * (5 / 16)));
            data[idx + 1] = Math.min(
              255,
              Math.max(0, data[idx + 1] + errG * (5 / 16)),
            );
            data[idx + 2] = Math.min(
              255,
              Math.max(0, data[idx + 2] + errB * (5 / 16)),
            );
          }

          // Bottom-right pixel
          if (x + 1 < scaledWidth && y + 1 < scaledHeight) {
            const idx = i + scaledWidth * 4 + 4;
            data[idx] = Math.min(255, Math.max(0, data[idx] + errR * (1 / 16)));
            data[idx + 1] = Math.min(
              255,
              Math.max(0, data[idx + 1] + errG * (1 / 16)),
            );
            data[idx + 2] = Math.min(
              255,
              Math.max(0, data[idx + 2] + errB * (1 / 16)),
            );
          }
        } else if (dithering === "ordered") {
          // Bayer matrix 2x2
          const x = (i / 4) % scaledWidth;
          const y = Math.floor(i / 4 / scaledWidth);
          const threshold = [
            [0, 128],
            [192, 64],
          ][y % 2][x % 2];

          data[i] = qr + (r < qr ? -threshold / 4 : threshold / 4);
          data[i + 1] = qg + (g < qg ? -threshold / 4 : threshold / 4);
          data[i + 2] = qb + (b < qb ? -threshold / 4 : threshold / 4);
        } else {
          data[i] = qr;
          data[i + 1] = qg;
          data[i + 2] = qb;
        }
      }
    }

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

  // Load and process image when changed
  useEffect(() => {
    if (!image) return;

    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      sourceImageRef.current = img;

      // Draw original to canvas
      const originalCanvas = originalCanvasRef.current;
      if (originalCanvas) {
        const ctx = originalCanvas.getContext("2d");
        if (ctx) {
          const maxSize = 800;
          const scale = Math.min(maxSize / img.width, maxSize / img.height, 1);
          const width = Math.floor(img.width * scale);
          const height = Math.floor(img.height * scale);

          originalCanvas.width = width;
          originalCanvas.height = height;
          ctx.drawImage(img, 0, 0, width, height);
        }
      }

      processPixelArt();
    };
    img.src = image;
  }, [image, processPixelArt]);

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
    <div className="container py-12 md:py-20">
      <div className="mx-auto max-w-6xl space-y-8">
        {/* Header */}
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
              /* Upload Area */
              <label
                htmlFor="file-upload"
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                className={`flex min-h-[400px] cursor-pointer flex-col items-center justify-center border-2 border-dashed bg-muted/20 p-12 transition-colors ${
                  isDragging
                    ? "border-primary bg-primary/5"
                    : "border-muted-foreground/25"
                }`}
              >
                <div className="space-y-6 text-center">
                  <div className="mx-auto flex size-20 items-center justify-center bg-primary/10">
                    <Icon
                      icon="pixelarticons:upload"
                      width={40}
                      height={40}
                      className="text-primary"
                    />
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-semibold text-xl">
                      Drop your image here
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      or click to browse from your device
                    </p>
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileInput}
                    className="hidden"
                    id="file-upload"
                    aria-label="Upload image"
                  />
                  <div className="inline-flex h-9 items-center justify-center border bg-primary px-4 font-medium text-primary-foreground text-sm transition-colors hover:bg-primary/90">
                    <Icon
                      icon="pixelarticons:image"
                      width={16}
                      height={16}
                      className="mr-2"
                    />
                    Choose Image
                  </div>
                  <p className="text-muted-foreground text-xs">
                    Supports JPG, PNG, GIF, WebP
                  </p>
                </div>
              </label>
            ) : (
              /* Preview Area */
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b pb-4">
                  <h3 className="font-semibold text-lg">Preview</h3>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleReset}
                      aria-label="Reset image"
                    >
                      <Icon icon="pixelarticons:close" width={16} height={16} />
                      Reset
                    </Button>
                    <Button
                      size="sm"
                      onClick={handleDownload}
                      disabled={isProcessing}
                      aria-label="Download pixel art"
                    >
                      <Icon
                        icon="pixelarticons:download"
                        width={16}
                        height={16}
                      />
                      Download
                    </Button>
                  </div>
                </div>

                {/* Image Comparison */}
                <div className="grid gap-6 md:grid-cols-2">
                  {/* Original */}
                  <div className="space-y-3">
                    <h4 className="font-medium text-muted-foreground text-sm">
                      Original
                    </h4>
                    <div className="border bg-muted/20 p-4">
                      <canvas
                        ref={originalCanvasRef}
                        className="mx-auto max-h-[400px] w-auto"
                      />
                    </div>
                  </div>

                  {/* Pixelated */}
                  <div className="space-y-3">
                    <h4 className="font-medium text-muted-foreground text-sm">
                      Pixel Art {isProcessing && "(Processing...)"}
                    </h4>
                    <div className="border bg-muted/20 p-4">
                      <canvas
                        ref={pixelatedCanvasRef}
                        className="mx-auto max-h-[400px] w-auto"
                        style={{ imageRendering: "pixelated" }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Right Column - Controls */}
          <div className="space-y-6">
            <div className="border bg-card p-6">
              <h3 className="mb-6 font-semibold text-lg">Settings</h3>
              <div className="space-y-6">
                {/* Pixel Size */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <label htmlFor="pixel-size" className="font-medium text-sm">
                      Pixel Size
                    </label>
                    <span className="font-mono text-muted-foreground text-sm">
                      {pixelSize}px
                    </span>
                  </div>
                  <input
                    id="pixel-size"
                    type="range"
                    min="2"
                    max="32"
                    value={pixelSize}
                    onChange={(e) => setPixelSize(Number(e.target.value))}
                    className="w-full accent-primary"
                    disabled={!image}
                    aria-label="Adjust pixel size"
                  />
                  <div className="flex justify-between text-muted-foreground text-xs">
                    <span>Fine</span>
                    <span>Coarse</span>
                  </div>
                </div>

                {/* Color Depth */}
                <div className="space-y-3">
                  <span className="font-medium text-sm">Color Depth</span>
                  <div className="grid grid-cols-2 gap-2">
                    {([8, 16, 32, 256] as ColorDepth[]).map((depth) => {
                      const label = depth === 256 ? "Full" : `${depth}-bit`;
                      return (
                        <button
                          key={depth}
                          type="button"
                          onClick={() => setColorDepth(depth)}
                          className={`border p-3 text-sm transition-colors disabled:opacity-50 ${
                            colorDepth === depth
                              ? "bg-primary text-primary-foreground"
                              : "bg-background hover:bg-accent"
                          }`}
                          disabled={!image}
                          aria-label={`Set color depth to ${label}`}
                        >
                          {label}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Dithering */}
                <div className="space-y-3">
                  <span className="font-medium text-sm">Dithering</span>
                  <div className="grid gap-2">
                    {(
                      [
                        { value: "none", label: "None" },
                        { value: "floyd-steinberg", label: "Floyd-Steinberg" },
                        { value: "ordered", label: "Ordered" },
                      ] as const
                    ).map((option) => (
                      <button
                        key={option.value}
                        type="button"
                        onClick={() => setDithering(option.value)}
                        className={`border p-3 text-left text-sm transition-colors disabled:opacity-50 ${
                          dithering === option.value
                            ? "bg-primary text-primary-foreground"
                            : "bg-background hover:bg-accent"
                        }`}
                        disabled={!image}
                        aria-label={`Set dithering to ${option.label}`}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Tips */}
            <div className="border bg-card p-6">
              <h3 className="mb-4 font-semibold text-sm">Quick Tips</h3>
              <ul className="space-y-3 text-muted-foreground text-sm">
                <li className="flex gap-2">
                  <Icon
                    icon="pixelarticons:checkbox-on"
                    width={16}
                    height={16}
                    className="mt-0.5 shrink-0"
                  />
                  <span>Start with pixel size 8-12 for best results</span>
                </li>
                <li className="flex gap-2">
                  <Icon
                    icon="pixelarticons:checkbox-on"
                    width={16}
                    height={16}
                    className="mt-0.5 shrink-0"
                  />
                  <span>Lower color depth for retro look</span>
                </li>
                <li className="flex gap-2">
                  <Icon
                    icon="pixelarticons:checkbox-on"
                    width={16}
                    height={16}
                    className="mt-0.5 shrink-0"
                  />
                  <span>Try dithering for smoother color transitions</span>
                </li>
                <li className="flex gap-2">
                  <Icon
                    icon="pixelarticons:checkbox-on"
                    width={16}
                    height={16}
                    className="mt-0.5 shrink-0"
                  />
                  <span>All processing happens locally in your browser</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
