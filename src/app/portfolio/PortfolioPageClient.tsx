"use client";

import Navbar from "@/components/Navbar";
import type { PortfolioProject } from "@/data/portfolio";
import PageHeader from "@/components/PageHeader";
import PortfolioSection from "@/components/PortfolioSection";
import IndustryImpactStats from "@/components/portfolio/IndustryImpactStats";
import ClientRoiAnalysis from "@/components/portfolio/ClientRoiAnalysis";
import ArchitectureCaseStudies from "@/components/portfolio/ArchitectureCaseStudies";
import ConfidentialWorkNotice from "@/components/portfolio/ConfidentialWorkNotice";
import ClientDeliveryTimeline from "@/components/portfolio/ClientDeliveryTimeline";
import PortfolioAuditCriteria from "@/components/portfolio/PortfolioAuditCriteria";
import CtaBanner from "@/components/CtaBanner";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";
import NeuralBackground from "@/components/NeuralBackground";
import ScrollObserver from "@/components/ScrollObserver";

export default function PortfolioPageClient({ projects }: { projects?: PortfolioProject[] }) {

  return (
    <div className="relative min-h-screen bg-[#f7f9f9] text-slate-900 selection:bg-sky-500 selection:text-white overflow-x-hidden">
      <NeuralBackground />
      <CustomCursor />
      <ScrollObserver />

      <Navbar />

      <main>
        {/* Section 1: 2-Column Telemetry Header */}
        <PageHeader route="/portfolio" />

        {/* Section 2: Portfolio Showcase Component (Exclusive to /portfolio) */}
        <PortfolioSection items={projects} />

        {/* Section 3: Industry Impact Stats (Unique) */}
        <IndustryImpactStats />

        {/* Section 4: Verified Client ROI Financial Analysis (Unique) */}
        <ClientRoiAnalysis />

        {/* Section 5: Complex Technical & Architectural Case Studies (Unique) */}
        <ArchitectureCaseStudies />

        {/* Section 6: Enterprise Confidentiality & NDA Work Notice (Unique) */}
        <ConfidentialWorkNotice />

        {/* Section 7: Average Sprint Delivery Timeline (Unique) */}
        <ClientDeliveryTimeline />

        {/* Section 8: Quality Criteria & Audit Standards (Unique) */}
        <PortfolioAuditCriteria />

        {/* Section 9: Call to Action */}
        <CtaBanner route="/portfolio" />
      </main>

      <Footer />
    </div>
  );
}
