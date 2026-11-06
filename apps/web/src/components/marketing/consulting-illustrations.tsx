import { cn } from "@atlas/ui"

import type { ComponentType, ReactNode } from "react"

type ConsultingIllustrationId = "new-foundation" | "migration" | "agent-gates"

interface ConsultingIllustrationProps {
  id: ConsultingIllustrationId
  className?: string
}

function IllustrationShell({
  title,
  desc,
  className,
  markerId,
  children,
}: {
  title: string
  desc: string
  className?: string
  markerId?: string
  children: ReactNode
}) {
  return (
    <svg
      viewBox="0 0 80 56"
      role="img"
      aria-labelledby={`${title}-title ${title}-desc`}
      className={cn("atlas-consulting-illustration__svg", className)}
      preserveAspectRatio="xMidYMid meet"
    >
      <title id={`${title}-title`}>{title}</title>
      <desc id={`${title}-desc`}>{desc}</desc>
      {markerId ? (
        <defs>
          <marker
            id={markerId}
            viewBox="0 0 6 6"
            refX="5"
            refY="3"
            markerWidth="5"
            markerHeight="5"
            orient="auto-start-reverse"
          >
            <path
              d="M0 0 L6 3 L0 6 Z"
              className="atlas-consulting-illustration__arrow-head"
            />
          </marker>
        </defs>
      ) : null}
      {children}
    </svg>
  )
}

function FoundationIllustration({ className }: { className?: string }) {
  return (
    <IllustrationShell
      title="Foundation from day one"
      desc="Stacked architecture layers built incrementally from a shared foundation."
      className={className}
    >
      <rect
        x="10"
        y="40"
        width="60"
        height="10"
        rx="2"
        className="atlas-consulting-illustration__layer atlas-consulting-illustration__layer--accent"
      />
      <rect
        x="14"
        y="28"
        width="52"
        height="10"
        rx="2"
        className="atlas-consulting-illustration__layer atlas-consulting-illustration__layer--accent"
      />
      <rect
        x="18"
        y="16"
        width="44"
        height="10"
        rx="2"
        className="atlas-consulting-illustration__layer atlas-consulting-illustration__layer--accent-strong"
      />
      <rect
        x="22"
        y="4"
        width="36"
        height="10"
        rx="2"
        className="atlas-consulting-illustration__layer"
      />
      <path
        d="M40 14v-2M40 26v-2M40 38v-2"
        className="atlas-consulting-illustration__connector"
      />
    </IllustrationShell>
  )
}

function MigrationIllustration({ className }: { className?: string }) {
  const markerId = "atlas-consulting-migration-arrow"

  return (
    <IllustrationShell
      title="Incremental migration"
      desc="Drifted modules reorganized into clearer ownership boundaries without a rewrite."
      className={className}
      markerId={markerId}
    >
      <rect
        x="4"
        y="12"
        width="22"
        height="14"
        rx="2"
        transform="rotate(-8 15 19)"
        className="atlas-consulting-illustration__layer atlas-consulting-illustration__layer--drift"
      />
      <rect
        x="8"
        y="28"
        width="24"
        height="12"
        rx="2"
        transform="rotate(6 20 34)"
        className="atlas-consulting-illustration__layer atlas-consulting-illustration__layer--drift"
      />
      <rect
        x="2"
        y="38"
        width="20"
        height="10"
        rx="2"
        transform="rotate(-4 12 43)"
        className="atlas-consulting-illustration__layer"
      />
      <path
        d="M34 28h8"
        className="atlas-consulting-illustration__arrow"
        markerEnd={`url(#${markerId})`}
      />
      <rect
        x="48"
        y="8"
        width="28"
        height="10"
        rx="2"
        className="atlas-consulting-illustration__layer atlas-consulting-illustration__layer--accent-strong"
      />
      <rect
        x="48"
        y="22"
        width="28"
        height="10"
        rx="2"
        className="atlas-consulting-illustration__layer atlas-consulting-illustration__layer--accent"
      />
      <rect
        x="48"
        y="36"
        width="28"
        height="10"
        rx="2"
        className="atlas-consulting-illustration__layer atlas-consulting-illustration__layer--accent"
      />
      <path
        d="M62 18v20"
        className="atlas-consulting-illustration__connector"
      />
    </IllustrationShell>
  )
}

function AgentGatesIllustration({ className }: { className?: string }) {
  const markerId = "atlas-consulting-agent-arrow"

  return (
    <IllustrationShell
      title="Agent verification gates"
      desc="Multiple agent paths routed through repository rules and quality gates."
      className={className}
      markerId={markerId}
    >
      <circle cx="12" cy="16" r="5" className="atlas-consulting-illustration__node" />
      <circle cx="12" cy="40" r="5" className="atlas-consulting-illustration__node" />
      <rect
        x="7"
        y="25"
        width="10"
        height="6"
        rx="1.5"
        className="atlas-consulting-illustration__node"
      />
      <rect
        x="34"
        y="6"
        width="12"
        height="44"
        rx="2"
        className="atlas-consulting-illustration__gate"
      />
      <path d="M17 16h15M17 28h15M17 40h15" className="atlas-consulting-illustration__route" />
      <path
        d="M40 18h12M40 28h12M40 38h12"
        className="atlas-consulting-illustration__route atlas-consulting-illustration__route--accent"
        markerEnd={`url(#${markerId})`}
      />
      <rect
        x="56"
        y="14"
        width="20"
        height="28"
        rx="2"
        className="atlas-consulting-illustration__layer atlas-consulting-illustration__layer--accent-strong"
      />
      <path
        d="M62 22h8M62 28h8M62 34h8"
        className="atlas-consulting-illustration__rule"
      />
      <path
        d="M40 18h-4M40 28h-4M40 38h-4"
        className="atlas-consulting-illustration__check"
      />
    </IllustrationShell>
  )
}

const ILLUSTRATIONS: Record<
  ConsultingIllustrationId,
  ComponentType<{ className?: string }>
> = {
  "new-foundation": FoundationIllustration,
  migration: MigrationIllustration,
  "agent-gates": AgentGatesIllustration,
}

export function ConsultingScenarioIllustration({
  id,
  className,
}: ConsultingIllustrationProps) {
  const Illustration = ILLUSTRATIONS[id]

  return (
    <figure className={cn("atlas-consulting-illustration", className)}>
      <Illustration />
    </figure>
  )
}
