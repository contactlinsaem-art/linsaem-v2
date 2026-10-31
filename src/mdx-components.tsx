import type { MDXComponents } from "mdx/types";
import Link from "next/link";

/** Composants utilisés par les articles MDX : les liens internes passent par next/link. */
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    a: ({ href = "", children, ...props }) =>
      href.startsWith("/") ? (
        <Link href={href} {...props}>
          {children}
        </Link>
      ) : (
        <a href={href} target="_blank" rel="noopener noreferrer" {...props}>
          {children}
        </a>
      ),
    ...components,
  };
}
