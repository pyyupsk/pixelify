import type { MDXComponents } from "mdx/types";
import { Card, CardGrid } from "@/components/markdown/card-grid";
import { CodeGroup } from "@/components/markdown/code-group";
import { Endpoint, EndpointList } from "@/components/markdown/endpoint-list";
import { ErrorRow, ErrorTable } from "@/components/markdown/error-table";
import { Feature, FeatureGrid } from "@/components/markdown/feature-grid";
import { Step, Steps } from "@/components/markdown/steps";

const components: MDXComponents = {
  // Custom components for documentation
  FeatureGrid,
  Feature,
  Steps,
  Step,
  CardGrid,
  Card,
  EndpointList,
  Endpoint,
  ErrorTable,
  ErrorRow,
  CodeGroup,

  // Enhanced default components
  h1: ({ children, ...props }) => (
    <h1
      className="mb-4 font-bold text-3xl tracking-tight md:text-4xl lg:text-5xl"
      {...props}
    >
      {children}
    </h1>
  ),
  h2: ({ children, ...props }) => (
    <h2
      className="mt-6 mb-4 border-b pb-2 font-bold text-2xl tracking-tight first:mt-0 md:text-3xl"
      {...props}
    >
      {children}
    </h2>
  ),
  h3: ({ children, ...props }) => (
    <h3 className="mt-4 mb-2 font-semibold text-xl" {...props}>
      {children}
    </h3>
  ),
  h4: ({ children, ...props }) => (
    <h4 className="mt-3 mb-1.5 font-semibold text-lg" {...props}>
      {children}
    </h4>
  ),
  p: ({ children, ...props }) => (
    <p className="mb-2 leading-7 [&:not(:first-child)]:mt-2" {...props}>
      {children}
    </p>
  ),
  ul: ({ children, ...props }) => (
    <ul className="my-3 ml-4 list-disc space-y-3" {...props}>
      {children}
    </ul>
  ),
  ol: ({ children, ...props }) => (
    <ol className="my-3 ml-8 list-outside list-decimal space-y-3" {...props}>
      {children}
    </ol>
  ),
  li: ({ children, ...props }) => (
    <li className="leading-7" {...props}>
      {children}
    </li>
  ),
  blockquote: ({ children, ...props }) => (
    <blockquote
      className="my-6 border-primary border-l-4 bg-muted/30 py-4 pr-4 pl-6"
      {...props}
    >
      {children}
    </blockquote>
  ),
  code: ({ children, ...props }) => (
    <code
      className="relative border bg-muted px-1.5 py-0.5 font-mono text-sm"
      {...props}
    >
      {children}
    </code>
  ),
  pre: ({ children, ...props }) => (
    <pre className="my-6 overflow-x-auto border bg-card p-4" {...props}>
      {children}
    </pre>
  ),
  a: ({ children, href, ...props }) => (
    <a
      href={href}
      className="font-medium text-primary underline decoration-2 underline-offset-4 transition-colors hover:text-primary/80"
      {...props}
    >
      {children}
    </a>
  ),
  table: ({ children, ...props }) => (
    <div className="my-8 w-full overflow-x-auto">
      <table className="w-full border-collapse border" {...props}>
        {children}
      </table>
    </div>
  ),
  th: ({ children, ...props }) => (
    <th
      className="border bg-muted px-4 py-3 text-left font-semibold [&[align=center]]:text-center [&[align=right]]:text-right"
      {...props}
    >
      {children}
    </th>
  ),
  td: ({ children, ...props }) => (
    <td
      className="border px-4 py-3 text-left [&[align=center]]:text-center [&[align=right]]:text-right"
      {...props}
    >
      {children}
    </td>
  ),
  hr: (props) => <hr className="my-12 border-border" {...props} />,
  strong: ({ children, ...props }) => (
    <strong className="font-semibold" {...props}>
      {children}
    </strong>
  ),
};

export function useMDXComponents(): MDXComponents {
  return components;
}
