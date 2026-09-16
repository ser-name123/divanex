"use client";

import Navbar from "@/components/Navbar";
import PageHeader from "@/components/PageHeader";
import ProcessFlow from "@/components/ProcessFlow";
import SprintCadenceSection from "@/components/SprintCadenceSection";
import ToolingEcosystem from "@/components/process/ToolingEcosystem";
import QualityAssurancePipeline from "@/components/process/QualityAssurancePipeline";
import ReleaseAndDeploymentPlaybook from "@/components/process/ReleaseAndDeploymentPlaybook";
import LaunchAndHypercarePhase from "@/components/process/LaunchAndHypercarePhase";
import ClientInvolvementGuide from "@/components/process/ClientInvolvementGuide";
import CtaBanner from "@/components/CtaBanner";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";
import NeuralBackground from "@/components/NeuralBackground";
import ScrollObserver from "@/components/ScrollObserver";

export default function ProcessPageClient() {

  return (
    <div className="relative min-h-screen bg-[#f7f9f9] text-slate-900 selection:bg-sky-500 selection:text-white overflow-x-hidden">
      <NeuralBackground />
      <CustomCursor />
      <ScrollObserver />

      <Navbar />

      <main>
        {/* Section 1: 2-Column Telemetry Header */}
        <PageHeader route="/process" />

        {/* Section 2: 5-Step Process Flow Component (Exclusive to /process) */}
        <ProcessFlow />

        {/* Section 3: Day-to-Day Sprint Cadence (Standups, Linear, Staging Demos) (Exclusive to /process) */}
        <SprintCadenceSection />

        {/* Section 4: Modern Tooling Ecosystem (Unique) */}
        <ToolingEcosystem />

        {/* Section 5: 4-Stage Quality Assurance Pipeline (Unique) */}
        <QualityAssurancePipeline />

        {/* Section 6: Release & Deployment Playbook (Unique) */}
        <ReleaseAndDeploymentPlaybook />

        {/* Section 7: Launch & 30-Day Hypercare Phase (Unique) */}
        <LaunchAndHypercarePhase />

        {/* Section 8: Client Involvement Guide & Stakeholder Time Investment (Unique) */}
        <ClientInvolvementGuide />

        {/* Section 9: Strategy Briefing Call to Action */}
        <CtaBanner route="/process" />
      </main>

      <Footer />
    </div>
  );
}
