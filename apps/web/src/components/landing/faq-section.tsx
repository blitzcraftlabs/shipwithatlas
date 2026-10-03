import {
  FaqAccordion,
  type FaqAccordionItem,
} from "@/components/marketing/faq-accordion"
import { SectionEyebrow } from "@/components/marketing/section-eyebrow"
import { FAQ_ITEMS } from "@/lib/marketing/content/faq"

function FaqAnswer({ itemId, paragraphs }: { itemId: string; paragraphs: readonly string[] }) {
  if (itemId === "what-ships") {
    return (
      <>
        <p>{paragraphs[0]}</p>
        <p>
          The{" "}
          <a href="#capabilities" className="atlas-faq__link">
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
    <section className="atlas-section" aria-labelledby="faq-heading">
      <div className="atlas-marketing__gutter atlas-faq">
        <div className="atlas-faq__layout">
          <div className="atlas-faq__intro">
            <SectionEyebrow>FAQ</SectionEyebrow>
            <h2 id="faq-heading" className="atlas-section__title">
              Questions teams ask
              <br />
              before they adopt Atlas.
            </h2>
            <p className="atlas-section__body">
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
