import { useSetAtom } from "jotai";
import { useEffect } from "react";
import { resetAtom } from "@/atoms/pixel-art";
import { Close, Download } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { usePixelArt } from "@/hooks/use-canvas";
import { useImageUpload } from "@/hooks/use-upload";
import { useZoom } from "@/hooks/use-zoom";

export function PreviewArea() {
  const { image } = useImageUpload();
  const { pixelatedCanvasRef, isProcessing, loadImage, downloadPixelArt } =
    usePixelArt();
  const resetAll = useSetAtom(resetAtom);
  const {
    zoomCanvasRef,
    containerRef,
    zoomPosition,
    isZooming,
    handleMouseMove,
    handleMouseEnter,
    handleMouseLeave,
  } = useZoom(pixelatedCanvasRef);

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
          <Close width={16} height={16} />
          <span className="text-sm">Reset</span>
        </button>
      </div>

      {/* Pixel Art Preview */}
      {/* biome-ignore lint/a11y/noStaticElementInteractions: Mouse events provide optional zoom enhancement */}
      <div
        ref={containerRef}
        className="relative overflow-hidden border bg-muted/20"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onMouseMove={handleMouseMove}
      >
        <canvas
          ref={pixelatedCanvasRef}
          className="mx-auto w-full max-w-full cursor-zoom-in"
          style={{ imageRendering: "pixelated" }}
        />

        {/* Circular Zoom Lens */}
        {isZooming && image && (
          <canvas
            ref={zoomCanvasRef}
            width={150}
            height={150}
            className="pointer-events-none absolute"
            style={{
              left: zoomPosition.x - 75,
              top: zoomPosition.y - 75,
              imageRendering: "pixelated",
            }}
          />
        )}
      </div>

      {/* Download Button */}
      <Button
        size="sm"
        onClick={downloadPixelArt}
        disabled={isProcessing}
        aria-label="Download pixel art"
        className="w-full"
      >
        <Download width={16} height={16} />
        Download
      </Button>
    </div>
  );
}
