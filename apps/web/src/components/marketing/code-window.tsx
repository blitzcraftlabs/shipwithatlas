import { ArrowUpRight } from "lucide-react"

import { cn } from "@atlas/ui"

import { CodeCopyButton } from "@/components/marketing/code-copy-button"
import { FileTypeIcon } from "@/components/marketing/file-type-icon"
import { highlightSnippet } from "@/lib/marketing/shiki/highlight"

import type { CodeLanguage, CodeSnippet } from "@/lib/marketing/content/types"

const LANGUAGE_BADGES: Record<CodeLanguage, string> = {
  typescript: "TS",
  tsx: "TSX",
  json: "JSON",
  yaml: "YAML",
  markdown: "MD",
}

export interface CodeWindowProps {
  snippet: CodeSnippet
  className?: string
  showFilename?: boolean
  showLanguageBadge?: boolean
  showLineNumbers?: boolean
  compact?: boolean
  embedded?: boolean
  variant?: "default" | "editor" | "tree"
  /** Breadcrumb-style path with muted segments (editor mockups). */
  pathStyle?: "full" | "breadcrumb"
}

interface CodeWindowFrameProps {
  snippet: CodeSnippet
  html: string
  className?: string
  showFilename?: boolean
  showLanguageBadge?: boolean
  compact?: boolean
  embedded?: boolean
  variant?: "default" | "editor" | "tree"
  pathStyle?: "full" | "breadcrumb"
}

function splitPath(filename: string) {
  const segments = filename.split("/").filter(Boolean)
  if (segments.length <= 1) {
    return { parents: [], name: segments[0] ?? filename }
  }
  return {
    parents: segments.slice(0, -1),
    name: segments[segments.length - 1] ?? filename,
  }
}

function PathDisplay({
  filename,
  pathStyle,
}: {
  filename: string
  pathStyle: "full" | "breadcrumb"
}) {
  if (pathStyle === "breadcrumb") {
    const { parents, name } = splitPath(filename)
    return (
      <span className="atlas-code-window__path" title={filename}>
        {parents.map((segment) => (
          <span key={segment} className="atlas-code-window__path-segment">
            {segment}
            <span className="atlas-code-window__path-sep"> / </span>
          </span>
        ))}
        <span className="atlas-code-window__path-active">{name}</span>
      </span>
    )
  }

  return (
    <span className="atlas-code-window__filename" title={filename}>
      {filename}
    </span>
  )
}

function CodeWindowFrame({
  snippet,
  html,
  className,
  showFilename = true,
  showLanguageBadge = false,
  compact = false,
  embedded = false,
  variant = "default",
  pathStyle = "full",
}: CodeWindowFrameProps) {
  const copyEnabled = snippet.copyable !== false
  const filename = snippet.filename
  const useBreadcrumb = pathStyle === "breadcrumb"

  return (
    <div
      className={cn(
        "atlas-code-window",
        compact && "atlas-code-window--compact",
        embedded && "atlas-code-window--embedded",
        variant === "editor" && "atlas-code-window--editor",
        variant === "tree" && "atlas-code-window--tree",
        useBreadcrumb && "atlas-code-window--breadcrumb-path",
        className
      )}
    >
      {showFilename ? (
        <div
          className={cn(
            "atlas-code-window__chrome",
            embedded && "atlas-code-window__chrome--embedded",
            useBreadcrumb && "atlas-code-window__chrome--path"
          )}
        >
          <div className="atlas-code-window__chrome-start">
            {!useBreadcrumb ? (
              <FileTypeIcon language={snippet.language} />
            ) : null}
            <PathDisplay filename={filename} pathStyle={pathStyle} />
          </div>
          <div className="atlas-code-window__chrome-actions">
            {showLanguageBadge ? (
              <span className="atlas-code-window__language-badge">
                {LANGUAGE_BADGES[snippet.language]}
              </span>
            ) : null}
            {snippet.sourceHref ? (
              <a
                href={snippet.sourceHref}
                target="_blank"
                rel="noopener noreferrer"
                className="atlas-code-window__source-link"
                aria-label={`View source: ${filename}`}
              >
                <span className="atlas-code-window__source-label">Source</span>
                <ArrowUpRight className="size-3" aria-hidden="true" />
              </a>
            ) : null}
            {copyEnabled ? <CodeCopyButton code={snippet.code} /> : null}
          </div>
        </div>
      ) : null}
      {/* eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex -- keyboard scroll for code blocks */}
      <div className="atlas-code-window__body" tabIndex={0}>
        <div
          className="atlas-code-window__code"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </div>
    </div>
  )
}

export async function CodeWindow({
  snippet,
  className,
  showFilename = true,
  showLanguageBadge = false,
  showLineNumbers,
  compact = false,
  embedded = false,
  variant = "default",
  pathStyle = "full",
}: CodeWindowProps) {
  const html = await highlightSnippet(snippet.code, snippet.language, {
    highlightedLines: snippet.highlightedLines,
    focusedLines: snippet.focusedLines,
    showLineNumbers: showLineNumbers ?? snippet.showLineNumbers,
  })

  return (
    <CodeWindowFrame
      snippet={snippet}
      html={html}
      className={className}
      showFilename={showFilename}
      showLanguageBadge={showLanguageBadge}
      compact={compact}
      embedded={embedded}
      variant={variant}
      pathStyle={pathStyle}
    />
  )
}

export interface HighlightedCodeWindowProps extends Omit<CodeWindowProps, "snippet"> {
  snippet: CodeSnippet
  html: string
}

/** Client-safe variant when HTML is pre-rendered on the server. */
export function HighlightedCodeWindow({
  snippet,
  html,
  className,
  showFilename = true,
  showLanguageBadge = false,
  compact = false,
  embedded = false,
  variant = "default",
  pathStyle = "full",
}: HighlightedCodeWindowProps) {
  return (
    <CodeWindowFrame
      snippet={snippet}
      html={html}
      className={className}
      showFilename={showFilename}
      showLanguageBadge={showLanguageBadge}
      compact={compact}
      embedded={embedded}
      variant={variant}
      pathStyle={pathStyle}
    />
  )
}
