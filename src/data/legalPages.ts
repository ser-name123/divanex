/**
 * The legal pages: privacy, terms, cookies, NDA and refunds.
 *
 * These were five hand-written React components, roughly eleven hundred lines
 * of copy that only a developer could change — which is the worst place for a
 * policy to live, because a policy is the one kind of page a lawyer or an
 * operator needs to edit without waiting for a deploy.
 *
 * All five share a shape: a summary card, an index built from the sections, and
 * a run of numbered sections with prose and occasional cards. That shape is
 * modelled here once and rendered once, so the pages stay identical to each
 * other without five files agreeing to by hand.
 *
 * Section bodies are rich text — `**bold**`, `- bullets`, `[links](/path)` —
 * rendered through src/lib/richText.ts, which escapes the author's text before
 * adding any markup of its own.
 */

/** A callout inside a section: a titled box with an optional status pill. */
export interface LegalCard {
  id: string;
  title: string;
  /** Short uppercase pill, e.g. "ESSENTIAL". */
  badge?: string;
  /** Name from ICON_REGISTRY. */
  icon?: string;
  /** Colour family for the icon and pill. */
  tone?: "sky" | "emerald" | "amber" | "slate";
  body: string;
}

export interface LegalSection {
  /** The anchor, and the index link target. Changing it breaks saved links. */
  id: string;
  /** The small monospaced line above the heading, usually numbered. */
  eyebrow: string;
  /** Name from ICON_REGISTRY. */
  icon?: string;
  heading: string;
  /** Rich text: paragraphs, bullets, bold, links. */
  body: string;
  cards?: LegalCard[];
}

export interface LegalCta {
  title: string;
  body: string;
  label: string;
  href: string;
}

export interface LegalDocument {
  /** Shown beside the green dot on the summary card. */
  badge: string;
  summaryTitle: string;
  summaryBody: string;
  /** Free text, so "Effective Version: 2026.4 • Last Updated: …" still works. */
  stamp: string;
  /** Heading above the section index. */
  indexTitle: string;
  sections: LegalSection[];
  cta?: LegalCta;
}

export type LegalSlug = "privacy" | "terms" | "cookies" | "nda" | "refund-policy";

export const LEGAL_SLUGS: LegalSlug[] = ["privacy", "terms", "cookies", "nda", "refund-policy"];

export const LEGAL_LABELS: Record<LegalSlug, string> = {
  privacy: "Privacy policy",
  terms: "Terms of service",
  cookies: "Cookie policy",
  nda: "NDA & IP",
  "refund-policy": "Refund policy",
};

export type LegalPages = Record<LegalSlug, LegalDocument>;

export const DEFAULT_LEGAL_PAGES: LegalPages = {
  privacy: {
    badge: "Zero-Data-Monetization Pledge",
    summaryTitle: "Your Data Is Never Sold, Rented, or Monitored for Ads",
    summaryBody:
      "We are a dedicated software engineering partner, not an advertising network. All contact submissions, project specifications, source code, and customer records remain 100% confidential and under your ownership.",
    stamp: "Effective Version: 2026.4 • Last Updated: September 2026",
    indexTitle: "Policy Index",
    sections: [
      {
        id: "collection",
        icon: "Database",
        eyebrow: "1. Information We Collect",
        heading: "Direct Inquiries & Technical Scoping Data",
        body: [
          "When you contact Divanex Technologies through our website forms, WhatsApp links, or consultation schedulers, we collect information necessary to evaluate your engineering requirements and formulate technical proposals:",
          "",
          "- **Contact Credentials:** Full Name, Business Email, and Telephone / WhatsApp Number.",
          "- **Project Scoping Details:** Target Core Service, Project Vision / Technical Requirements, Estimated Budget Range, and Target Launch Timeline.",
          "- **Client Engineering Metadata:** When collaborating on active client repositories, access credentials, API keys, and server infrastructure parameters provided explicitly by the client under bilateral NDA.",
          "- **Privacy-Preserving Telemetry:** Aggregated, anonymized performance metrics (HTTP latency, TLS handshake time, and device viewport) to ensure site reliability without tracking personal browsing history.",
        ].join("\n"),
      },
      {
        id: "usage",
        icon: "Server",
        eyebrow: "2. How We Use Your Information",
        heading: "Strictly Engineering & Contractual Execution",
        body: [
          "We process information strictly on lawful contractual and legitimate business bases:",
          "",
          "- Evaluating feasibility, database schema architecture, and sprint timelines for your custom software or SaaS product.",
          "- Communicating directly between your technical leadership and our senior solutions architects via email, Slack, or video calls.",
          "- Executing legally binding Non-Disclosure Agreements (NDAs), Master Service Agreements (MSAs), and Statements of Work (SOWs).",
          "- Deploying, maintaining, and supporting production systems during hypercare and warranty periods.",
        ].join("\n"),
      },
      {
        id: "non-disclosure",
        icon: "EyeOff",
        eyebrow: "3. Zero Data Monetization & Strict Confidentiality",
        heading: "We Never Sell, Rent, or Trade Your Data",
        body: [
          "**Our Ironclad Commercial Pledge:**",
          "",
          "Divanex Technologies has never sold, rented, or commercialized client data, contact lists, proprietary business ideas, or source code to third-party advertisers, data brokers, or AI training scrapers. All data shared with us is treated as strictly proprietary trade secret information under professional non-disclosure.",
        ].join("\n"),
      },
      {
        id: "security",
        icon: "Lock",
        eyebrow: "4. Enterprise Storage & Encryption Standards",
        heading: "Zero-Trust Architecture & AES-256 Encryption",
        body: [
          "All electronic communications and database records are safeguarded by enterprise-grade cryptographic controls:",
          "",
          "- **Data in Transit:** Encrypted using TLS 1.3 with strict HSTS and Perfect Forward Secrecy across all HTTP and WebSocket connections.",
          "- **Data at Rest:** Stored in SOC 2 and ISO 27001 audited cloud database infrastructure with AES-256-GCM encryption.",
          "- **Row-Level Isolation (RLS):** Database architecture utilizes strict tenant partitioning ensuring zero cross-client inspection.",
          "- **Access Controls:** Principle of Least Privilege (PoLP) enforced with biometric multi-factor authentication (MFA) on all developer workstations.",
        ].join("\n"),
      },
      {
        id: "rights",
        icon: "Globe",
        eyebrow: "5. GDPR, CCPA & Global Client Rights",
        heading: "Your Statutory Data Rights",
        body: [
          "Regardless of your geographic jurisdiction (European Union, United Kingdom, United States, UAE, Canada, or India), Divanex extends complete data rights to all prospective and active clients:",
          "",
          "- **Right to Access:** You may request a complete copy of all personal and project data associated with your contact record.",
          "- **Right to Rectification:** You may update or correct any inaccuracies in your recorded contact information at any time.",
          "- **Right to Erasure (“Right to be Forgotten”):** You may request permanent deletion of all proposal submissions and communication archives.",
          "- **Right to Data Portability:** All project artifacts, schemas, and documentation are provided in machine-readable standard formats (JSON, OpenAPI, SQL).",
        ].join("\n"),
      },
      {
        id: "retention",
        icon: "KeyRound",
        eyebrow: "6. Data Retention & Secure Discard",
        heading: "Retention Periods & Automated Purging",
        body: "Contact form submissions that do not proceed to active commercial contracts are archived and securely purged after 12 months unless explicit continuation of scoping is requested. For active client contracts, technical runbooks and billing records are retained as required by corporate statutory and tax regulations.",
      },
      {
        id: "dpo",
        icon: "ShieldCheck",
        eyebrow: "7. Data Protection Officer & Privacy Inquiries",
        heading: "Direct Privacy Governance Channel",
        body: "For data subject access requests, encryption verification, or bilateral NDA execution, contact our Data Protection Officer using the button below.",
      },
    ],
    cta: {
      title: "Divanex Data Protection Officer (DPO)",
      body: "For data subject access requests, encryption verification, or bilateral NDA execution:",
      label: "Submit Privacy Request",
      href: "/contact",
    },
  },

  terms: {
    badge: "Engineering Governance",
    summaryTitle: "Transparent, Milestone-Based Client Agreement",
    summaryBody:
      "These Terms govern technical consulting, software architecture, custom application engineering, and dedicated developer pod engagements with Divanex Technologies.",
    stamp: "Effective Version: 2026.4 • Last Updated: September 2026",
    indexTitle: "Contract Sections",
    sections: [
      {
        id: "engagement",
        icon: "Code2",
        eyebrow: "1. Engagement & Service Scope",
        heading: "Software Engineering & Architecture Advisory",
        body: [
          "Divanex Technologies (“Divanex”, “we”, “us”) provides high-caliber custom software engineering, cloud architecture, mobile app development, SaaS engineering, and AI workflow integration services to corporate clients, startups, and institutions worldwide (“Client”, “you”).",
          "",
          "All engineering engagements are executed under clear Statements of Work (SOWs), agile sprint backlogs, or dedicated team pod arrangements as formally agreed between the parties.",
        ].join("\n"),
      },
      {
        id: "proposals",
        icon: "Clock",
        eyebrow: "2. Statements of Work & Sprint Milestones",
        heading: "Agile Sprint Delivery Cadence",
        body: [
          "Engineering is organized into defined sprint milestones (typically 14-day delivery cycles). Each milestone defines explicit deliverable criteria:",
          "",
          "- **Live Staging Builds:** Fully interactive, clickable staging URLs provided every week for verification.",
          "- **Automated Code Pass:** All deliverables must pass automated linting, strict TypeScript checks, and security test suites before milestone sign-off.",
          "- **Review Window:** Client has a standard 7-business-day acceptance review window following staging delivery to request adjustments within the agreed scope.",
        ].join("\n"),
      },
      {
        id: "ip",
        icon: "ShieldCheck",
        eyebrow: "3. 100% Intellectual Property & Source Code Transfer",
        heading: "You Own Everything We Build",
        body: [
          "**Comprehensive Intellectual Property Assignment:**",
          "",
          "Upon settlement of corresponding sprint milestone invoices, Divanex irrevocably assigns 100% of all intellectual property rights, copyrights, source code, database architectures, schema migrations, Figma design files, and deployment credentials created for the project exclusively to the Client. Divanex retains zero residual claims or licensing lock-in.",
        ].join("\n"),
      },
      {
        id: "client-duties",
        icon: "FileText",
        eyebrow: "4. Client Responsibilities & Collaboration",
        heading: "Cooperative Agile Engineering",
        body: [
          "Successful software delivery relies on direct, transparent collaboration:",
          "",
          "- Client agrees to designate a Primary Product Lead or Technical Stakeholder empowered to make scope and design decisions.",
          "- Providing necessary third-party API credentials, domain DNS access, or external service accounts in a timely manner.",
          "- Prompt review of staging builds to ensure continuous sprint velocity.",
        ].join("\n"),
      },
      {
        id: "billing",
        icon: "Banknote",
        eyebrow: "5. Milestone Billing & Payment Terms",
        heading: "Transparent Invoicing & Milestone Security",
        body: [
          "We support direct international bank wire (SWIFT / ACH), Stripe, Razorpay, and verified platform milestone escrows:",
          "",
          "- Fixed-scope projects are billed in milestone tranches tied to delivered software features.",
          "- Invoices are payable upon milestone acceptance within net 7 business days unless specified otherwise in the SOW.",
          "- Transparent quote guarantee: No hidden software licensing seat charges or arbitrary maintenance fees.",
        ].join("\n"),
      },
      {
        id: "warranty",
        icon: "ShieldCheck",
        eyebrow: "6. 60-Day Warranty & Post-Launch Hypercare",
        heading: "Defect-Free Software Guarantee",
        body: "Every production software deployment is backed by our standard **60-day Post-Launch Hypercare Warranty**. If any bug, defect, or variance from the agreed technical specifications is identified within this window, our engineering team fixes it immediately at zero additional cost to the client.",
      },
      {
        id: "liability",
        icon: "Scale",
        eyebrow: "7. Limitation of Liability & Warranties",
        heading: "Standard Commercial Protections",
        body: "Except as expressly provided in the SOW and warranty clauses, software deliverables are provided “as is”. To the maximum extent permitted by applicable law, neither party shall be liable for indirect, incidental, consequential, or punitive damages. Total aggregate liability shall not exceed the total fees paid by Client under the specific SOW giving rise to the claim.",
      },
      {
        id: "governing",
        icon: "Scale",
        eyebrow: "8. Governing Law & Dispute Resolution",
        heading: "Good-Faith Engineering Mediation",
        body: "Disputes are first addressed through direct good-faith technical mediation between the Client's product leadership and Divanex's solutions architects. We execute custom Master Service Agreements tailored to corporate procurement guidelines where a client's legal team requires specific governing law.",
      },
    ],
    cta: {
      title: "Need a Customized Enterprise MSA or Bilateral NDA?",
      body: "We execute custom Master Service Agreements tailored to corporate procurement guidelines.",
      label: "Request Custom Contract",
      href: "/contact",
    },
  },

  cookies: {
    badge: "Zero Ad Trackers",
    summaryTitle: "Privacy-First Local Storage & Security Tokens",
    summaryBody:
      "Divanex uses strictly necessary browser cookies and local tokens to operate currency preferences, theme state, and secure admin sessions. We do not use cross-site advertising trackers or sell browsing data.",
    stamp: "Last Updated: September 2026",
    indexTitle: "Cookie Topics",
    sections: [
      {
        id: "what-are-cookies",
        icon: "Cookie",
        eyebrow: "1. What Are Cookies & Local Storage",
        heading: "Small State Identifiers in Your Browser",
        body: "Cookies and HTML5 LocalStorage are small text records placed on your device by websites you visit. They allow modern web applications to remember your session, preserve selected preferences (such as your chosen display currency), and ensure secure authenticated operations.",
      },
      {
        id: "how-we-use",
        icon: "ShieldCheck",
        eyebrow: "2. Exactly What Divanex Stores",
        heading: "Strictly Functional & Performance Telemetry",
        body: "",
        cards: [
          {
            id: "essential",
            title: "A. Strictly Necessary & Security Tokens",
            badge: "ESSENTIAL",
            icon: "Lock",
            tone: "sky",
            body: "Required for basic site navigation, CSRF protection, admin console authentication, and ensuring interactive contact forms operate securely. These cannot be disabled without breaking website functionality.",
          },
          {
            id: "preferences",
            title: "B. Functional Preferences",
            badge: "PREFERENCES",
            icon: "Zap",
            tone: "emerald",
            body: "Stores your selected currency preference (e.g. USD, EUR, GBP, AED, INR) in `localStorage` so that prices across the services catalogue remain in your preferred denomination as you browse.",
          },
          {
            id: "no-ads",
            title: "C. Zero Third-Party Advertising Cookies",
            badge: "ZERO AD TRACKERS",
            icon: "EyeOff",
            tone: "amber",
            body: "Divanex does not embed third-party advertising tracking pixels (like Meta Pixel, TikTok Pixel, or retargeting ad networks) that follow you across the internet.",
          },
        ],
      },
      {
        id: "managing",
        icon: "CheckCircle2",
        eyebrow: "3. Managing Cookies in Your Browser",
        heading: "Complete Browser-Level Control",
        body: "You can restrict, block, or delete browser cookies and local storage items at any time through your browser settings (Chrome, Safari, Firefox, Edge). Please note that clearing local storage may reset your selected currency preference.",
      },
    ],
    cta: {
      title: "Have Questions Regarding Privacy or Compliance?",
      body: "Our security and privacy team is available to answer all enterprise data inquiries.",
      label: "Contact Privacy Team",
      href: "/contact",
    },
  },

  nda: {
    badge: "Immediate Execution",
    summaryTitle: "Bilateral Non-Disclosure Before Any Architecture Review",
    summaryBody:
      "We routinely sign bilateral NDAs with international founders, enterprise CTOs, and healthcare organizations before inspecting existing codebases or sharing technical roadmaps.",
    stamp: "Last Updated: September 2026",
    indexTitle: "Legal Topics",
    sections: [
      {
        id: "bilateral-nda",
        icon: "Lock",
        eyebrow: "1. Bilateral Non-Disclosure Terms",
        heading: "Mutual Confidentiality Protocol",
        body: [
          "All proprietary information shared during discovery discussions, sprint planning, and architecture reviews is governed by strict mutual non-disclosure obligations:",
          "",
          "- **Definition of Confidential Information:** Business plans, proprietary algorithms, patient workflows, financial transaction mechanics, customer lists, API schemas, and unreleased feature roadmaps.",
          "- **Standard of Care:** Divanex treats Client confidential material with the same strict standard of care it applies to its own core intellectual property.",
          "- **No Unauthorized Disclosure:** Information is disclosed strictly to developer pod members directly assigned to your project who are bound by matching employment confidentiality agreements.",
        ].join("\n"),
      },
      {
        id: "what-you-own",
        icon: "ShieldCheck",
        eyebrow: "2. Full Asset Transfer",
        heading: "Everything We Build Is Transferred to You",
        body: "Unlike agencies that retain proprietary frameworks to lock clients into expensive maintenance retainers, Divanex executes a total asset transfer:",
        cards: [
          {
            id: "source-code",
            title: "100% Source Code",
            icon: "Code2",
            tone: "sky",
            body: "TypeScript, Python, Go, and React Native source code with complete comments.",
          },
          {
            id: "git",
            title: "Git Repository Access",
            icon: "GitBranch",
            tone: "sky",
            body: "Direct GitHub / GitLab organization ownership with complete commit history.",
          },
          {
            id: "databases",
            title: "Databases & Schemas",
            icon: "Database",
            tone: "emerald",
            body: "PostgreSQL DDL, migration scripts, seeders, and vector indexing configurations.",
          },
          {
            id: "cloud",
            title: "Cloud Accounts",
            icon: "Cloud",
            tone: "emerald",
            body: "Direct AWS, GCP, Cloudflare, or Vercel accounts provisioned in your company name.",
          },
        ],
      },
      {
        id: "trade-secrets",
        icon: "ShieldCheck",
        eyebrow: "3. Trade Secret & Non-Compete Protections",
        heading: "Protecting Your Competitive Advantage",
        body: "Divanex will never take your custom proprietary algorithms, specialized medical formulas, or bespoke financial scoring models and resell them to competing entities. Your custom codebase is uniquely yours.",
      },
      {
        id: "zero-lockin",
        icon: "KeyRound",
        eyebrow: "4. Zero Vendor Lock-In Standards",
        heading: "Clean Architecture Any Senior Developer Can Run",
        body: "We build on open, battle-tested modern standards (Next.js, Docker, PostgreSQL, OpenAPI). If your internal engineering team ever takes over the project, they will find modular codebases, automated CI/CD configurations, and comprehensive setup documentation that can be built and deployed in minutes.",
      },
    ],
    cta: {
      title: "Ready to Execute an NDA for Your Upcoming Project?",
      body: "We send our standard bilateral NDA within 1 hour or review your legal team's template.",
      label: "Request Bilateral NDA",
      href: "/contact",
    },
  },

  "refund-policy": {
    badge: "Milestone Transparency",
    summaryTitle: "Pay Only for Delivered & Verified Engineering",
    summaryBody:
      "Our milestone model eliminates financial risk: work is verified on clickable staging builds prior to milestone release, backed by our 60-day post-launch warranty.",
    stamp: "Effective Version: 2026.4 • Last Updated: September 2026",
    indexTitle: "Policy Index",
    sections: [
      {
        id: "milestones",
        icon: "Banknote",
        eyebrow: "1. Milestone-Based Engineering Model",
        heading: "Structured Sprint-by-Sprint Payments",
        body: [
          "Divanex operates on transparent milestone tranches agreed in your Statement of Work (SOW). Rather than demanding full upfront payment for complex multi-month platforms, payments are tied to delivered functional increments:",
          "",
          "- **Phase 1: Architecture & UI/UX Sprint:** Wireframes, database schema design, and interactive Figma prototypes.",
          "- **Phase 2: Core Feature & API Sprints:** Working backend APIs, authentication, core database entities, and web/mobile UI.",
          "- **Phase 3: Integration, QA & Staging:** Payment gateway webhooks, third-party integrations, security audits, and load testing.",
          "- **Phase 4: Production Deployment & Handover:** DNS propagation, cloud infrastructure handover, and 60-day warranty initiation.",
        ].join("\n"),
      },
      {
        id: "verification",
        icon: "CheckCircle2",
        eyebrow: "2. Acceptance Testing & Staging Verification",
        heading: "Verification on Clickable Staging Environments",
        body: [
          "Every sprint deliverable is deployed to an isolated staging environment for Client inspection. Client has a standard 7-business-day acceptance review period to test newly completed features against the agreed user stories.",
          "",
          "If any feature does not conform to the agreed SOW criteria, our engineering pod refactors and resolves it promptly before milestone sign-off.",
        ].join("\n"),
      },
      {
        id: "cancellation",
        icon: "RefreshCw",
        eyebrow: "3. Project Cancellation & Sprint Exit Terms",
        heading: "Clean Exit Rights at Any Sprint Boundary",
        body: [
          "We understand that business priorities can pivot. If you ever choose to pause or cancel a project:",
          "",
          "- You may cancel at the completion of any milestone with written notice.",
          "- You retain **100% ownership** of all source code, design files, database schemas, and documentation delivered and paid for up to the exit date.",
          "- You will not be billed for subsequent unstarted sprint phases.",
        ].join("\n"),
      },
      {
        id: "refund-terms",
        icon: "ShieldCheck",
        eyebrow: "4. Refund Eligibility & Unused Retainers",
        heading: "Transparent Handling of Milestone Funds",
        body: [
          "**Deposit & Retainer Refund Terms:**",
          "",
          "- If a project is cancelled prior to the commencement of technical discovery and engineering sprints, 100% of the initial sprint deposit is refunded.",
          "- For in-progress milestones, billing is calculated strictly on hours/deliverables completed; any unallocated pre-paid balance is refunded directly to your original payment method.",
          "- Milestone payments already approved and accepted following staging review are non-refundable, as corresponding intellectual property and source code have been transferred to the Client.",
        ].join("\n"),
      },
      {
        id: "hypercare-warranty",
        icon: "Sparkles",
        eyebrow: "5. 60-Day Post-Launch Hypercare Guarantee",
        heading: "Zero Additional Charges for Defect Fixes",
        body: "All delivered software includes our **60-Day Post-Launch Warranty**. If unexpected defects or errors within the original scope emerge after real traffic hits production, our team fixes them immediately without additional invoices or hourly ticketing charges.",
      },
    ],
    cta: {
      title: "Have Questions About Milestone Payments or SOW Terms?",
      body: "Speak directly with our technical leadership for transparent contract scoping.",
      label: "Book a Consultation",
      href: "/contact",
    },
  },
};
