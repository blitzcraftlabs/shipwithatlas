import { ContractPathDiagram } from "@/components/marketing/contract-path-diagram"
import { SectionEyebrow } from "@/components/marketing/section-eyebrow"

export function ContractDiagramSection() {
  return (
    <section className="atlas-section" aria-labelledby="contract-heading">
      <div className="atlas-marketing__gutter atlas-contract">
        <div className="atlas-contract__intro">
          <SectionEyebrow muted>End-to-end types</SectionEyebrow>
          <h2 id="contract-heading" className="atlas-section__title">
            One contract. One path to the interface.
          </h2>
          <p className="atlas-section__body">
            From the source contract to the generated client, feature module,
            and product UI, Atlas keeps the path typed end to end.
          </p>
        </div>
        <div className="atlas-contract__diagram">
          <ContractPathDiagram />
        </div>
      </div>
    </section>
  )
}
