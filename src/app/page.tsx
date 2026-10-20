import React from "react";
import { Navbar } from "../components/layout/navbar";
import { Footer } from "../components/layout/footer";
import { AmbientGrid } from "../components/layout/ambient-grid";
import { AmbientCanvas } from "../components/layout/ambient-canvas";
import { ActHud } from "../components/layout/act-hud";
import { HeroFlow } from "../components/sections/hero-flow/hero-flow";
import { ScoreSimulator } from "../components/sections/score-simulator/score-simulator";
import { RhythmClock } from "../components/sections/rhythm-clock/rhythm-clock";
import { PersonasSection } from "../components/sections/personas-container";
import { PatternBanner } from "../components/sections/pattern-banner/pattern-banner";
import { SpendingSkyline } from "../components/sections/spending-skyline/spending-skyline";
import { PhoneExperience } from "../components/sections/phone-experience/phone-experience";
import { CoolingOffChamber } from "../components/sections/cooling-off-chamber/cooling-off-chamber";
import { SubscriptionLeak } from "../components/sections/subscription-leak/subscription-leak";
import { AIDiagnostics } from "../components/sections/ai-diagnostics/ai-diagnostics";
import { PrivacyArchitecture } from "../components/sections/privacy-architecture/privacy-architecture";
import { ExpenseComparison } from "../components/sections/expense-comparison/expense-comparison";
import { Pricing } from "../components/sections/pricing/pricing";
import { FAQ } from "../components/sections/faq/faq";
import { FinalCTA } from "../components/sections/final-cta/final-cta";

export default function HomePage() {
  return (
    <>
      <AmbientGrid />
      <ActHud />
      <AmbientCanvas />
      <Navbar />

      <main id="top">
        <HeroFlow />
        <ScoreSimulator />
        <RhythmClock />
        <PersonasSection />
        <PatternBanner />
        <SpendingSkyline />
        <PhoneExperience />
        <CoolingOffChamber />
        <SubscriptionLeak />
        <AIDiagnostics />
        <PrivacyArchitecture />
        <ExpenseComparison />
        <Pricing />
        <FAQ />
        <FinalCTA />
      </main>

      <Footer />
    </>
  );
}
