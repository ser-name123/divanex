"use client";

import Navbar from "@/components/Navbar";
import type { TestimonialItem } from "@/data/testimonials";
import type { PortfolioProject } from "@/data/portfolio";
import type { TechItem } from "@/data/techStack";
import type { ServiceItem } from "@/data/services";
import type { BlogPost } from "@/data/blogData";
import HeroSection from "@/components/HeroSection";
import GlobalRatingsStrip from "@/components/GlobalRatingsStrip";
import PartnerTicker from "@/components/PartnerTicker";
import ServicesSection from "@/components/ServicesSection";
import WhyChooseUs from "@/components/WhyChooseUs";
import CodeOwnershipSection from "@/components/CodeOwnershipSection";
import ProcessFlow from "@/components/ProcessFlow";
import TechStackGrid from "@/components/TechStackGrid";
import PortfolioSection from "@/components/PortfolioSection";
import StatsSection from "@/components/StatsSection";
import Testimonials from "@/components/Testimonials";
import HomeBlogSection from "@/components/HomeBlogSection";
import FAQSection from "@/components/FAQSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";
import NeuralBackground from "@/components/NeuralBackground";
import ScrollObserver from "@/components/ScrollObserver";

export default function HomePageClient({
  testimonials,
  projects,
  tech,
  services,
  posts,
}: {
  testimonials?: TestimonialItem[];
  projects?: PortfolioProject[];
  tech?: TechItem[];
  services?: ServiceItem[];
  posts?: BlogPost[];
}) {
  return (
    <div className="relative min-h-screen bg-[#f7f9f9] text-slate-900 selection:bg-sky-500 selection:text-white overflow-x-hidden">
      {/* Interactive AI Neural Synaptic Constellation Animation */}
      <NeuralBackground />

      {/* Cyber Reticle Mouse Cursor Follower Animation */}
      <CustomCursor />

      {/* Global Scroll Observer for Smooth Reveal Animations */}
      <ScrollObserver />

      {/* Navigation Header */}
      <Navbar />

      <main className="defer-below-fold">
        {/* Section 1: Hero Section */}
        <HeroSection />

        {/* Section 2: Verified Multi-Platform Ratings (Google, Clutch, Upwork, Freelancer, Fiverr) */}
        <GlobalRatingsStrip />

        {/* Section 3: Partner & Ecosystem Marquee */}
        <PartnerTicker />

        {/* Section 4: Core Services Grid */}
        <ServicesSection isHome={true} items={services} />

        {/* Section 5: Why Choose Divanex */}
        <WhyChooseUs />

        {/* Section 5.5: 100% Code & Asset Ownership Guarantee */}
        <CodeOwnershipSection />

        {/* Section 6: How We Work (5-Step Process Flow) */}
        <ProcessFlow />

        {/* Section 7: Technologies We Use (Top 3 Stacks + View All) */}
        <TechStackGrid isHome={true} items={tech} />

        {/* Section 8: Case Studies & Portfolio Showcase */}
        <PortfolioSection isHome={true} items={projects} />

        {/* Section 9: Stats & Impact Counters */}
        <StatsSection />

        {/* Section 10: Client Testimonials & Reviews */}
        <Testimonials isHome={true} items={testimonials} />

        {/* Section 11: Engineering Blog & Technical Insights */}
        <HomeBlogSection posts={posts} />

        {/* Section 13: Interactive FAQ Section */}
        <FAQSection />

        {/* Section 14: Contact & Lead Capture Form */}
        <ContactSection />
      </main>

      {/* Section 15: Footer */}
      <Footer />
    </div>
  );
}
