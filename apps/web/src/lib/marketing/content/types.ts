export type CodeLanguage = "typescript" | "yaml" | "json" | "markdown" | "tsx"

export interface CodeSnippet {
  id: string
  label: string
  filename: string
  language: CodeLanguage
  code: string
  copyable?: boolean
  highlightedLines?: number[]
  focusedLines?: number[]
  showLineNumbers?: boolean
  sourceHref?: string
}

export interface Capability {
  id: string
  title: string
  descriptor: string
  source: string
  sourceHref?: string
  explanation: string
  included?: string[]
  snippet: CodeSnippet
}
