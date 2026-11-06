import { ArrowUpRight } from "lucide-react"

import { Button } from "@atlas/ui"

import { SectionEyebrow } from "@/components/marketing/section-eyebrow"
import {
  CONSULTING_CTA_LABEL,
  CONTACT_MAILTO_URL,
  HEADER_PRIMARY_CTA_LABEL,
  PLATFORM_REPO_URL,
  SECONDARY_CTA_LABEL,
} from "@/lib/marketing/constants"

export function ClosingSection() {
  return (
    <section className="atlas-closing" aria-labelledby="closing-heading">
      <div className="atlas-marketing__gutter atlas-closing__inner">
        <SectionEyebrow centered>{HEADER_PRIMARY_CTA_LABEL}</SectionEyebrow>
        <h2 id="closing-heading" className="atlas-closing__title">
          Bring this approach
          <br />
          to your frontend.
        </h2>
        <p className="atlas-closing__body">
          Whether you&apos;re starting a product, cleaning up an existing
          frontend, or trying to make agent-written code more predictable, I can
          help design and implement the foundation with your team.
        </p>
        <div className="atlas-closing__actions">
          <Button
            nativeButton={false}
            render={<a href={CONTACT_MAILTO_URL}>{CONSULTING_CTA_LABEL}</a>}
            size="lg"
            className="atlas-btn-primary"
          />
          <Button
            nativeButton={false}
            render={
              <a
                href={PLATFORM_REPO_URL}
                target="_blank"
                rel="noopener noreferrer"
              >
                {SECONDARY_CTA_LABEL}
                <ArrowUpRight
                  className="atlas-closing__repo-arrow"
                  strokeWidth={1.75}
                  aria-hidden="true"
                />
              </a>
            }
            variant="outline"
            size="lg"
            className="atlas-btn-secondary atlas-closing__repo-link"
          />
        </div>
      </div>
    </section>
  )
}
