import { CapabilitiesExplorer } from "@/components/marketing/capabilities-explorer"
import { SectionEyebrow } from "@/components/marketing/section-eyebrow"
import { ATLAS_CAPABILITIES } from "@/lib/marketing/content/capabilities"
import { highlightSnippet } from "@/lib/marketing/shiki/highlight"

export async function CapabilitiesSection() {
  const capabilities = await Promise.all(
    ATLAS_CAPABILITIES.map(async (capability) => ({
      ...capability,
      html: await highlightSnippet(
        capability.snippet.code,
        capability.snippet.language,
        {
          highlightedLines: capability.snippet.highlightedLines,
          focusedLines: capability.snippet.focusedLines,
          annotateTreeComments: capability.snippet.language === "markdown",
        }
      ),
    }))
  )

  return (
    <section
      id="capabilities"
      className="atlas-section atlas-section--raised"
      aria-labelledby="capabilities-heading"
    >
      <div className="atlas-marketing__gutter atlas-capabilities">
        <div className="atlas-capabilities__intro">
          <SectionEyebrow>Everything included</SectionEyebrow>
          <h2 id="capabilities-heading" className="atlas-section__title">
            Make the recurring
            <br />
            decisions once.
          </h2>
          <p className="atlas-section__body">
            Atlas brings the architecture, infrastructure, tooling, and
            production conventions together as one foundation—so teams don&apos;t
            have to assemble them again for every product.
          </p>
        </div>

        <div className="atlas-capabilities__showcase">
          <CapabilitiesExplorer capabilities={capabilities} />
        </div>
      </div>
    </section>
  )
}
