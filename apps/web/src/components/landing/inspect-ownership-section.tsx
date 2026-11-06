import { ArrowUpRight, Blocks, GitFork, Unplug } from "lucide-react"

import {
  INSPECT_ILLUSTRATION_IDS,
  InspectDestinationIllustration,
} from "@/components/marketing/inspect-illustrations"
import { SectionEyebrow } from "@/components/marketing/section-eyebrow"
import { PROOF_LINKS } from "@/lib/marketing/constants"
import {
  OWNERSHIP_ACTION_ROWS,
  OWNERSHIP_METADATA_ITEMS,
} from "@/lib/marketing/content/ownership"

const METADATA_ICONS = [GitFork, Unplug, Blocks] as const

export function InspectOwnershipSection() {
  return (
    <section
      id="proof"
      className="atlas-section"
      aria-labelledby="inspect-ownership-heading"
    >
      <div className="atlas-marketing__gutter atlas-inspect-ownership">
        <div className="atlas-inspect-ownership__intro">
          <SectionEyebrow>No black boxes</SectionEyebrow>
          <h2 id="inspect-ownership-heading" className="atlas-section__title">
            Inspect the decisions,
            <br />
            then make them yours.
          </h2>
          <p className="atlas-section__body">
            Atlas is source code, documented decisions, and explicit
            conventions—not a runtime you rent. Inspect how it works, keep what
            earns its place, and change what doesn&apos;t.
          </p>
        </div>

        <div className="atlas-inspect-ownership__columns">
          <div className="atlas-inspect-ownership__column">
            <p className="atlas-inspect-ownership__column-label">Inspect</p>
            <nav
              className="atlas-inspect-ownership__inspect-list"
              aria-label="Inspect Atlas"
            >
              {PROOF_LINKS.map((link, index) => (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="atlas-inspect-ownership__inspect-row"
                >
                  <InspectDestinationIllustration
                    id={INSPECT_ILLUSTRATION_IDS[index] ?? "repository"}
                  />
                  <span className="atlas-inspect-ownership__inspect-copy">
                    <span className="atlas-inspect-ownership__inspect-heading">
                      <span className="atlas-inspect-ownership__inspect-label">
                        {link.label}
                      </span>
                      <ArrowUpRight
                        className="atlas-inspect-ownership__inspect-arrow"
                        strokeWidth={1.75}
                        aria-hidden="true"
                      />
                    </span>
                    <span className="atlas-inspect-ownership__inspect-desc">
                      {link.description}
                    </span>
                  </span>
                </a>
              ))}
            </nav>
          </div>

          <div className="atlas-inspect-ownership__column">
            <p className="atlas-inspect-ownership__column-label">Change</p>
            <ul className="atlas-inspect-ownership__change-list">
              {OWNERSHIP_ACTION_ROWS.map((row) => (
                <li
                  key={`${row.action}-${row.target}`}
                  className="atlas-inspect-ownership__change-row"
                >
                  <span className="atlas-inspect-ownership__action">
                    {row.action}
                  </span>
                  <span className="atlas-inspect-ownership__change-target">
                    {row.target}
                  </span>
                  <span className="atlas-inspect-ownership__change-detail">
                    {row.detail}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <ul
          className="atlas-inspect-ownership__metadata"
          aria-label="Ownership metadata"
        >
          {OWNERSHIP_METADATA_ITEMS.map((item, index) => {
            const Icon = METADATA_ICONS[index] ?? GitFork

            return (
              <li key={item.id} className="atlas-inspect-ownership__metadata-item">
                <Icon
                  className="atlas-inspect-ownership__metadata-icon"
                  strokeWidth={1.65}
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
