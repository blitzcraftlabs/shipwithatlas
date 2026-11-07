import { ContractPathDiagram } from "@/components/marketing/contract-path-diagram"
import { SectionLabel } from "@/components/marketing/section-label"

export function ContractDiagramSection() {
  return (
    <section
      className="bp-section bp-section--grid bp-contract-section"
      aria-labelledby="contract-heading"
    >
      <div className="atlas-marketing__gutter">
        <header className="bp-section-head bp-section-head--center">
          <SectionLabel index="05">End-to-end types</SectionLabel>
          <h2 id="contract-heading" className="bp-h2">
            One contract. One path to the interface.
          </h2>
          <p className="bp-lead">
            From the source contract to the generated client, feature module,
            and product UI, Atlas keeps the path typed end to end.
          </p>
        </header>
        <ContractPathDiagram />
      </div>
    </section>
  )
}
