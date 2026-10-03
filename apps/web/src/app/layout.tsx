import "@atlas/ui/globals.css";

import { Geist_Mono, Inter } from "next/font/google";

import { getThemeBootScriptContent } from "@atlas/ui/theme-boot";

import { GlobalErrorHandler } from "@/components/GlobalErrorHandler";
import { SITE_NAME, SITE_SUPPORTING, SITE_TAGLINE } from "@/lib/marketing/constants";
import { getNonce } from "@/lib/security/nonce";
import { MainProvider } from "@/providers";

import type { Metadata } from "next";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
  preload: true,
});

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
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
