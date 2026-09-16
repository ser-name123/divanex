"use client";

import Navbar from "@/components/Navbar";
import type { TestimonialItem } from "@/data/testimonials";
import PageHeader from "@/components/PageHeader";
import Testimonials from "@/components/Testimonials";
import NpsScorecard from "@/components/testimonials/NpsScorecard";
import GlobalClientMap from "@/components/testimonials/GlobalClientMap";
import ClientSuccessOutcomes from "@/components/testimonials/ClientSuccessOutcomes";
import ExecutiveVideoSpotlights from "@/components/testimonials/ExecutiveVideoSpotlights";
import ThirdPartyVerificationBadges from "@/components/testimonials/ThirdPartyVerificationBadges";
import ClientReferenceCallPolicy from "@/components/testimonials/ClientReferenceCallPolicy";
import CtaBanner from "@/components/CtaBanner";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";
import NeuralBackground from "@/components/NeuralBackground";
import ScrollObserver from "@/components/ScrollObserver";

export default function TestimonialsPageClient({ testimonials }: { testimonials?: TestimonialItem[] }) {

  return (
    <div className="relative min-h-screen bg-[#f7f9f9] text-slate-900 selection:bg-sky-500 selection:text-white overflow-x-hidden">
      <NeuralBackground />
      <CustomCursor />
      <ScrollObserver />

      <Navbar />

      <main>
        {/* Section 1: 2-Column Telemetry Header */}
        <PageHeader route="/testimonials" />

        {/* Section 2: Client Testimonials Carousel Component (Exclusive to /testimonials) */}
        <Testimonials items={testimonials} />

        {/* Section 3: Institutional 98.4 NPS Scorecard (Unique) */}
        <NpsScorecard />

        {/* Section 4: Global Client Map & Active Delivery Hubs (Unique) */}
        <GlobalClientMap />

        {/* Section 5: Before vs After Client Business Outcomes (Unique) */}
        <ClientSuccessOutcomes />

        {/* Section 6: Executive Video & Case Spotlights (Unique) */}
        <ExecutiveVideoSpotlights />

        {/* Section 7: Third-Party Verified Industry Accolades (Unique) */}
        <ThirdPartyVerificationBadges />

        {/* Section 8: Confidential 1-on-1 Reference Call Policy (Unique) */}
        <ClientReferenceCallPolicy />

        {/* Section 9: Call to Action */}
        <CtaBanner route="/testimonials" />
      </main>

      <Footer />
    </div>
  );
}
