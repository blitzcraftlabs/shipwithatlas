"use client"

import * as React from "react"

import { cn } from "@atlas/ui"

import { HighlightedCodeWindow } from "@/components/marketing/code-window"
import { FileTypeIcon } from "@/components/marketing/file-type-icon"
import { MockupChrome } from "@/components/marketing/mockup-chrome"
import { MockupFrame } from "@/components/marketing/mockup-frame"

import type { CodeSnippet } from "@/lib/marketing/content/types"

export interface HighlightedTab extends CodeSnippet {
  html: string
}

interface HeroCodeTabsClientProps {
  tabs: HighlightedTab[]
}

function getTabBasename(filename: string) {
  const segments = filename.split("/")
  return segments[segments.length - 1] ?? filename
}

export function HeroCodeTabsClient({ tabs }: HeroCodeTabsClientProps) {
  const [activeTab, setActiveTab] = React.useState(tabs[0]?.id ?? "")
  const tabRefs = React.useRef<(HTMLButtonElement | null)[]>([])
  const activeIndex = tabs.findIndex((tab) => tab.id === activeTab)
  const activeSnippet = tabs[activeIndex >= 0 ? activeIndex : 0] ?? tabs[0]

  const focusTab = React.useCallback(
    (index: number) => {
      const tab = tabs[index]
      if (!tab) return
      setActiveTab(tab.id)
      tabRefs.current[index]?.focus()
    },
    [tabs]
  )

  const handleTabKeyDown = (
    event: React.KeyboardEvent<HTMLButtonElement>,
    index: number
  ) => {
    let nextIndex = index

    switch (event.key) {
      case "ArrowRight":
      case "ArrowDown":
        event.preventDefault()
        nextIndex = (index + 1) % tabs.length
        break
      case "ArrowLeft":
      case "ArrowUp":
        event.preventDefault()
        nextIndex = (index - 1 + tabs.length) % tabs.length
        break
      case "Home":
        event.preventDefault()
        nextIndex = 0
        break
      case "End":
        event.preventDefault()
        nextIndex = tabs.length - 1
        break
      default:
        return
    }

    focusTab(nextIndex)
  }

  return (
    <MockupFrame variant="window" className="atlas-hero-editor">
      <MockupChrome className="atlas-hero-editor__chrome">
        <div
          className="atlas-hero-editor__tabstrip"
          role="tablist"
          aria-label="Atlas code examples"
        >
          {tabs.map((tab, index) => {
            const isActive = tab.id === activeTab
            const basename = getTabBasename(tab.filename)

            return (
              <button
                key={tab.id}
                ref={(node) => {
                  tabRefs.current[index] = node
                }}
                type="button"
                role="tab"
                id={`hero-tab-${tab.id}`}
                aria-selected={isActive}
                aria-controls={`hero-panel-${tab.id}`}
                tabIndex={isActive ? 0 : -1}
                className={cn(
                  "atlas-hero-editor__tab",
                  isActive && "atlas-hero-editor__tab--active"
                )}
                onClick={() => setActiveTab(tab.id)}
                onKeyDown={(event) => handleTabKeyDown(event, index)}
              >
                <FileTypeIcon
                  language={tab.language}
                  className={cn(
                    "atlas-hero-editor__tab-icon",
                    isActive && "atlas-hero-editor__tab-icon--active"
                  )}
                />
                <span className="atlas-hero-editor__tab-label">{basename}</span>
              </button>
            )
          })}
        </div>
      </MockupChrome>

      <div className="atlas-hero-editor__surface">
        {activeSnippet ? (
          <div
            key={activeSnippet.id}
            role="tabpanel"
            id={`hero-panel-${activeSnippet.id}`}
            aria-labelledby={`hero-tab-${activeSnippet.id}`}
            className="atlas-hero-editor__panel"
          >
            <HighlightedCodeWindow
              snippet={activeSnippet}
              html={activeSnippet.html}
              variant="editor"
              embedded
              pathStyle="breadcrumb"
              className="atlas-code-window--hero-scale"
            />
          </div>
        ) : null}
      </div>

      <span className="sr-only" aria-live="polite">
        Showing {activeSnippet?.filename}
      </span>
    </MockupFrame>
  )
}
