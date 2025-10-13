import { memo } from "react";
import type { Thing, WithContext } from "schema-dts";
import { sanitizeJsonLd } from "@/lib/sanitize";

type Props = {
  data:
    | WithContext<Thing>
    | Record<string, unknown>
    | Array<WithContext<Thing>>;
  id?: string;
};

export const JsonLd = memo(function JsonLd({ data, id }: Readonly<Props>) {
  const jsonString = JSON.stringify(data, null, 2);

  return (
    <script
      id={id}
      type="application/ld+json"
      // biome-ignore lint/security/noDangerouslySetInnerHtml: Sanitized to prevent XSS in script tags
      dangerouslySetInnerHTML={{ __html: sanitizeJsonLd(jsonString) }}
    />
  );
});
