import { cn } from "@atlas/ui"

interface SectionLabelProps {
  /** Sheet index, e.g. "02". Continues the numbering the hero edge starts. */
  index: string
  children: React.ReactNode
  className?: string
  /** "inverse" sits on the blue closing sheet. */
  tone?: "default" | "inverse"
}

/**
 * Blueprint section label: the sheet index and section name in one outlined
 * mono tag, matching the hero's sheet-edge label.
 */
export function SectionLabel({
  index,
  children,
  className,
  tone = "default",
}: SectionLabelProps) {
  return (
    <p
      className={cn(
        "bp-label",
        tone === "inverse" && "bp-label--inverse",
        className
      )}
    >
      <span className="bp-label__index">{index}</span>
      <span className="bp-label__name">{children}</span>
    </p>
  )
}
