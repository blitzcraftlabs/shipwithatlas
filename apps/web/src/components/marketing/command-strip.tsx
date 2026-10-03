"use client"

import { Check, Copy } from "lucide-react"
import * as React from "react"

import { Button } from "@atlas/ui"

import { QUICK_START_COMMAND } from "@/lib/marketing/constants"

export function CommandStrip() {
  const [copied, setCopied] = React.useState(false)

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(QUICK_START_COMMAND)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 2000)
    } catch {
      setCopied(false)
    }
  }

  return (
    <div className="atlas-command-strip">
      <code className="atlas-command-strip__code">{QUICK_START_COMMAND}</code>
      <Button
        type="button"
        variant="ghost"
        size="icon-sm"
        className="atlas-command-strip__copy"
        onClick={handleCopy}
        aria-label={copied ? "Copied command" : "Copy quick-start command"}
      >
        {copied ? (
          <Check className="size-3.5" aria-hidden="true" />
        ) : (
          <Copy className="size-3.5" aria-hidden="true" />
        )}
      </Button>
    </div>
  )
}
