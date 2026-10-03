import {
  Braces,
  FileCode2,
  FileJson2,
  FileText,
  type LucideIcon,
  Workflow,
} from "lucide-react"

import { cn } from "@atlas/ui"

import type { CodeLanguage } from "@/lib/marketing/content/types"

const LANGUAGE_ICONS: Record<CodeLanguage, LucideIcon> = {
  typescript: FileCode2,
  tsx: FileCode2,
  json: FileJson2,
  yaml: Workflow,
  markdown: FileText,
}

interface FileTypeIconProps {
  language: CodeLanguage
  className?: string
}

export function FileTypeIcon({ language, className }: FileTypeIconProps) {
  const Icon = LANGUAGE_ICONS[language] ?? Braces

  return (
    <Icon
      className={cn("atlas-code-window__file-icon", className)}
      aria-hidden="true"
      strokeWidth={1.75}
    />
  )
}
