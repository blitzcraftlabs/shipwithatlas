import { ArrowUpRight } from "lucide-react"

import { SectionLabel } from "@/components/marketing/section-label"
import {
  CONSULTING_CTA_LABEL,
  CONTACT_MAILTO_URL,
  HEADER_PRIMARY_CTA_LABEL,
  PLATFORM_REPO_URL,
  SECONDARY_CTA_LABEL,
} from "@/lib/marketing/constants"

/**
 * The last sheet is printed the other way round: white linework on Atlas
 * blue, the classic blueprint, so the page ends on its identity colour.
 */
export function ClosingSection() {
  return (
    <section className="bp-closing" aria-labelledby="closing-heading">
      <div className="atlas-marketing__gutter bp-closing__inner">
        <SectionLabel index="10" tone="inverse">
          {HEADER_PRIMARY_CTA_LABEL}
        </SectionLabel>
        <h2 id="closing-heading" className="bp-closing__title">
          Bring this approach
          {" "}<br />
          to your frontend.
        </h2>
        <p className="bp-closing__body">
          Whether you&apos;re starting a product, cleaning up an existing
          frontend, or trying to make agent-written code more predictable, I can
          help design and implement the foundation with your team.
        </p>
        <div className="bp-closing__actions">
          <a href={CONTACT_MAILTO_URL} className="bp-button bp-button--paper">
            {CONSULTING_CTA_LABEL}
          </a>
          <a
            href={PLATFORM_REPO_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="bp-button bp-button--ghost-inverse"
          >
            {SECONDARY_CTA_LABEL}
            <ArrowUpRight className="size-4" strokeWidth={2} aria-hidden="true" />
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
        </div>
      </div>
    </section>
  )
}
