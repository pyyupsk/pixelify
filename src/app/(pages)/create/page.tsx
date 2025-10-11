"use client";

import { useAtomValue } from "jotai";
import { imageAtom } from "@/atoms/pixel-art";
import { PreviewArea } from "@/components/section/create/preview-area";
import { SettingsPanel } from "@/components/section/create/settings-panel";
import { UploadArea } from "@/components/section/create/upload-area";

export default function CreatePage() {
  const image = useAtomValue(imageAtom);

  return (
    <section className="container space-y-8 py-12 md:py-20">
      <div className="space-y-4 text-center">
        <h1 className="font-bold text-3xl tracking-tight md:text-4xl lg:text-5xl">
          Create Pixel Art
        </h1>
        <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
          Upload your image and transform it into retro pixel art
        </p>
      </div>

      {/* Main Content */}
      {!image ? (
        <UploadArea />
      ) : (
        <div className="grid gap-8 md:grid-cols-2">
          {/* Left Column - Preview */}
          <PreviewArea />

          {/* Right Column - Settings */}
          <SettingsPanel />
        </div>
      )}
    </section>
  );
}
