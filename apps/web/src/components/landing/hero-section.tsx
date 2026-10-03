import { Button } from "@atlas/ui"

import { CommandStrip } from "@/components/marketing/command-strip"
import { HeroCodeTabs } from "@/components/marketing/hero-code-tabs"
import { SectionEyebrow } from "@/components/marketing/section-eyebrow"
import {
  PLATFORM_REPO_URL,
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
          <div className="atlas-hero__actions">
            <Button
              nativeButton={false}
              render={
                <a
                  href={REFERENCE_APP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {PRIMARY_CTA_LABEL}
                </a>
              }
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
                </a>
              }
              variant="outline"
              size="lg"
              className="atlas-btn-secondary"
            />
          </div>
          <CommandStrip />
        </div>

        <HeroCodeTabs />
      </div>
    </section>
  )
}
