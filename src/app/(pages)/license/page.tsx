import type { Metadata } from "next";
import Link from "next/link";
import { ExternalLink } from "@/components/icons";
import { JsonLd } from "@/components/layout/json-ld";
import { Button } from "@/components/ui/button";
import { getSiteUrl } from "@/env";
import { createBreadcrumbJsonLd, createWebPageJsonLd } from "@/lib/json-ld";
import { commonMetadata } from "@/lib/metadata";

export const metadata: Metadata = commonMetadata({
  title: "License",
  description:
    "View the PolyForm Noncommercial license for Pixelify. Free forever for personal and non-commercial use.",
  canonicalPath: "/license",
  keywords: [
    "license",
    "PolyForm Noncommercial",
    "free forever",
    "software license",
    "copyright",
  ],
});

export default function LicensePage() {
  const currentYear = new Date().getFullYear();
  const siteUrl = getSiteUrl();

  return (
    <>
      <JsonLd
        data={createWebPageJsonLd(
          "License",
          "View the PolyForm Noncommercial license for Pixelify. Free forever for personal and non-commercial use.",
          `${siteUrl}/license`,
        )}
        id="license-page-schema"
      />
      <JsonLd
        data={createBreadcrumbJsonLd([
          { name: "Home", url: "/" },
          { name: "License", url: "/license" },
        ])}
        id="license-breadcrumb-schema"
      />
      <section className="container space-y-8 py-12 md:py-20">
        {/* Page Header */}
        <div className="space-y-4">
          <h1 className="font-bold text-3xl tracking-tight md:text-4xl lg:text-5xl">
            License
          </h1>
          <p className="text-lg text-muted-foreground">
            Pixelify is Free Forever. Licensed under the PolyForm Noncommercial
            License 1.0.0.
          </p>
        </div>

        {/* GitHub Link */}
        <div className="border bg-card p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="space-y-1">
              <h2 className="font-semibold text-lg">View on GitHub</h2>
              <p className="text-muted-foreground text-sm">
                Explore the source code, contribute, or report issues
              </p>
            </div>
            <Button variant="outline" asChild>
              <Link
                href="https://github.com/pyyupsk/pixelify"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="View Pixelify on GitHub"
              >
                <ExternalLink width={16} height={16} />
                GitHub Repository
              </Link>
            </Button>
          </div>
        </div>

        {/* License Content */}
        <div className="space-y-8">
          {/* License Header */}
          <div className="space-y-4">
            <h2 className="border-b pb-2 font-bold text-2xl tracking-tight md:text-3xl">
              PolyForm Noncommercial License 1.0.0
            </h2>
            <p className="text-muted-foreground leading-7">
              <span className="font-mono">©</span> {currentYear} Pixelify
            </p>
            <p className="font-semibold text-lg text-primary">
              Free Forever. No subscriptions, no hidden fees.
            </p>
          </div>

          {/* You Are Permitted */}
          <div className="space-y-4">
            <h2 className="border-b pb-2 font-bold text-2xl tracking-tight md:text-3xl">
              You Are Permitted To
            </h2>
            <ul className="ml-4 list-disc space-y-2 text-muted-foreground">
              <li>View the source code</li>
              <li>Fork, modify, and contribute to the code</li>
              <li>
                Use the software for personal, educational, or non-commercial
                purposes
              </li>
            </ul>
          </div>

          {/* You May NOT */}
          <div className="space-y-4">
            <h2 className="border-b pb-2 font-bold text-2xl tracking-tight md:text-3xl">
              You May NOT
            </h2>
            <ul className="ml-4 list-disc space-y-2 text-muted-foreground">
              <li>
                Use the software or any derivative works for commercial purposes
              </li>
              <li>Sell, license, or provide the software as a paid service</li>
              <li>Circumvent the "Free Forever" promise in any way</li>
            </ul>
          </div>

          {/* What This Means */}
          <div className="space-y-4">
            <h2 className="border-b pb-2 font-bold text-2xl tracking-tight md:text-3xl">
              What This Means
            </h2>
            <p className="text-muted-foreground leading-7">
              Pixelify is completely free for personal and non-commercial use.
              You can:
            </p>
            <ul className="ml-4 list-disc space-y-2 text-muted-foreground">
              <li>Use Pixelify for your personal projects and creative work</li>
              <li>Learn from the source code and contribute improvements</li>
              <li>
                Use it for educational purposes in schools and universities
              </li>
              <li>Share it with friends and fellow creators</li>
            </ul>
            <p className="text-muted-foreground leading-7">
              However, you cannot use Pixelify or its code in commercial
              products or services without explicit permission.
            </p>
          </div>

          {/* Third-Party Licenses */}
          <div className="space-y-4">
            <h2 className="border-b pb-2 font-bold text-2xl tracking-tight md:text-3xl">
              Third-Party Dependencies
            </h2>
            <p className="text-muted-foreground leading-7">
              Pixelify uses various open source libraries and tools. Each
              dependency has its own license, which can be found in the
              project's package.json and node_modules directory. Major
              dependencies include:
            </p>
            <ul className="ml-4 list-disc space-y-2 text-muted-foreground">
              <li>Next.js (MIT License)</li>
              <li>React (MIT License)</li>
              <li>Tailwind CSS (MIT License)</li>
              <li>Jotai (MIT License)</li>
              <li>Iconify (MIT License)</li>
            </ul>
          </div>

          {/* Contributing */}
          <div className="space-y-4">
            <h2 className="border-b pb-2 font-bold text-2xl tracking-tight md:text-3xl">
              Contributing
            </h2>
            <p className="text-muted-foreground leading-7">
              Contributions to Pixelify are welcome! By contributing, you agree
              that your contributions will be licensed under the same PolyForm
              Noncommercial License that covers the project. Please visit our
              GitHub repository to:
            </p>
            <ul className="ml-4 list-disc space-y-2 text-muted-foreground">
              <li>Report bugs or request features</li>
              <li>Submit pull requests</li>
              <li>Improve documentation</li>
              <li>Share feedback and suggestions</li>
            </ul>
          </div>

          {/* Disclaimer */}
          <div className="space-y-4">
            <h2 className="border-b pb-2 font-bold text-2xl tracking-tight md:text-3xl">
              Disclaimer
            </h2>
            <p className="text-muted-foreground leading-7">
              The software is provided "as-is" without warranty of any kind,
              express or implied, including but not limited to warranties of
              merchantability or fitness for a particular purpose. The authors
              are not liable for any damages arising from the use of this
              software.
            </p>
          </div>

          {/* Questions */}
          <div className="space-y-4">
            <h2 className="border-b pb-2 font-bold text-2xl tracking-tight md:text-3xl">
              Questions
            </h2>
            <p className="text-muted-foreground leading-7">
              If you have questions about the license or commercial use cases,
              please{" "}
              <Link
                href="/contact"
                className="font-medium text-primary underline decoration-2 underline-offset-4 transition-colors hover:text-primary/80"
              >
                contact us
              </Link>
              .
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
