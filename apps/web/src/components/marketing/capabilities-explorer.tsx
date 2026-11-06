"use client"

import { ArrowUpRight } from "lucide-react"
import * as React from "react"

import { cn } from "@atlas/ui"

import { CodeCopyButton } from "@/components/marketing/code-copy-button"
import { HighlightedCodeWindow } from "@/components/marketing/code-window"
import { FileTypeIcon } from "@/components/marketing/file-type-icon"
import { MockupChrome } from "@/components/marketing/mockup-chrome"
import { MockupFrame } from "@/components/marketing/mockup-frame"

import type { Capability } from "@/lib/marketing/content/types"

export interface HighlightedCapability extends Capability {
  html: string
}

interface CapabilitiesExplorerProps {
  capabilities: HighlightedCapability[]
}

export function CapabilitiesExplorer({
  capabilities,
}: CapabilitiesExplorerProps) {
  const [activeId, setActiveId] = React.useState(
    capabilities[0]?.id ?? "application-architecture"
  )
  const railRef = React.useRef<HTMLDivElement>(null)
  const activeIndex = capabilities.findIndex((c) => c.id === activeId)
  const activeCapability =
    capabilities.find((c) => c.id === activeId) ?? capabilities[0]

  const selectCapability = React.useCallback((id: string) => {
    setActiveId(id)
  }, [])

  const handleRailKeyDown = React.useCallback(
    (event: React.KeyboardEvent<HTMLButtonElement>, index: number) => {
      let nextIndex: number | null = null

      if (event.key === "ArrowDown") {
        event.preventDefault()
        nextIndex = (index + 1) % capabilities.length
      } else if (event.key === "ArrowUp") {
        event.preventDefault()
        nextIndex = (index - 1 + capabilities.length) % capabilities.length
      } else if (event.key === "Home") {
        event.preventDefault()
        nextIndex = 0
      } else if (event.key === "End") {
        event.preventDefault()
        nextIndex = capabilities.length - 1
      }

      if (nextIndex === null) return

      const next = capabilities[nextIndex]
      if (!next) return

      selectCapability(next.id)
      const rail = railRef.current
      const button = rail?.querySelector<HTMLButtonElement>(
        `[data-capability-id="${next.id}"]`
      )
      button?.focus()
    },
    [capabilities, selectCapability]
  )

  if (!activeCapability) return null

  return (
    <div className="atlas-capabilities-explorer">
      {/* Desktop */}
      <MockupFrame
        variant="document"
        inset={false}
        className="atlas-capabilities-explorer__shell hidden md:flex md:flex-col"
        aria-label="Atlas capabilities explorer"
      >
        <MockupChrome className="atlas-capabilities-explorer__header">
          <div className="atlas-capabilities-explorer__header-start">
            <span className="atlas-capabilities-explorer__brand">Atlas</span>
            <span className="atlas-capabilities-explorer__slash">/</span>
            <span className="atlas-capabilities-explorer__section">
              Capabilities
            </span>
          </div>
          <span
            className="atlas-capabilities-explorer__counter"
            aria-live="polite"
            aria-atomic="true"
          >
            {String((activeIndex >= 0 ? activeIndex : 0) + 1).padStart(2, "0")}{" "}
            / {String(capabilities.length).padStart(2, "0")}
          </span>
        </MockupChrome>

        <div className="atlas-capabilities-explorer__body">
          <div
            ref={railRef}
            className="atlas-capabilities-explorer__rail"
            role="tablist"
            aria-label="Atlas capabilities"
            aria-orientation="vertical"
          >
            {capabilities.map((capability, index) => {
              const isActive = capability.id === activeId

              return (
                <button
                  key={capability.id}
                  type="button"
                  role="tab"
                  data-capability-id={capability.id}
                  id={`capability-tab-${capability.id}`}
                  aria-selected={isActive}
                  aria-controls={`capability-panel-${capability.id}`}
                  tabIndex={isActive ? 0 : -1}
                  className={cn(
                    "atlas-capabilities-explorer__rail-item",
                    isActive && "atlas-capabilities-explorer__rail-item--active"
                  )}
                  onClick={() => selectCapability(capability.id)}
                  onKeyDown={(event) => handleRailKeyDown(event, index)}
                >
                  <span
                    className="atlas-capabilities-explorer__rail-indicator"
                    aria-hidden="true"
                  />
                  <span className="atlas-capabilities-explorer__rail-text">
                    <span className="atlas-capabilities-explorer__rail-title">
                      {capability.title}
                    </span>
                    <span className="atlas-capabilities-explorer__rail-desc">
                      {capability.descriptor}
                    </span>
                  </span>
                </button>
              )
            })}
          </div>

          <CapabilityEvidencePanel
            capability={activeCapability}
            panelId={`capability-panel-${activeCapability.id}`}
            labelledBy={`capability-tab-${activeCapability.id}`}
          />
        </div>
      </MockupFrame>

      {/* Mobile */}
      <MockupFrame
        variant="document"
        inset={false}
        className="atlas-capabilities-explorer__mobile md:hidden"
      >
        <MockupChrome className="atlas-capabilities-explorer__mobile-chrome">
          <div className="atlas-capabilities-explorer__header-start">
            <span className="atlas-capabilities-explorer__brand">Atlas</span>
            <span className="atlas-capabilities-explorer__slash">/</span>
            <span className="atlas-capabilities-explorer__section">
              Capabilities
            </span>
          </div>
        </MockupChrome>

        <div
          className="atlas-capabilities-explorer__mobile-rail"
          role="tablist"
          aria-label="Atlas capabilities"
        >
          {capabilities.map((capability, index) => {
            const isActive = capability.id === activeId

            return (
              <button
                key={capability.id}
                type="button"
                role="tab"
                id={`capability-tab-mobile-${capability.id}`}
                aria-selected={isActive}
                aria-controls={`capability-panel-mobile-${capability.id}`}
                tabIndex={isActive ? 0 : -1}
                className={cn(
                  "atlas-capabilities-explorer__mobile-item",
                  isActive &&
                    "atlas-capabilities-explorer__mobile-item--active"
                )}
                onClick={() => selectCapability(capability.id)}
                onKeyDown={(event) => handleRailKeyDown(event, index)}
              >
                <span className="atlas-capabilities-explorer__mobile-title">
                  {capability.title}
                </span>
                <span className="atlas-capabilities-explorer__mobile-desc">
                  {capability.descriptor}
                </span>
              </button>
            )
          })}
        </div>

        <CapabilityEvidencePanel
          capability={activeCapability}
          panelId={`capability-panel-mobile-${activeCapability.id}`}
          labelledBy={`capability-tab-mobile-${activeCapability.id}`}
          mobile
        />
      </MockupFrame>
    </div>
  )
}

function CapabilityEvidencePanel({
  capability,
  panelId,
  labelledBy,
  mobile = false,
}: {
  capability: HighlightedCapability
  panelId: string
  labelledBy: string
  mobile?: boolean
}) {
  return (
    <div
      id={panelId}
      role="tabpanel"
      aria-labelledby={labelledBy}
      className={cn(
        "atlas-capabilities-explorer__evidence",
        mobile && "atlas-capabilities-explorer__evidence--mobile"
      )}
    >
      <div className="atlas-capabilities-explorer__evidence-meta">
        <p className="atlas-capabilities-explorer__explanation">
          {capability.explanation}
        </p>
        {capability.included && capability.included.length > 0 ? (
          <ul className="atlas-capabilities-explorer__included">
            {capability.included.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        ) : null}
      </div>

      <div className="atlas-capabilities-explorer__code-surface">
        <div className="atlas-capabilities-explorer__code-chrome">
          <div className="atlas-capabilities-explorer__code-chrome-start">
            <FileTypeIcon language={capability.snippet.language} />
            {capability.sourceHref ? (
              <a
                href={capability.sourceHref}
                target="_blank"
                rel="noopener noreferrer"
                className="atlas-capabilities-explorer__source"
                title={capability.source}
              >
                <span>{capability.source}</span>
                <ArrowUpRight className="size-3" aria-hidden="true" />
              </a>
            ) : (
              <span className="atlas-capabilities-explorer__source-static">
                {capability.source}
              </span>
            )}
          </div>
          {capability.snippet.copyable !== false ? (
            <CodeCopyButton code={capability.snippet.code} />
          ) : null}
        </div>
        <div className="atlas-capabilities-explorer__code-body">
          <HighlightedCodeWindow
            snippet={capability.snippet}
            html={capability.html}
            showFilename={false}
            embedded
            variant={
              capability.snippet.language === "markdown" ? "tree" : "editor"
            }
            className="atlas-capabilities-explorer__code-window"
          />
        </div>
      </div>
    </div>
  )
}
