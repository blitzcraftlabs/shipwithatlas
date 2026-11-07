import { CapabilitiesExplorer } from "@/components/marketing/capabilities-explorer"
import { SectionLabel } from "@/components/marketing/section-label"
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
      className="bp-section bp-section--paper bp-capabilities"
      aria-labelledby="capabilities-heading"
    >
      <div className="atlas-marketing__gutter">
        <header className="bp-section-head bp-section-head--split">
          <div>
            <SectionLabel index="03">Everything included</SectionLabel>
            <h2 id="capabilities-heading" className="bp-h2">
              Make the recurring
              {" "}<br />
              decisions once.
            </h2>
          </div>
          <p className="bp-lead">
            Atlas brings the architecture, infrastructure, tooling, and
            production conventions together as one foundation, so teams
            don&apos;t have to assemble them again for every product.
          </p>
        </header>

        <CapabilitiesExplorer capabilities={capabilities} />
      </div>
    </section>
  )
}
