export interface SystemNodeData {
  id: string
  label: string
  sublabel?: string
  metadata?: string
  icon?: "braces" | "code" | "layers" | "layout" | "clipboard" | "book" | "check"
  active?: boolean
  x: number
  y: number
  width: number
  height: number
}

interface SystemNodeProps {
  node: SystemNodeData
}

function NodeIcon({ type, x, y }: { type: SystemNodeData["icon"]; x: number; y: number }) {
  if (!type) return null

  const props = {
    className: "atlas-system-node__icon-path",
    strokeWidth: 1.35,
    fill: "none",
  }

  switch (type) {
    case "braces":
      return (
        <g transform={`translate(${x}, ${y})`} className="atlas-system-node__icon-g">
          <path {...props} d="M4 2v12M0 4v8M0 4h2M0 12h2M12 2v12M16 4v8M14 4h2M14 12h2" />
        </g>
      )
    case "code":
      return (
        <g transform={`translate(${x}, ${y})`} className="atlas-system-node__icon-g">
          <path {...props} d="M4 4L0 8l4 4M12 4l4 4-4 4M8 2l-1 12" />
        </g>
      )
    case "layers":
      return (
        <g transform={`translate(${x}, ${y})`} className="atlas-system-node__icon-g">
          <path {...props} d="M8 1L1 5l7 4 7-4-7-4zM1 9l7 4 7-4M1 13l7 4 7-4" />
        </g>
      )
    case "layout":
      return (
        <g transform={`translate(${x}, ${y})`} className="atlas-system-node__icon-g">
          <rect {...props} x="1" y="1" width="6" height="6" rx="1" />
          <rect {...props} x="9" y="1" width="6" height="6" rx="1" />
          <rect {...props} x="1" y="9" width="6" height="6" rx="1" />
          <rect {...props} x="9" y="9" width="6" height="6" rx="1" />
        </g>
      )
    case "clipboard":
      return (
        <g transform={`translate(${x}, ${y})`} className="atlas-system-node__icon-g">
          <path {...props} d="M4 2h8a1 1 0 011 1v11a1 1 0 01-1 1H4a1 1 0 01-1-1V3a1 1 0 011-1z" />
          <path {...props} d="M6 2V1a2 2 0 014 0v1" />
        </g>
      )
    case "book":
      return (
        <g transform={`translate(${x}, ${y})`} className="atlas-system-node__icon-g">
          <path {...props} d="M2 2h5v12H3a1 1 0 01-1-1V2zM9 2h5v12h-4a1 1 0 01-1-1V2z" />
        </g>
      )
    case "check":
      return (
        <g transform={`translate(${x}, ${y})`} className="atlas-system-node__icon-g">
          <path {...props} d="M2 8l4 4 8-10" />
        </g>
      )
    default:
      return null
  }
}

const PADDING_X = 12
const ICON_SIZE = 16
const ICON_GAP = 6
const SUBLABEL_GAP = 4
const METADATA_GAP = 4

function getNodeLayout(node: SystemNodeData) {
  const hasIcon = Boolean(node.icon)
  const hasSublabel = Boolean(node.sublabel)
  const hasMetadata = Boolean(node.metadata)

  const labelHeight = 14
  const sublabelHeight = hasSublabel ? 11 : 0
  const metadataHeight = hasMetadata ? 10 : 0
  const firstRowHeight = hasIcon ? ICON_SIZE : labelHeight
  const contentHeight =
    firstRowHeight +
    (hasSublabel ? SUBLABEL_GAP + sublabelHeight : 0) +
    (hasMetadata ? METADATA_GAP + metadataHeight : 0)
  const paddingY = (node.height - contentHeight) / 2

  const contentTop = node.y + paddingY
  const iconX = node.x + PADDING_X
  const labelX = hasIcon ? iconX + ICON_SIZE + ICON_GAP : node.x + node.width / 2
  const rowCenterY = contentTop + firstRowHeight / 2
  const labelY = hasIcon ? rowCenterY : contentTop
  const sublabelY = hasSublabel ? contentTop + firstRowHeight + SUBLABEL_GAP : 0
  const metadataY = hasMetadata
    ? (hasSublabel ? sublabelY + sublabelHeight : contentTop + firstRowHeight) +
      METADATA_GAP
    : 0

  return {
    hasIcon,
    iconX,
    iconY: hasIcon ? rowCenterY - ICON_SIZE / 2 : contentTop,
    labelX,
    labelY,
    sublabelY,
    metadataY,
    labelAnchor: hasIcon ? ("start" as const) : ("middle" as const),
    labelBaseline: hasIcon ? ("central" as const) : ("hanging" as const),
  }
}

export function SystemNode({ node }: SystemNodeProps) {
  const layout = getNodeLayout(node)

  return (
    <g className="atlas-system-node" data-active={node.active || undefined}>
      <rect
        x={node.x}
        y={node.y}
        width={node.width}
        height={node.height}
        rx={8}
        className="atlas-system-node__surface"
      />
      <rect
        x={node.x + 1}
        y={node.y + 1}
        width={node.width - 2}
        height={1}
        rx={0.5}
        className="atlas-system-node__highlight"
      />
      <NodeIcon type={node.icon} x={layout.iconX} y={layout.iconY} />
      <text
        x={layout.labelX}
        y={layout.labelY}
        textAnchor={layout.labelAnchor}
        dominantBaseline={layout.labelBaseline}
        className="atlas-system-node__label"
      >
        {node.label}
      </text>
      {node.sublabel ? (
        <text
          x={layout.labelX}
          y={layout.sublabelY}
          textAnchor={layout.labelAnchor}
          dominantBaseline="hanging"
          className="atlas-system-node__sublabel"
        >
          {node.sublabel}
        </text>
      ) : null}
      {node.metadata ? (
        <text
          x={layout.labelX}
          y={layout.metadataY}
          textAnchor={layout.labelAnchor}
          dominantBaseline="hanging"
          className="atlas-system-node__metadata"
        >
          {node.metadata}
        </text>
      ) : null}
      <circle
        cx={node.x + node.width}
        cy={node.y + node.height / 2}
        r={3}
        className="atlas-system-node__port"
      />
      <circle
        cx={node.x}
        cy={node.y + node.height / 2}
        r={2.5}
        className="atlas-system-node__port atlas-system-node__port--in"
      />
    </g>
  )
}

interface SystemConnectorProps {
  fromX: number
  fromY: number
  toX: number
  toY: number
  markerId?: string
  accent?: boolean
}

/** Horizontal route with optional 90° elbow when y differs. */
export function SystemConnector({
  fromX,
  fromY,
  toX,
  toY,
  markerId = "atlas-arrow",
  accent = false,
}: SystemConnectorProps) {
  const midX = fromX + (toX - fromX) / 2
  const d =
    fromY === toY
      ? `M ${fromX} ${fromY} L ${toX} ${toY}`
      : `M ${fromX} ${fromY} L ${midX} ${fromY} L ${midX} ${toY} L ${toX} ${toY}`

  return (
    <path
      d={d}
      className="atlas-system-connector"
      data-accent={accent || undefined}
      markerEnd={markerId ? `url(#${markerId})` : undefined}
    />
  )
}
