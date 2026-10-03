"use client"

import { Check, Copy } from "lucide-react"
import * as React from "react"

import { cn } from "@atlas/ui"

interface CodeCopyButtonProps {
  code: string
  className?: string
  label?: string
}

export function CodeCopyButton({
  code,
  className,
  label = "Copy code",
}: CodeCopyButtonProps) {
  const [copied, setCopied] = React.useState(false)

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(code)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 2000)
    } catch {
      setCopied(false)
    }
  }

  return (
    <button
      type="button"
      className={cn("atlas-code-window__copy", className)}
      onClick={handleCopy}
      aria-label={copied ? "Copied" : label}
    >
      {copied ? (
        <Check className="size-3.5" aria-hidden="true" />
      ) : (
        <Copy className="size-3.5" aria-hidden="true" />
      )}
    </button>
  )
}
