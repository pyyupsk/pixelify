import { Icon } from "@iconify/react";
import { useSetAtom } from "jotai";
import { useEffect } from "react";
import { resetAtom } from "@/atoms/pixel-art";
import { Button } from "@/components/ui/button";
import { usePixelArt } from "@/hooks/use-canvas";
import { useImageUpload } from "@/hooks/use-upload";

export function PreviewArea() {
  const { image } = useImageUpload();
  const { pixelatedCanvasRef, isProcessing, loadImage, downloadPixelArt } =
    usePixelArt();
  const resetAll = useSetAtom(resetAtom);

  // Load and process image when it changes
  useEffect(() => {
    if (image) {
      loadImage(image);
    }
  }, [image, loadImage]);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-xl">
          Preview{" "}
          {isProcessing && (
            <span className="text-muted-foreground">(Processing...)</span>
          )}
        </h3>

        {/* Reset */}
        <button
          type="button"
          onClick={() => resetAll()}
          aria-label="Reset image"
          className="flex items-center gap-2 text-muted-foreground"
        >
          <Icon icon="pixelarticons:close" width={16} height={16} />
          <span className="text-sm">Reset</span>
        </button>
      </div>

      {/* Pixel Art Preview */}
      <div className="border bg-muted/20">
        <canvas
          ref={pixelatedCanvasRef}
          className="mx-auto w-full max-w-full"
          style={{ imageRendering: "pixelated" }}
        />
      </div>

      {/* Download Button */}
      <Button
        size="sm"
        onClick={downloadPixelArt}
        disabled={isProcessing}
        aria-label="Download pixel art"
        className="w-full"
      >
        <Icon icon="pixelarticons:download" width={16} height={16} />
        Download
      </Button>
    </div>
  );
}
