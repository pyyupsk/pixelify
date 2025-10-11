import { Icon } from "@iconify/react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default function HomePage() {
  return (
    <>
      {/* Hero Section */}
      <section className="container py-20 md:py-32">
        <div className="flex flex-col items-center space-y-8 text-center">
          {/* Badge */}
          <Badge variant="outline">
            <span className="relative flex size-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
              <span className="relative inline-flex size-2 rounded-full bg-primary" />
            </span>
            <span className="text-muted-foreground text-sm">
              Transform images instantly
            </span>
          </Badge>

          {/* Heading */}
          <div className="max-w-4xl space-y-4">
            <h1 className="font-bold text-4xl tracking-tight md:text-6xl lg:text-7xl">
              Turn Your Photos Into{" "}
              <span className="animate-gradient bg-gradient-to-r from-primary via-primary/70 to-primary bg-clip-text text-transparent">
                Pixel Art
              </span>
            </h1>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground md:text-xl">
              Upload any image and watch it transform into stunning pixel art.
              Fast, simple, and beautifully crafted for creators.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col gap-4 pt-4 sm:flex-row">
            <Button asChild>
              <Link href="/create">Start Creating</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/examples">View Examples</Link>
            </Button>
          </div>

          {/* Feature Pills */}
          <div className="flex flex-wrap justify-center gap-3 pt-8">
            <div className="flex items-center gap-2 px-3 text-sm">
              <Icon icon="pixelarticons:zap" width={16} height={16} />
              Instant Processing
            </div>
            <div className="flex items-center gap-2 px-3 text-sm">
              <Icon icon="pixelarticons:paint-bucket" width={16} height={16} />
              Multiple Styles
            </div>
            <div className="flex items-center gap-2 px-3 text-sm">
              <Icon icon="pixelarticons:download" width={16} height={16} />
              Easy Download
            </div>
            <div className="flex items-center gap-2 px-3 text-sm">
              <Icon icon="pixelarticons:coin" width={16} height={16} />
              Free to Use
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container max-w-6xl space-y-12 py-20 md:py-32">
        {/* Section Header */}
        <div className="space-y-4 text-center">
          <h2 className="font-bold text-3xl tracking-tight md:text-4xl lg:text-5xl">
            Why Choose Pixelify?
          </h2>
          <p className="mx-auto max-w-xl text-lg text-muted-foreground">
            Everything you need to create stunning pixel art from your photos
          </p>
        </div>

        {/* Feature Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {/* Feature 1 */}
          <div className="space-y-4 border bg-card p-6">
            <div className="flex size-12 items-center justify-center bg-primary/10">
              <Icon
                icon="pixelarticons:zap"
                width={24}
                height={24}
                className="text-primary"
              />
            </div>
            <h3 className="font-semibold text-xl">Lightning Fast</h3>
            <p className="text-muted-foreground">
              Transform your images in seconds with our optimized processing
              engine. No waiting, just instant results.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="space-y-4 border bg-card p-6">
            <div className="flex size-12 items-center justify-center bg-primary/10">
              <Icon
                icon="pixelarticons:sliders-2"
                width={24}
                height={24}
                className="text-primary"
              />
            </div>
            <h3 className="font-semibold text-xl">Full Customization</h3>
            <p className="text-muted-foreground">
              Adjust pixel size, color palette, and style to match your vision.
              Complete creative control at your fingertips.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="space-y-4 border bg-card p-6">
            <div className="flex size-12 items-center justify-center bg-primary/10">
              <Icon
                icon="pixelarticons:image"
                width={24}
                height={24}
                className="text-primary"
              />
            </div>
            <h3 className="font-semibold text-xl">High Quality Output</h3>
            <p className="text-muted-foreground">
              Export in multiple formats and resolutions. Perfect for games, art
              projects, or social media.
            </p>
          </div>

          {/* Feature 4 */}
          <div className="space-y-4 border bg-card p-6">
            <div className="flex size-12 items-center justify-center bg-primary/10">
              <Icon
                icon="pixelarticons:lock"
                width={24}
                height={24}
                className="text-primary"
              />
            </div>
            <h3 className="font-semibold text-xl">Privacy First</h3>
            <p className="text-muted-foreground">
              Your images are processed locally in your browser. We never upload
              or store your personal photos.
            </p>
          </div>

          {/* Feature 5 */}
          <div className="space-y-4 border bg-card p-6">
            <div className="flex size-12 items-center justify-center bg-primary/10">
              <Icon
                icon="pixelarticons:device-phone"
                width={24}
                height={24}
                className="text-primary"
              />
            </div>
            <h3 className="font-semibold text-xl">Works Everywhere</h3>
            <p className="text-muted-foreground">
              Fully responsive design that works seamlessly on desktop, tablet,
              and mobile devices.
            </p>
          </div>

          {/* Feature 6 */}
          <div className="space-y-4 border bg-card p-6">
            <div className="flex size-12 items-center justify-center bg-primary/10">
              <Icon
                icon="pixelarticons:heart"
                width={24}
                height={24}
                className="text-primary"
              />
            </div>
            <h3 className="font-semibold text-xl">Free Forever</h3>
            <p className="text-muted-foreground">
              No subscriptions, no hidden fees. All features are completely free
              to use, now and always.
            </p>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="container max-w-6xl space-y-12 py-20 md:py-32">
        {/* Section Header */}
        <div className="space-y-4 text-center">
          <h2 className="font-bold text-3xl tracking-tight md:text-4xl lg:text-5xl">
            Three Simple Steps
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            Creating pixel art has never been easier
          </p>
        </div>

        {/* Steps */}
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Step 1 */}
          <div className="relative space-y-4 text-center">
            <div className="mx-auto flex size-16 items-center justify-center border-2 border-primary bg-primary/10 font-bold text-2xl text-primary">
              1
            </div>
            <h3 className="font-semibold text-xl">Upload Your Image</h3>
            <p className="text-muted-foreground">
              Drag and drop any image or click to browse from your device.
              Supports all common image formats.
            </p>
            <div className="mx-auto mt-6 size-12">
              <Icon
                icon="pixelarticons:upload"
                width={48}
                height={48}
                className="text-primary"
              />
            </div>
          </div>

          {/* Step 2 */}
          <div className="relative space-y-4 text-center">
            <div className="mx-auto flex size-16 items-center justify-center border-2 border-primary bg-primary/10 font-bold text-2xl text-primary">
              2
            </div>
            <h3 className="font-semibold text-xl">Customize Style</h3>
            <p className="text-muted-foreground">
              Adjust pixel size, colors, and effects. Preview changes in
              real-time as you tweak settings.
            </p>
            <div className="mx-auto mt-6 size-12">
              <Icon
                icon="pixelarticons:edit"
                width={48}
                height={48}
                className="text-primary"
              />
            </div>
          </div>

          {/* Step 3 */}
          <div className="relative space-y-4 text-center">
            <div className="mx-auto flex size-16 items-center justify-center border-2 border-primary bg-primary/10 font-bold text-2xl text-primary">
              3
            </div>
            <h3 className="font-semibold text-xl">Download & Share</h3>
            <p className="text-muted-foreground">
              Export your pixel art in your preferred format and resolution.
              Ready to use anywhere!
            </p>
            <div className="mx-auto mt-6 size-12">
              <Icon
                icon="pixelarticons:download"
                width={48}
                height={48}
                className="text-primary"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container py-20 md:py-32">
        <div className="mx-auto max-w-4xl border bg-gradient-to-br from-primary/10 via-transparent to-accent/10 p-12 text-center">
          <div className="space-y-6">
            <h2 className="font-bold text-3xl tracking-tight md:text-4xl lg:text-5xl">
              Ready to Create?
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
              Start transforming your images into beautiful pixel art right now.
              It's fast, free, and fun!
            </p>
            <div className="flex flex-col gap-4 pt-6 sm:flex-row sm:justify-center">
              <Button size="lg" asChild>
                <Link href="/create">
                  <Icon
                    icon="pixelarticons:sparkles"
                    width={20}
                    height={20}
                    className="mr-2"
                  />
                  Get Started Free
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/examples">
                  <Icon
                    icon="pixelarticons:image-gallery"
                    width={20}
                    height={20}
                    className="mr-2"
                  />
                  Browse Examples
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
