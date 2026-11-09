"use client";

import React, { useState } from "react";
import { Package } from "@/db/schema";
import { QuoteCalculationResult } from "@/lib/calculator";
import { Header } from "@/components/layout/header";
import { Hero } from "@/components/sections/hero";
import { DestinationsStrip } from "@/components/sections/destinations-strip";
import { QuoteWizard } from "@/components/wizard/quote-wizard";
import { PackagesCatalog } from "@/components/packages/packages-catalog";
import { SocialProof } from "@/components/sections/social-proof";
import { Footer } from "@/components/layout/footer";
import { MobileActionBar } from "@/components/layout/mobile-action-bar";
import { LeadModal } from "@/components/wizard/lead-modal";

interface HomePageClientProps {
  initialPackages: Package[];
  children?: React.ReactNode;
}

export function HomePageClient({ initialPackages, children }: HomePageClientProps) {
  const [leadModalQuote, setLeadModalQuote] = useState<QuoteCalculationResult | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleRequestQuote = (quote: QuoteCalculationResult) => {
    setLeadModalQuote(quote);
    setIsModalOpen(true);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-1">
        <Hero />
        <DestinationsStrip />
        <QuoteWizard onRequestQuote={handleRequestQuote} />
        <PackagesCatalog
          initialPackages={initialPackages}
          onRequestQuote={handleRequestQuote}
        />
        {children}
        <SocialProof />
      </main>

      <Footer />
      <MobileActionBar />

      <LeadModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        quote={leadModalQuote}
      />
    </div>
  );
}
