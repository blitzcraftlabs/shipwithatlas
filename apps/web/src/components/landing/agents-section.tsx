import { AgentContextTranscript } from "@/components/marketing/agent-context-transcript"
import { SectionLabel } from "@/components/marketing/section-label"
import { HOME_SECTION_IDS } from "@/lib/marketing/constants"

export function AgentsSection() {
  return (
    <section
      id={HOME_SECTION_IDS.agents}
      className="bp-section bp-section--white bp-agents"
      aria-labelledby="agents-heading"
    >
      <div className="atlas-marketing__gutter bp-agents__layout">
        <div className="bp-agents__intro">
          <SectionLabel index="06">Agent context</SectionLabel>
          <h2 id="agents-heading" className="bp-h2">
            Any agent.
            {" "}<br />
            Same architecture.
          </h2>
          <p className="bp-agents__lead">
            Change your agent, not your engineering standards.
          </p>
          <p className="bp-body">
            Architecture rules, feature boundaries, reference implementations,
            and verification live in the repository, so every coding agent works
            from the same context.
          </p>
        </div>

        <AgentContextTranscript />
      </div>
    </section>
  )
}
