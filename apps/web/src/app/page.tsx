import "./atlas-marketing.css";
import "./atlas-blueprint.css";
import "./atlas-blueprint-sections.css";

import { cn } from "@atlas/ui";

import { AgentsSection } from "@/components/landing/agents-section";
import { BuiltWithSection } from "@/components/landing/built-with-section";
import { CapabilitiesSection } from "@/components/landing/capabilities-section";
import { ClosingSection } from "@/components/landing/closing-section";
import { ConsultingBridgeSection } from "@/components/landing/consulting-bridge-section";
import { ContractDiagramSection } from "@/components/landing/contract-diagram-section";
import { FaqSection } from "@/components/landing/faq-section";
import { HeroSection } from "@/components/landing/hero-section";
import { InspectOwnershipSection } from "@/components/landing/inspect-ownership-section";
import { PropertiesSection } from "@/components/landing/properties-section";
import { QuickStartSection } from "@/components/landing/quick-start-section";
import { MarketingFooter } from "@/components/marketing/marketing-footer";
import { MarketingHeader } from "@/components/marketing/marketing-header";
import { MarketingTheme } from "@/components/marketing/marketing-theme";
import {
  SITE_NAME,
  SITE_SUPPORTING,
  SITE_TAGLINE,
} from "@/lib/marketing/constants";
import { BLUEPRINT_FONT_CLASS_NAME } from "@/lib/marketing/fonts";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: `${SITE_NAME} — ${SITE_TAGLINE}`,
  description: SITE_SUPPORTING,
};

export default function HomePage() {
  return (
    <MarketingTheme>
      <div
        className={cn(
          "atlas-marketing min-h-svh overflow-x-clip",
          BLUEPRINT_FONT_CLASS_NAME
        )}
      >
        <MarketingHeader />
        <main>
          <HeroSection />
          <PropertiesSection />
          <QuickStartSection />
          <CapabilitiesSection />
          <BuiltWithSection />
          <ContractDiagramSection />
          <AgentsSection />
          <InspectOwnershipSection />
          <ConsultingBridgeSection />
          <FaqSection />
          <ClosingSection />
        </main>
        <MarketingFooter />
      </div>
    </MarketingTheme>
  );
}
