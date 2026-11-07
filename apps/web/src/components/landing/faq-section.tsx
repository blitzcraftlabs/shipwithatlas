import {
  FaqAccordion,
  type FaqAccordionItem,
} from "@/components/marketing/faq-accordion"
import { SectionLabel } from "@/components/marketing/section-label"
import { HOME_SECTION_IDS, homeSectionHref } from "@/lib/marketing/constants"
import { FAQ_ITEMS } from "@/lib/marketing/content/faq"

function FaqAnswer({ itemId, paragraphs }: { itemId: string; paragraphs: readonly string[] }) {
  if (itemId === "what-ships") {
    return (
      <>
        <p>{paragraphs[0]}</p>
        <p>
          The{" "}
          <a href={homeSectionHref(HOME_SECTION_IDS.capabilities)} className="bp-link">
            Capabilities Explorer
          </a>{" "}
          above shows the current implementation in more detail.
        </p>
      </>
    )
  }

  return (
    <>
      {paragraphs.map((paragraph, index) => (
        <p key={index}>{paragraph}</p>
      ))}
    </>
  )
}

const FAQ_ACCORDION_ITEMS: FaqAccordionItem[] = FAQ_ITEMS.map((item) => ({
  id: item.id,
  question: item.question,
  answer: <FaqAnswer itemId={item.id} paragraphs={item.paragraphs} />,
}))

export function FaqSection() {
  return (
    <section
      className="bp-section bp-section--paper bp-faq"
      aria-labelledby="faq-heading"
    >
      <div className="atlas-marketing__gutter">
        <div className="bp-faq__layout">
          <div className="bp-faq__intro">
            <SectionLabel index="09">FAQ</SectionLabel>
            <h2 id="faq-heading" className="bp-h2">
              Questions teams ask
              {" "}<br />
              before they adopt Atlas.
            </h2>
            <p className="bp-lead">
              Atlas is opinionated by design. These are the questions that usually
              matter before making it part of a codebase.
            </p>
          </div>

          <FaqAccordion items={FAQ_ACCORDION_ITEMS} />
        </div>
      </div>
    </section>
  )
}
