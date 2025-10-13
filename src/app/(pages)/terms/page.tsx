import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/layout/json-ld";
import { getSiteUrl } from "@/env";
import { createBreadcrumbJsonLd, createWebPageJsonLd } from "@/lib/json-ld";
import { commonMetadata } from "@/lib/metadata";

export const metadata: Metadata = commonMetadata({
  title: "Terms of Service",
  description:
    "Read the terms and conditions for using Pixelify, our pixel art conversion tool and services.",
  canonicalPath: "/terms",
  keywords: [
    "terms of service",
    "terms and conditions",
    "user agreement",
    "service terms",
    "legal terms",
  ],
});

export default function TermsPage() {
  const siteUrl = getSiteUrl();
  return (
    <>
      <JsonLd
        data={createWebPageJsonLd(
          "Terms of Service",
          "Read the terms and conditions for using Pixelify, our pixel art conversion tool and services.",
          `${siteUrl}/terms`,
        )}
        id="terms-page-schema"
      />
      <JsonLd
        data={createBreadcrumbJsonLd([
          { name: "Home", url: "/" },
          { name: "Terms of Service", url: "/terms" },
        ])}
        id="terms-breadcrumb-schema"
      />
      <section className="container space-y-8 py-12 md:py-20">
        {/* Page Header */}
        <div className="space-y-4">
          <h1 className="font-bold text-3xl tracking-tight md:text-4xl lg:text-5xl">
            Terms of Service
          </h1>
          <p className="text-muted-foreground text-sm">
            Last updated: {new Date().toLocaleDateString()}
          </p>
          <p className="text-lg text-muted-foreground">
            Please read these terms carefully before using Pixelify. By using
            our service, you agree to these terms.
          </p>
        </div>

        {/* Content */}
        <div className="space-y-8">
          {/* Acceptance of Terms */}
          <div className="space-y-4">
            <h2 className="border-b pb-2 font-bold text-2xl tracking-tight md:text-3xl">
              Acceptance of Terms
            </h2>
            <p className="text-muted-foreground leading-7">
              By accessing and using Pixelify, you accept and agree to be bound
              by the terms and conditions of this agreement. If you do not agree
              to these terms, please do not use our service.
            </p>
          </div>

          {/* Use of Service */}
          <div className="space-y-4">
            <h2 className="border-b pb-2 font-bold text-2xl tracking-tight md:text-3xl">
              Use of Service
            </h2>
            <p className="text-muted-foreground leading-7">
              Pixelify is provided free of charge for personal and commercial
              use. You may:
            </p>
            <ul className="ml-4 list-disc space-y-2 text-muted-foreground">
              <li>Convert images to pixel art for any lawful purpose</li>
              <li>
                Use generated pixel art in personal and commercial projects
              </li>
              <li>Share and distribute pixel art created with Pixelify</li>
              <li>Access the service from any compatible device</li>
            </ul>
          </div>

          {/* Restrictions */}
          <div className="space-y-4">
            <h2 className="border-b pb-2 font-bold text-2xl tracking-tight md:text-3xl">
              Restrictions
            </h2>
            <p className="text-muted-foreground leading-7">You agree not to:</p>
            <ul className="ml-4 list-disc space-y-2 text-muted-foreground">
              <li>
                Use the service to process illegal, offensive, or copyrighted
                content without permission
              </li>
              <li>
                Attempt to reverse engineer, decompile, or extract the source
                code
              </li>
              <li>Overload or interfere with the service's infrastructure</li>
              <li>
                Use the service in a way that violates any applicable laws or
                regulations
              </li>
              <li>Impersonate others or misrepresent your affiliation</li>
            </ul>
          </div>

          {/* Intellectual Property */}
          <div className="space-y-4">
            <h2 className="border-b pb-2 font-bold text-2xl tracking-tight md:text-3xl">
              Intellectual Property
            </h2>
            <div className="space-y-3">
              <h3 className="font-semibold text-xl">Your Content</h3>
              <p className="text-muted-foreground leading-7">
                You retain all rights to the images you upload and the pixel art
                generated from them. Pixelify does not claim ownership of your
                content.
              </p>
            </div>
            <div className="space-y-3">
              <h3 className="font-semibold text-xl">Our Service</h3>
              <p className="text-muted-foreground leading-7">
                The Pixelify service, including its design, features, and
                algorithms, is protected by copyright and other intellectual
                property laws. See our{" "}
                <Link
                  href="/license"
                  className="font-medium text-primary underline decoration-2 underline-offset-4 transition-colors hover:text-primary/80"
                >
                  License
                </Link>{" "}
                page for details.
              </p>
            </div>
          </div>

          {/* Disclaimer of Warranties */}
          <div className="space-y-4">
            <h2 className="border-b pb-2 font-bold text-2xl tracking-tight md:text-3xl">
              Disclaimer of Warranties
            </h2>
            <p className="text-muted-foreground leading-7">
              Pixelify is provided "as is" without warranties of any kind,
              either express or implied. We do not guarantee that:
            </p>
            <ul className="ml-4 list-disc space-y-2 text-muted-foreground">
              <li>The service will be uninterrupted or error-free</li>
              <li>Results will meet your specific requirements</li>
              <li>All bugs or issues will be corrected</li>
              <li>The service will be available at all times</li>
            </ul>
          </div>

          {/* Limitation of Liability */}
          <div className="space-y-4">
            <h2 className="border-b pb-2 font-bold text-2xl tracking-tight md:text-3xl">
              Limitation of Liability
            </h2>
            <p className="text-muted-foreground leading-7">
              To the maximum extent permitted by law, Pixelify and its creators
              shall not be liable for any indirect, incidental, special,
              consequential, or punitive damages resulting from your use or
              inability to use the service.
            </p>
          </div>

          {/* Changes to Service */}
          <div className="space-y-4">
            <h2 className="border-b pb-2 font-bold text-2xl tracking-tight md:text-3xl">
              Changes to Service
            </h2>
            <p className="text-muted-foreground leading-7">
              We reserve the right to modify, suspend, or discontinue any part
              of Pixelify at any time without notice. We may also update these
              terms from time to time. Continued use of the service after
              changes constitutes acceptance of the new terms.
            </p>
          </div>

          {/* Governing Law */}
          <div className="space-y-4">
            <h2 className="border-b pb-2 font-bold text-2xl tracking-tight md:text-3xl">
              Governing Law
            </h2>
            <p className="text-muted-foreground leading-7">
              These terms shall be governed by and construed in accordance with
              applicable international laws. Any disputes shall be resolved in
              good faith through negotiation.
            </p>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h2 className="border-b pb-2 font-bold text-2xl tracking-tight md:text-3xl">
              Contact Us
            </h2>
            <p className="text-muted-foreground leading-7">
              If you have questions about these terms, please{" "}
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
