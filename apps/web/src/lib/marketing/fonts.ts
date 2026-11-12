import localFont from "next/font/local";

/**
 * Blueprint typography for the marketing surfaces.
 *
 * JetBrains Mono carries display headings, labels, and annotations.
 * IBM Plex Sans carries long-form body copy. Both are exposed as CSS
 * variables only, so routes that do not opt in keep the global fonts.
 *
 * Fonts are self-hosted from `src/fonts` (latin subset, variable weight)
 * so production builds never depend on fetching from Google Fonts.
 */
const blueprintMono = localFont({
  src: "../../fonts/jetbrains-mono/jetbrains-mono-latin-wght-normal.woff2",
  weight: "100 800",
  style: "normal",
  variable: "--font-blueprint-mono",
  display: "swap",
  fallback: ["ui-monospace", "SFMono-Regular", "Menlo", "Consolas", "monospace"],
  adjustFontFallback: false,
});

const blueprintSans = localFont({
  src: "../../fonts/ibm-plex-sans/ibm-plex-sans-latin-wght-normal.woff2",
  weight: "100 700",
  style: "normal",
  variable: "--font-blueprint-sans",
  display: "swap",
  fallback: ["system-ui", "-apple-system", "Segoe UI", "Helvetica", "Arial", "sans-serif"],
});

export const BLUEPRINT_FONT_CLASS_NAME = `${blueprintMono.variable} ${blueprintSans.variable}`;
