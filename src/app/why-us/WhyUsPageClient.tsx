"use client";

import Navbar from "@/components/Navbar";
import PageHeader from "@/components/PageHeader";
import WhyChooseUs from "@/components/WhyChooseUs";
import CodeOwnershipManifesto from "@/components/why-us/CodeOwnershipManifesto";
import AgencyVsFreelancerVsDivanex from "@/components/why-us/AgencyVsFreelancerVsDivanex";
import EngineeringCulture from "@/components/why-us/EngineeringCulture";
import CommunicationProtocols from "@/components/why-us/CommunicationProtocols";
import RiskReversalGuarantees from "@/components/why-us/RiskReversalGuarantees";
import ClientRetentionMetrics from "@/components/why-us/ClientRetentionMetrics";
import CtaBanner from "@/components/CtaBanner";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";
import NeuralBackground from "@/components/NeuralBackground";
import ScrollObserver from "@/components/ScrollObserver";

export default function WhyUsPageClient() {

  return (
    <div className="relative min-h-screen bg-[#f7f9f9] text-slate-900 selection:bg-sky-500 selection:text-white overflow-x-hidden">
      <NeuralBackground />
      <CustomCursor />
      <ScrollObserver />

      <Navbar />

      <main>
        {/* Section 1: 2-Column Telemetry Header */}
        <PageHeader route="/why-us" />

        {/* Section 2: Why Choose Us Pillars & Benchmark Comparison Table (Exclusive to /why-us) */}
        <WhyChooseUs />

        {/* Section 3: Code Ownership Manifesto (Unique) */}
        <CodeOwnershipManifesto />

        {/* Section 4: Market Benchmark Comparison: Freelancer vs Agency vs Divanex (Unique) */}
        <AgencyVsFreelancerVsDivanex />

        {/* Section 5: High-Caliber Engineering Culture (Unique) */}
        <EngineeringCulture />

        {/* Section 6: Daily Collaboration & Communication Protocols (Unique) */}
        <CommunicationProtocols />

        {/* Section 7: Institutional Risk Reversal Guarantees (Unique) */}
        <RiskReversalGuarantees />

        {/* Section 8: Long-Term Client Retention & Cohort Loyalty (Unique) */}
        <ClientRetentionMetrics />

        {/* Section 9: Strategy Briefing Call to Action */}
        <CtaBanner route="/why-us" />
      </main>

      <Footer />
    </div>
  );
}
