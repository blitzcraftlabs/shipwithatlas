interface RouteFlowProps {
  /** SVG path d attribute */
  d: string
  accent?: boolean
  markerEnd?: string
  className?: string
}

/** Thin architectural route segment — 90° turns, optional accent. */
export function RouteFlow({
  d,
  accent = false,
  markerEnd: _markerEnd,
  className,
}: RouteFlowProps) {
  return (
    <path
      d={d}
      className={className}
      fill="none"
      data-accent={accent || undefined}
    />
  )
}

interface RouteEndpointProps {
  cx: number
  cy: number
  active?: boolean
}

export function RouteEndpoint({ cx, cy, active }: RouteEndpointProps) {
  return (
    <circle
      cx={cx}
      cy={cy}
      r={active ? 3.5 : 2.5}
      className="atlas-route-flow__endpoint"
      data-active={active || undefined}
    />
  )
}

interface RouteFlowDefsProps {
  id: string
}

export function RouteFlowDefs({ id }: RouteFlowDefsProps) {
  return (
    <defs>
      <marker
        id={id}
        markerWidth="6"
        markerHeight="6"
        refX="5"
        refY="3"
        orient="auto"
      >
        <path
          d="M0,0 L6,3 L0,6 Z"
          className="atlas-route-flow__arrow"
        />
      </marker>
    </defs>
  )
}
