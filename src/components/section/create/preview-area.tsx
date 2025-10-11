import { Icon } from "@iconify/react";
import type { RefObject } from "react";
import { Button } from "@/components/ui/button";

type Props = {
  originalCanvasRef: RefObject<HTMLCanvasElement | null>;
  pixelatedCanvasRef: RefObject<HTMLCanvasElement | null>;
  isProcessing: boolean;
  onReset: () => void;
  onDownload: () => void;
};

export function PreviewArea({
  originalCanvasRef,
  pixelatedCanvasRef,
  isProcessing,
  onReset,
  onDownload,
}: Readonly<Props>) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between border-b pb-4">
        <h3 className="font-semibold text-lg">Preview</h3>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={onReset}
            aria-label="Reset image"
          >
            <Icon icon="pixelarticons:close" width={16} height={16} />
            Reset
          </Button>
          <Button
            size="sm"
            onClick={onDownload}
            disabled={isProcessing}
            aria-label="Download pixel art"
          >
            <Icon icon="pixelarticons:download" width={16} height={16} />
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
  );
}
