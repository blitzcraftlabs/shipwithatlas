import { RouteFlowDefs } from "@/components/marketing/route-flow"
import { SystemConnector, SystemNode } from "@/components/marketing/system-node"

const NODES = [
  {
    id: "task",
    label: "Task",
    sublabel: "Issue / agent prompt",
    metadata: "Linear · GitHub issue",
    icon: "clipboard" as const,
    x: 8,
    y: 24,
    width: 156,
    height: 96,
  },
  {
    id: "repository",
    label: "Repository context",
    sublabel: "Architecture rules",
    metadata: "AGENTS.md",
    icon: "book" as const,
    x: 196,
    y: 24,
    width: 156,
    height: 96,
  },
  {
    id: "feature",
    label: "Feature implementation",
    sublabel: "Domain module",
    metadata: "UI + data layer",
    icon: "layers" as const,
    x: 384,
    y: 24,
    width: 156,
    height: 96,
  },
  {
    id: "verification",
    label: "Verification",
    sublabel: "Quality gates",
    metadata: "lint · types · tests · build",
    icon: "check" as const,
    active: true,
    x: 572,
    y: 24,
    width: 168,
    height: 96,
  },
]

export function AgentPathDiagram() {
  return (
    <figure className="atlas-diagram atlas-diagram--agent atlas-diagram--system">
      <svg
        viewBox="0 0 748 148"
        role="img"
        aria-labelledby="agent-diagram-title agent-diagram-desc"
        className="atlas-diagram__svg atlas-diagram__svg--wide"
        preserveAspectRatio="xMidYMid meet"
      >
        <title id="agent-diagram-title">Agent implementation path in Atlas</title>
        <desc id="agent-diagram-desc">
          A task flows through repository instructions to the correct feature
          boundary and then to verification.
        </desc>

        <RouteFlowDefs id="atlas-agent-arrow" />

        {NODES.map((node) => (
          <SystemNode key={node.id} node={node} />
        ))}

        {NODES.slice(0, -1).map((node, index) => {
          const next = NODES[index + 1]
          if (!next) return null
          return (
            <SystemConnector
              key={`${node.id}-${next.id}`}
              fromX={node.x + node.width}
              fromY={node.y + node.height / 2}
              toX={next.x}
              toY={next.y + next.height / 2}
              markerId="atlas-agent-arrow"
              accent={index === NODES.length - 2}
            />
          )
        })}
      </svg>
    </figure>
  )
}
