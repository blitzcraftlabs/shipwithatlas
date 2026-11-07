import { ArrowRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

import { ConsultingScenarioIllustration } from "@/components/marketing/consulting-illustrations"
import { SectionLabel } from "@/components/marketing/section-label"
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
      className="bp-section bp-section--white bp-founder"
      aria-labelledby="consulting-bridge-heading"
    >
      <div className="atlas-marketing__gutter">
        <div className="bp-founder__layout">
          <div className="bp-founder__intro">
            <SectionLabel index="08">Built from practice</SectionLabel>
            <h2 id="consulting-bridge-heading" className="bp-h2">
              I built Atlas from the frontend problems I kept solving.
            </h2>
          </div>

          <div className="bp-founder__author">
            <Image
              src={AUTHOR_AVATAR_URL}
              alt=""
              width={56}
              height={56}
              className="bp-founder__avatar"
            />
            <div>
              <p className="bp-founder__name">{AUTHOR_NAME}</p>
              <p className="bp-founder__role">{AUTHOR_ROLE}</p>
            </div>
          </div>

          <div className="bp-founder__copy">
            <p className="bp-founder__standfirst">
              I&apos;m Daniel Mark, a frontend engineer and consultant. Atlas
              is the reference implementation behind the way I build product
              frontends: clear ownership boundaries, typed contracts, reusable
              UI, production infrastructure, and engineering conventions that
              stay consistent as the product grows.
            </p>
            <p className="bp-body">
              If your team is starting a new frontend, outgrowing an
              inconsistent codebase, or trying to make AI-assisted development
              safer, I can help apply the same principles to your product.
            </p>
          </div>
        </div>

        <ul className="bp-founder__scenarios">
          {CONSULTING_SCENARIOS.map((scenario, index) => (
            <li key={scenario.id} className="bp-founder__scenario">
              <div className="bp-founder__art">
                <span className="bp-founder__art-index" aria-hidden="true">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <ConsultingScenarioIllustration id={scenario.id} />
              </div>
              <h3 className="bp-founder__scenario-heading">
                {scenario.heading}
              </h3>
              <p className="bp-founder__scenario-copy">{scenario.copy}</p>
              <p className="bp-founder__scenario-tech">{scenario.technical}</p>
            </li>
          ))}
        </ul>

        <div className="bp-actions bp-founder__actions">
          <a href={CONTACT_MAILTO_URL} className="bp-button bp-button--primary">
            {CONSULTING_CTA_LABEL}
          </a>
          <Link href={CONSULTING_PATH} className="bp-arrow-link">
            {SEE_HOW_I_WORK_LABEL}
            <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  )
}
