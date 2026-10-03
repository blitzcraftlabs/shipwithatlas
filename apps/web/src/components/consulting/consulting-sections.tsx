import Link from "next/link"

import { Button } from "@atlas/ui"

import { SectionEyebrow } from "@/components/marketing/section-eyebrow"
import {
  CONSULTING_CTA_LABEL,
  CONTACT_EMAIL,
  CONTACT_MAILTO_URL,
  SEE_ATLAS_LABEL,
} from "@/lib/marketing/constants"
import {
  CONSULTING_HELP_AREAS,
  CONSULTING_WORK_STAGES,
} from "@/lib/marketing/content/consulting"

export function ConsultingHero() {
  return (
    <section className="atlas-consulting-hero" aria-labelledby="consulting-hero-heading">
      <div className="atlas-marketing__gutter atlas-consulting-hero__inner">
        <SectionEyebrow>Frontend engineering consulting</SectionEyebrow>
        <h1 id="consulting-hero-heading" className="atlas-consulting-hero__title">
          Bring the Atlas approach
          <br />
          to your frontend.
        </h1>
        <p className="atlas-consulting-hero__lead">
          I help product teams design, repair, and scale frontend
          architecture—especially when the codebase is growing faster than the
          conventions around it.
        </p>
        <div className="atlas-consulting-hero__actions">
          <Button
            nativeButton={false}
            render={<a href={CONTACT_MAILTO_URL}>{CONSULTING_CTA_LABEL}</a>}
            size="lg"
            className="atlas-btn-primary"
          />
          <Button
            nativeButton={false}
            render={<Link href="/">{SEE_ATLAS_LABEL}</Link>}
            variant="outline"
            size="lg"
            className="atlas-btn-secondary"
          />
        </div>
      </div>
    </section>
  )
}

export function ConsultingHelpSection() {
  return (
    <section
      className="atlas-section atlas-section--surface"
      aria-labelledby="consulting-help-heading"
    >
      <div className="atlas-marketing__gutter atlas-consulting-help">
        <h2 id="consulting-help-heading" className="sr-only">
          What I help with
        </h2>
        <div className="atlas-consulting-help__grid">
          {CONSULTING_HELP_AREAS.map((area) => (
            <article key={area.title} className="atlas-consulting-help__item">
              <h3 className="atlas-consulting-help__title">{area.title}</h3>
              <p className="atlas-consulting-help__body">{area.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export function ConsultingProcessSection() {
  return (
    <section className="atlas-section" aria-labelledby="consulting-process-heading">
      <div className="atlas-marketing__gutter atlas-consulting-process">
        <SectionEyebrow muted>How I work</SectionEyebrow>
        <h2 id="consulting-process-heading" className="atlas-section__title">
          Start with the system,
          <br />
          then change the code.
        </h2>
        <ol className="atlas-consulting-process__stages">
          {CONSULTING_WORK_STAGES.map((stage) => (
            <li key={stage.index} className="atlas-consulting-process__stage">
              <span className="atlas-consulting-process__index">
                {stage.index}
              </span>
              <div className="atlas-consulting-process__stage-copy">
                <h3 className="atlas-consulting-process__stage-title">
                  {stage.title}
                </h3>
                <p className="atlas-consulting-process__stage-body">
                  {stage.description}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

export function ConsultingReferenceSection() {
  return (
    <section
      className="atlas-section atlas-section--tint"
      aria-labelledby="consulting-reference-heading"
    >
      <div className="atlas-marketing__gutter atlas-consulting-reference">
        <SectionEyebrow muted>Reference implementation</SectionEyebrow>
        <h2 id="consulting-reference-heading" className="atlas-section__title">
          Atlas is the architecture
          <br />
          made inspectable.
        </h2>
        <p className="atlas-section__body">
          Atlas packages the same ideas into a working frontend foundation:
          feature ownership, typed contracts, reusable UI, authentication
          patterns, observability, testing, CI, agent context, and documented
          architectural decisions.
        </p>
        <Link href="/" className="atlas-consulting-reference__link">
          Explore Atlas →
        </Link>
      </div>
    </section>
  )
}

export function ConsultingContactSection() {
  return (
    <section
      className="atlas-consulting-contact"
      aria-labelledby="consulting-contact-heading"
    >
      <div className="atlas-marketing__gutter atlas-consulting-contact__inner">
        <h2 id="consulting-contact-heading" className="atlas-consulting-contact__title">
          {CONSULTING_CTA_LABEL}
        </h2>
        <p className="atlas-consulting-contact__body">
          Email{" "}
          <a href={CONTACT_MAILTO_URL} className="atlas-consulting-contact__email">
            {CONTACT_EMAIL}
          </a>{" "}
          to discuss your frontend, codebase constraints, and what you need from
          the architecture.
        </p>
        <Button
          nativeButton={false}
          render={<a href={CONTACT_MAILTO_URL}>{CONSULTING_CTA_LABEL}</a>}
          size="lg"
          className="atlas-btn-primary"
        />
      </div>
    </section>
  )
}
