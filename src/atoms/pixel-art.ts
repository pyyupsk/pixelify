import { atom } from "jotai";
import type { ColorDepth, DitheringMode } from "@/lib/pixel-art/schema";

// Settings atoms
export const pixelSizeAtom = atom(8);
export const colorDepthAtom = atom<ColorDepth>(32);
export const ditheringAtom = atom<DitheringMode>("none");

// Color adjustment atoms (values range from -100 to 100)
export const brightnessAtom = atom(0);
export const contrastAtom = atom(0);
export const saturationAtom = atom(0);

// Image upload atoms
export const imageAtom = atom<string | null>(null);
export const isDraggingAtom = atom(false);

// Processing state atoms
export const isProcessingAtom = atom(false);

// Derived atom to reset all settings
export const resetAtom = atom(null, (_get, set) => {
  set(imageAtom, null);
  set(pixelSizeAtom, 8);
  set(colorDepthAtom, 32);
  set(ditheringAtom, "none");
  set(brightnessAtom, 0);
  set(contrastAtom, 0);
  set(saturationAtom, 0);
  set(isDraggingAtom, false);
  set(isProcessingAtom, false);
});
