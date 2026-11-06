import { ArrowUpRight } from "lucide-react";

import { cn } from "@atlas/ui";

interface ExternalLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
}

/** Inline text link that opens in a new tab and says so to screen readers. */
export function ExternalLink({ href, children, className }: ExternalLinkProps) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={cn("home-link", className)}>
      {children}
      <ArrowUpRight className="home-link__arrow" aria-hidden="true" />
      <span className="sr-only"> (opens in a new tab)</span>
    </a>
  );
}
