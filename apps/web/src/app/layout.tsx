import "@atlas/ui/globals.css";

import localFont from "next/font/local";

import { getThemeBootScriptContent } from "@atlas/ui/theme-boot";

import { GlobalErrorHandler } from "@/components/GlobalErrorHandler";
import { SITE_NAME, SITE_SUPPORTING, SITE_TAGLINE } from "@/lib/marketing/constants";
import { getNonce } from "@/lib/security/nonce";
import { MainProvider } from "@/providers";

import type { Metadata } from "next";

// Self-hosted (src/fonts) so builds never depend on fetching from Google Fonts.
const inter = localFont({
  src: "../fonts/inter/inter-latin-wght-normal.woff2",
  weight: "100 900",
  style: "normal",
  variable: "--font-sans",
  display: "swap",
  preload: true,
  fallback: ["system-ui", "-apple-system", "Segoe UI", "Helvetica", "Arial", "sans-serif"],
});

const fontMono = localFont({
  src: "../fonts/geist-mono/geist-mono-latin-wght-normal.woff2",
  weight: "100 900",
  style: "normal",
  variable: "--font-mono",
  display: "swap",
  fallback: ["ui-monospace", "SFMono-Regular", "Menlo", "Consolas", "monospace"],
  adjustFontFallback: false,
});

export const metadata: Metadata = {
  title: {
    default: `${SITE_NAME} — ${SITE_TAGLINE}`,
    template: `%s — ${SITE_NAME}`,
  },
  description: SITE_SUPPORTING,
  metadataBase: new URL("https://shipwithatlas.com"),
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const nonce = await getNonce();

  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`font-sans antialiased ${inter.variable} ${fontMono.variable}`}
    >
      <head>
        <script
          nonce={nonce}
          suppressHydrationWarning
          dangerouslySetInnerHTML={{
            __html: getThemeBootScriptContent(),
          }}
        />
      </head>
      <body className={`${inter.variable} font-sans antialiased`}>
        <MainProvider nonce={nonce}>
          <GlobalErrorHandler />
          {children}
        </MainProvider>
      </body>
    </html>
  );
}
