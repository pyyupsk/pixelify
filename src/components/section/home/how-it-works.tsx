import { Icon } from "@iconify/react";
import { steps } from "@/constants/steps";

export function HowItWorks() {
  return (
    <section className="container space-y-12 py-20 md:py-32">
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
      <div className="grid divide-y lg:grid-cols-3 lg:divide-x lg:divide-y-0">
        {steps.map((step) => (
          <div
            key={step.number}
            className="relative space-y-4 py-8 text-center lg:px-8 lg:py-0"
          >
            <div className="mx-auto flex size-16 items-center justify-center border-2 border-primary bg-primary/10 font-bold text-2xl text-primary">
              {step.number}
            </div>
            <h3 className="font-semibold text-xl">{step.title}</h3>
            <p className="mx-auto max-w-md text-muted-foreground">
              {step.description}
            </p>
            <div className="mx-auto mt-6 size-12">
              <Icon
                icon={step.icon}
                width={48}
                height={48}
                className="text-primary"
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
