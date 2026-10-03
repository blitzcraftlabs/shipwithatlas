import { cn } from "@atlas/ui"

import { AtlasRouteMark } from "@/components/marketing/atlas-route-mark"

interface SectionEyebrowProps {
  children: React.ReactNode
  className?: string
  muted?: boolean
  centered?: boolean
}

export function SectionEyebrow({
  children,
  className,
  muted = false,
  centered = false,
}: SectionEyebrowProps) {
  return (
    <p
      className={cn(
        "atlas-eyebrow",
        muted && "atlas-eyebrow--muted",
        centered && "atlas-eyebrow--centered",
        className
      )}
    >
      {!centered && (
        <span className="atlas-eyebrow__mark" aria-hidden="true">
          <AtlasRouteMark />
          <span className="atlas-eyebrow__line" />
        </span>
      )}
      {children}
    </p>
  )
}
