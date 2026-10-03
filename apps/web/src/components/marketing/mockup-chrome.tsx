import * as React from "react"

import { cn } from "@atlas/ui"

import { WindowControls } from "@/components/marketing/window-controls"

interface MockupChromeProps extends React.HTMLAttributes<HTMLElement> {
  as?: "header" | "div"
}

/** Top chrome row with decorative macOS-style window controls. */
export function MockupChrome({
  as: Tag = "header",
  className,
  children,
  ...props
}: MockupChromeProps) {
  return (
    <Tag className={cn("atlas-mockup-chrome", className)} {...props}>
      <WindowControls className="atlas-mockup-chrome__controls" />
      {children ? (
        <div className="atlas-mockup-chrome__main">{children}</div>
      ) : null}
    </Tag>
  )
}
