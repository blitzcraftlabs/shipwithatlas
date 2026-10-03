import { cn } from "@atlas/ui"

import type { ComponentType, ReactNode } from "react"

export type InspectIllustrationId =
  | "repository"
  | "reference-app"
  | "architecture-docs"
  | "ci-workflows"

interface InspectIllustrationProps {
  id: InspectIllustrationId
  className?: string
}

function IllustrationShell({
  title,
  className,
  children,
}: {
  title: string
  className?: string
  children: ReactNode
}) {
  return (
    <svg
      viewBox="0 0 40 40"
      role="img"
      aria-label={title}
      className={cn("atlas-inspect-illustration__svg", className)}
      preserveAspectRatio="xMidYMid meet"
    >
      <title>{title}</title>
      {children}
    </svg>
  )
}

function RepositoryIllustration({ className }: { className?: string }) {
  return (
    <IllustrationShell title="Repository" className={className}>
      <path
        d="M12 8v24M12 16h8M12 24h6"
        className="atlas-inspect-illustration__connector"
      />
      <circle cx="12" cy="8" r="2.75" className="atlas-inspect-illustration__node" />
      <circle
        cx="20"
        cy="16"
        r="2.75"
        className="atlas-inspect-illustration__node atlas-inspect-illustration__node--accent"
      />
      <circle cx="18" cy="24" r="2.75" className="atlas-inspect-illustration__node" />
      <rect
        x="23"
        y="13.5"
        width="10"
        height="5"
        rx="1.25"
        className="atlas-inspect-illustration__layer atlas-inspect-illustration__layer--accent"
      />
      <rect
        x="23"
        y="21.5"
        width="8"
        height="5"
        rx="1.25"
        className="atlas-inspect-illustration__layer"
      />
    </IllustrationShell>
  )
}

function ReferenceAppIllustration({ className }: { className?: string }) {
  return (
    <IllustrationShell title="Reference application" className={className}>
      <rect
        x="5"
        y="7"
        width="30"
        height="26"
        rx="2.5"
        className="atlas-inspect-illustration__layer"
      />
      <rect
        x="5"
        y="7"
        width="30"
        height="6"
        rx="2.5"
        className="atlas-inspect-illustration__chrome"
      />
      <circle cx="9" cy="10" r="1" className="atlas-inspect-illustration__dot" />
      <circle cx="13" cy="10" r="1" className="atlas-inspect-illustration__dot" />
      <rect
        x="9"
        y="16"
        width="22"
        height="13"
        rx="1.5"
        className="atlas-inspect-illustration__layer atlas-inspect-illustration__layer--accent-strong"
      />
      <path
        d="M12 20h16M12 24h11"
        className="atlas-inspect-illustration__rule"
      />
    </IllustrationShell>
  )
}

function ArchitectureDocsIllustration({ className }: { className?: string }) {
  return (
    <IllustrationShell title="Architecture documentation" className={className}>
      <rect
        x="6"
        y="8"
        width="16"
        height="24"
        rx="1.5"
        className="atlas-inspect-illustration__layer"
      />
      <path
        d="M10 14h8M10 18h8M10 22h5"
        className="atlas-inspect-illustration__rule"
      />
      <circle
        cx="30"
        cy="14"
        r="3"
        className="atlas-inspect-illustration__node atlas-inspect-illustration__node--accent"
      />
      <circle cx="30" cy="26" r="3" className="atlas-inspect-illustration__node" />
      <path
        d="M22 20h4M27 14v12"
        className="atlas-inspect-illustration__connector"
      />
      <path
        d="M27 20h3"
        className="atlas-inspect-illustration__route atlas-inspect-illustration__route--accent"
      />
    </IllustrationShell>
  )
}

function CiWorkflowsIllustration({ className }: { className?: string }) {
  return (
    <IllustrationShell title="CI workflows" className={className}>
      <rect
        x="4"
        y="15"
        width="9"
        height="10"
        rx="1.5"
        className="atlas-inspect-illustration__layer atlas-inspect-illustration__layer--accent"
      />
      <rect
        x="15.5"
        y="15"
        width="9"
        height="10"
        rx="1.5"
        className="atlas-inspect-illustration__layer atlas-inspect-illustration__layer--accent-strong"
      />
      <rect
        x="27"
        y="15"
        width="9"
        height="10"
        rx="1.5"
        className="atlas-inspect-illustration__layer"
      />
      <path
        d="M13 20h2.5M24.5 20h2.5"
        className="atlas-inspect-illustration__route atlas-inspect-illustration__route--accent"
      />
      <path
        d="M7.5 19.5l1.25 1.25 2.5-2.5M19 19.5l1.25 1.25 2.5-2.5"
        className="atlas-inspect-illustration__check"
      />
      <path d="M30 19.5v2M31.5 20.5h-3" className="atlas-inspect-illustration__glyph" />
    </IllustrationShell>
  )
}

const ILLUSTRATIONS: Record<
  InspectIllustrationId,
  ComponentType<{ className?: string }>
> = {
  repository: RepositoryIllustration,
  "reference-app": ReferenceAppIllustration,
  "architecture-docs": ArchitectureDocsIllustration,
  "ci-workflows": CiWorkflowsIllustration,
}

export function InspectDestinationIllustration({
  id,
  className,
}: InspectIllustrationProps) {
  const Illustration = ILLUSTRATIONS[id]

  return (
    <span
      className={cn("atlas-inspect-illustration", className)}
      aria-hidden="true"
    >
      <Illustration />
    </span>
  )
}

export const INSPECT_ILLUSTRATION_IDS: InspectIllustrationId[] = [
  "repository",
  "reference-app",
  "architecture-docs",
  "ci-workflows",
]
