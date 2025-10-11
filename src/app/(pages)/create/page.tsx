"use client";

import { useAtomValue } from "jotai";
import { imageAtom } from "@/atoms/pixel-art";
import { PreviewArea } from "@/components/section/create/preview-area";
import { SettingsPanel } from "@/components/section/create/settings-panel";
import { TipsPanel } from "@/components/section/create/tips-panel";
import { UploadArea } from "@/components/section/create/upload-area";

export default function CreatePage() {
  const image = useAtomValue(imageAtom);

  return (
    <section className="container max-w-6xl space-y-8 py-12 md:py-20">
      <div className="space-y-4 text-center">
        <h1 className="font-bold text-3xl tracking-tight md:text-4xl lg:text-5xl">
          Create Pixel Art
        </h1>
        <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
          Upload your image and transform it into retro pixel art
        </p>
      </div>

      {/* Main Content Grid */}
      <div className="grid gap-8 lg:grid-cols-[1fr,320px]">
        {/* Left Column - Upload & Preview */}
        <div className="space-y-6">
          {!image ? <UploadArea /> : <PreviewArea />}
        </div>

        {/* Right Column - Controls */}
        <div className="space-y-6">
          <SettingsPanel />
          <TipsPanel />
        </div>
      </div>
    </section>
  );
}
