import { ArrowRight, ArrowUpRight, Mail } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

import { CodeCopyButton } from "@/components/marketing/code-copy-button"
import { ProductReferenceGrid } from "@/components/marketing/product-reference-grid"
import { SectionLabel } from "@/components/marketing/section-label"
import {
  AUTHOR_AVATAR_URL,
  AUTHOR_NAME,
  AUTHOR_ROLE,
  CONSULTING_CTA_LABEL,
  CONTACT_EMAIL,
  CONTACT_MAILTO_URL,
  EXPLORE_ATLAS_LABEL,
  HOME_PATH,
  PROOF_LINKS,
  SEE_ATLAS_LABEL,
} from "@/lib/marketing/constants"
import {
  CONSULTING_HELP_AREAS,
  CONSULTING_WORK_STAGES,
} from "@/lib/marketing/content/consulting"

/**
 * Consulting page, drawn as one sheet set in the Atlas blueprint language.
 * The homepage leads with a product demo; this page leads with the person
 * and the engagement, so its hero is a split composition anchored by a
 * drawing title block rather than a centered statement.
 */

export function ConsultingHero() {
  return (
    <section className="bp-cx-hero" aria-labelledby="consulting-hero-heading">
      <div className="atlas-marketing__gutter bp-cx-hero__layout">
        <div className="bp-cx-hero__copy">
          <p className="bp-tag">Frontend engineering consulting</p>
          <h1 id="consulting-hero-heading" className="bp-cx-hero__title">
            Bring the <mark className="bp-highlight">Atlas approach</mark>{" "}
            <br />
            to your frontend.
          </h1>
          <p className="bp-cx-hero__lead">
            I help product teams design, repair, and scale frontend
            architecture, especially when the codebase is growing faster than
            the conventions around it.
          </p>
          <div className="bp-actions bp-cx-hero__actions">
            <a
              href={CONTACT_MAILTO_URL}
              className="bp-button bp-button--primary bp-cx-hero__primary"
            >
              <Mail className="size-4" aria-hidden="true" />
              {CONSULTING_CTA_LABEL}
            </a>
            <Link href={HOME_PATH} className="bp-arrow-link">
              {SEE_ATLAS_LABEL}
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </div>
        </div>

        {/* Title block: the corner stamp of an engineering drawing */}
        <aside className="bp-cx-block" aria-label="Consultant">
          <div className="bp-cx-block__author">
            <Image
              src={AUTHOR_AVATAR_URL}
              alt=""
              width={64}
              height={64}
              className="bp-cx-block__avatar"
              priority
            />
            <div>
              <p className="bp-cx-block__name">{AUTHOR_NAME}</p>
              <p className="bp-cx-block__role">{AUTHOR_ROLE}</p>
            </div>
          </div>
          <dl className="bp-cx-block__rows">
            <div className="bp-cx-block__row">
              <dt>Practice</dt>
              <dd>
                <ul className="bp-cx-block__list">
                  {CONSULTING_HELP_AREAS.map((area) => (
                    <li key={area.title}>{area.title}</li>
                  ))}
                </ul>
              </dd>
            </div>
            <div className="bp-cx-block__row">
              <dt>Method</dt>
              <dd>
                <ol className="bp-cx-block__method">
                  {CONSULTING_WORK_STAGES.map((stage) => (
                    <li key={stage.index}>
                      <span aria-hidden="true">{stage.index}</span>
                      {stage.title}
                    </li>
                  ))}
                </ol>
              </dd>
            </div>
            <div className="bp-cx-block__row">
              <dt>Contact</dt>
              <dd>
                <a href={CONTACT_MAILTO_URL} className="bp-cx-block__email">
                  {CONTACT_EMAIL}
                </a>
              </dd>
            </div>
          </dl>
        </aside>
      </div>
    </section>
  )
}

export function ConsultingHelpSection() {
  return (
    <section
      className="bp-section bp-section--white bp-cx-help"
      aria-labelledby="consulting-help-heading"
    >
      <div className="atlas-marketing__gutter">
        <header className="bp-section-head bp-cx-help__head">
          <SectionLabel index="01">Services</SectionLabel>
          <h2 id="consulting-help-heading" className="bp-h2">
            What I help with
          </h2>
        </header>

        <ol className="bp-cx-help__ledger">
          {CONSULTING_HELP_AREAS.map((area, index) => (
            <li key={area.title} className="bp-cx-help__row">
              <span className="bp-cx-help__index" aria-hidden="true">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="bp-cx-help__title">{area.title}</h3>
              <p className="bp-cx-help__body">{area.description}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

export function ConsultingProcessSection() {
  return (
    <section
      className="bp-section bp-section--grid bp-cx-process"
      aria-labelledby="consulting-process-heading"
    >
      <div className="atlas-marketing__gutter">
        <header className="bp-section-head">
          <SectionLabel index="02">How I work</SectionLabel>
          <h2 id="consulting-process-heading" className="bp-h2">
            Start with the system,{" "}
            <br />
            then change the code.
          </h2>
        </header>

        <ol className="bp-cx-process__stages">
          {CONSULTING_WORK_STAGES.map((stage, index) => (
            <li key={stage.index} className="bp-cx-process__stage">
              <div className="bp-cx-process__rail" aria-hidden="true">
                <span
                  className={
                    index === 0
                      ? "bp-cx-process__node bp-cx-process__node--active"
                      : "bp-cx-process__node"
                  }
                >
                  {stage.index}
                </span>
              </div>
              <div className="bp-cx-process__card">
                <p className="bp-cx-process__step">
                  Step {stage.index} of{" "}
                  {String(CONSULTING_WORK_STAGES.length).padStart(2, "0")}
                </p>
                <h3 className="bp-cx-process__title">{stage.title}</h3>
                <p className="bp-cx-process__body">{stage.description}</p>
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
      className="bp-section bp-section--accent bp-cx-reference"
      aria-labelledby="consulting-reference-heading"
    >
      <div className="atlas-marketing__gutter">
        <div className="bp-cx-reference__layout">
          <div className="bp-cx-reference__intro">
            <SectionLabel index="03">Reference implementation</SectionLabel>
            <h2 id="consulting-reference-heading" className="bp-h2">
              Atlas is the architecture{" "}
              <br />
              made inspectable.
            </h2>
            <p className="bp-lead">
              Atlas packages the same ideas into a working frontend foundation:
              feature ownership, typed contracts, reusable UI, authentication
              patterns, observability, testing, CI, agent context, and
              documented architectural decisions.
            </p>
            <Link href={HOME_PATH} className="bp-arrow-link bp-cx-reference__explore">
              {EXPLORE_ATLAS_LABEL}
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </div>

          <nav className="bp-cx-proof" aria-label="Inspect the Atlas source">
            <p className="bp-cx-proof__head">
              <span aria-hidden="true">■</span> blitzcraftlabs/atlas
            </p>
            <ul>
              {PROOF_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bp-cx-proof__link"
                  >
                    <span className="bp-cx-proof__label">{link.label}</span>
                    <span className="bp-cx-proof__desc">{link.description}</span>
                    <ArrowUpRight className="bp-cx-proof__arrow" aria-hidden="true" />
                    <span className="sr-only"> (opens in a new tab)</span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="bp-cx-reference__products">
          <h3 className="bp-cx-reference__subhead">Built with Atlas</h3>
          <ProductReferenceGrid aria-label="Products built with Atlas" />
        </div>
      </div>
    </section>
  )
}

export function ConsultingContactSection() {
  // Let narrow screens break the address before the "@", never mid-domain
  const [emailLocal, emailDomain] = CONTACT_EMAIL.split("@")

  return (
    <section
      className="bp-section bp-section--paper bp-cx-contact"
      aria-labelledby="consulting-contact-heading"
    >
      <div className="atlas-marketing__gutter">
        <div className="bp-cx-contact__sheet">
          <div className="bp-cx-contact__lead">
            <SectionLabel index="04" tone="inverse">
              Contact
            </SectionLabel>
            <h2 id="consulting-contact-heading" className="bp-cx-contact__title">
              {CONSULTING_CTA_LABEL}
            </h2>
          </div>

          <div className="bp-cx-contact__body">
            <p className="bp-body">
              Email{" "}
              <a href={CONTACT_MAILTO_URL} className="bp-link">
                {CONTACT_EMAIL}
              </a>{" "}
              to discuss your frontend, codebase constraints, and what you need
              from the architecture.
            </p>

            <div className="bp-cx-contact__address">
              <span className="bp-cx-contact__prompt" aria-hidden="true">
                to:
              </span>
              <span className="bp-cx-contact__value">
                {emailLocal}
                <wbr />@{emailDomain}
              </span>
              <CodeCopyButton
                code={CONTACT_EMAIL}
                label="Copy email address"
                className="bp-copy"
              />
            </div>

            <a
              href={CONTACT_MAILTO_URL}
              className="bp-button bp-button--primary bp-cx-contact__cta"
            >
              <Mail className="size-4" aria-hidden="true" />
              {CONSULTING_CTA_LABEL}
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
