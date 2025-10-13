import Link from "next/link";
import { ImageGallery, Zap } from "@/components/icons";
import { Button } from "@/components/ui/button";

export function Cta() {
  return (
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
              <Link href="/create" aria-label="Get Started Free">
                <Zap width={20} height={20} />
                Get Started Free
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/examples" aria-label="Browse Examples">
                <ImageGallery width={20} height={20} />
                Browse Examples
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
