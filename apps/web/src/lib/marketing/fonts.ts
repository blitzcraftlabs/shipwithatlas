import { IBM_Plex_Sans, JetBrains_Mono } from "next/font/google"

/**
 * Blueprint typography for the marketing surfaces.
 *
 * JetBrains Mono carries display headings, labels, and annotations.
 * IBM Plex Sans carries long-form body copy. Both are exposed as CSS
 * variables only, so routes that do not opt in keep the global fonts.
 */
const blueprintMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "700", "800"],
  variable: "--font-blueprint-mono",
  display: "swap",
})

const blueprintSans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-blueprint-sans",
  display: "swap",
})

export const BLUEPRINT_FONT_CLASS_NAME = `${blueprintMono.variable} ${blueprintSans.variable}`
