"use client";

import Navbar from "@/components/Navbar";
import type { TechItem } from "@/data/techStack";
import PageHeader from "@/components/PageHeader";
import TechStackGrid from "@/components/TechStackGrid";
import ArchitecturePhilosophy from "@/components/tech-stack/ArchitecturePhilosophy";
import FrontendBackendDeepDive from "@/components/tech-stack/FrontendBackendDeepDive";
import DatabaseAndDataPipelines from "@/components/tech-stack/DatabaseAndDataPipelines";
import DevOpsAndCloudInfrastructure from "@/components/tech-stack/DevOpsAndCloudInfrastructure";
import SecurityAndEncryptionStack from "@/components/tech-stack/SecurityAndEncryptionStack";
import LegacyMigrationGuide from "@/components/tech-stack/LegacyMigrationGuide";
import CtaBanner from "@/components/CtaBanner";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";
import NeuralBackground from "@/components/NeuralBackground";
import ScrollObserver from "@/components/ScrollObserver";

export default function TechStackPageClient({ tech }: { tech?: TechItem[] }) {

  return (
    <div className="relative min-h-screen bg-[#f7f9f9] text-slate-900 selection:bg-sky-500 selection:text-white overflow-x-hidden">
      <NeuralBackground />
      <CustomCursor />
      <ScrollObserver />

      <Navbar />

      <main>
        {/* Section 1: 2-Column Telemetry Header */}
        <PageHeader route="/tech-stack" />

        {/* Section 2: Filterable Tech Stack Component (Exclusive to /tech-stack) */}
        <TechStackGrid items={tech} />

        {/* Section 3: Core Architectural Philosophy (Unique) */}
        <ArchitecturePhilosophy />

        {/* Section 4: Full-Stack Layer Anatomy Deep Dive (Unique) */}
        <FrontendBackendDeepDive />

        {/* Section 5: Database & Real-Time Data Pipelines (Unique) */}
        <DatabaseAndDataPipelines />

        {/* Section 6: DevOps & Cloud Infrastructure (Unique) */}
        <DevOpsAndCloudInfrastructure />

        {/* Section 7: Security & Encryption Stack (Unique) */}
        <SecurityAndEncryptionStack />

        {/* Section 8: Legacy Monolith to Modern Stack Migration (Unique) */}
        <LegacyMigrationGuide />

        {/* Section 9: Call to Action */}
        <CtaBanner route="/tech-stack" />
      </main>

      <Footer />
    </div>
  );
}
