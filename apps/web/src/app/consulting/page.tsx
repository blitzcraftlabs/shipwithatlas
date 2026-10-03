import "../atlas-marketing.css";

import {
  ConsultingContactSection,
  ConsultingHelpSection,
  ConsultingHero,
  ConsultingProcessSection,
  ConsultingReferenceSection,
} from "@/components/consulting/consulting-sections";
import { MarketingFooter } from "@/components/marketing/marketing-footer";
import { MarketingHeader } from "@/components/marketing/marketing-header";
import { MarketingTheme } from "@/components/marketing/marketing-theme";
import { AUTHOR_NAME, SITE_NAME } from "@/lib/marketing/constants";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: `Frontend consulting — ${SITE_NAME}`,
  description: `${AUTHOR_NAME} helps product teams design, repair, and scale frontend architecture with the same principles behind Atlas.`,
};

export default function ConsultingPage() {
  return (
    <MarketingTheme>
      <div className="atlas-marketing min-h-svh overflow-x-clip">
        <MarketingHeader />
        <main>
          <ConsultingHero />
          <ConsultingHelpSection />
          <ConsultingProcessSection />
          <ConsultingReferenceSection />
          <ConsultingContactSection />
        </main>
        <MarketingFooter />
      </div>
    </MarketingTheme>
  );
}
