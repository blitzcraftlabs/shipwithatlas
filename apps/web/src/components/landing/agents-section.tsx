import { AgentContextTranscript } from "@/components/marketing/agent-context-transcript"
import { SectionEyebrow } from "@/components/marketing/section-eyebrow"

export function AgentsSection() {
  return (
    <section
      id="agents"
      className="atlas-section atlas-section--raised"
      aria-labelledby="agents-heading"
    >
      <div className="atlas-marketing__gutter atlas-agents">
        <div className="atlas-agents__intro">
          <div className="atlas-agents__intro-primary">
            <SectionEyebrow>Agent context</SectionEyebrow>
            <h2 id="agents-heading" className="atlas-section__title">
              Any agent.
              <br />
              Same architecture.
            </h2>
          </div>
          <div className="atlas-agents__intro-copy">
            <p className="atlas-agents__lead">
              Change your agent, not your engineering standards.
            </p>
            <p className="atlas-section__body atlas-agents__support">
              Architecture rules, feature boundaries, reference implementations,
              and verification live in the repository—so every coding agent works
              from the same context.
            </p>
          </div>
        </div>

        <AgentContextTranscript />
      </div>
    </section>
  )
}
