import { useAtom } from "jotai";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import {
  colorDepthAtom,
  ditheringAtom,
  pixelSizeAtom,
} from "@/atoms/pixel-art";
import type { ColorDepth, DitheringMode } from "@/lib/pixel-art/schema";

type PresetDetails = {
  pixelSize: string;
  colorDepth: string;
  dithering: string;
};

function applyPixelSizePreset(
  value: string | null,
  setter: (size: number) => void,
): string {
  if (!value) return "";

  const size = Number.parseInt(value, 10);
  if (!Number.isNaN(size) && size >= 1 && size <= 50) {
    setter(size);
    return `${size}px`;
  }
  return "";
}

function applyColorDepthPreset(
  value: string | null,
  setter: (depth: ColorDepth) => void,
): string {
  if (!value) return "";

  const depth = Number.parseInt(value, 10);
  if ([8, 16, 32, 256].includes(depth)) {
    setter(depth as ColorDepth);
    return depth === 256 ? "Full color" : `${depth}-bit color`;
  }
  return "";
}

function applyDitheringPreset(
  value: string | null,
  setter: (mode: DitheringMode) => void,
): string {
  if (!value) return "";

  if (["none", "floyd-steinberg", "ordered"].includes(value)) {
    setter(value as DitheringMode);
    return value === "floyd-steinberg"
      ? "Floyd-Steinberg"
      : value.charAt(0).toUpperCase() + value.slice(1);
  }
  return "";
}

export function usePresetSettings() {
  const searchParams = useSearchParams();
  const [, setPixelSize] = useAtom(pixelSizeAtom);
  const [, setColorDepth] = useAtom(colorDepthAtom);
  const [, setDithering] = useAtom(ditheringAtom);

  const [showPresetAlert, setShowPresetAlert] = useState(false);
  const [presetDetails, setPresetDetails] = useState<PresetDetails>({
    pixelSize: "",
    colorDepth: "",
    dithering: "",
  });

  useEffect(() => {
    const pixelSize = searchParams.get("pixelSize");
    const colorDepth = searchParams.get("colorDepth");
    const dithering = searchParams.get("dithering");

    const hasPresets = pixelSize || colorDepth || dithering;
    if (!hasPresets) return;

    const details: PresetDetails = {
      pixelSize: applyPixelSizePreset(pixelSize, setPixelSize),
      colorDepth: applyColorDepthPreset(colorDepth, setColorDepth),
      dithering: applyDitheringPreset(dithering, setDithering),
    };

    setPresetDetails(details);
    setShowPresetAlert(true);
  }, [searchParams, setPixelSize, setColorDepth, setDithering]);

  return {
    showPresetAlert,
    presetDetails,
    dismissAlert: () => setShowPresetAlert(false),
  };
}
