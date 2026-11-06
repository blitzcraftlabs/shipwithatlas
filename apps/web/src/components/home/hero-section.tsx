import { ArrowUpRight, BookOpen } from "lucide-react";

import { buttonVariants, cn } from "@atlas/ui";

import { GitHubMark } from "@/components/home/github-mark";
import { Terminal } from "@/components/home/terminal";
import { CommandStrip } from "@/components/marketing/command-strip";
import {
  GET_STARTED_HASH,
  INSTALL_COMMAND,
  NPM_PACKAGE_NAME,
  NPM_PACKAGE_URL,
  PLATFORM_DOCS_URL,
  PLATFORM_REPO_URL,
  PREREQUISITES,
  SITE_EYEBROW,
  SITE_SUPPORTING,
} from "@/lib/marketing/constants";
import { INIT_TRANSCRIPT } from "@/lib/marketing/content/home";

export function HeroSection() {
  return (
    <section className="home-hero" aria-labelledby="hero-heading">
      <div className="home-container home-hero__grid">
        <div className="home-hero__copy">
          <p className="home-label">{SITE_EYEBROW}</p>
          <h1 id="hero-heading" className="home-hero__title">
            The frontend decisions are already made.
          </h1>
          <p className="home-hero__lead">{SITE_SUPPORTING}</p>

          <div className="home-hero__install" role="group" aria-labelledby="hero-install-label">
            <p id="hero-install-label" className="home-hero__install-label">
              Create a new Atlas app
            </p>
            <CommandStrip
              command={INSTALL_COMMAND}
              copyLabel="Copy install command"
              className="home-install-strip"
            />
            <p className="home-hero__install-meta">
              Needs{" "}
              {PREREQUISITES.map((item, index) => (
                <span key={item.name}>
                  {index > 0 ? " and " : null}
                  {item.name} <code>{item.version}</code>
                </span>
              ))}
              .{" "}
              <a href={GET_STARTED_HASH} className="home-link">
                Full quick start
              </a>
            </p>
          </div>

          <div className="home-hero__actions" role="group" aria-label="More ways to explore Atlas">
            <a
              href={PLATFORM_REPO_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(buttonVariants({ variant: "outline" }), "atlas-btn-secondary home-btn")}
            >
              <GitHubMark className="size-4" />
              View the repository
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
            <a
              href={PLATFORM_DOCS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(buttonVariants({ variant: "outline" }), "atlas-btn-secondary home-btn")}
            >
              <BookOpen className="size-4" aria-hidden="true" />
              Read the docs
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
            <a
              href={NPM_PACKAGE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="home-link home-hero__npm"
            >
              {NPM_PACKAGE_NAME} on npm
              <ArrowUpRight className="home-link__arrow" aria-hidden="true" />
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          </div>
        </div>

        <Terminal
          transcript={INIT_TRANSCRIPT}
          label="Output of atlas init my-app --dry-run"
          className="home-hero__terminal"
        />
      </div>
    </section>
  );
}
