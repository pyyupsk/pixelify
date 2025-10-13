import type { Metadata } from "next";
import Link from "next/link";
import { Clock } from "@/components/icons";
import { JsonLd } from "@/components/layout/json-ld";
import { contacts } from "@/constants/contats";
import { getSiteUrl } from "@/env";
import { createBreadcrumbJsonLd, createWebPageJsonLd } from "@/lib/json-ld";
import { commonMetadata } from "@/lib/metadata";

export const metadata: Metadata = commonMetadata({
  title: "Contact",
  description:
    "Get in touch with the Pixelify team. Report issues, ask questions, or share feedback about our pixel art converter.",
  canonicalPath: "/contact",
  keywords: [
    "contact",
    "support",
    "feedback",
    "help",
    "get in touch",
    "report issue",
  ],
});

export default function ContactPage() {
  const siteUrl = getSiteUrl();
  return (
    <>
      <JsonLd
        data={createWebPageJsonLd(
          "Contact",
          "Get in touch with the Pixelify team. Report issues, ask questions, or share feedback about our pixel art converter.",
          `${siteUrl}/contact`,
        )}
        id="contact-page-schema"
      />
      <JsonLd
        data={createBreadcrumbJsonLd([
          { name: "Home", url: "/" },
          { name: "Contact", url: "/contact" },
        ])}
        id="contact-breadcrumb-schema"
      />
      <section className="container space-y-8 py-12 md:py-20">
        {/* Page Header */}
        <div className="space-y-4 text-center">
          <h1 className="font-bold text-3xl tracking-tight md:text-4xl lg:text-5xl">
            Contact Us
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            Have questions, feedback, or need support? We'd love to hear from
            you. Choose your preferred way to get in touch.
          </p>
        </div>

        {/* Contact Methods Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {contacts.map((method) => {
            const IconComponent = method.icon;
            return (
              <Link
                key={method.title}
                href={method.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group border bg-card p-6 transition-colors hover:border-primary"
                aria-label={`Contact via ${method.title}`}
              >
                <div className="space-y-4">
                  {/* Icon */}
                  <div className="flex size-12 items-center justify-center bg-primary/10">
                    <IconComponent
                      width={24}
                      height={24}
                      className="text-primary"
                    />
                  </div>

                  {/* Content */}
                  <div className="space-y-2">
                    <h2 className="font-semibold text-lg">{method.title}</h2>
                    <p className="text-muted-foreground text-sm">
                      {method.description}
                    </p>
                  </div>

                  {/* Link */}
                  <div className="flex items-center gap-2 text-primary text-sm transition-colors group-hover:text-primary/80">
                    <span>{method.label}</span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Additional Information */}
        <div className="space-y-8">
          {/* Response Time */}
          <div className="border bg-card p-6">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Clock width={24} height={24} className="text-primary" />
                <h2 className="font-semibold text-lg">Response Time</h2>
              </div>
              <p className="text-muted-foreground leading-7">
                We typically respond to inquiries within 24-48 hours during
                business days. For urgent technical issues, please use GitHub
                Issues for faster community support.
              </p>
            </div>
          </div>

          {/* FAQs */}
          <div className="space-y-4">
            <h2 className="border-b pb-2 font-bold text-2xl tracking-tight md:text-3xl">
              Before You Contact
            </h2>
            <p className="text-muted-foreground leading-7">
              You might find answers to common questions in our{" "}
              <Link
                href="/docs"
                className="font-medium text-primary underline decoration-2 underline-offset-4 transition-colors hover:text-primary/80"
              >
                documentation
              </Link>
              . Here are some resources that might help:
            </p>
            <ul className="ml-4 list-disc space-y-2 text-muted-foreground">
              <li>
                <Link
                  href="/docs"
                  className="transition-colors hover:text-foreground"
                >
                  Getting Started Guide
                </Link>
              </li>
              <li>
                <Link
                  href="/examples"
                  className="transition-colors hover:text-foreground"
                >
                  Example Gallery
                </Link>
              </li>
              <li>
                <Link
                  href="https://github.com/pyyupsk/pixelify/issues"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-foreground"
                >
                  Known Issues on GitHub
                </Link>
              </li>
            </ul>
          </div>

          {/* Project Information */}
          <div className="space-y-4">
            <h2 className="border-b pb-2 font-bold text-2xl tracking-tight md:text-3xl">
              About the Project
            </h2>
            <p className="text-muted-foreground leading-7">
              Pixelify is an open source project created and maintained by{" "}
              <Link
                href="https://github.com/pyyupsk"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-primary underline decoration-2 underline-offset-4 transition-colors hover:text-primary/80"
              >
                Pongsakorn Thipayanate
              </Link>
              . Contributions, bug reports, and feedback from the community are
              always welcome.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
