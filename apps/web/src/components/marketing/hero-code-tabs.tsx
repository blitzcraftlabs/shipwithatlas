import { HERO_CODE_TABS } from "@/lib/marketing/content/hero-code"
import { highlightSnippet } from "@/lib/marketing/shiki/highlight"

import { HeroCodeTabsClient } from "./hero-code-tabs-client"

export async function HeroCodeTabs() {
  const tabs = await Promise.all(
    HERO_CODE_TABS.map(async (tab) => ({
      ...tab,
      html: await highlightSnippet(tab.code, tab.language, {
        highlightedLines: tab.highlightedLines,
        focusedLines: tab.focusedLines,
      }),
    }))
  )

  return <HeroCodeTabsClient tabs={tabs} />
}
