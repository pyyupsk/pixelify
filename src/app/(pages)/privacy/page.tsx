import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/layout/json-ld";
import { getSiteUrl } from "@/env";
import { createBreadcrumbJsonLd, createWebPageJsonLd } from "@/lib/json-ld";
import { commonMetadata } from "@/lib/metadata";

export const metadata: Metadata = commonMetadata({
  title: "Privacy Policy",
  description:
    "Learn how Pixelify handles your data and protects your privacy when you use our pixel art converter.",
  canonicalPath: "/privacy",
  keywords: [
    "privacy policy",
    "data protection",
    "user privacy",
    "data security",
    "GDPR",
  ],
});

export default function PrivacyPage() {
  const siteUrl = getSiteUrl();
  return (
    <>
      <JsonLd
        data={createWebPageJsonLd(
          "Privacy Policy",
          "Learn how Pixelify handles your data and protects your privacy when you use our pixel art converter.",
          `${siteUrl}/privacy`,
        )}
        id="privacy-page-schema"
      />
      <JsonLd
        data={createBreadcrumbJsonLd([
          { name: "Home", url: "/" },
          { name: "Privacy Policy", url: "/privacy" },
        ])}
        id="privacy-breadcrumb-schema"
      />
      <section className="container space-y-8 py-12 md:py-20">
        {/* Page Header */}
        <div className="space-y-4">
          <h1 className="font-bold text-3xl tracking-tight md:text-4xl lg:text-5xl">
            Privacy Policy
          </h1>
          <p className="text-muted-foreground text-sm">
            Last updated: {new Date().toLocaleDateString()}
          </p>
          <p className="text-lg text-muted-foreground">
            Your privacy is important to us. This policy explains how Pixelify
            handles your data when you use our service.
          </p>
        </div>

        {/* Content */}
        <div className="space-y-8">
          {/* Data Processing */}
          <div className="space-y-4">
            <h2 className="border-b pb-2 font-bold text-2xl tracking-tight md:text-3xl">
              Data Processing
            </h2>
            <p className="text-muted-foreground leading-7">
              Pixelify processes your images entirely in your browser. We do not
              store, transmit, or retain any images you upload to our service.
              All pixel art conversion happens locally on your device.
            </p>
          </div>

          {/* Information We Collect */}
          <div className="space-y-4">
            <h2 className="border-b pb-2 font-bold text-2xl tracking-tight md:text-3xl">
              Information We Collect
            </h2>
            <div className="space-y-3">
              <h3 className="font-semibold text-xl">Usage Data</h3>
              <p className="text-muted-foreground leading-7">
                We may collect anonymous usage statistics to improve our
                service, including:
              </p>
              <ul className="ml-4 list-disc space-y-2 text-muted-foreground">
                <li>Pages visited and features used</li>
                <li>Browser type and operating system</li>
                <li>General location (country level)</li>
                <li>Performance metrics and error reports</li>
              </ul>
            </div>
            <div className="space-y-3">
              <h3 className="font-semibold text-xl">Cookies</h3>
              <p className="text-muted-foreground leading-7">
                We use essential cookies to maintain your preferences and
                improve your experience. These cookies do not track personal
                information.
              </p>
            </div>
          </div>

          {/* Your Images */}
          <div className="space-y-4">
            <h2 className="border-b pb-2 font-bold text-2xl tracking-tight md:text-3xl">
              Your Images
            </h2>
            <p className="text-muted-foreground leading-7">
              Images you upload are processed entirely in your browser using
              client-side JavaScript. Your images:
            </p>
            <ul className="ml-4 list-disc space-y-2 text-muted-foreground">
              <li>Never leave your device</li>
              <li>Are not uploaded to our servers</li>
              <li>Are not stored or cached by Pixelify</li>
              <li>Are cleared when you close or refresh the page</li>
            </ul>
          </div>

          {/* Third-Party Services */}
          <div className="space-y-4">
            <h2 className="border-b pb-2 font-bold text-2xl tracking-tight md:text-3xl">
              Third-Party Services
            </h2>
            <p className="text-muted-foreground leading-7">
              Pixelify may use third-party services for analytics and hosting.
              These services may collect data according to their own privacy
              policies. We recommend reviewing their policies:
            </p>
            <ul className="ml-4 list-disc space-y-2 text-muted-foreground">
              <li>Vercel (hosting and analytics)</li>
              <li>GitHub (source code repository)</li>
            </ul>
          </div>

          {/* Data Security */}
          <div className="space-y-4">
            <h2 className="border-b pb-2 font-bold text-2xl tracking-tight md:text-3xl">
              Data Security
            </h2>
            <p className="text-muted-foreground leading-7">
              Since your images are processed locally and never transmitted to
              our servers, your data remains secure on your device. We use
              industry-standard security measures to protect our website and any
              collected analytics data.
            </p>
          </div>

          {/* Your Rights */}
          <div className="space-y-4">
            <h2 className="border-b pb-2 font-bold text-2xl tracking-tight md:text-3xl">
              Your Rights
            </h2>
            <p className="text-muted-foreground leading-7">
              You have the right to:
            </p>
            <ul className="ml-4 list-disc space-y-2 text-muted-foreground">
              <li>Use Pixelify without providing personal information</li>
              <li>Clear your browser cookies and local storage</li>
              <li>Request information about data we may have collected</li>
              <li>Contact us with privacy-related questions</li>
            </ul>
          </div>

          {/* Changes to This Policy */}
          <div className="space-y-4">
            <h2 className="border-b pb-2 font-bold text-2xl tracking-tight md:text-3xl">
              Changes to This Policy
            </h2>
            <p className="text-muted-foreground leading-7">
              We may update this privacy policy from time to time. We will
              notify users of any significant changes by updating the "Last
              updated" date at the top of this page.
            </p>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h2 className="border-b pb-2 font-bold text-2xl tracking-tight md:text-3xl">
              Contact Us
            </h2>
            <p className="text-muted-foreground leading-7">
              If you have questions about this privacy policy, please{" "}
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
