import { ArrowUpRight, Blocks, GitFork, Unplug } from "lucide-react"

import {
  INSPECT_ILLUSTRATION_IDS,
  InspectDestinationIllustration,
} from "@/components/marketing/inspect-illustrations"
import { SectionLabel } from "@/components/marketing/section-label"
import { HOME_SECTION_IDS, PLATFORM_REPO_URL, PROOF_LINKS } from "@/lib/marketing/constants"
import {
  OWNERSHIP_ACTION_ROWS,
  OWNERSHIP_METADATA_ITEMS,
} from "@/lib/marketing/content/ownership"

const METADATA_ICONS = [GitFork, Unplug, Blocks] as const

/** Repository-relative path shown under each destination, e.g. `.github/workflows`. */
function displayPath(href: string) {
  const path = href
    .replace(PLATFORM_REPO_URL, "")
    .replace(/^\/(tree|blob)\/main\//, "")
  return path === "" ? "blitzcraftlabs/atlas" : path
}

export function InspectOwnershipSection() {
  return (
    <section
      id={HOME_SECTION_IDS.proof}
      className="bp-section bp-section--paper bp-inspect"
      aria-labelledby="inspect-ownership-heading"
    >
      <div className="atlas-marketing__gutter">
        <header className="bp-section-head bp-section-head--split">
          <div>
            <SectionLabel index="07">No black boxes</SectionLabel>
            <h2 id="inspect-ownership-heading" className="bp-h2">
              Inspect the decisions,
              {" "}<br />
              then make them yours.
            </h2>
          </div>
          <p className="bp-lead">
            Atlas is source code, documented decisions, and explicit
            conventions, not a runtime you rent. Inspect how it works, keep what
            earns its place, and change what doesn&apos;t.
          </p>
        </header>

        <div className="bp-inspect__group">
          <h3 className="bp-inspect__group-label">Inspect</h3>
          <nav aria-label="Inspect Atlas">
            <ul className="bp-inspect__links">
              {PROOF_LINKS.map((link, index) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bp-inspect__link"
                  >
                    <span className="bp-inspect__art">
                      <InspectDestinationIllustration
                        id={INSPECT_ILLUSTRATION_IDS[index] ?? "repository"}
                      />
                    </span>
                    <span className="bp-inspect__link-label">
                      {link.label}
                      <span className="sr-only"> (opens in a new tab)</span>
                    </span>
                    <span className="bp-inspect__link-desc">
                      {link.description}
                    </span>
                    <span className="bp-inspect__link-path">
                      <code>{displayPath(link.href)}</code>
                      <ArrowUpRight
                        className="bp-inspect__arrow"
                        strokeWidth={2}
                        aria-hidden="true"
                      />
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="bp-inspect__group">
          <h3 className="bp-inspect__group-label">Change</h3>
          <ul className="bp-inspect__changes">
            {OWNERSHIP_ACTION_ROWS.map((row) => (
              <li
                key={`${row.action}-${row.target}`}
                className="bp-inspect__change"
              >
                <span className="bp-inspect__action">{row.action}</span>
                {/[/.]/.test(row.target) ? (
                  <code className="bp-inspect__target">{row.target}</code>
                ) : (
                  <span className="bp-inspect__target bp-inspect__target--text">
                    {row.target}
                  </span>
                )}
                <span className="bp-inspect__detail">{row.detail}</span>
              </li>
            ))}
          </ul>
        </div>

        <ul className="bp-inspect__meta" aria-label="Ownership metadata">
          {OWNERSHIP_METADATA_ITEMS.map((item, index) => {
            const Icon = METADATA_ICONS[index] ?? GitFork

            return (
              <li key={item.id}>
                <Icon
                  className="bp-inspect__meta-icon"
                  strokeWidth={1.75}
                  aria-hidden="true"
                />
                <span>{item.label}</span>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
