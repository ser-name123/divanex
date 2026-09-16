"use client";

import Navbar from "@/components/Navbar";
import PageHeader from "@/components/PageHeader";
import ServicesSection from "@/components/ServicesSection";
import SaaSSolutionsDeepDive from "@/components/services/SaaSSolutionsDeepDive";
import AiAgentCapabilities from "@/components/services/AiAgentCapabilities";
import MobileCloudInfrastructure from "@/components/services/MobileCloudInfrastructure";
import TechnicalDeliverablesMatrix from "@/components/services/TechnicalDeliverablesMatrix";
import ServicesPricingTiers from "@/components/services/ServicesPricingTiers";
import ServiceLevelAgreements from "@/components/services/ServiceLevelAgreements";
import CtaBanner from "@/components/CtaBanner";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";
import NeuralBackground from "@/components/NeuralBackground";
import ScrollObserver from "@/components/ScrollObserver";
import type { ServiceItem } from "@/data/services";

export default function ServicesPageClient({ services }: { services?: ServiceItem[] }) {

  return (
    <div className="relative min-h-screen bg-[#f7f9f9] text-slate-900 selection:bg-sky-500 selection:text-white overflow-x-hidden">
      <NeuralBackground />
      <CustomCursor />
      <ScrollObserver />

      <Navbar />

      <main>
        {/* Section 1: 2-Column Telemetry Header */}
        <PageHeader route="/services" />

        {/* Section 2: Full Bento Grid Capabilities Matrix (Exclusive to /services) */}
        <ServicesSection isHome={false} items={services} />

        {/* Section 3: SaaS Multi-Tenant Architectural Deep-Dive (Unique) */}
        <SaaSSolutionsDeepDive />

        {/* Section 4: Autonomous AI Agents & Vector RAG Layer (Unique) */}
        <AiAgentCapabilities />

        {/* Section 5: Mobile & Cloud Runtime Foundation (Unique) */}
        <MobileCloudInfrastructure />

        {/* Section 6: Technical Deliverables Matrix & Repo Handover (Unique) */}
        <TechnicalDeliverablesMatrix />

        {/* Section 7: Standardized Investment Tiers (Unique) */}
        <ServicesPricingTiers />

        {/* Section 8: Service Level Agreements & Incident Management (Unique) */}
        <ServiceLevelAgreements />

        {/* Section 9: Global Strategy CTA */}
        <CtaBanner route="/services" />
      </main>

      <Footer />
    </div>
  );
}
