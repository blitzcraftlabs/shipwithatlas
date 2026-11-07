import { ArrowUpRight } from "lucide-react"

import { AtlasWorkspacePreview } from "@/components/marketing/atlas-workspace-preview"
import { CommandStrip } from "@/components/marketing/command-strip"
import {
  HERO_LEAD,
  INSTALL_COMMAND,
  NPM_PACKAGE_NAME,
  NPM_PACKAGE_URL,
  PLATFORM_DOCS_URL,
  PLATFORM_REPO_URL,
  SITE_EYEBROW,
} from "@/lib/marketing/constants"

const HERO_LINKS = [
  { href: PLATFORM_REPO_URL, label: "GitHub", srLabel: "Atlas on GitHub" },
  { href: NPM_PACKAGE_URL, label: "npm", srLabel: `${NPM_PACKAGE_NAME} on npm` },
  { href: PLATFORM_DOCS_URL, label: "Documentation", srLabel: "Atlas documentation" },
] as const

export function HeroSection() {
  return (
    <section className="bp-hero" aria-labelledby="hero-heading">
      <div className="atlas-marketing__gutter">
        <div className="bp-hero__copy">
          <p className="bp-tag">{SITE_EYEBROW}</p>

          <h1 id="hero-heading" className="bp-hero__title">
            The frontend decisions are{" "}
            <mark className="bp-highlight">already made</mark>.
          </h1>

          <p className="bp-hero__lead">{HERO_LEAD}</p>

          <div className="bp-install" role="group" aria-label="Create a new Atlas app">
            <CommandStrip
              command={INSTALL_COMMAND}
              copyLabel="Copy install command"
              className="bp-install__strip"
              showLabel
            />
          </div>

          <nav className="bp-hero__links" aria-label="More ways to explore Atlas">
            <ul>
              {HERO_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bp-hero__link"
                    aria-label={`${link.srLabel} (opens in a new tab)`}
                  >
                    {link.label}
                    <ArrowUpRight className="size-3.5" aria-hidden="true" />
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <AtlasWorkspacePreview className="bp-hero__demo" />
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
