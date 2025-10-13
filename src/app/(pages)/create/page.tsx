"use client";

import { useAtomValue } from "jotai";
import { Suspense } from "react";
import { imageAtom } from "@/atoms/pixel-art";
import { Close, Grid, PaintBucket, Sliders, Zap } from "@/components/icons";
import { PreviewArea } from "@/components/section/create/preview-area";
import { SettingsPanel } from "@/components/section/create/settings-panel";
import { UploadArea } from "@/components/section/create/upload-area";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";
import { usePresetSettings } from "@/hooks/use-preset";

function CreatePageContent() {
  const image = useAtomValue(imageAtom);
  const { showPresetAlert, presetDetails, dismissAlert } = usePresetSettings();

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

      {/* Preset Settings Alert */}
      {showPresetAlert && (
        <Alert variant="info" className="mx-auto max-w-3xl">
          <Zap width={20} height={20} />
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <AlertTitle>Preset Settings Applied</AlertTitle>
              <AlertDescription>
                <p className="mb-2">
                  Settings from the example have been loaded. Upload your image
                  to see the pixel art transformation!
                </p>
                <div className="flex flex-wrap gap-2 text-xs">
                  {presetDetails.pixelSize && (
                    <span className="bg-primary/10 px-2 py-1">
                      <Grid width={12} height={12} className="mr-1 inline" />
                      {presetDetails.pixelSize}
                    </span>
                  )}
                  {presetDetails.colorDepth && (
                    <span className="bg-primary/10 px-2 py-1">
                      <PaintBucket
                        width={12}
                        height={12}
                        className="mr-1 inline"
                      />
                      {presetDetails.colorDepth}
                    </span>
                  )}
                  {presetDetails.dithering && (
                    <span className="bg-primary/10 px-2 py-1">
                      <Sliders width={12} height={12} className="mr-1 inline" />
                      {presetDetails.dithering}
                    </span>
                  )}
                </div>
              </AlertDescription>
            </div>
            <button
              type="button"
              onClick={dismissAlert}
              className="text-muted-foreground transition-colors hover:text-foreground"
              aria-label="Dismiss preset notification"
            >
              <Close width={16} height={16} />
            </button>
          </div>
        </Alert>
      )}

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

export default function CreatePage() {
  return (
    <Suspense
      fallback={
        <section className="container space-y-8 py-12 md:py-20">
          <div className="space-y-4 text-center">
            <Skeleton className="mx-auto h-12 w-3/4" />
            <Skeleton className="mx-auto h-6 w-1/2" />
          </div>
          <Skeleton className="mx-auto h-96 w-full" />
        </section>
      }
    >
      <CreatePageContent />
    </Suspense>
  );
}
