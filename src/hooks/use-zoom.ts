import {
  type MouseEvent,
  type RefObject,
  useCallback,
  useRef,
  useState,
} from "react";

type ZoomPosition = {
  x: number;
  y: number;
};

type UseZoomReturn = {
  zoomCanvasRef: RefObject<HTMLCanvasElement | null>;
  containerRef: RefObject<HTMLDivElement | null>;
  zoomPosition: ZoomPosition;
  isZooming: boolean;
  handleMouseMove: (e: MouseEvent<HTMLDivElement>) => void;
  handleMouseEnter: () => void;
  handleMouseLeave: () => void;
};

export function useZoom(
  sourceCanvasRef: RefObject<HTMLCanvasElement | null>,
): UseZoomReturn {
  const zoomCanvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [zoomPosition, setZoomPosition] = useState<ZoomPosition>({
    x: 0,
    y: 0,
  });
  const [isZooming, setIsZooming] = useState(false);

  const handleMouseMove = useCallback(
    (e: MouseEvent<HTMLDivElement>) => {
      if (
        !sourceCanvasRef.current ||
        !zoomCanvasRef.current ||
        !containerRef.current
      )
        return;

      const rect = containerRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      setZoomPosition({ x, y });

      // Draw zoomed portion
      const sourceCanvas = sourceCanvasRef.current;
      const zoomCanvas = zoomCanvasRef.current;
      const ctx = zoomCanvas.getContext("2d");
      if (!ctx) return;

      // Clear canvas
      ctx.clearRect(0, 0, zoomCanvas.width, zoomCanvas.height);

      // Calculate source position (centered on mouse)
      const zoomLevel = 3;
      const zoomRadius = 75;
      const sourceX =
        (x / rect.width) * sourceCanvas.width - zoomRadius / zoomLevel;
      const sourceY =
        (y / rect.height) * sourceCanvas.height - zoomRadius / zoomLevel;
      const sourceSize = (zoomRadius * 2) / zoomLevel;

      // Create circular clip
      ctx.save();
      ctx.beginPath();
      ctx.arc(zoomRadius, zoomRadius, zoomRadius, 0, Math.PI * 2);
      ctx.clip();

      // Draw zoomed image
      ctx.imageSmoothingEnabled = false;
      ctx.drawImage(
        sourceCanvas,
        sourceX,
        sourceY,
        sourceSize,
        sourceSize,
        0,
        0,
        zoomRadius * 2,
        zoomRadius * 2,
      );

      ctx.restore();

      // Draw border
      ctx.strokeStyle = "hsl(var(--primary))";
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.arc(zoomRadius, zoomRadius, zoomRadius, 0, Math.PI * 2);
      ctx.stroke();
    },
    [sourceCanvasRef],
  );

  const handleMouseEnter = useCallback(() => {
    setIsZooming(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsZooming(false);
  }, []);

  return {
    zoomCanvasRef,
    containerRef,
    zoomPosition,
    isZooming,
    handleMouseMove,
    handleMouseEnter,
    handleMouseLeave,
  };
}
