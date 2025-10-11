type ColorDepth = 8 | 16 | 32 | 256;
type DitheringMode = "none" | "floyd-steinberg" | "ordered";

type Props = {
  pixelSize: number;
  colorDepth: ColorDepth;
  dithering: DitheringMode;
  hasImage: boolean;
  onPixelSizeChange: (value: number) => void;
  onColorDepthChange: (depth: ColorDepth) => void;
  onDitheringChange: (mode: DitheringMode) => void;
};

export function SettingsPanel({
  pixelSize,
  colorDepth,
  dithering,
  hasImage,
  onPixelSizeChange,
  onColorDepthChange,
  onDitheringChange,
}: Readonly<Props>) {
  return (
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
            onChange={(e) => onPixelSizeChange(Number(e.target.value))}
            className="w-full accent-primary"
            disabled={!hasImage}
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
                  onClick={() => onColorDepthChange(depth)}
                  className={`border p-3 text-sm transition-colors disabled:opacity-50 ${
                    colorDepth === depth
                      ? "bg-primary text-primary-foreground"
                      : "bg-background hover:bg-accent"
                  }`}
                  disabled={!hasImage}
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
                onClick={() => onDitheringChange(option.value)}
                className={`border p-3 text-left text-sm transition-colors disabled:opacity-50 ${
                  dithering === option.value
                    ? "bg-primary text-primary-foreground"
                    : "bg-background hover:bg-accent"
                }`}
                disabled={!hasImage}
                aria-label={`Set dithering to ${option.label}`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
