"use client"

import * as React from "react"

import { cn } from "@atlas/ui"

export interface FaqAccordionItem {
  id: string
  question: string
  answer: React.ReactNode
}

interface FaqAccordionProps {
  items: FaqAccordionItem[]
}

export function FaqAccordion({ items }: FaqAccordionProps) {
  const [openId, setOpenId] = React.useState<string | null>(null)
  const listRef = React.useRef<HTMLDivElement>(null)

  const toggleItem = React.useCallback((id: string) => {
    setOpenId((current) => (current === id ? null : id))
  }, [])

  const handleKeyDown = React.useCallback(
    (event: React.KeyboardEvent<HTMLButtonElement>, index: number) => {
      const triggers = listRef.current?.querySelectorAll<HTMLButtonElement>(
        "[data-faq-trigger]"
      )
      if (!triggers?.length) return

      let nextIndex: number | null = null

      if (event.key === "ArrowDown") {
        event.preventDefault()
        nextIndex = (index + 1) % triggers.length
      } else if (event.key === "ArrowUp") {
        event.preventDefault()
        nextIndex = (index - 1 + triggers.length) % triggers.length
      } else if (event.key === "Home") {
        event.preventDefault()
        nextIndex = 0
      } else if (event.key === "End") {
        event.preventDefault()
        nextIndex = triggers.length - 1
      }

      if (nextIndex === null) return

      triggers[nextIndex]?.focus()
    },
    []
  )

  return (
    <div ref={listRef} className="atlas-faq__list">
      {items.map((item, index) => {
        const isOpen = openId === item.id
        const panelId = `faq-panel-${item.id}`
        const triggerId = `faq-trigger-${item.id}`

        return (
          <div
            key={item.id}
            className={cn("atlas-faq__item", isOpen && "atlas-faq__item--open")}
          >
            <h3 className="atlas-faq__heading">
              <button
                type="button"
                id={triggerId}
                data-faq-trigger
                className="atlas-faq__trigger"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => toggleItem(item.id)}
                onKeyDown={(event) => handleKeyDown(event, index)}
              >
                <span className="atlas-faq__question">{item.question}</span>
                <span className="atlas-faq__icon" aria-hidden="true">
                  {isOpen ? "−" : "+"}
                </span>
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={triggerId}
              aria-hidden={!isOpen}
              inert={!isOpen ? true : undefined}
              className="atlas-faq__panel"
            >
              <div className="atlas-faq__panel-inner">
                <div className="atlas-faq__answer">{item.answer}</div>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
