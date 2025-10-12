"use client";

import { Icon } from "@iconify/react";
import Link from "next/link";
import { useState } from "react";
import { ExampleCard } from "@/components/section/examples/example-card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { categories, examples } from "@/constants/examples";

export default function ExamplesPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const filteredExamples =
    selectedCategory === "all"
      ? examples
      : examples.filter((example) => example.category === selectedCategory);

  return (
    <section className="container space-y-8 py-12 md:py-20">
      <div className="space-y-4 text-center">
        <h1 className="font-bold text-3xl tracking-tight md:text-4xl lg:text-5xl">
          Example Gallery
        </h1>
        <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
          Explore different styles and settings to inspire your pixel art
          creations
        </p>
      </div>

      {/* Category Filter */}
      <div className="flex flex-col items-center space-y-4">
        <div className="flex items-center gap-2">
          <Icon
            icon="pixelarticons:filter"
            width={20}
            height={20}
            className="text-muted-foreground"
          />
          <span className="font-medium text-sm">Filter by Category</span>
        </div>
        <RadioGroup
          value={selectedCategory}
          onValueChange={setSelectedCategory}
          className="flex flex-wrap justify-center gap-3"
        >
          {categories.map((category) => (
            <label
              key={category.value}
              htmlFor={`category-${category.value}`}
              className="flex cursor-pointer items-center gap-2 border bg-card px-4 py-2 transition-colors hover:bg-accent"
            >
              <RadioGroupItem
                value={category.value}
                id={`category-${category.value}`}
              />
              <span className="text-sm">{category.label}</span>
            </label>
          ))}
        </RadioGroup>
      </div>

      {/* Info Banner */}
      <div className="mx-auto flex max-w-2xl items-center gap-4 border border-primary/20 bg-primary/5 p-4">
        <Icon
          icon="pixelarticons:info"
          width={24}
          height={24}
          className="shrink-0 text-primary"
        />
        <p className="text-sm">
          <strong>Hover over images</strong> to see the pixel art
          transformation. Click "Try These Settings" to apply the same
          configuration to your own images.
        </p>
      </div>

      {/* Examples Grid */}
      {filteredExamples.length > 0 ? (
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {filteredExamples.map((example) => (
            <ExampleCard
              key={example.id}
              title={example.title}
              description={example.description}
              category={example.category}
              settings={example.settings}
              originalUrl={example.originalUrl}
            />
          ))}
        </div>
      ) : (
        <div className="py-20 text-center">
          <Icon
            icon="pixelarticons:image-x"
            width={48}
            height={48}
            className="mx-auto mb-4 text-muted-foreground"
          />
          <p className="text-muted-foreground">
            No examples found in this category
          </p>
        </div>
      )}

      {/* CTA Section */}
      <div className="border-t pt-12">
        <div className="mx-auto max-w-2xl space-y-6 text-center">
          <h2 className="font-bold text-3xl tracking-tight md:text-4xl lg:text-5xl">
            Ready to Create Your Own?
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            Upload your own images and experiment with different settings to
            create unique pixel art
          </p>
          <Button size="lg" asChild>
            <Link href="/create" aria-label="Start Creating">
              <Icon icon="pixelarticons:sparkles" width={20} height={20} />
              Start Creating
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
