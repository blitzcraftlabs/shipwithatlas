"use client"

import { ThemeProvider } from "next-themes"

export function MarketingTheme({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      forcedTheme="light"
      enableSystem={false}
      defaultTheme="light"
      disableTransitionOnChange
    >
      {children}
    </ThemeProvider>
  )
}
