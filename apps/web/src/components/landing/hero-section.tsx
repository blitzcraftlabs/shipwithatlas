import { ArrowDown, ArrowUpRight } from "lucide-react"
import * as React from "react"

import { AtlasWorkspaceBlueprint } from "@/components/marketing/atlas-workspace-blueprint"
import { CommandStrip } from "@/components/marketing/command-strip"
import {
  GET_STARTED_HASH,
  HERO_LEAD,
  HERO_STACK_NOTE,
  INSTALL_COMMAND,
  NPM_PACKAGE_NAME,
  NPM_PACKAGE_URL,
  PLATFORM_DOCS_URL,
  PLATFORM_REPO_URL,
  PREREQUISITES,
  QUICK_START_CTA_LABEL,
  SECONDARY_CTA_LABEL,
  SITE_EYEBROW,
} from "@/lib/marketing/constants"

export function HeroSection() {
  return (
    <section className="bp-hero" aria-labelledby="hero-heading">
      <div className="atlas-marketing__gutter bp-hero__grid">
        <div className="bp-hero__copy">
          <p className="bp-tag">{SITE_EYEBROW}</p>

          <h1 id="hero-heading" className="bp-hero__title">
            <span className="bp-hero__title-line">The frontend</span>{" "}
            <span className="bp-hero__title-line">decisions are</span>{" "}
            <span className="bp-hero__title-line">
              <mark className="bp-highlight">already made</mark>.
            </span>
          </h1>

          <p className="bp-hero__lead">{HERO_LEAD}</p>

          <div
            className="bp-install"
            role="group"
            aria-labelledby="hero-install-label"
          >
            <p id="hero-install-label" className="bp-install__label">
              Create a new Atlas app
            </p>
            <CommandStrip
              command={INSTALL_COMMAND}
              copyLabel="Copy install command"
              className="bp-install__strip"
              showLabel
            />
            <div className="bp-install__meta">
              <p className="bp-install__requires">
                <span className="bp-install__requires-key">Requires</span>{" "}
                {PREREQUISITES.map((item, index) => (
                  <span key={item.name} className="bp-install__requires-item">
                    {index > 0 ? <span className="sr-only">and </span> : null}
                    {item.name} <code>{item.version}</code>
                  </span>
                ))}
              </p>
              <p className="bp-install__links">
                <a
                  href={NPM_PACKAGE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bp-link"
                >
                  {NPM_PACKAGE_NAME} on npm
                  <ArrowUpRight className="size-3.5" aria-hidden="true" />
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
                <a
                  href={PLATFORM_DOCS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bp-link"
                >
                  Docs
                  <ArrowUpRight className="size-3.5" aria-hidden="true" />
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              </p>
            </div>
          </div>

          <div
            className="bp-hero__actions"
            role="group"
            aria-label="More ways to explore Atlas"
          >
            <a href={GET_STARTED_HASH} className="bp-button bp-button--outline">
              {QUICK_START_CTA_LABEL}
              <ArrowDown className="size-4" aria-hidden="true" />
            </a>
            <a
              href={PLATFORM_REPO_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="bp-button bp-button--quiet"
            >
              {SECONDARY_CTA_LABEL}
              <ArrowUpRight className="size-4" aria-hidden="true" />
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          </div>

          <p className="bp-hero__stack">
            <span className="bp-hero__stack-key">Built on</span>{" "}
            {HERO_STACK_NOTE.map((item, index) => (
              <React.Fragment key={item}>
                {index > 0 ? (
                  <span className="bp-hero__stack-sep" aria-hidden="true">
                    {" / "}
                  </span>
                ) : null}
                <span className="bp-hero__stack-item">{item}</span>
              </React.Fragment>
            ))}
          </p>
        </div>

        <AtlasWorkspaceBlueprint className="bp-hero__art" />
      </div>

      {/* Sheet edge: a measured rule that hands the page to the next section */}
      <div className="bp-hero__edge" aria-hidden="true">
        <div className="atlas-marketing__gutter">
          <span className="bp-hero__edge-label">01 · properties</span>
        </div>
      </div>
    </section>
  )
}
