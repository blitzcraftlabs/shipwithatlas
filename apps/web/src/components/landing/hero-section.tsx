import { ArrowUpRight } from "lucide-react"

import { buttonVariants, cn } from "@atlas/ui"

import { CommandStrip } from "@/components/marketing/command-strip"
import { HeroCodeTabs } from "@/components/marketing/hero-code-tabs"
import { SectionEyebrow } from "@/components/marketing/section-eyebrow"
import {
  GET_STARTED_HASH,
  INSTALL_COMMAND,
  NPM_PACKAGE_NAME,
  NPM_PACKAGE_URL,
  PLATFORM_REPO_URL,
  PREREQUISITES,
  PRIMARY_CTA_LABEL,
  REFERENCE_APP_URL,
  SECONDARY_CTA_LABEL,
  SITE_EYEBROW,
  SITE_SUPPORTING,
} from "@/lib/marketing/constants"

export function HeroSection() {
  return (
    <section className="atlas-hero" aria-labelledby="hero-heading">
      <div className="atlas-marketing__gutter atlas-hero__grid">
        <div className="atlas-hero__copy">
          <SectionEyebrow>{SITE_EYEBROW}</SectionEyebrow>
          <h1 id="hero-heading" className="atlas-hero__title">
            <span className="atlas-hero__title-line">The frontend decisions</span>
            <span className="atlas-hero__title-line">
              <span className="atlas-emphasis">are already made</span>.
            </span>
          </h1>
          <p className="atlas-hero__lead">{SITE_SUPPORTING}</p>
          <div
            className="atlas-hero__install"
            role="group"
            aria-labelledby="hero-install-label"
          >
            <p id="hero-install-label" className="atlas-hero__install-label">
              Create a new Atlas app
            </p>
            <CommandStrip
              command={INSTALL_COMMAND}
              copyLabel="Copy install command"
              className="atlas-hero__install-strip"
            />
            <p className="atlas-hero__install-meta">
              <span>
                Requires{" "}
                {PREREQUISITES.map((item, index) => (
                  <span key={item.name}>
                    {index > 0 ? " and " : null}
                    {item.name} <code>{item.version}</code>
                  </span>
                ))}
              </span>
              <span className="atlas-hero__install-sep" aria-hidden="true">
                ·
              </span>
              <a
                href={NPM_PACKAGE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="atlas-hero__install-link"
              >
                {NPM_PACKAGE_NAME} on npm
                <ArrowUpRight className="size-3" aria-hidden="true" />
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
              <span className="atlas-hero__install-sep" aria-hidden="true">
                ·
              </span>
              <a href={GET_STARTED_HASH} className="atlas-hero__install-link">
                Quick start guide
              </a>
            </p>
          </div>
          <div
            className="atlas-hero__actions"
            role="group"
            aria-label="More ways to explore Atlas"
          >
            {[
              { href: REFERENCE_APP_URL, label: PRIMARY_CTA_LABEL },
              { href: PLATFORM_REPO_URL, label: SECONDARY_CTA_LABEL },
            ].map((action) => (
              <a
                key={action.href}
                href={action.href}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  buttonVariants({ variant: "outline" }),
                  "atlas-btn-secondary atlas-hero__secondary-action"
                )}
              >
                {action.label}
                <ArrowUpRight data-icon="inline-end" aria-hidden="true" />
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            ))}
          </div>
        </div>

        <HeroCodeTabs />
      </div>
    </section>
  )
}
