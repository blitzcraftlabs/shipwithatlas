import { cn } from "@atlas/ui"

import {
  CODING_AGENT_LOGO_FILES,
  type CodingAgent,
  type CodingAgentLogoFile,
} from "@/lib/marketing/content/agents-workspace"

export const CODING_AGENT_LOGO_DIR = "/marketing/agent-logos"

interface CodingAgentMarkProps {
  mark: CodingAgent["mark"]
  className?: string
  variant?: "default" | "plain"
}

const LIGHT_MARK_LOGOS: CodingAgent["mark"][] = [
  "cline",
  "claude",
  "gemini",
]

function resolveCodingAgentLogoFilename(
  logoFile: CodingAgentLogoFile | undefined,
  usesDarkMarkBg: boolean
): string | undefined {
  if (!logoFile) return undefined
  if (typeof logoFile === "string") return logoFile
  return usesDarkMarkBg ? logoFile.dark : logoFile.light
}

export function CodingAgentMark({
  mark,
  className,
  variant = "default",
}: CodingAgentMarkProps) {
  const usesLightMarkBg = LIGHT_MARK_LOGOS.includes(mark)
  const usesDarkMarkBg = variant === "default" && !usesLightMarkBg
  const filename = resolveCodingAgentLogoFilename(
    CODING_AGENT_LOGO_FILES[mark],
    usesDarkMarkBg
  )

  return (
    <span
      className={cn(
        "atlas-agent-mark",
        variant === "plain" && "atlas-agent-mark--plain",
        variant === "default" &&
          (usesLightMarkBg
            ? "atlas-agent-mark--light"
            : "atlas-agent-mark--dark"),
        className
      )}
      aria-hidden="true"
    >
      {filename ? (
        <img
          className="atlas-agent-mark__logo"
          src={`${CODING_AGENT_LOGO_DIR}/${filename}`}
          alt=""
          width={20}
          height={20}
          decoding="async"
        />
      ) : (
        <span className="atlas-agent-mark__letter">C</span>
      )}
    </span>
  )
}
