import { cn } from "@atlas/ui";

import type { TerminalTranscript } from "@/lib/marketing/content/home";

interface TerminalProps {
  transcript: TerminalTranscript;
  /** Accessible name for the scrollable output region. */
  label: string;
  className?: string;
}

/**
 * Renders captured CLI output verbatim. Long lines wrap on wide screens and
 * scroll horizontally on phones, where wrapping would split paths mid-word.
 * The region is focusable so keyboard users can scroll it.
 */
export function Terminal({ transcript, label, className }: TerminalProps) {
  return (
    <figure className={cn("home-terminal", className)}>
      <figcaption className="home-terminal__bar">
        <span className="home-terminal__cwd">{transcript.title}</span>
      </figcaption>
      {/* eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex -- scrollable region must be keyboard-focusable (axe: scrollable-region-focusable) */}
      <pre className="home-terminal__body" role="region" aria-label={label} tabIndex={0}>
        <code>
          {transcript.lines.map((line, index) => (
            <span
              key={`${transcript.id}-${index}`}
              className={cn("home-terminal__line", `home-terminal__line--${line.tone}`)}
            >
              {line.tone === "command" ? (
                <span className="home-terminal__prompt" aria-hidden="true">
                  ${" "}
                </span>
              ) : null}
              {line.tone === "success" ? (
                <span className="home-terminal__check" aria-hidden="true">
                  ✓{" "}
                </span>
              ) : null}
              {line.text}
              {"\n"}
            </span>
          ))}
        </code>
      </pre>
    </figure>
  );
}
