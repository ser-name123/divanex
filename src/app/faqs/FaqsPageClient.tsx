"use client";

import Navbar from "@/components/Navbar";
import PageHeader from "@/components/PageHeader";
import FAQSection from "@/components/FAQSection";
import FaqCategoryCards from "@/components/faqs/FaqCategoryCards";
import IpAndContractPolicies from "@/components/faqs/IpAndContractPolicies";
import PostLaunchSupportGuide from "@/components/faqs/PostLaunchSupportGuide";
import PaymentAndInvoicingTerms from "@/components/faqs/PaymentAndInvoicingTerms";
import TimezoneAndCommunicationPolicy from "@/components/faqs/TimezoneAndCommunicationPolicy";
import DirectSupportChannels from "@/components/faqs/DirectSupportChannels";
import CtaBanner from "@/components/CtaBanner";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";
import NeuralBackground from "@/components/NeuralBackground";
import ScrollObserver from "@/components/ScrollObserver";

export default function FaqsPageClient() {

  return (
    <div className="relative min-h-screen bg-[#f7f9f9] text-slate-900 selection:bg-sky-500 selection:text-white overflow-x-hidden">
      <NeuralBackground />
      <CustomCursor />
      <ScrollObserver />

      <Navbar />

      <main>
        {/* Section 1: 2-Column Telemetry Header */}
        <PageHeader route="/faqs" />

        {/* Section 2: FAQ Accordions Component (Exclusive to /faqs) */}
        <FAQSection />

        {/* Section 3: Topic Categories Matrix (Unique) */}
        <FaqCategoryCards />

        {/* Section 4: IP Ownership & Contract Governance (Unique) */}
        <IpAndContractPolicies />

        {/* Section 5: Post-Launch Support & Hypercare Guide (Unique) */}
        <PostLaunchSupportGuide />

        {/* Section 6: Payment & Invoicing Terms (Unique) */}
        <PaymentAndInvoicingTerms />

        {/* Section 7: Timezone & Communication Policy (Unique) */}
        <TimezoneAndCommunicationPolicy />

        {/* Section 8: Direct Human Support Channels (Unique) */}
        <DirectSupportChannels />

        {/* Section 9: Still Have Questions CTA */}
        <CtaBanner route="/faqs" />
      </main>

      <Footer />
    </div>
  );
}
