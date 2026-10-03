export interface CodingAgent {
  id: string
  name: string
  shortName: string
  mark: "cursor" | "claude" | "codex" | "copilot" | "gemini" | "cline"
}

export type CodingAgentLogoFile =
  | string
  | {
      light: string
      dark: string
    }

/** Filename in `public/marketing/agent-logos/` — omit for letter-fallback marks */
export const CODING_AGENT_LOGO_FILES: Partial<
  Record<CodingAgent["mark"], CodingAgentLogoFile>
> = {
  cursor: { light: "cursor-light.svg", dark: "cursor-dark.svg" },
  claude: "claude-code-color.svg",
  codex: { light: "codex-light.svg", dark: "codex-dark.svg" },
  copilot: {
    light: "github-copilot-light.svg",
    dark: "github-copilot-dark.svg",
  },
  gemini: "gemini-cli.svg",
  cline: "cline.svg",
}

export const CODING_AGENTS: CodingAgent[] = [
  {
    id: "cursor",
    name: "Cursor",
    shortName: "Cursor",
    mark: "cursor",
  },
  {
    id: "claude-code",
    name: "Claude Code",
    shortName: "Claude Code",
    mark: "claude",
  },
  {
    id: "codex",
    name: "Codex",
    shortName: "Codex",
    mark: "codex",
  },
  {
    id: "github-copilot",
    name: "GitHub Copilot",
    shortName: "Copilot",
    mark: "copilot",
  },
  {
    id: "gemini-cli",
    name: "Gemini CLI",
    shortName: "Gemini CLI",
    mark: "gemini",
  },
  {
    id: "cline",
    name: "Cline",
    shortName: "Cline",
    mark: "cline",
  },
]

export interface AgentContextTranscriptStage {
  id: string
  /** Plain title text before optional highlight */
  title: string
  /** Monospace or accent substring within the title, e.g. AGENTS.md */
  titleMono?: string
  detail: string
  detailMono?: boolean
}

export const AGENT_CONTEXT_TRANSCRIPT_STAGES: AgentContextTranscriptStage[] = [
  {
    id: "agents-md",
    title: "Reading ",
    titleMono: "AGENTS.md",
    detail: "Repository architecture and conventions loaded",
  },
  {
    id: "boundary",
    title: "Locating feature boundary",
    detail: "apps/web/src/features/users",
    detailMono: true,
  },
  {
    id: "reference",
    title: "Finding reference implementation",
    detail: "apps/web/src/features/examples",
    detailMono: true,
  },
  {
    id: "conventions",
    title: "Applying repository conventions",
    detail: "Thin routes · feature ownership · no cross-feature imports",
  },
  {
    id: "verification",
    title: "Verifying implementation",
    detail: "validate:env · lint · typecheck · test · build",
    detailMono: true,
  },
]

export const AGENT_CONTEXT_RESULT = "Architecture preserved"
