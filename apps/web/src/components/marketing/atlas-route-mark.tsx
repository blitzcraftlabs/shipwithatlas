import { cn } from "@atlas/ui"

interface AtlasRouteMarkProps {
  className?: string
  size?: "sm" | "md"
}

/**
 * Restrained Atlas route motif — coordinate cross with endpoint node.
 * Used sparingly to reinforce system topology without decorative noise.
 */
export function AtlasRouteMark({ className, size = "sm" }: AtlasRouteMarkProps) {
  return (
    <span
      className={cn(
        "atlas-route-mark",
        size === "md" && "atlas-route-mark--md",
        className
      )}
      aria-hidden="true"
    >
      <svg viewBox="0 0 12 12" fill="none" className="atlas-route-mark__svg">
        <circle
          cx="6"
          cy="6"
          r="1.25"
          className="atlas-route-mark__node"
        />
        <path
          d="M6 2.5v7M2.5 6h7"
          className="atlas-route-mark__cross"
        />
      </svg>
    </span>
  )
}

interface AtlasRouteConnectorProps {
  className?: string
}

/**
 * Short horizontal route segment with endpoint nodes — connects labels or headings.
 */
export function AtlasRouteConnector({ className }: AtlasRouteConnectorProps) {
  return (
    <span className={cn("atlas-route-connector", className)} aria-hidden="true">
      <span className="atlas-route-connector__node" />
      <span className="atlas-route-connector__line" />
      <span className="atlas-route-connector__node" />
    </span>
  )
}
