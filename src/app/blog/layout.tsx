import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Engineering Blog & Technical Insights | Divanex",
  description:
    "Explore in-depth technical breakdowns, case studies, and engineering blueprints on Multi-Tenant SaaS, Hospital HMIS, Enterprise ERP, Core Banking, and Autonomous AI Agents.",
  alternates: {
    canonical: "https://divanextechnologies.com/blog"
  },
  openGraph: {
    title: "Engineering Blog & Technical Insights | Divanex",
    description:
      "Deep technical case studies and architectural blueprints from Divanex solutions architects and principal engineers.",
    url: "https://divanextechnologies.com/blog",
    type: "website"
  }
};

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
