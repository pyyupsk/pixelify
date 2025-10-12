import { useAtom, useAtomValue } from "jotai";
import {
  brightnessAtom,
  colorDepthAtom,
  contrastAtom,
  ditheringAtom,
  imageAtom,
  pixelSizeAtom,
  saturationAtom,
} from "@/atoms/pixel-art";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import type { ColorDepth } from "@/lib/pixel-art/schema";

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
    <div className="space-y-4">
      <h3 className="font-semibold text-xl">Settings</h3>
      <div className="space-y-6">
        {/* Pixel Size */}
        <div className="flex flex-col space-y-3">
          <div className="flex items-center justify-between">
            <label htmlFor="pixel-size" className="font-medium text-sm">
              Pixel Size
            </label>
            <span className="text-muted-foreground text-sm">{pixelSize}px</span>
          </div>
          <input
            id="pixel-size"
            type="range"
            min="1"
            max="100"
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
        <div className="flex flex-col space-y-3">
          <span className="font-medium text-sm">Color Depth</span>
          <RadioGroup
            value={String(colorDepth)}
            onValueChange={(value) =>
              setColorDepth(Number(value) as ColorDepth)
            }
            disabled={!hasImage}
            className="flex items-center space-x-3"
          >
            {([8, 16, 32, 256] as ColorDepth[]).map((depth) => {
              const label = depth === 256 ? "Full" : `${depth}-bit`;
              return (
                <div key={depth} className="flex items-center space-x-2">
                  <RadioGroupItem value={String(depth)} id={`color-${depth}`} />
                  <Label htmlFor={`color-${depth}`}>{label}</Label>
                </div>
              );
            })}
          </RadioGroup>
        </div>

        {/* Dithering */}
        <div className="flex flex-col space-y-3">
          <span className="font-medium text-sm">Dithering</span>
          <RadioGroup
            value={dithering}
            onValueChange={(value) => setDithering(value as typeof dithering)}
            disabled={!hasImage}
            className="flex items-center space-x-3"
          >
            {[
              { value: "none", label: "None" },
              { value: "floyd-steinberg", label: "Floyd-Steinberg" },
              { value: "ordered", label: "Ordered" },
            ].map((option) => (
              <div key={option.value} className="flex items-center space-x-2">
                <RadioGroupItem
                  value={option.value}
                  id={`dither-${option.value}`}
                />
                <Label htmlFor={`dither-${option.value}`}>{option.label}</Label>
              </div>
            ))}
          </RadioGroup>
        </div>

        {/* Brightness */}
        <div className="flex flex-col space-y-3">
          <div className="flex items-center justify-between">
            <label htmlFor="brightness" className="font-medium text-sm">
              Brightness
            </label>
            <span className="text-muted-foreground text-sm">
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
        <div className="flex flex-col space-y-3">
          <div className="flex items-center justify-between">
            <label htmlFor="contrast" className="font-medium text-sm">
              Contrast
            </label>
            <span className="text-muted-foreground text-sm">
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
        <div className="flex flex-col space-y-3">
          <div className="flex items-center justify-between">
            <label htmlFor="saturation" className="font-medium text-sm">
              Saturation
            </label>
            <span className="text-muted-foreground text-sm">
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
