import "./atlas-marketing.css";
import "./atlas-home.css";

import { CliSection } from "@/components/home/cli-section";
import { GetStartedSection } from "@/components/home/get-started-section";
import { GuardrailsSection } from "@/components/home/guardrails-section";
import { HeroSection } from "@/components/home/hero-section";
import { MakerSection } from "@/components/home/maker-section";
import { QuestionsSection } from "@/components/home/questions-section";
import { WorkspaceSection } from "@/components/home/workspace-section";
import { MarketingFooter } from "@/components/marketing/marketing-footer";
import { MarketingHeader } from "@/components/marketing/marketing-header";
import { MarketingTheme } from "@/components/marketing/marketing-theme";
import { SITE_NAME, SITE_SUPPORTING, SITE_TAGLINE } from "@/lib/marketing/constants";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: `${SITE_NAME} · ${SITE_TAGLINE}`,
  description: SITE_SUPPORTING,
};

export default function HomePage() {
  return (
    <MarketingTheme>
      <div className="atlas-marketing atlas-home min-h-svh overflow-x-clip">
        <MarketingHeader />
        <main>
          <HeroSection />
          <WorkspaceSection />
          <CliSection />
          <GuardrailsSection />
          <GetStartedSection />
          <QuestionsSection />
          <MakerSection />
        </main>
        <MarketingFooter />
      </div>
    </MarketingTheme>
  );
}
