import { ArrowRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

import { Button } from "@atlas/ui"

import { ConsultingScenarioIllustration } from "@/components/marketing/consulting-illustrations"
import { SectionEyebrow } from "@/components/marketing/section-eyebrow"
import {
  AUTHOR_AVATAR_URL,
  AUTHOR_NAME,
  AUTHOR_ROLE,
  CONSULTING_CTA_LABEL,
  CONSULTING_PATH,
  CONTACT_MAILTO_URL,
  SEE_HOW_I_WORK_LABEL,
} from "@/lib/marketing/constants"
import { CONSULTING_SCENARIOS } from "@/lib/marketing/content/consulting"

export function ConsultingBridgeSection() {
  return (
    <section
      className="atlas-section atlas-consulting-bridge"
      aria-labelledby="consulting-bridge-heading"
    >
      <div className="atlas-marketing__gutter atlas-consulting-bridge__inner">
        <div className="atlas-consulting-bridge__intro">
          <SectionEyebrow muted>Built from practice</SectionEyebrow>
          <h2
            id="consulting-bridge-heading"
            className="atlas-section__title"
          >
            I built Atlas from the frontend
            <br />
            problems I kept solving.
          </h2>
          <div className="atlas-consulting-bridge__copy">
            <p className="atlas-section__body">
              I&apos;m Daniel Mark, a frontend engineer and consultant. Atlas
              is the reference implementation behind the way I build product
              frontends: clear ownership boundaries, typed contracts, reusable
              UI, production infrastructure, and engineering conventions that
              stay consistent as the product grows.
            </p>
            <p className="atlas-section__body">
              If your team is starting a new frontend, outgrowing an
              inconsistent codebase, or trying to make AI-assisted development
              safer, I can help apply the same principles to your product.
            </p>
          </div>
          <div className="atlas-consulting-bridge__author">
            <Image
              src={AUTHOR_AVATAR_URL}
              alt=""
              width={40}
              height={40}
              className="atlas-consulting-bridge__avatar"
            />
            <div className="atlas-consulting-bridge__author-copy">
              <p className="atlas-consulting-bridge__name">{AUTHOR_NAME}</p>
              <p className="atlas-consulting-bridge__role">{AUTHOR_ROLE}</p>
            </div>
          </div>
        </div>

        <div className="atlas-consulting-bridge__scenarios">
          {CONSULTING_SCENARIOS.map((scenario) => (
            <article
              key={scenario.id}
              className="atlas-consulting-bridge__scenario"
            >
              <div className="atlas-consulting-bridge__scenario-art">
                <ConsultingScenarioIllustration id={scenario.id} />
              </div>
              <h3 className="atlas-consulting-bridge__scenario-heading">
                {scenario.heading}
              </h3>
              <p className="atlas-consulting-bridge__scenario-copy">
                {scenario.copy}
              </p>
              <p className="atlas-consulting-bridge__scenario-technical">
                {scenario.technical}
              </p>
            </article>
          ))}
        </div>

        <div className="atlas-consulting-bridge__actions">
          <Button
            nativeButton={false}
            render={<a href={CONTACT_MAILTO_URL}>{CONSULTING_CTA_LABEL}</a>}
            size="default"
            className="atlas-btn-primary"
          />
          <Link
            href={CONSULTING_PATH}
            className="atlas-consulting-bridge__secondary-cta"
          >
            {SEE_HOW_I_WORK_LABEL}
            <ArrowRight aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  )
}
