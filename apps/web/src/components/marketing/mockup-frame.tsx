import * as React from "react"

import { cn } from "@atlas/ui"

export type MockupFrameVariant =
  | "window"
  | "application"
  | "document"
  | "repository"

export interface MockupFrameProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: MockupFrameVariant
  /** Adds a thin inset shell layer between the outer frame and content. */
  inset?: boolean
  innerClassName?: string
}

export function MockupFrame({
  variant = "application",
  inset,
  className,
  innerClassName,
  children,
  ...props
}: MockupFrameProps) {
  const useInset = inset ?? true

  return (
    <div
      className={cn(
        "atlas-mockup-frame",
        `atlas-mockup-frame--${variant}`,
        className
      )}
      {...props}
    >
      {useInset ? (
        <div className={cn("atlas-mockup-frame__inset", innerClassName)}>
          {children}
        </div>
      ) : (
        children
      )}
    </div>
  )
}
