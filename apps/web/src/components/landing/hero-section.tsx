import { ArrowUpRight } from "lucide-react"

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
  PRIMARY_CTA_LABEL,
  REFERENCE_APP_URL,
  SECONDARY_CTA_LABEL,
  SITE_EYEBROW,
} from "@/lib/marketing/constants"

const SECONDARY_ACTIONS = [
  { href: PLATFORM_REPO_URL, label: SECONDARY_CTA_LABEL, tone: "ink" },
  { href: REFERENCE_APP_URL, label: PRIMARY_CTA_LABEL, tone: "outline" },
] as const

export function HeroSection() {
  return (
    <section className="bp-hero" aria-labelledby="hero-heading">
      <div className="atlas-marketing__gutter bp-hero__grid">
        <div className="bp-hero__copy">
          <p className="bp-tag">
            {SITE_EYEBROW}
          </p>

          <h1 id="hero-heading" className="bp-hero__title">
            <span className="bp-hero__title-line">The frontend</span>{" "}
            <span className="bp-hero__title-line">decisions are</span>{" "}
            <span className="bp-hero__title-line">
              <mark className="bp-highlight">already made</mark>.
            </span>
          </h1>

          <p className="bp-hero__lead">{HERO_LEAD}</p>

          <ul className="bp-hero__stack" aria-label="Built on">
            {HERO_STACK_NOTE.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>

          <div
            className="bp-install"
            role="group"
            aria-labelledby="hero-install-label"
          >
            <div className="bp-install__head">
              <p id="hero-install-label" className="bp-install__label">
                Create a new Atlas app
              </p>
              <p className="bp-install__requires">
                {PREREQUISITES.map((item, index) => (
                  <span key={item.name}>
                    {index > 0 ? <span aria-hidden="true"> · </span> : null}
                    {index > 0 ? <span className="sr-only">and </span> : null}
                    {item.name} <code>{item.version}</code>
                  </span>
                ))}
              </p>
            </div>
            <CommandStrip
              command={INSTALL_COMMAND}
              copyLabel="Copy install command"
              className="bp-install__strip"
            />
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
              <a href={GET_STARTED_HASH} className="bp-link">
                Quick start guide
              </a>
              <a
                href={PLATFORM_DOCS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="bp-link"
              >
                Documentation
                <ArrowUpRight className="size-3.5" aria-hidden="true" />
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            </p>
          </div>

          <div
            className="bp-hero__actions"
            role="group"
            aria-label="More ways to explore Atlas"
          >
            {SECONDARY_ACTIONS.map((action) => (
              <a
                key={action.href}
                href={action.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`bp-button bp-button--${action.tone}`}
              >
                {action.label}
                <ArrowUpRight className="size-4" aria-hidden="true" />
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            ))}
          </div>
        </div>

        <AtlasWorkspaceBlueprint className="bp-hero__art" />
      </div>
    </section>
  )
}
