import { Icon } from "@iconify/react";
import { features } from "@/constants/features";

export function Features() {
  return (
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
        {features.map((feature) => (
          <div key={feature.title} className="space-y-4 border bg-card p-6">
            <div className="flex size-12 items-center justify-center bg-primary/10">
              <Icon
                icon={feature.icon}
                width={24}
                height={24}
                className="text-primary"
              />
            </div>
            <h3 className="font-semibold text-xl">{feature.title}</h3>
            <p className="text-muted-foreground">{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
