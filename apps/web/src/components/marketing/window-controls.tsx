import { cn } from "@atlas/ui"

interface WindowControlsProps {
  className?: string
  /** Attio-style traffic lights for flagship window mockups. */
  variant?: "traffic" | "neutral"
}

/** Decorative window controls — visual signal only, not interactive. */
export function WindowControls({
  className,
  variant = "traffic",
}: WindowControlsProps) {
  return (
    <div
      className={cn(
        "atlas-window-controls",
        variant === "neutral" && "atlas-window-controls--neutral",
        className
      )}
      aria-hidden="true"
    >
      <span className="atlas-window-controls__dot atlas-window-controls__dot--1" />
      <span className="atlas-window-controls__dot atlas-window-controls__dot--2" />
      <span className="atlas-window-controls__dot atlas-window-controls__dot--3" />
    </div>
  )
}
