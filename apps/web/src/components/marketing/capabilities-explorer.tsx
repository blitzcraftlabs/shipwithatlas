"use client"

import { ArrowUpRight } from "lucide-react"
import * as React from "react"

import { cn } from "@atlas/ui"

import { CodeCopyButton } from "@/components/marketing/code-copy-button"
import { FileTypeIcon } from "@/components/marketing/file-type-icon"

import type { Capability } from "@/lib/marketing/content/types"

export interface HighlightedCapability extends Capability {
  html: string
}

interface CapabilitiesExplorerProps {
  capabilities: HighlightedCapability[]
}

const NEXT_KEYS = new Set(["ArrowDown", "ArrowRight"])
const PREVIOUS_KEYS = new Set(["ArrowUp", "ArrowLeft"])

function formatIndex(index: number) {
  return String(index + 1).padStart(2, "0")
}

/**
 * One window: the capability index on the left (a vertical rail on wide
 * screens, a scrollable strip on narrow ones) and the selected capability's
 * explanation and source on the right. The active row is the only blue fill,
 * matching the active file in the hero workspace preview.
 */
export function CapabilitiesExplorer({
  capabilities,
}: CapabilitiesExplorerProps) {
  const [activeId, setActiveId] = React.useState(
    capabilities[0]?.id ?? "application-architecture"
  )
  const railRef = React.useRef<HTMLDivElement>(null)
  const activeIndex = Math.max(
    0,
    capabilities.findIndex((c) => c.id === activeId)
  )
  const activeCapability = capabilities[activeIndex]

  const focusTab = React.useCallback((id: string) => {
    const button = railRef.current?.querySelector<HTMLButtonElement>(
      `[data-capability-id="${id}"]`
    )
    button?.focus()
    button?.scrollIntoView({ block: "nearest", inline: "nearest" })
  }, [])

  const handleRailKeyDown = React.useCallback(
    (event: React.KeyboardEvent<HTMLButtonElement>, index: number) => {
      let nextIndex: number | null = null

      if (NEXT_KEYS.has(event.key)) {
        nextIndex = (index + 1) % capabilities.length
      } else if (PREVIOUS_KEYS.has(event.key)) {
        nextIndex = (index - 1 + capabilities.length) % capabilities.length
      } else if (event.key === "Home") {
        nextIndex = 0
      } else if (event.key === "End") {
        nextIndex = capabilities.length - 1
      }

      if (nextIndex === null) return
      event.preventDefault()

      const next = capabilities[nextIndex]
      if (!next) return

      setActiveId(next.id)
      focusTab(next.id)
    },
    [capabilities, focusTab]
  )

  if (!activeCapability) return null

  const panelId = `capability-panel-${activeCapability.id}`

  return (
    <div className="bp-explorer" aria-label="Atlas capabilities explorer" role="group">
      <div className="bp-explorer__bar">
        <span className="bp-explorer__crumb">
          <span className="bp-explorer__crumb-root">atlas</span>
          <span className="bp-explorer__crumb-sep" aria-hidden="true">
            /
          </span>
          capabilities
        </span>
        <span
          className="bp-explorer__counter"
          aria-live="polite"
          aria-atomic="true"
        >
          <span className="sr-only">Capability </span>
          {formatIndex(activeIndex)}
          <span aria-hidden="true"> / </span>
          <span className="sr-only"> of </span>
          {String(capabilities.length).padStart(2, "0")}
        </span>
      </div>

      <div className="bp-explorer__body">
        <div
          ref={railRef}
          className="bp-explorer__rail"
          role="tablist"
          aria-label="Atlas capabilities"
        >
          {capabilities.map((capability, index) => {
            const isActive = capability.id === activeCapability.id

            return (
              <button
                key={capability.id}
                type="button"
                role="tab"
                data-capability-id={capability.id}
                id={`capability-tab-${capability.id}`}
                aria-selected={isActive}
                aria-controls={isActive ? panelId : undefined}
                tabIndex={isActive ? 0 : -1}
                className={cn(
                  "bp-explorer__tab",
                  isActive && "bp-explorer__tab--active"
                )}
                onClick={() => setActiveId(capability.id)}
                onKeyDown={(event) => handleRailKeyDown(event, index)}
              >
                <span className="bp-explorer__tab-index" aria-hidden="true">
                  {formatIndex(index)}
                </span>
                <span className="bp-explorer__tab-title">
                  {capability.title}
                </span>
              </button>
            )
          })}
        </div>

        <div
          id={panelId}
          role="tabpanel"
          aria-labelledby={`capability-tab-${activeCapability.id}`}
          className="bp-explorer__panel"
        >
          <div className="bp-explorer__summary">
            <h3 className="bp-explorer__title">{activeCapability.title}</h3>
            <p className="bp-explorer__descriptor">
              {activeCapability.descriptor}
            </p>
            <p className="bp-explorer__explanation">
              {activeCapability.explanation}
            </p>
            {activeCapability.included && activeCapability.included.length > 0 ? (
              <ul className="bp-explorer__included" aria-label="Included">
                {activeCapability.included.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            ) : null}
          </div>

          <div className="bp-code">
            <div className="bp-code__chrome">
              <span className="bp-code__file">
                <FileTypeIcon
                  language={activeCapability.snippet.language}
                  className="bp-code__file-icon"
                />
                {activeCapability.sourceHref ? (
                  <a
                    href={activeCapability.sourceHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bp-code__source"
                    title={activeCapability.source}
                  >
                    <span className="bp-code__source-text">
                      {activeCapability.source}
                    </span>
                    <ArrowUpRight className="size-3.5" aria-hidden="true" />
                    <span className="sr-only"> (opens in a new tab)</span>
                  </a>
                ) : (
                  <span className="bp-code__source-text">
                    {activeCapability.source}
                  </span>
                )}
              </span>
              {activeCapability.snippet.copyable !== false ? (
                <CodeCopyButton
                  code={activeCapability.snippet.code}
                  label={`Copy ${activeCapability.snippet.label}`}
                  className="bp-copy bp-copy--inverse"
                />
              ) : null}
            </div>
            { }
            <div
              className={cn(
                "bp-code__body",
                activeCapability.snippet.language === "markdown" &&
                  "bp-code__body--tree"
              )}
              // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex -- keyboard scroll for code blocks
              tabIndex={0}
              role="region"
              aria-label={`${activeCapability.snippet.label} source`}
            >
              <div
                className="bp-code__code"
                dangerouslySetInnerHTML={{ __html: activeCapability.html }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
