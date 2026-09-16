"use client";

import Navbar from "@/components/Navbar";
import PageHeader from "@/components/PageHeader";
import ContactSection from "@/components/ContactSection";
import WhatHappensIn24Hours from "@/components/contact/WhatHappensIn24Hours";
import GlobalHubsAndHours from "@/components/contact/GlobalHubsAndHours";
import RfpSubmissionGuide from "@/components/contact/RfpSubmissionGuide";
import EmergencyEscalationProtocol from "@/components/contact/EmergencyEscalationProtocol";
import DirectCalendlyScheduler from "@/components/contact/DirectCalendlyScheduler";
import ZeroSpamPrivacyPledge from "@/components/contact/ZeroSpamPrivacyPledge";
import CtaBanner from "@/components/CtaBanner";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";
import NeuralBackground from "@/components/NeuralBackground";
import ScrollObserver from "@/components/ScrollObserver";

export default function ContactPageClient() {

  return (
    <div className="relative min-h-screen bg-[#f7f9f9] text-slate-900 selection:bg-sky-500 selection:text-white overflow-x-hidden">
      <NeuralBackground />
      <CustomCursor />
      <ScrollObserver />

      <Navbar />

      <main>
        {/* Section 1: 2-Column Telemetry Header */}
        <PageHeader route="/contact" />

        {/* Section 2: Contact Form & Channels Component (Exclusive to /contact) */}
        <ContactSection />

        {/* Section 3: 24-Hour Hour-by-Hour SLA Timeline (Unique) */}
        <WhatHappensIn24Hours />

        {/* Section 4: Global Hubs & Operating Hours (Unique) */}
        <GlobalHubsAndHours />

        {/* Section 5: RFP & Project Brief Checklist (Unique) */}
        <RfpSubmissionGuide />

        {/* Section 6: Emergency Project Escalation & Outage Protocol (Unique) */}
        <EmergencyEscalationProtocol />

        {/* Section 7: Instant 30-Minute Calendly Discovery Scheduler (Unique) */}
        <DirectCalendlyScheduler />

        {/* Section 8: Zero Spam & Radical Privacy Pledge (Unique) */}
        <ZeroSpamPrivacyPledge />

        {/* Section 9: Call to Action */}
        <CtaBanner route="/contact" />
      </main>

      <Footer />
    </div>
  );
}
