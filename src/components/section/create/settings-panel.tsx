import { useAtom, useAtomValue } from "jotai";
import {
  brightnessAtom,
  type ColorDepth,
  colorDepthAtom,
  contrastAtom,
  ditheringAtom,
  imageAtom,
  pixelSizeAtom,
  saturationAtom,
} from "@/atoms/pixel-art";

export function SettingsPanel() {
  const [pixelSize, setPixelSize] = useAtom(pixelSizeAtom);
  const [colorDepth, setColorDepth] = useAtom(colorDepthAtom);
  const [dithering, setDithering] = useAtom(ditheringAtom);
  const [brightness, setBrightness] = useAtom(brightnessAtom);
  const [contrast, setContrast] = useAtom(contrastAtom);
  const [saturation, setSaturation] = useAtom(saturationAtom);
  const image = useAtomValue(imageAtom);

  const hasImage = !!image;

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
            onChange={(e) => setPixelSize(Number(e.target.value))}
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
                  onClick={() => setColorDepth(depth)}
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
                onClick={() => setDithering(option.value)}
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

        {/* Brightness */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <label htmlFor="brightness" className="font-medium text-sm">
              Brightness
            </label>
            <span className="font-mono text-muted-foreground text-sm">
              {brightness > 0 ? `+${brightness}` : brightness}
            </span>
          </div>
          <input
            id="brightness"
            type="range"
            min="-100"
            max="100"
            value={brightness}
            onChange={(e) => setBrightness(Number(e.target.value))}
            className="w-full accent-primary"
            disabled={!hasImage}
            aria-label="Adjust brightness"
          />
          <div className="flex justify-between text-muted-foreground text-xs">
            <span>Dark</span>
            <span>Bright</span>
          </div>
        </div>

        {/* Contrast */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <label htmlFor="contrast" className="font-medium text-sm">
              Contrast
            </label>
            <span className="font-mono text-muted-foreground text-sm">
              {contrast > 0 ? `+${contrast}` : contrast}
            </span>
          </div>
          <input
            id="contrast"
            type="range"
            min="-100"
            max="100"
            value={contrast}
            onChange={(e) => setContrast(Number(e.target.value))}
            className="w-full accent-primary"
            disabled={!hasImage}
            aria-label="Adjust contrast"
          />
          <div className="flex justify-between text-muted-foreground text-xs">
            <span>Low</span>
            <span>High</span>
          </div>
        </div>

        {/* Saturation */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <label htmlFor="saturation" className="font-medium text-sm">
              Saturation
            </label>
            <span className="font-mono text-muted-foreground text-sm">
              {saturation > 0 ? `+${saturation}` : saturation}
            </span>
          </div>
          <input
            id="saturation"
            type="range"
            min="-100"
            max="100"
            value={saturation}
            onChange={(e) => setSaturation(Number(e.target.value))}
            className="w-full accent-primary"
            disabled={!hasImage}
            aria-label="Adjust saturation"
          />
          <div className="flex justify-between text-muted-foreground text-xs">
            <span>Grayscale</span>
            <span>Vibrant</span>
          </div>
        </div>
      </div>
    </div>
  );
}
