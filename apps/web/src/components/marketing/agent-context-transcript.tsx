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

/** Lets long paths wrap after a slash rather than mid-segment on phones. */
function breakAtSlashes(path: string) {
  return path.split("/").map((segment, index, segments) => (
    <React.Fragment key={`${segment}-${index}`}>
      {segment}
      {index < segments.length - 1 ? (
        <>
          /<wbr />
        </>
      ) : null}
    </React.Fragment>
  ))
}

const NEXT_KEYS = new Set(["ArrowRight", "ArrowDown"])
const PREVIOUS_KEYS = new Set(["ArrowLeft", "ArrowUp"])

/**
 * Agent selector over one transcript. Only the `--agent` flag changes when a
 * different agent is picked; the stages below stay the same, which is the
 * point the section makes.
 */
export function AgentContextTranscript() {
  const [selectedAgentId, setSelectedAgentId] = React.useState("cursor")
  const [revealKey, setRevealKey] = React.useState(0)

  const handleAgentSelect = (agentId: string) => {
    if (agentId === selectedAgentId) return
    setSelectedAgentId(agentId)
    setRevealKey((current) => current + 1)
  }

  const handleSelectorKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
    const currentIndex = CODING_AGENTS.findIndex(
      (agent) => agent.id === selectedAgentId
    )
    if (currentIndex === -1) return

    let nextIndex: number | null = null

    if (NEXT_KEYS.has(event.key)) {
      nextIndex = (currentIndex + 1) % CODING_AGENTS.length
    } else if (PREVIOUS_KEYS.has(event.key)) {
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
      className="bp-agent"
      role="group"
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
        className="bp-agent__tabs"
        role="tablist"
        aria-label="Coding agents"
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
                "bp-agent__tab",
                isSelected && "bp-agent__tab--active"
              )}
              onClick={() => handleAgentSelect(agent.id)}
              onKeyDown={handleSelectorKeyDown}
            >
              <CodingAgentMark
                mark={agent.mark}
                variant="plain"
                className="bp-agent__mark"
              />
              <span className="bp-agent__tab-name">{agent.shortName}</span>
            </button>
          )
        })}
      </div>

      <div
        id="agent-context-panel"
        role="tabpanel"
        aria-labelledby={`agent-tab-${selectedAgentId}`}
        className="bp-agent__panel"
      >
        <p className="bp-agent__command" aria-live="polite">
          <span className="bp-agent__prompt" aria-hidden="true">
            $
          </span>
          <code>
            context <span className="bp-agent__flag">--agent</span>{" "}
            <span key={selectedAgentId} className="bp-agent__slug">
              {selectedAgentId}
            </span>
          </code>
        </p>

        <ol
          className={cn(
            "bp-agent__stages",
            revealKey > 0 && "bp-agent__stages--reveal"
          )}
          key={revealKey}
        >
          {AGENT_CONTEXT_TRANSCRIPT_STAGES.map((stage, index) => (
            <li
              key={stage.id}
              className="bp-agent__stage"
              style={
                revealKey > 0
                  ? ({
                      "--bp-stage-delay": `${index * 0.06}s`,
                    } as React.CSSProperties)
                  : undefined
              }
            >
              <span className="bp-agent__node" aria-hidden="true" />
              <div className="bp-agent__stage-body">
                <p className="bp-agent__stage-title">
                  {stage.title}
                  {stage.titleMono ? <code>{stage.titleMono}</code> : null}
                </p>
                <p
                  className={cn(
                    "bp-agent__stage-detail",
                    stage.detailMono && "bp-agent__stage-detail--mono"
                  )}
                >
                  {stage.detailMono ? breakAtSlashes(stage.detail) : stage.detail}
                </p>
              </div>
            </li>
          ))}
        </ol>

        <p className="bp-agent__result">
          <span className="bp-agent__result-mark" aria-hidden="true">
            ✓
          </span>
          {AGENT_CONTEXT_RESULT}
        </p>
      </div>
    </div>
  )
}
