import { createHighlighter, type Highlighter } from "shiki"

import type { CodeLanguage } from "@/lib/marketing/content/types"

const SHIKI_THEME = "github-dark-high-contrast" as const

const globalForShiki = globalThis as typeof globalThis & {
  __atlasShikiHighlighter?: Promise<Highlighter>
}

const LANG_MAP: Record<CodeLanguage, string> = {
  typescript: "typescript",
  tsx: "tsx",
  json: "json",
  yaml: "yaml",
  markdown: "markdown",
}

export interface HighlightOptions {
  highlightedLines?: number[]
  focusedLines?: number[]
  showLineNumbers?: boolean
  /** Split inline `#` annotations in markdown tree diagrams for typographic hierarchy. */
  annotateTreeComments?: boolean
}

/** Wrap trailing `# comment` segments in markdown directory trees. */
function annotateMarkdownTreeComments(html: string): string {
  return html.replace(
    /<span class="line">(<span style="[^"]*">)([\s\S]*?)(<\/span>)<\/span>/g,
    (full, openTag, lineText, closeTag) => {
      const commentMatch = lineText.match(/^([\s\S]*?)(\s{2,}#\s[\s\S]*)$/)
      if (!commentMatch) return full

      const [, pathPart, commentPart] = commentMatch
      return `<span class="line">${openTag}${pathPart}<span class="atlas-code-tree__comment">${commentPart}</span>${closeTag}</span>`
    }
  )
}

function getHighlighter(): Promise<Highlighter> {
  globalForShiki.__atlasShikiHighlighter ??= createHighlighter({
    themes: [SHIKI_THEME],
    langs: ["typescript", "tsx", "json", "yaml", "markdown"],
  })
  return globalForShiki.__atlasShikiHighlighter
}

function lineClass(
  line: number,
  highlightedLines: number[],
  focusedLines: number[]
): string | undefined {
  const classes: string[] = []
  if (highlightedLines.includes(line)) {
    classes.push("atlas-code-window__line--highlighted")
  }
  if (focusedLines.includes(line)) {
    classes.push("atlas-code-window__line--focused")
  }
  return classes.length > 0 ? classes.join(" ") : undefined
}

export async function highlightCode(
  code: string,
  language: CodeLanguage,
  options: HighlightOptions = {}
): Promise<string> {
  const highlighter = await getHighlighter()
  const lang = LANG_MAP[language]
  const highlightedLines = options.highlightedLines ?? []
  const focusedLines = options.focusedLines ?? []
  const showLineNumbers = options.showLineNumbers ?? false

  const html = highlighter.codeToHtml(code, {
    lang,
    theme: SHIKI_THEME,
    transformers: [
      {
        line(node, lineNumber) {
          const cls = lineClass(lineNumber, highlightedLines, focusedLines)
          if (cls) {
            node.properties.class = cls
          }
        },
        pre(node) {
          node.properties.class = "atlas-code-window__shiki-pre"
        },
        code(node) {
          node.properties.class = "atlas-code-window__shiki-code"
        },
      },
    ],
    ...(showLineNumbers
      ? {
          structure: "classic" as const,
          lineOptions: highlightedLines.map((line) => ({
            line,
            classes: ["atlas-code-window__line--highlighted"],
          })),
        }
      : {}),
  })

  if (options.annotateTreeComments && language === "markdown") {
    return annotateMarkdownTreeComments(html)
  }

  return html
}

export async function highlightSnippet(
  code: string,
  language: CodeLanguage,
  options: HighlightOptions = {}
): Promise<string> {
  return highlightCode(code, language, options)
}
