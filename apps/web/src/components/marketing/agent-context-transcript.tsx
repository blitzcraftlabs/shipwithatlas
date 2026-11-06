"use client"

import * as React from "react"

import { cn } from "@atlas/ui"

import { CodingAgentMark } from "@/components/marketing/coding-agent-marks"
import {
  AGENT_CONTEXT_RESULT,
  AGENT_CONTEXT_TRANSCRIPT_STAGES,
  CODING_AGENTS,
} from "@/lib/marketing/content/agents-workspace"

const TRANSCRIPT_DESCRIPTION =
  "Interactive transcript showing that any coding agent loads the same Atlas repository context. Only the agent flag in the command changes."

export function AgentContextTranscript() {
  const [selectedAgentId, setSelectedAgentId] = React.useState("cursor")
  const [revealKey, setRevealKey] = React.useState(0)

  const handleAgentSelect = (agentId: string) => {
    if (agentId === selectedAgentId) return
    setSelectedAgentId(agentId)
    setRevealKey((current) => current + 1)
  }

  const handleSelectorKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    const currentIndex = CODING_AGENTS.findIndex(
      (agent) => agent.id === selectedAgentId
    )
    if (currentIndex === -1) return

    let nextIndex: number | null = null

    if (event.key === "ArrowRight" || event.key === "ArrowDown") {
      nextIndex = (currentIndex + 1) % CODING_AGENTS.length
    } else if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
      nextIndex =
        (currentIndex - 1 + CODING_AGENTS.length) % CODING_AGENTS.length
    } else if (event.key === "Home") {
      nextIndex = 0
    } else if (event.key === "End") {
      nextIndex = CODING_AGENTS.length - 1
    }

    if (nextIndex === null) return

    event.preventDefault()
    const nextAgent = CODING_AGENTS[nextIndex]
    if (!nextAgent) return
    handleAgentSelect(nextAgent.id)
    document.getElementById(`agent-tab-${nextAgent.id}`)?.focus()
  }

  return (
    <div
      className="atlas-agent-context"
      aria-labelledby="agent-context-title"
      aria-describedby="agent-context-desc"
    >
      <span id="agent-context-title" className="sr-only">
        Agent context transcript
      </span>
      <p id="agent-context-desc" className="sr-only">
        {TRANSCRIPT_DESCRIPTION}
      </p>

      <div
        className="atlas-agent-context__selector"
        role="tablist"
        aria-label="Coding agents"
        tabIndex={0}
        onKeyDown={handleSelectorKeyDown}
      >
        {CODING_AGENTS.map((agent) => {
          const isSelected = agent.id === selectedAgentId

          return (
            <button
              key={agent.id}
              type="button"
              role="tab"
              id={`agent-tab-${agent.id}`}
              aria-selected={isSelected}
              aria-controls="agent-context-panel"
              tabIndex={isSelected ? 0 : -1}
              className={cn(
                "atlas-agent-context__selector-item",
                isSelected && "atlas-agent-context__selector-item--active"
              )}
              onClick={() => handleAgentSelect(agent.id)}
            >
              <CodingAgentMark
                mark={agent.mark}
                variant="plain"
                className={cn(
                  "atlas-agent-context__selector-mark",
                  !isSelected && "atlas-agent-context__selector-mark--muted"
                )}
              />
              <span>{agent.shortName}</span>
            </button>
          )
        })}
      </div>

      <div
        id="agent-context-panel"
        role="tabpanel"
        aria-labelledby={`agent-tab-${selectedAgentId}`}
        className="atlas-agent-context__panel"
      >
        <div className="atlas-agent-context__composition">
          <p className="atlas-agent-context__command" aria-live="polite">
            <span className="atlas-agent-context__command-line">
              <span className="atlas-agent-context__command-prompt">$</span>{" "}
              context{" "}
              <span className="atlas-agent-context__command-flag">
                --agent{" "}
                <span
                  key={selectedAgentId}
                  className="atlas-agent-context__command-slug"
                >
                  {selectedAgentId}
                </span>
              </span>
            </span>
          </p>

          <div className="atlas-agent-context__execution">
            <ol
              className={cn(
                "atlas-agent-context__transcript",
                revealKey > 0 && "atlas-agent-context__transcript--reveal"
              )}
              key={revealKey}
            >
              {AGENT_CONTEXT_TRANSCRIPT_STAGES.map((stage, index) => (
                <li
                  key={stage.id}
                  className="atlas-agent-context__stage"
                  style={
                    revealKey > 0
                      ? ({
                          "--atlas-agent-stage-delay": `${index * 0.055}s`,
                        } as React.CSSProperties)
                      : undefined
                  }
                >
                  <span
                    className="atlas-agent-context__stage-marker"
                    aria-hidden="true"
                  >
                    ›
                  </span>
                  <div className="atlas-agent-context__stage-body">
                    <p className="atlas-agent-context__stage-title">
                      {stage.title}
                      {stage.titleMono ? (
                        <span className="atlas-agent-context__stage-title-mono">
                          {stage.titleMono}
                        </span>
                      ) : null}
                    </p>
                    <p
                      className={cn(
                        "atlas-agent-context__stage-detail",
                        stage.detailMono &&
                          "atlas-agent-context__stage-detail--mono"
                      )}
                    >
                      {stage.detail}
                    </p>
                  </div>
                </li>
              ))}
            </ol>

            <p className="atlas-agent-context__result">
              <span
                className="atlas-agent-context__result-mark"
                aria-hidden="true"
              >
                ✓
              </span>
              {AGENT_CONTEXT_RESULT}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
