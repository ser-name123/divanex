/**
 * GENERATED FILE — do not edit by hand.
 *
 * Produced by scripts/gen-section-defaults.js from the DEFAULT_HEADING,
 * DEFAULT_ITEMS and DEFAULT_CTA constants in the section components. It exists
 * so the admin console can show a section that has never been edited without
 * importing every section component into the admin bundle.
 *
 * Run `npm run gen-sections` after changing a section's built-in copy.
 *
 * Icons are null here: they are React components in the source and the admin
 * console edits text.
 */

import type { SectionContent } from "@/data/pageSections";

export const SECTION_DEFAULTS: Record<string, Partial<SectionContent>> =
{
  "blog/categories": {
    "heading": {
      "eyebrow": "",
      "title": "",
      "highlight": "",
      "description": ""
    },
    "items": [
      {
        "label": "All"
      },
      {
        "label": "Food Delivery & Logistics"
      },
      {
        "label": "PropTech & SaaS"
      },
      {
        "label": "E-Commerce & Retail"
      },
      {
        "label": "IoT & Smart Mobility"
      },
      {
        "label": "Enterprise ERP"
      },
      {
        "label": "AI & Autonomous Agents"
      },
      {
        "label": "Healthcare HMIS"
      },
      {
        "label": "Fintech & Payments"
      },
      {
        "label": "Cloud & DevOps"
      },
      {
        "label": "Mobile Engineering"
      }
    ]
  },
  "blog/tags": {
    "heading": {
      "eyebrow": "",
      "title": "",
      "highlight": "",
      "description": ""
    },
    "items": [
      {
        "label": "Hyperlocal Delivery"
      },
      {
        "label": "PropTech"
      },
      {
        "label": "E-Commerce"
      },
      {
        "label": "EV Mobility"
      },
      {
        "label": "Industrial ERP"
      },
      {
        "label": "AI Agents"
      },
      {
        "label": "Healthcare"
      },
      {
        "label": "Fintech"
      },
      {
        "label": "Cloud Cost Optimization"
      },
      {
        "label": "React Native"
      },
      {
        "label": "Flutter"
      }
    ]
  },
  "contact/24-hours": {
    "heading": {
      "eyebrow": "Response Velocity",
      "title": "What Happens After You Contact Us:",
      "highlight": "24-Hour SLA Timeline",
      "description": "No sales queues or weeks of silence. Here is our exact hour-by-hour onboarding protocol once you hit send."
    },
    "items": [
      {
        "hour": "Hour 01",
        "title": "Inquiry Ingestion & Mutual NDA",
        "desc": "Our automated system logs your inquiry, assigns an engineering ticket, and sends a mutual NDA if requested."
      },
      {
        "hour": "Hour 04",
        "title": "Senior Architect Technical Review",
        "desc": "A principal engineer reviews your feature list, technology constraints, and API requirements to prepare initial architecture questions."
      },
      {
        "hour": "Hour 12",
        "title": "Discovery Call & Clarification",
        "desc": "We host an optional 20-minute video sync to resolve any open questions regarding database scale or third-party integrations."
      },
      {
        "hour": "Hour 24",
        "title": "Locked Proposal & Milestone Schedule",
        "desc": "You receive a formal proposal containing technical architecture recommendations, sprint breakdown, timeline, and locked milestone pricing."
      }
    ]
  },
  "contact/escalation": {
    "heading": {
      "eyebrow": "Critical Project Rescue & Emergency Hotline",
      "title": "Stalled Project, Active Production Outage, or Ghosting Agency?",
      "highlight": "",
      "description": "If your current vendor has abandoned a critical release or you have an active production emergency requiring immediate senior engineering intervention, trigger our rapid emergency response pod."
    },
    "items": [],
    "cta": {
      "label": "Trigger Emergency Call",
      "href": ""
    }
  },
  "contact/hubs": {
    "heading": {
      "eyebrow": "GLOBAL REACH // LOCAL OVERLAP",
      "title": "Global Client Coverage &",
      "highlight": "Regional Desks",
      "description": "Centralized engineering delivered from our Jaipur HQ, with dedicated representative client coverage across APAC, MENA, and North America."
    },
    "items": [
      {
        "city": "Jaipur — Engineering HQ (India)",
        "tz": "IST (UTC+5:30)",
        "hours": "10:00 AM - 08:00 PM",
        "coverage": "Office 104, Vaishali Tower 2nd, Nursery Circle, Vaishali Nagar, Jaipur 302021 • Phone: +91-6375073511 • Mail: business@divanextechnologies.com"
      },
      {
        "city": "Hong Kong — APAC Client Coverage",
        "tz": "HKT (UTC+8:00)",
        "hours": "09:00 AM - 07:00 PM",
        "coverage": "FLAT/RM E (36) 3/F Superluck Industrial Centre Phase 2, 57 Sha Tsui Rd, Tsuen Wan, Hong Kong • Phone: +852-90270926"
      },
      {
        "city": "Dubai — MENA Client Coverage",
        "tz": "GST (UTC+4:00)",
        "hours": "10:00 AM - 07:00 PM",
        "coverage": "Building C8, Dubai Media City, Dubai, United Arab Emirates • Direct Line: +91-6375073511"
      },
      {
        "city": "Canada — North America Client Coverage",
        "tz": "EST (UTC-5:00)",
        "hours": "09:00 AM - 06:00 PM",
        "coverage": "105 Sawmill Valley Dr, Newmarket, ON L3X 1S4, Canada • Direct Line: +91-6375073511"
      }
    ]
  },
  "contact/privacy": {
    "heading": {
      "eyebrow": "Integrity Guarantee",
      "title": "Our Zero Spam &",
      "highlight": "Privacy Pledge",
      "description": "We treat your privacy with the same architectural rigor as your software code."
    },
    "items": [
      {
        "icon": null,
        "title": "No Pushy Sales Reps",
        "desc": "You will never be contacted by commission-driven sales reps. Your inquiry is handled directly by experienced technical leads."
      },
      {
        "icon": null,
        "title": "Data Confidentiality",
        "desc": "Your email, phone number, and project ideas are never sold, rented, or shared with third-party lead brokers."
      },
      {
        "icon": null,
        "title": "Zero Spam Policy",
        "desc": "We do not enroll you in marketing newsletters or automated cold sequences. You only receive direct answers to your inquiry."
      },
      {
        "icon": null,
        "title": "Immediate Mutual NDA",
        "desc": "We gladly sign our standard mutual non-disclosure agreement or your company's proprietary NDA prior to technical deep-dives."
      }
    ]
  },
  "contact/rfp": {
    "heading": {
      "eyebrow": "Fast-Track Checklist",
      "title": "How to Submit an RFP or",
      "highlight": "Technical Project Brief",
      "description": "Have existing documentation? You can attach files or include links directly in our contact form for immediate analysis."
    },
    "items": [
      {
        "label": "Executive Summary / Pitch Deck",
        "desc": "PDF or Notion link explaining the vision and business context."
      },
      {
        "label": "Feature Requirements or User Stories",
        "desc": "Bullet-point list of primary features for MVP vs Phase 2."
      },
      {
        "label": "Design References or Figma Links",
        "desc": "Wireframes, UI mockups, or competitor references."
      },
      {
        "label": "Target Launch Date & Milestones",
        "desc": "Your desired go-to-market timeline (e.g., within 8 weeks)."
      }
    ]
  },
  "contact/scheduler": {
    "heading": {
      "eyebrow": "Real-Time Calendar Sync",
      "title": "Book a 30-Minute",
      "highlight": "Technical Discovery Session",
      "description": "Skip email back-and-forth. Pick a slot directly on our lead architect's Google Calendar to discuss requirements, architecture schemas, and budget fit."
    },
    "items": [],
    "cta": {
      "label": "Select Date & Time on Calendar",
      "href": "https://calendly.com"
    }
  },
  "faqs/categories": {
    "heading": {
      "eyebrow": "Knowledge Index",
      "title": "Explore Questions by",
      "highlight": "Topic Category",
      "description": "Navigate directly to the answers you need or browse our comprehensive knowledge policies below."
    },
    "items": [
      {
        "icon": null,
        "title": "IP & Contracts",
        "desc": "Source code ownership, Git repo transfer, and NDA agreements."
      },
      {
        "icon": null,
        "title": "Pricing & Invoicing",
        "desc": "Milestone-gated payments, wire transfers, and currency support."
      },
      {
        "icon": null,
        "title": "Sprint Execution",
        "desc": "14-day cadence, daily standups, and bi-weekly live staging demos."
      },
      {
        "icon": null,
        "title": "Security & SLAs",
        "desc": "OWASP standards, security hardening, and resilient high-availability SLAs."
      },
      {
        "icon": null,
        "title": "Tech Stack & Code",
        "desc": "Next.js, React Native, Python, Go, and PostgreSQL architecture."
      },
      {
        "icon": null,
        "title": "Post-Launch Hypercare",
        "desc": "30-day warranty, retainer options, and emergency incident SLA."
      }
    ]
  },
  "faqs/channels": {
    "heading": {
      "eyebrow": "Real Human Assistance",
      "title": "Didn't Find Your Answer?",
      "highlight": "Direct Support Channels",
      "description": "Our engineering team is always on standby to discuss your technical architecture or answer questions."
    },
    "items": []
  },
  "faqs/ip": {
    "heading": {
      "eyebrow": "Legal Governance",
      "title": "IP Ownership &",
      "highlight": "Contract Governance Policies",
      "description": "Complete legal clarity and peace of mind. Our agreements are straightforward, institutional, and founder-friendly."
    },
    "items": [
      {
        "title": "100% Intellectual Property Assignment",
        "desc": "Upon milestone completion and invoice clearance, all custom code, architectural designs, algorithms, and documentation become your sole, exclusive intellectual property."
      },
      {
        "title": "Mutual Non-Disclosure Agreement (NDA)",
        "desc": "We sign a comprehensive bilateral NDA before reviewing proprietary PRDs, business models, or code repositories, protecting your trade secrets with strict legal remedies."
      },
      {
        "title": "No Vendor Lock-In Frameworks",
        "desc": "We build strictly with open-source industry standard runtimes (Next.js, Node, Python, PostgreSQL). We never inject proprietary, closed-source dependencies."
      },
      {
        "title": "Direct GitHub Organization Transfer",
        "desc": "All code repositories are initialized directly under your company's GitHub or GitLab organization with your internal team retaining administrative master keys."
      }
    ]
  },
  "faqs/payment": {
    "heading": {
      "eyebrow": "Financial Logistics",
      "title": "Payment &",
      "highlight": "Invoicing Terms",
      "description": "Frictionless global billing tailored for early-stage startups and multinational enterprise accounting teams alike."
    },
    "items": [
      {
        "title": "Global Currencies Supported",
        "detail": "Invoices issued in USD ($), EUR (€), GBP (£), and INR (₹) with zero cross-currency conversion markups."
      },
      {
        "title": "Payment Rails & Methods",
        "detail": "Bank wire transfers (ACH, SWIFT, SEPA, NEFT/RTGS), corporate credit cards via Stripe, and escrow options for enterprise contracts."
      },
      {
        "title": "GST & Tax Compliance",
        "detail": "Full corporate invoicing with tax IDs, GST / VAT compliance receipts, and standardized accounting documentation."
      },
      {
        "title": "Milestone-Gated Releases",
        "detail": "No open-ended monthly burn. Payments are tied to agreed sprint gates and explicit customer acceptance."
      }
    ]
  },
  "faqs/support": {
    "heading": {
      "eyebrow": "Operational Continuity",
      "title": "Post-Launch Support &",
      "highlight": "Hypercare Guide",
      "description": "We don't abandon you on launch day. Our comprehensive post-deployment protocols ensure smooth production operations."
    },
    "items": [
      {
        "title": "30-Day Zero-Cost Hypercare",
        "badge": "INCLUDED IN ALL BUILDS",
        "desc": "Immediate priority bug fixing for any discrepancies against agreed sprint specifications, server log monitoring, and DNS stabilization."
      },
      {
        "title": "Ongoing Monthly Maintenance Pod",
        "badge": "OPTIONAL RETAINER",
        "desc": "Dedicated senior engineer allocated for security dependency updates, framework patching, performance audits, and small feature backlogs."
      },
      {
        "title": "24/7 Production Incident SLA",
        "badge": "CRITICAL PLATFORMS",
        "desc": "Under 15-minute P1 response time guarantee with direct on-call pager escalation for high-volume SaaS, fintech, and e-commerce applications."
      }
    ]
  },
  "faqs/timezone": {
    "heading": {
      "eyebrow": "Collaboration Discipline",
      "title": "Timezone &",
      "highlight": "Communication Policy",
      "description": "Distance is never a barrier. Our battle-tested async protocols ensure high velocity across global timezones."
    },
    "items": [
      {
        "title": "Guaranteed 4-Hour Daily Working Overlap",
        "desc": "Whether you are located in New York (EST), California (PST), London (GMT), or Dubai (GST), our teams maintain a guaranteed 4-hour daily overlap for live syncs."
      },
      {
        "title": "Async-First Culture with Loom & Linear",
        "desc": "No unnecessary meetings. Detailed video walkthroughs, clear ticket specifications on Linear, and daily Slack digests keep decisions moving 24/7."
      },
      {
        "title": "Direct WhatsApp Business Channel",
        "desc": "Direct access to your dedicated technical lead on WhatsApp for urgent queries, with a verified sub-15 minute response time during business hours."
      },
      {
        "title": "Zero Junior Account Manager Buffers",
        "desc": "You converse directly with the engineers and architects writing your code, eliminating misunderstandings and game-of-telephone delays."
      }
    ]
  },
  "footer/brand": {
    "heading": {
      "eyebrow": "Enterprise Standards:",
      "title": "",
      "highlight": "",
      "description": "Edge Infrastructure: Next.js 16 + Cloudflare Tier 1"
    },
    "items": [
      {
        "kind": "business",
        "label": "Business Inquiries",
        "action": ""
      },
      {
        "kind": "careers",
        "label": "Job Applications / HR",
        "action": "Apply"
      },
      {
        "kind": "support",
        "label": "Direct Support Call",
        "action": "WhatsApp"
      },
      {
        "kind": "newsletter-note",
        "label": "Direct engineering digest • No third-party tracking",
        "action": "TLS 1.3 Verified"
      }
    ],
    "cta": {
      "label": "Book a Consultation",
      "href": "/contact"
    }
  },
  "footer/offices": {
    "heading": {
      "eyebrow": "GLOBAL TIMEZONE OVERLAP // CLIENT COVERAGE",
      "title": "Global Client Coverage & Regional Desks",
      "highlight": "",
      "description": "Primary engineering runs out of our Jaipur HQ, with dedicated client coverage and active timezone overlap across APAC, the Middle East, and North America."
    },
    "items": [
      {
        "id": "india-hq",
        "country": "India",
        "city": "Jaipur, Rajasthan",
        "isoCode": "IN",
        "roleBadge": "Engineering HQ & Core R&D Lab",
        "accentColor": "teal",
        "tagline": "Primary Engineering Hub & Physical Headquarters",
        "address": "Office 104, Vaishali Tower 2nd, Nursery Circle, Vaishali Nagar, Jaipur 302021",
        "timeZoneName": "India Standard Time",
        "timeZoneOffset": "IST (UTC+5:30)",
        "timeZoneIana": "Asia/Kolkata",
        "primaryPhone": "+91-6375073511",
        "phoneRaw": "+916375073511",
        "email": "business@divanextechnologies.com",
        "whatsappNumber": "919571618625",
        "mapQuery": "Vaishali Tower 2nd, Nursery Circle, Vaishali Nagar, Jaipur"
      },
      {
        "id": "hong-kong",
        "country": "Hong Kong",
        "city": "Tsuen Wan, New Territories",
        "isoCode": "HK",
        "roleBadge": "APAC Client Coverage Desk",
        "accentColor": "sky",
        "tagline": "Asia-Pacific Regional Client Coverage",
        "address": "FLAT/RM E (36) 3/F Superluck Industrial Centre Phase 2, 57 Sha Tsui Rd, Tsuen Wan",
        "timeZoneName": "Hong Kong Time",
        "timeZoneOffset": "HKT (UTC+8:00)",
        "timeZoneIana": "Asia/Hong_Kong",
        "primaryPhone": "+852-90270926",
        "phoneRaw": "+85290270926",
        "email": "business@divanextechnologies.com",
        "whatsappNumber": "919571618625",
        "mapQuery": "Superluck Industrial Centre Phase 2, Sha Tsui Road, Tsuen Wan, Hong Kong"
      },
      {
        "id": "dubai-uae",
        "country": "United Arab Emirates",
        "city": "Dubai Media City",
        "isoCode": "AE",
        "roleBadge": "MENA Client Coverage Desk",
        "accentColor": "amber",
        "tagline": "Middle East & GCC Regional Client Coverage",
        "address": "Building C8, Dubai Media City, Dubai, United Arab Emirates",
        "timeZoneName": "Gulf Standard Time",
        "timeZoneOffset": "GST (UTC+4:00)",
        "timeZoneIana": "Asia/Dubai",
        "primaryPhone": "+91-6375073511",
        "phoneRaw": "+916375073511",
        "email": "business@divanextechnologies.com",
        "whatsappNumber": "919571618625",
        "mapQuery": "Dubai Media City, Dubai, UAE"
      },
      {
        "id": "canada",
        "country": "Canada",
        "city": "Newmarket, Greater Toronto",
        "isoCode": "CA",
        "roleBadge": "North America Client Coverage Desk",
        "accentColor": "rose",
        "tagline": "Americas Regional Client Coverage & Support",
        "address": "105 Sawmill Valley Dr, Newmarket, ON L3X 1S4, Canada",
        "timeZoneName": "Eastern Standard Time",
        "timeZoneOffset": "EST (UTC-5:00)",
        "timeZoneIana": "America/Toronto",
        "primaryPhone": "+91-6375073511",
        "phoneRaw": "+916375073511",
        "email": "business@divanextechnologies.com",
        "whatsappNumber": "919571618625",
        "mapQuery": "105 Sawmill Valley Dr, Newmarket, ON, Canada"
      }
    ]
  },
  "home/core-services": {
    "heading": {
      "eyebrow": "CORE ENGINEERING CAPABILITIES",
      "title": "Eight Practices We Build In",
      "highlight": "",
      "description": ""
    },
    "items": []
  },
  "home/ownership": {
    "heading": {
      "eyebrow": "DAY-1 CODE OWNERSHIP // ZERO VENDOR LOCK-IN",
      "title": "You Own the Product.",
      "highlight": "Not Us.",
      "description": "From the first milestone, your Git repository, cloud accounts, database models, and design assets belong 100% to your company. No hostage code, no exit fees, and zero vendor lock-in."
    },
    "items": [
      {
        "iconName": "Code2",
        "title": "100% Source Code",
        "subtitle": "Zero proprietary lock-in",
        "description": "Clean, modular, fully typed TypeScript, Python, or Go codebases. No encrypted libraries, no obfuscated logic.",
        "tag": "Clean Code"
      },
      {
        "iconName": "GitBranch",
        "title": "Full Git Repository",
        "subtitle": "Complete commit history",
        "description": "Your organization owns the repository outright, with every branch, commit and pull request from day one.",
        "tag": "Version Control"
      },
      {
        "iconName": "Database",
        "title": "Database & Schemas",
        "subtitle": "Direct database access",
        "description": "PostgreSQL schemas, migration scripts and automated seeders, handed over with root credentials.",
        "tag": "Data Layer"
      },
      {
        "iconName": "Cloud",
        "title": "Cloud & Hosting Accounts",
        "subtitle": "Your cloud, your billing",
        "description": "AWS, GCP, Cloudflare or Vercel accounts provisioned in your company name and billed to you directly.",
        "tag": "Infrastructure"
      },
      {
        "iconName": "Palette",
        "title": "Design Files & UI Systems",
        "subtitle": "Tokenized Figma workspaces",
        "description": "The complete Figma design system, component library and design tokens, transferred to your workspace.",
        "tag": "Design System"
      },
      {
        "iconName": "FileText",
        "title": "Architecture & Documentation",
        "subtitle": "Comprehensive runbooks",
        "description": "OpenAPI specifications, architecture decision records and developer runbooks written to be handed over.",
        "tag": "Documentation"
      },
      {
        "iconName": "KeyRound",
        "title": "Deployment & Credentials",
        "subtitle": "Root administrative control",
        "description": "Root API keys, DNS control, SSL certificates and production secrets, all under your administration.",
        "tag": "Access Control"
      }
    ]
  },
  "home/ownership-panel": {
    "heading": {
      "eyebrow": "ZERO VENDOR LOCK-IN",
      "title": "What You Receive on Day One",
      "highlight": "Day-1 Transfer",
      "description": "Traditional agencies often retain code in private repositories or charge exit fees. We hand you full ownership from the first milestone."
    },
    "items": [
      {
        "kind": "pill",
        "title": "Mutual NDA & Direct IP Assignment",
        "description": "Legally enforceable contract clauses guaranteeing complete IP ownership from milestone sign-off."
      },
      {
        "kind": "callout",
        "title": "",
        "description": "Complete repository admin rights, direct cloud accounts, and 100% intellectual property transfer."
      },
      {
        "kind": "deliverable",
        "title": "Source Code",
        "description": "Clean, modular, fully typed TypeScript / Python"
      },
      {
        "kind": "deliverable",
        "title": "Git Repository",
        "description": "Full commit history transferred to your organization"
      },
      {
        "kind": "deliverable",
        "title": "Database",
        "description": "PostgreSQL schemas, migrations & automated seeders"
      },
      {
        "kind": "deliverable",
        "title": "Cloud Accounts",
        "description": "AWS / GCP / Vercel created directly in your name"
      },
      {
        "kind": "deliverable",
        "title": "Design Files",
        "description": "Complete tokenized Figma design system & components"
      },
      {
        "kind": "deliverable",
        "title": "Documentation",
        "description": "OpenAPI Swagger specs & developer runbooks"
      },
      {
        "kind": "deliverable",
        "title": "Deployment Access",
        "description": "Root API keys, DNS, SSL & production secrets"
      },
      {
        "kind": "metric",
        "title": "100%",
        "description": "IP Transfer",
        "tone": "emerald"
      },
      {
        "kind": "metric",
        "title": "0%",
        "description": "Vendor Lock",
        "tone": "sky"
      },
      {
        "kind": "metric",
        "title": "30-Day",
        "description": "Hypercare",
        "tone": "teal"
      }
    ],
    "cta": {
      "label": "Book a Consultation with 100% IP Transfer",
      "href": "/contact"
    }
  },
  "home/ratings": {
    "heading": {
      "eyebrow": "WHERE CLIENTS REVIEW US",
      "title": "",
      "highlight": "",
      "description": "Public ratings on the platforms clients hire us through"
    },
    "items": [
      {
        "kind": "platform",
        "name": "Google",
        "rating": "4.7",
        "reviewCount": "120+",
        "logoType": "google"
      },
      {
        "kind": "platform",
        "name": "Freelancer",
        "rating": "4.7",
        "reviewCount": "98+",
        "logoType": "freelancer"
      },
      {
        "kind": "platform",
        "name": "Clutch",
        "rating": "4.7",
        "reviewCount": "45+",
        "logoType": "clutch"
      },
      {
        "kind": "platform",
        "name": "Upwork",
        "rating": "4.7",
        "reviewCount": "150+",
        "logoType": "upwork"
      },
      {
        "kind": "platform",
        "name": "Fiverr",
        "rating": "4.7",
        "reviewCount": "210+",
        "logoType": "fiverr"
      },
      {
        "kind": "badge",
        "name": "GoodFirms",
        "initials": "GF",
        "subLabel": "Top Rated",
        "markColor": "#2575fc",
        "subColor": "#0f7670"
      },
      {
        "kind": "badge",
        "name": "TopDevelopers",
        "initials": "TD",
        "subLabel": "Best Web Dev",
        "markColor": "#000838",
        "subColor": "#5c9556"
      }
    ]
  },
  "home/tech-pillars": {
    "heading": {
      "eyebrow": "CORE TECHNOLOGY PILLARS",
      "title": "What We Build On",
      "highlight": "",
      "description": ""
    },
    "items": []
  },
  "home/why-proof": {
    "heading": {
      "eyebrow": "",
      "title": "",
      "highlight": "",
      "description": ""
    },
    "items": [
      {
        "label": "Senior Engineering Team"
      },
      {
        "label": "Transparent Milestones"
      },
      {
        "label": "Full Source-Code Ownership"
      },
      {
        "label": "Modern Architecture"
      },
      {
        "label": "Direct Communication"
      },
      {
        "label": "Post-Launch Support"
      }
    ]
  },
  "portfolio/architecture": {
    "heading": {
      "eyebrow": "Technical Deep-Dives",
      "title": "Complex Engineering Challenges:",
      "highlight": "Architectural Case Studies",
      "description": "Beyond pretty interfaces: real distributed systems, concurrency bottlenecks solved, and mission-critical reliability delivered."
    },
    "items": [
      {
        "slug": "fynito",
        "title": "Hyperlocal Real-Time Rider Telemetry HUD",
        "sector": "Food & Logistics",
        "icon": null,
        "challenge": "Handling high-concurrency rider GPS streams and low-latency kitchen order state transitions.",
        "solution": "Engineered Node.js worker clusters backed by Socket.io and Redis Pub/Sub geospatial clustering.",
        "metrics": "<120ms live map latency, high-throughput delivery architecture."
      },
      {
        "slug": "evtor",
        "title": "OCPP 2.0.1 Connected EV Telemetry Gateway",
        "sector": "IoT & Mobility",
        "icon": null,
        "challenge": "Standardizing heterogeneous EV charging station firmware with sub-second QR charge session triggering.",
        "solution": "Universal OCPP 2.0.1 WebSocket broker ingesting real-time meter telemetry into TimescaleDB.",
        "metrics": "High-availability telemetry SLA, <2.5s QR charge flow."
      },
      {
        "slug": "magnus-partners",
        "title": "HIPAA & ABDM Clinical Case Sharing Pipeline",
        "sector": "HealthTech & MedAI",
        "icon": null,
        "challenge": "Secure multi-hospital clinical consultation exchange with zero patient health information leakage.",
        "solution": "HL7 FHIR v4 data pipeline, PostgreSQL row-level security, and encrypted DICOM radiology viewer.",
        "metrics": "Multi-hospital network, HIPAA-ready clinical architecture."
      }
    ]
  },
  "portfolio/audit": {
    "heading": {
      "eyebrow": "Engineering Quality Standards",
      "title": "How We Define Success:",
      "highlight": "Release Quality Criteria",
      "description": "We don't ship until our stringent quality benchmarks are met. Here are the non-negotiable criteria every Divanex project must satisfy."
    },
    "items": [
      {
        "title": "Google Core Web Vitals 95+",
        "target": "LCP < 1.2s / CLS = 0",
        "desc": "Every web platform we release is audited for maximum Lighthouse performance, ensuring superior SEO crawlability and conversion rates."
      },
      {
        "title": "Zero P1 / P2 Vulnerability Audit",
        "target": "OWASP Hardened",
        "desc": "Static and dynamic penetration tests pass without critical vulnerabilities before any production domain switch is permitted."
      },
      {
        "title": "Sub-Second Global API Latency",
        "target": "p99 < 85ms",
        "desc": "Edge-cached database responses and regional Redis workers ensure sub-second response times for end-users globally."
      },
      {
        "title": "Strict 100% TypeScript Coverage",
        "target": "No `any` Types",
        "desc": "Strict type contracts between frontend clients and backend APIs eliminate silent runtime bugs in production."
      }
    ]
  },
  "portfolio/confidential": {
    "heading": {
      "eyebrow": "Enterprise NDA & Confidentiality Notice",
      "title": "60%+ of Our Production Deployments Are Protected Under Mutual NDA",
      "highlight": "",
      "description": "Many of our high-scale enterprise contracts, proprietary algorithmic trading bots, and stealth-mode venture-backed platforms cannot be published publicly. We respect client confidentiality above all else."
    },
    "items": [],
    "cta": {
      "label": "Request Private Architecture Demo",
      "href": "/contact"
    }
  },
  "portfolio/impact": {
    "heading": {
      "eyebrow": "CROSS-INDUSTRY EXPERTISE",
      "title": "Delivering Impact Across",
      "highlight": "Diverse Verticals",
      "description": "Our architectural primitives power mission-critical platforms across heavily regulated, high-concurrency industries."
    },
    "items": [
      {
        "name": "FinTech & Payments",
        "stat": "Enterprise",
        "label": "Multi-Currency & High-Throughput Gateways",
        "icon": null
      },
      {
        "name": "HealthTech & Telehealth",
        "stat": "HIPAA-Ready",
        "label": "Patient Portals & Encrypted EHR Workflows",
        "icon": null
      },
      {
        "name": "E-Commerce & Retail",
        "stat": "Sub-Second",
        "label": "High-Conversion Multi-Vendor Architecture",
        "icon": null
      },
      {
        "name": "Supply Chain & Logistics",
        "stat": "Real-Time",
        "label": "Live Telemetry & Fleet Route Optimization",
        "icon": null
      }
    ]
  },
  "portfolio/roi": {
    "heading": {
      "eyebrow": "BUSINESS OUTCOMES",
      "title": "Client ROI &",
      "highlight": "Value Acceleration",
      "description": "We measure our success by the compounding revenue and speed advantages our code delivers to your balance sheet."
    },
    "items": [
      {
        "title": "3.8x Average ROI",
        "desc": "Clients recoup their full engineering investment within an average of 5.4 months post-launch through new ARR.",
        "icon": null
      },
      {
        "title": "60% Faster Time to Market",
        "desc": "Pre-tested architectural foundations cut engineering cycles from 9 months down to 10-12 weeks.",
        "icon": null
      },
      {
        "title": "High-Availability Reliability",
        "desc": "Resilient automated failover configurations protect against unexpected system outages.",
        "icon": null
      },
      {
        "title": "Direct Engineer Access",
        "desc": "Collaborate directly on Slack with the senior engineers building your platform — zero account manager delays.",
        "icon": null
      }
    ]
  },
  "portfolio/timeline": {
    "heading": {
      "eyebrow": "Velocity Track Record",
      "title": "Average Time-to-Production:",
      "highlight": "4 to 12 Weeks",
      "description": "Across our production software releases, here is how our predictable sprint cadence transforms requirements into high-performance platforms."
    },
    "items": [
      {
        "sprint": "Sprint 01-02",
        "duration": "Weeks 1-4",
        "milestone": "Architecture & Interactive Staging MVP",
        "detail": "Database schema migrations, auth endpoints, core business logic, and clickable frontend prototype deployed to preview branch."
      },
      {
        "sprint": "Sprint 03-04",
        "duration": "Weeks 5-8",
        "milestone": "Feature Integration & External APIs",
        "detail": "Stripe/Razorpay billing, 3rd party webhooks, automated email flows, background job workers, and automated test passes."
      },
      {
        "sprint": "Sprint 05-06",
        "duration": "Weeks 9-12",
        "milestone": "Security Hardening & Production Launch",
        "detail": "OWASP penetration test scan, load testing to 10k RPM, DNS switchover, and live launch under 24/7 monitoring."
      }
    ]
  },
  "process/involvement": {
    "heading": {
      "eyebrow": "Founder & Stakeholder Time Investment",
      "title": "What We Need From You:",
      "highlight": "Client Involvement Guide",
      "description": "We respect your time. Our async-first workflows mean you don't sit in endless meetings—just high-leverage decision checkpoints that keep momentum surging."
    },
    "items": [
      {
        "icon": null,
        "commitment": "30 Min / Week",
        "title": "Sprint Planning & Prioritization",
        "desc": "Review sprint goals on Linear, confirm user stories for the upcoming 14 days, and align business priorities with our tech lead."
      },
      {
        "icon": null,
        "commitment": "45 Min / Bi-Weekly",
        "title": "Live Interactive Staging Demo",
        "desc": "Our engineers walk through testable features in live preview environments. You test user journeys, provide feedback, and sign off milestones."
      },
      {
        "icon": null,
        "commitment": "5 Min / Daily (Async)",
        "title": "Slack / WhatsApp Daily Digest",
        "desc": "Read brief bullet-point updates from your dedicated pod: what was merged yesterday, today's targets, and any blocker resolutions."
      },
      {
        "icon": null,
        "commitment": "15 Min / Milestone",
        "title": "Sign-Off & Code Repository Sync",
        "desc": "Review automated test pass reports, inspect PRs, and authorize milestone release with clean Git sync directly to your private org."
      }
    ]
  },
  "process/launch": {
    "heading": {
      "eyebrow": "DAY 0 TO PRODUCTION",
      "title": "Production Launch &",
      "highlight": "30-Day Hypercare",
      "description": "Our relationship doesn't end at deployment. We stand shoulder-to-shoulder with your team during live market launch."
    },
    "items": [
      {
        "title": "Zero-Downtime Blue/Green Deployment",
        "desc": "Traffic switches seamlessly to new container clusters with zero user disruption and instant rollback capabilities."
      },
      {
        "title": "30-Day Dedicated Hypercare Guarantee",
        "desc": "Our senior engineers monitor logs, address user edge-cases, and fix any emerging bugs free of charge for a full month post-launch."
      },
      {
        "title": "DNS & Production SSL Hardening",
        "desc": "Configuration of Cloudflare enterprise WAF, TLS 1.3 certificates, DDoS protection, and automated CDN caching rules."
      },
      {
        "title": "Executive Video & Documentation Handover",
        "desc": "Recorded walkthroughs and architecture runbooks detailing how to manage, scale, and maintain your platform independently."
      }
    ]
  },
  "process/qa": {
    "heading": {
      "eyebrow": "ZERO-DEFECT ARCHITECTURE",
      "title": "Our 4-Stage",
      "highlight": "QA & Testing Pipeline",
      "description": "We don't treat testing as an afterthought. Every sprint is gated by four strict automated and manual quality checks before client demo."
    },
    "items": [
      {
        "gate": "GATE 01",
        "name": "Unit & Logic Tests",
        "desc": "Jest and Vitest coverage validating business logic, state mutations, and edge cases before code merges.",
        "badge": "85%+ Code Coverage"
      },
      {
        "gate": "GATE 02",
        "name": "API & Integration Tests",
        "desc": "Supertest and Postman test collections verifying database transactions, webhook idempotency, and auth tokens.",
        "badge": "Idempotent Endpoints"
      },
      {
        "gate": "GATE 03",
        "name": "E2E User Flow Tests",
        "desc": "Playwright and Cypress automated browser simulations testing onboarding, checkout, and critical customer journeys.",
        "badge": "Cross-Browser Verified"
      },
      {
        "gate": "GATE 04",
        "name": "Stress & Load Testing",
        "desc": "k6 load testing simulating 10,000+ concurrent virtual users to verify zero database deadlocks and sub-second p99 latency.",
        "badge": "10k+ Concurrent Users"
      }
    ]
  },
  "process/release": {
    "heading": {
      "eyebrow": "Production Release Safety",
      "title": "Release & Deployment",
      "highlight": "Playbook",
      "description": "Deploying to production shouldn't be a high-stress event. Our automated pipeline guarantees zero downtime, automated rollbacks, and rock-solid reliability."
    },
    "items": [
      {
        "title": "Blue/Green Zero-Downtime Traffic Ingress",
        "badge": "ZERO PACKET DROP",
        "desc": "New Docker images are stood up in parallel green clusters. Cloudflare and Kubernetes ingress only cut over traffic once health check probes pass 100%."
      },
      {
        "title": "Automated Rollback Circuit Breakers",
        "badge": "< 60 SEC ROLLBACK",
        "desc": "If HTTP 5xx error spikes or latency increases occur within the first 5 minutes post-deploy, automated Datadog webhooks instantly roll back to previous healthy revision."
      },
      {
        "title": "Database Migration Zero-Lock Protocol",
        "badge": "EXPAND / CONTRACT",
        "desc": "All PostgreSQL schema alterations follow the dual-phase expand-and-contract pattern, ensuring backward compatibility with running instances during migrations."
      },
      {
        "title": "Secrets Isolation & Runtime Environment Locks",
        "badge": "VAULT ENCRYPTED",
        "desc": "Zero hardcoded keys. Production secrets are fetched dynamically from AWS Secrets Manager or HashiCorp Vault at container launch with automated key rotation."
      }
    ]
  },
  "process/tooling": {
    "heading": {
      "eyebrow": "DEVELOPER TOOLCHAIN",
      "title": "Our Modern",
      "highlight": "Tooling Ecosystem",
      "description": "We use industry-standard enterprise developer tools to ensure rapid velocity, automated testing, and seamless client collaboration."
    },
    "items": [
      {
        "category": "Sprint Management",
        "tool": "Linear & Jira Software",
        "desc": "Real-time issue tracking, sprint backlogs, and milestone burn-down velocity charts.",
        "icon": null
      },
      {
        "category": "Version Control & CI/CD",
        "tool": "GitHub Actions & GitLab",
        "desc": "Automated test runs, security scans, and preview deployments on every pull request.",
        "icon": null
      },
      {
        "category": "Design Engineering",
        "tool": "Figma & Design Systems",
        "desc": "Tokenized design systems, responsive component libraries, and interactive high-fidelity prototypes.",
        "icon": null
      },
      {
        "category": "Containerization",
        "tool": "Docker & Kubernetes",
        "desc": "Isolated development environments matching staging and production byte-for-byte.",
        "icon": null
      },
      {
        "category": "Error Telemetry",
        "tool": "Sentry & Datadog",
        "desc": "24/7 crash reporting, distributed APM performance tracing, and live memory profiling.",
        "icon": null
      },
      {
        "category": "Security Scanning",
        "tool": "SonarQube & Snyk",
        "desc": "Continuous dependency vulnerability audits and OWASP static code analysis.",
        "icon": null
      }
    ]
  },
  "security/pillars": {
    "heading": {
      "eyebrow": "DEFENSE IN DEPTH",
      "title": "Multi-Layered Security Infrastructure",
      "highlight": "",
      "description": "Every layer of our software lifecycle is hardened against sophisticated attack vectors, unauthorized inspection, and zero-day threats."
    },
    "items": [
      {
        "icon": null,
        "title": "Zero-Trust Data Protection",
        "badge": "DATA ENCRYPTION",
        "description": "All customer records, database shards, and sensitive credentials are encrypted using AES-256-GCM at rest and TLS 1.3 in transit with automated secret rotation.",
        "points": [
          "Row-Level Security (RLS) partition boundaries",
          "Hardware Security Module (HSM) key storage",
          "Zero plaintext password or token logging",
          "Zero cross-tenant data leakage guarantees"
        ]
      },
      {
        "icon": null,
        "title": "Network & Ingress Defense",
        "badge": "DEEP PACKET FIREWALL",
        "description": "Distributed edge proxy with real-time threat signature matching, sliding-window rate limiters, and automated bot vulnerability scanner blocking.",
        "points": [
          "Real-time SQLi, XSS, and Path Traversal filters",
          "Malicious scanner (sqlmap, nikto) auto-drop",
          "Sliding-window IP rate limiting against DoS",
          "CSRF and Origin header cryptographic validation"
        ]
      },
      {
        "icon": null,
        "title": "Regulatory & Compliance Readiness",
        "badge": "GLOBAL STANDARDS",
        "description": "Architectures engineered to align with global healthcare, fintech, and data sovereignty regulatory frameworks.",
        "points": [
          "HIPAA-ready architecture & ABDM-aligned workflows",
          "PCI-DSS–aware tokenized payment gateways",
          "ISO 27001–Aligned Information Security Controls",
          "GDPR & CCPA strict right-to-be-forgotten"
        ]
      },
      {
        "icon": null,
        "title": "Client-Side DevTools Guard",
        "badge": "BROWSER PROTECTION",
        "description": "Continuous in-browser anti-tampering protection shielding user sessions from Self-XSS, prototype pollution, and malicious iframe clickjacking.",
        "points": [
          "Object and Array prototype sealing",
          "Anti-Clickjacking automatic iframe breakout",
          "Memory hygiene clearing runtime credentials",
          "Automated CSP violation telemetry logging"
        ]
      }
    ]
  },
  "services/ai-agents": {
    "heading": {
      "eyebrow": "AI NEURAL WORKFLOWS",
      "title": "Autonomous",
      "highlight": "AI Agents & RAG Systems",
      "description": "Move beyond simple ChatGPT wrappers. We build enterprise-grade intelligence layers with real vector stores, self-hosted models, and structured business task automation."
    },
    "items": [
      {
        "title": "Private Vector Search (RAG)",
        "desc": "Connect your enterprise knowledge base to private embeddings in Pinecone or pgvector with strict semantic caching for sub-50ms retrieval.",
        "badge": "Sub-50ms RAG"
      },
      {
        "title": "Autonomous Multi-Agent Swarms",
        "desc": "LangGraph and CrewAI workflows where specialized agents plan, review code, execute SQL queries, and synthesize executive reports autonomously.",
        "badge": "Autonomous Execution"
      },
      {
        "title": "Grounded AI & Hallucination Mitigation",
        "desc": "Multi-layered citation verification and strict prompt guardrails ensuring AI responses are grounded strictly in your proprietary documentation.",
        "badge": "Citation-Backed"
      },
      {
        "title": "Fine-Tuning & Open-Source LLMs",
        "desc": "Self-hosted DeepSeek-R1, LLaMA-3, and Mistral models deployed on private Kubernetes GPUs for total data sovereignty and zero vendor lock-in.",
        "badge": "On-Prem / Private Cloud"
      }
    ]
  },
  "services/deliverables": {
    "heading": {
      "eyebrow": "Verifiable Artifact Handover",
      "title": "What You Receive:",
      "highlight": "Technical Deliverables Matrix",
      "description": "We don't just deliver a running URL. Every project includes comprehensive production assets, documentation, and architectural artifacts for complete operational autonomy."
    },
    "items": [
      {
        "icon": null,
        "title": "Clean Source Code Repository",
        "badge": "100% OWNERSHIP",
        "desc": "Full Git commit history, strict TypeScript interfaces, and linted modular directory structure transferred directly to your organization GitHub/GitLab."
      },
      {
        "icon": null,
        "title": "Interactive Swagger & Postman Docs",
        "badge": "REST & GRAPHQL",
        "desc": "Comprehensive API endpoints documentation with request/response schemas, JWT auth headers, and mock environments ready for 3rd-party integration."
      },
      {
        "icon": null,
        "title": "Schema Migrations & DB Architecture",
        "badge": "POSTGRESQL / PRISMA",
        "desc": "Version-controlled database migration scripts, ER diagrams, foreign key relationships, indexes, and automated seed scripts for staging and local dev."
      },
      {
        "icon": null,
        "title": "Automated CI/CD Pipeline Configs",
        "badge": "GITHUB ACTIONS",
        "desc": "Production-ready YAML workflows executing automated unit tests, linting, Docker container builds, and zero-downtime deployment triggers."
      },
      {
        "icon": null,
        "title": "Figma Component Design System",
        "badge": "AUTO-LAYOUT & TOKENS",
        "desc": "Organized Figma source file with atomic components, interactive prototypes, dark/light color tokens, typography scales, and responsive variants."
      },
      {
        "icon": null,
        "title": "Security & Vulnerability Audit Report",
        "badge": "OWASP TOP 10",
        "desc": "Automated static analysis (SAST) reports, dependency vulnerability audits (Snyk/Trivy), and zero-trust CORS/headers configuration verify pass."
      }
    ]
  },
  "services/mobile-cloud": {
    "heading": {
      "eyebrow": "Mobile & Cloud Runtime Foundation",
      "title": "High-Performance Mobile &",
      "highlight": "Cloud Infrastructure",
      "description": "Software built to withstand real-world enterprise load. We architect every mobile client and cloud backend for sub-second latency and seamless auto-scaling."
    },
    "items": [
      {
        "category": "Cross-Platform Mobile Engineering",
        "badge": "60 FPS NATIVE FEEL",
        "badgeColor": "text-sky-800 bg-sky-50 border-sky-200",
        "description": "Production iOS and Android apps engineered with React Native and Flutter, featuring offline sync, hardware encryption, biometric authentication, and sub-100ms response times.",
        "capabilities": [
          "Offline-first sync engine with SQLite / WatermelonDB",
          "Biometric authentication (FaceID, TouchID, Android Keystore)",
          "Zero-latency push notifications via Firebase & Apple APNs",
          "Universal design system matching Figma token specifications"
        ],
        "metrics": {
          "label": "App Store Rating Target",
          "val": "4.8+"
        }
      },
      {
        "category": "Cloud Native & DevOps Infrastructure",
        "badge": "ZERO-DOWNTIME SCALE",
        "badgeColor": "text-emerald-800 bg-emerald-50 border-emerald-200",
        "description": "Enterprise-grade infrastructure as code (IaC) with Terraform, automated Kubernetes orchestration, multi-region failover, and automated CI/CD deployment pipelines.",
        "capabilities": [
          "Terraform-managed AWS, GCP & DigitalOcean environments",
          "Kubernetes (EKS/GKE) horizontal pod auto-scaling (HPA)",
          "Zero-trust VPC networks with Cloudflare WAF perimeter",
          "Automated GitHub Actions CI/CD with security scanning"
        ],
        "metrics": {
          "label": "Deployment Uptime SLA",
          "val": "99.99%"
        }
      }
    ]
  },
  "services/pricing-tiers": {
    "heading": {
      "eyebrow": "TRANSPARENT ENGAGEMENT TIERS",
      "title": "Predictable Investment",
      "highlight": "Tiers",
      "description": "No surprise billing, no runaway agency fees. Choose the tier that matches your product maturity."
    },
    "items": [
      {
        "name": "MVP Discovery & Build",
        "cadence": "3-4 Weeks",
        "price": "From $2,800",
        "target": "Early-Stage Startups & Core Flow Validations",
        "features": [
          "Scoped core feature build (1-2 primary user journeys)",
          "Full-stack Next.js web app or React Native MVP",
          "Authentication, relational database & API models",
          "Stripe or Razorpay payment setup",
          "Cloud deployment & 100% source code ownership"
        ],
        "highlight": false
      },
      {
        "name": "Growth Engine",
        "cadence": "6-8 Weeks",
        "price": "From $5,500",
        "target": "Scaling Startups & Revenue SaaS",
        "features": [
          "Multi-tenant PostgreSQL schema isolation",
          "Custom private RAG or LLM agent integration",
          "Granular RBAC and admin telemetry dashboard",
          "Kubernetes or Dockerized CI/CD pipelines",
          "30-day dedicated post-launch hypercare"
        ],
        "highlight": true
      },
      {
        "name": "Enterprise Mesh",
        "cadence": "Dedicated Sprints",
        "price": "Custom Scope",
        "target": "High-Concurrency Scale & Enterprises",
        "features": [
          "Multi-cloud Terraform (AWS, GCP, Cloudflare)",
          "Zero-trust security & SOC2 audit readiness",
          "Dedicated senior engineering pod with daily Slack",
          "High availability architecture with 24/7 telemetry",
          "Direct architect communication & sprint alignment"
        ],
        "highlight": false
      }
    ]
  },
  "services/saas-deep-dive": {
    "heading": {
      "eyebrow": "SAAS ARCHITECTURE MATRIX",
      "title": "Architected for",
      "highlight": "Multi-Tenant Scale",
      "description": "We don't just write frontend wrappers. We engineer deep cloud primitives designed to support millions in monthly recurring revenue without architectural rewrites."
    },
    "items": [
      {
        "icon": null,
        "title": "Isolated PostgreSQL Schema Tenancy",
        "desc": "Every tenant gets dedicated database schema isolation, preventing cross-tenant data leakage with GDPR & HIPAA-ready privacy safeguards.",
        "stat": "Zero Data Leakage"
      },
      {
        "icon": null,
        "title": "Metered Billing & Stripe Webhooks",
        "desc": "Native integration with Stripe Billing, Razorpay, and Lemon Squeezy with automated tier upgrades, invoice generation, and dunning management.",
        "stat": "100% Automated"
      },
      {
        "icon": null,
        "title": "Granular Role-Based Access (RBAC)",
        "desc": "Enterprise SSO (SAML / Okta), Multi-Factor Authentication (MFA), and customizable permission policies for organizations with 1,000+ seats.",
        "stat": "SSO & SAML Ready"
      },
      {
        "icon": null,
        "title": "Sub-20ms Redis Caching Fabric",
        "desc": "Multi-tiered Redis cache invalidation and distributed locking ensure lightning-fast read operations under million-user traffic spikes.",
        "stat": "< 20ms Latency"
      }
    ]
  },
  "services/slas": {
    "heading": {
      "eyebrow": "Incident Response Framework",
      "title": "Production Service Level",
      "highlight": "Agreements (SLAs)",
      "description": "Contractual uptime, round-the-clock monitoring, and strict ticket response times backed by financial remedies and dedicated senior engineers."
    },
    "items": [
      {
        "level": "Severity P1 (Critical Outage)",
        "response": "< 15 Minutes",
        "resolution": "< 4 Hours",
        "color": "border-rose-200 bg-rose-50/70 text-rose-800",
        "description": "Complete platform outage or critical security compromise affecting production traffic."
      },
      {
        "level": "Severity P2 (Major Degradation)",
        "response": "< 1 Hour",
        "resolution": "< 12 Hours",
        "color": "border-amber-200 bg-amber-50/70 text-amber-800",
        "description": "Core features impaired with non-critical workarounds available for end-users."
      },
      {
        "level": "Severity P3 (Minor Defect)",
        "response": "< 4 Hours",
        "resolution": "Next Sprint Release",
        "color": "border-sky-200 bg-sky-50/70 text-sky-800",
        "description": "Cosmetic bugs, non-blocking UI issues, or minor workflow edge-cases."
      },
      {
        "level": "Severity P4 (Feature Enhancement)",
        "response": "< 8 Hours",
        "resolution": "Backlog Prioritized",
        "color": "border-emerald-200 bg-emerald-50/70 text-emerald-800",
        "description": "New component requests, third-party API additions, or optimization ideas."
      }
    ]
  },
  "tech/data": {
    "heading": {
      "eyebrow": "Persistence & Data Flow",
      "title": "Database &",
      "highlight": "Real-Time Data Pipelines",
      "description": "Data integrity without speed bottlenecks. We configure dual-layer persistence engines combining relational guarantees with sub-millisecond edge caching."
    },
    "items": [
      {
        "name": "PostgreSQL & Supabase",
        "role": "Primary Relational Core",
        "badge": "ACID COMPLIANT",
        "desc": "Robust relational data integrity, row-level security (RLS), custom indexing, and pgvector embeddings for hybrid transactional and vector queries."
      },
      {
        "name": "Redis & Upstash",
        "role": "Sub-Millisecond In-Memory Caching",
        "badge": "< 1MS LATENCY",
        "desc": "Session state synchronization, distributed locks, rate-limiting tokens, and lightning-fast edge cache warming for frequent API responses."
      },
      {
        "name": "Pinecone & Qdrant",
        "role": "Vector Search & Semantic RAG",
        "badge": "HIGH-DIMENSIONAL",
        "desc": "Instant cosine-similarity searches across billions of embeddings, powering autonomous AI agent contextual retrieval and enterprise semantic search."
      },
      {
        "name": "ClickHouse & BigQuery",
        "role": "Real-Time Event Analytics",
        "badge": "PETABYTE SCALE",
        "desc": "Columnar database architecture for real-time telemetry processing, financial transaction logs, and analytical user journey queries."
      }
    ]
  },
  "tech/devops": {
    "heading": {
      "eyebrow": "Infrastructure Reliability",
      "title": "DevOps &",
      "highlight": "Cloud Infrastructure",
      "description": "Deployments that scale from 10 to 1,000,000 requests per minute without human intervention. We engineer infrastructure for maximum uptime and minimal cloud cost."
    },
    "items": [
      {
        "title": "Infrastructure as Code (IaC)",
        "tech": "Terraform & Pulumi",
        "desc": "Reproducible multi-environment provisioning (Development, Staging, Production) with version-controlled state files."
      },
      {
        "title": "Container Orchestration",
        "tech": "Docker & AWS ECS / EKS",
        "desc": "Microservice cluster isolation, horizontal auto-scaling triggers based on CPU/RAM metrics, and self-healing pods."
      },
      {
        "title": "Edge Delivery Network & WAF",
        "tech": "Cloudflare Workers & Fastly",
        "desc": "Global CDN asset caching, DDoS mitigation, rate-limiting, and geo-distributed DNS routing with SSL/TLS termination."
      },
      {
        "title": "Observability & APM Telemetry",
        "tech": "Datadog, Sentry & Prometheus",
        "desc": "Real-time error tracking, distributed request tracing, log aggregation, and automated Slack alert escalation."
      }
    ]
  },
  "tech/frontend-backend": {
    "heading": {
      "eyebrow": "FULL-STACK BREAKDOWN",
      "title": "Frontend, Backend &",
      "highlight": "Data Layer Anatomy",
      "description": "Every layer of our application architecture is carefully chosen to ensure optimal developer experience, developer velocity, and runtime reliability."
    },
    "items": [
      {
        "title": "Next.js 16 & React 19 App Router",
        "category": "Frontend Layer",
        "desc": "Server-side rendering (SSR), Streaming Server Components (RSC), and Turbopack for near-instant cold loads and 100/100 Google Lighthouse Core Web Vitals.",
        "tags": [
          "React 19",
          "Server Components",
          "Turbopack",
          "TailwindCSS v4"
        ]
      },
      {
        "title": "Python FastAPI & Go Microservices",
        "category": "Backend Engine",
        "desc": "High-throughput asynchronous APIs capable of handling 50,000+ requests per second with automatic OpenAPI schema generation and native Pydantic validation.",
        "tags": [
          "FastAPI",
          "Go / Golang",
          "gRPC",
          "tRPC"
        ]
      },
      {
        "title": "PostgreSQL & Pinecone Hybrid Storage",
        "category": "Data & Vectors",
        "desc": "Relational ACID transaction safety paired with pgvector and Pinecone serverless indexes for high-speed AI embeddings and semantic search.",
        "tags": [
          "PostgreSQL 17",
          "pgvector",
          "Redis 7",
          "Pinecone"
        ]
      },
      {
        "title": "React Native Fabric & Flutter",
        "category": "Mobile Runtimes",
        "desc": "Universal iOS and Android apps compiled with native C++ bridges, CRDT offline-first data synchronization, and 120 FPS fluid gestures.",
        "tags": [
          "React Native",
          "Flutter",
          "Hermes Engine",
          "SQLite"
        ]
      }
    ]
  },
  "tech/migration": {
    "heading": {
      "eyebrow": "Modernization Roadmap",
      "title": "Legacy Monolith to",
      "highlight": "Modern Stack Migration",
      "description": "Strangled monolith architecture allows you to migrate legacy code incrementally without stopping your daily business operations or risking data loss."
    },
    "items": [
      {
        "from": "Legacy PHP / WordPress / Drupal",
        "to": "Next.js App Router + Headless CMS / Go API",
        "benefits": "10x faster page loads, headless flexibility, zero plugin vulnerability exploits."
      },
      {
        "from": "Monolithic Django / Rails API",
        "to": "Modular Microservices & FastAPI / Node TypeScript",
        "benefits": "Sub-50ms API response times, horizontal worker scaling, strict type-safety."
      },
      {
        "from": "Slow WebViews / Hybrid Apps",
        "to": "Native 60 FPS React Native / Flutter",
        "benefits": "Silky smooth gestures, native hardware access, unified codebase across iOS & Android."
      },
      {
        "from": "On-Premises Dedicated Servers",
        "to": "Containerized AWS / GCP Kubernetes & Terraform",
        "benefits": "Elastic auto-scaling, disaster recovery failover, reduced infrastructure management overhead."
      }
    ]
  },
  "tech/philosophy": {
    "heading": {
      "eyebrow": "ARCHITECTURAL PRINCIPLES",
      "title": "How We Architect for",
      "highlight": "Decade-Long Durability",
      "description": "Technology fads come and go. We build systems on bedrock engineering principles designed to scale gracefully from 1,000 to 10,000,000 users."
    },
    "items": [
      {
        "title": "End-to-End Type Safety",
        "desc": "TypeScript strict mode from the database schema (Drizzle/Prisma) through the API layer (tRPC/FastAPI) to the UI components. Zero runtime undefined errors.",
        "icon": null
      },
      {
        "title": "Edge Compute & Serverless First",
        "desc": "We leverage edge CDN nodes across 300+ global points of presence to execute compute closest to your users, driving p95 response times under 40ms.",
        "icon": null
      },
      {
        "title": "Stateless Microservices",
        "desc": "Core business logic is isolated into lightweight, auto-scaling stateless services with Docker and Kubernetes, backed by persistent distributed databases.",
        "icon": null
      },
      {
        "title": "Zero Vendor Lock-In",
        "desc": "All frameworks used (Next.js, FastAPI, PostgreSQL, Docker) are open-source and portable. You can host on AWS, GCP, Azure, or bare metal without rewriting code.",
        "icon": null
      }
    ]
  },
  "tech/security": {
    "heading": {
      "eyebrow": "Zero-Trust Hardening",
      "title": "Security &",
      "highlight": "Encryption Stack",
      "description": "Security isn't an afterthought. Every layer of our stack is hardened against modern attack vectors from Day 1."
    },
    "items": [
      {
        "icon": null,
        "title": "AES-256 & TLS 1.3 Encryption",
        "detail": "Hardware-level encryption for all database volumes, S3 storage buckets, and end-to-end TLS 1.3 socket cipher enforcement."
      },
      {
        "icon": null,
        "title": "Zero-Trust Auth & OAuth2 / OIDC",
        "detail": "Stateless JWT tokens with short expiration windows, refresh token rotation, and multi-factor biometric authentication options."
      },
      {
        "icon": null,
        "title": "Automated SAST & Dependency Auditing",
        "detail": "GitHub Actions integrated with Snyk, Trivy, and SonarQube to block merge requests that introduce CVE security vulnerabilities."
      },
      {
        "icon": null,
        "title": "OWASP Top 10 Hardened Headers",
        "detail": "Configured Content Security Policy (CSP), HSTS preloading, XSS sanitization, and parameterized SQL queries preventing injection attacks."
      }
    ]
  },
  "testimonials/map": {
    "heading": {
      "eyebrow": "Worldwide Reach",
      "title": "Trusted Across 15+ Nations:",
      "highlight": "Global Client Footprint",
      "description": "We operate seamlessly across Pacific, Eastern, GMT, GST, and IST time zones with structured async workflows and dedicated overlaps."
    },
    "items": [
      {
        "region": "North America (US & Canada)",
        "clients": "22+ Deployments",
        "hubs": "San Francisco, New York, Austin, Toronto",
        "focus": "AI SaaS, FinTech, Web3 Protocols"
      },
      {
        "region": "United Kingdom & Europe",
        "clients": "14+ Deployments",
        "hubs": "London, Berlin, Amsterdam, Zurich",
        "focus": "GDPR Enterprise Platforms, HealthTech"
      },
      {
        "region": "Middle East (GCC & UAE)",
        "clients": "8+ Deployments",
        "hubs": "Dubai, Abu Dhabi, Riyadh",
        "focus": "E-Commerce, Government Portals, Logistics"
      },
      {
        "region": "Asia Pacific & India",
        "clients": "12+ Deployments",
        "hubs": "Singapore, Bengaluru, Mumbai",
        "focus": "High-Concurrency Mobile Apps, Quick Commerce"
      }
    ]
  },
  "testimonials/nps": {
    "heading": {
      "eyebrow": "Audited Client Feedback",
      "title": "Institutional Net Promoter Score:",
      "highlight": "98.4 NPS",
      "description": "Software engineering agencies typically average 35-45 NPS. Our relentless dedication to clean code and predictable delivery places us in the top 1% globally."
    },
    "items": [
      {
        "category": "Architectural Caliber & Code Cleanliness",
        "score": "99.2%"
      },
      {
        "category": "Adherence to Sprint Deadlines",
        "score": "98.4%"
      },
      {
        "category": "Communication Transparency & Responsiveness",
        "score": "99.8%"
      },
      {
        "category": "Post-Launch Hypercare Support",
        "score": "97.6%"
      }
    ]
  },
  "testimonials/outcomes": {
    "heading": {
      "eyebrow": "ENGINEERING IMPACT",
      "title": "Transforming Workflows:",
      "highlight": "Architecture Outcomes",
      "description": "Here is how our modern engineering implementations solved core operational bottlenecks and performance limits for our clients."
    },
    "items": [
      {
        "company": "FleetWave Logistics",
        "before": "Legacy manual spreadsheets, delayed dispatch, driver churn.",
        "after": "Automated real-time dispatch dashboard with sub-second GPS tracking.",
        "stat": "High-Throughput",
        "statDetail": "Automated dispatch across multi-state fleets"
      },
      {
        "company": "MediFlow EHR",
        "before": "Non-compliant legacy database with slow patient record retrieval.",
        "after": "HIPAA-hardened cloud architecture with sub-50ms search index.",
        "stat": "4.2x Faster",
        "statDetail": "Saved doctors 12 hours/week in data entry"
      },
      {
        "company": "FinPulse Global",
        "before": "Fragile monolithic payment code with frequent cart drop-offs.",
        "after": "Fault-tolerant Next.js & Stripe multi-currency checkout engine.",
        "stat": "High-Availability",
        "statDetail": "Consistent reliable payment flows"
      }
    ]
  },
  "testimonials/reference-calls": {
    "heading": {
      "eyebrow": "Direct Founder Verification",
      "title": "Request a 1-on-1 Confidential Client Reference Call",
      "highlight": "",
      "description": "Evaluating a major enterprise contract or $25k+ development sprint? We are pleased to connect you directly with existing founders and CTOs who have scaled their platforms with our engineering pods."
    },
    "items": [],
    "cta": {
      "label": "Schedule Reference Call",
      "href": "/contact"
    }
  },
  "testimonials/spotlights": {
    "heading": {
      "eyebrow": "Executive Testimonials",
      "title": "Founder & CTO",
      "highlight": "Video & Case Spotlights",
      "description": "Hear directly from technical decision-makers why they trust Divanex with their mission-critical software codebases."
    },
    "items": [
      {
        "author": "Marcus Vance",
        "role": "CTO, CloudScale Inc (San Francisco, CA)",
        "quote": "Divanex took over our stalled Kubernetes migration and delivered it 3 weeks ahead of schedule. Their architectural discipline is unmatched.",
        "badge": "VERIFIED CTO REVIEW"
      },
      {
        "author": "Elena Rostova",
        "role": "Founder, MedSync AI (London, UK)",
        "quote": "The autonomous RAG agent they built increased our clinical query speed by 400%. They are true senior engineering partners.",
        "badge": "VERIFIED FOUNDER REVIEW"
      }
    ]
  },
  "testimonials/verification": {
    "heading": {
      "eyebrow": "Independent Verification",
      "title": "Third-Party Verified",
      "highlight": "Industry Accolades",
      "description": "Don't just take our word for it. Independent B2B review portals consistently rank Divanex among the top software engineering teams globally."
    },
    "items": [
      {
        "platform": "Clutch Global Leader",
        "rating": "4.9 / 5.0",
        "reviews": "38 Verified Reviews"
      },
      {
        "platform": "Google Verified Partner",
        "rating": "5.0 / 5.0",
        "reviews": "52 Reviews"
      },
      {
        "platform": "GoodFirms Top Custom Software",
        "rating": "4.95 / 5.0",
        "reviews": "29 Verified Reviews"
      },
      {
        "platform": "G2 High Performer 2025",
        "rating": "4.9 / 5.0",
        "reviews": "Enterprise Software"
      }
    ]
  },
  "why-us/communication": {
    "heading": {
      "eyebrow": "TALKING TO US // DAY TO DAY",
      "title": "How You Will Actually",
      "highlight": "Reach Us",
      "description": "Most project problems are communication problems wearing a technical disguise. This is the arrangement we have settled on after a few of them."
    },
    "items": [
      {
        "icon": null,
        "title": "One Shared Channel",
        "desc": "A Slack or WhatsApp group with you and the engineers in it. No forwarding, no account manager summarising what a developer said.",
        "badge": "Direct to the team"
      },
      {
        "icon": null,
        "title": "A Call Every Two Weeks",
        "desc": "Half an hour, screen shared, current build open. You click through it yourself and tell us what feels wrong while it is still cheap to change.",
        "badge": "Every 2 weeks"
      },
      {
        "icon": null,
        "title": "Overlapping Hours",
        "desc": "We work Indian hours and hold the later part of the day for clients in the Gulf, UK and US. There is always a window where you can reach a person.",
        "badge": "Shared window daily"
      },
      {
        "icon": null,
        "title": "Same-Day Replies In Working Hours",
        "desc": "Not fifteen minutes — we will not pretend to that. Within the working day, and within the hour if something is actually on fire.",
        "badge": "Same working day"
      }
    ]
  },
  "why-us/comparison": {
    "heading": {
      "eyebrow": "THE HONEST COMPARISON",
      "title": "Us, an Agency, or a",
      "highlight": "Freelancer",
      "description": "All three models can work depending on your stage. Here is an honest look across team seniority, code ownership, progress transparency, and long-term support."
    },
    "items": [
      {
        "vector": "Senior engineers",
        "freelancers": "Single developer working solo, without peer code reviews",
        "agencies": "Assigned from available bench, often juniors behind an account manager",
        "divanex": "Senior full-stack engineers and architects who design and write the code directly"
      },
      {
        "vector": "100% Code ownership",
        "freelancers": "Usually yours, provided repo and cloud credentials are fully handed over",
        "agencies": "Proprietary agency frameworks, locked hosting, or restrictive IP clauses",
        "divanex": "Day-1 repository access in your Git org & cloud accounts with full IP rights"
      },
      {
        "vector": "Progress & transparency",
        "freelancers": "Varies widely; updates can stall when juggling multiple client gigs",
        "agencies": "Monthly slide deck status reports, with actual software shown near deadline",
        "divanex": "Fortnightly clickable staging builds, recorded video walkthroughs & direct Slack pod"
      },
      {
        "vector": "Post-launch support",
        "freelancers": "Often unavailable once committed to subsequent freelance engagements",
        "agencies": "Expensive monthly retainers and multi-day ticket queues",
        "divanex": "Same engineering team provides hypercare, uptime monitoring & quick bug fixes"
      }
    ]
  },
  "why-us/culture": {
    "heading": {
      "eyebrow": "HOW WE WORK // INSIDE THE TEAM",
      "title": "Who Actually",
      "highlight": "Writes Your Code",
      "description": "Software is a craft with boring, unglamorous standards behind it. We would rather ship something maintainable in week nine than something impressive in week three that nobody can change afterwards."
    },
    "items": [
      {
        "title": "The Same People You Met",
        "desc": "The engineers in your first call are the ones on the project. Nobody gets swapped for a cheaper pair of hands once the contract is signed."
      },
      {
        "title": "You Can Look At Anything",
        "desc": "Pull requests, review comments, the issue board — open to you throughout. When something is going badly you will see it in the same week we do."
      },
      {
        "title": "Nothing Merges Unreviewed",
        "desc": "Every change is read by a second engineer before it reaches staging. It slows us down slightly and it catches the bugs that are expensive later."
      }
    ]
  },
  "why-us/guarantees": {
    "heading": {
      "eyebrow": "WHAT WE COMMIT TO",
      "title": "What Happens",
      "highlight": "If We Get It Wrong",
      "description": "Anyone can promise things will go well. These are the commitments that only matter when they do not."
    },
    "items": [
      {
        "icon": null,
        "title": "The First Milestone Is On Us If It Misses",
        "desc": "If the first two-week block does not deliver what the scope said, we rework it at our cost until it does. You are not paying us to learn your domain."
      },
      {
        "icon": null,
        "title": "Delays That Are Ours, We Absorb",
        "desc": "Late because we misjudged the work: we cover catching up. Late because scope changed or we were waiting on a decision: we will have said so in writing when it happened."
      },
      {
        "icon": null,
        "title": "A Month Of Fixes After Launch, Free",
        "desc": "The first month live is when the real bugs surface. Anything broken that we built gets fixed at no charge for thirty days, no argument about whose fault it is."
      },
      {
        "icon": null,
        "title": "The Price Does Not Move On Its Own",
        "desc": "Once a milestone is agreed the number is fixed. If something turns out harder than we thought, that is our misjudgement to absorb, not a change order you discover on the invoice."
      }
    ]
  },
  "why-us/ownership": {
    "heading": {
      "eyebrow": "OWNERSHIP // NO STRINGS",
      "title": "You Own It,",
      "highlight": "Not Us",
      "description": "Plenty of agencies keep the code on their servers, or build on something only they understand. It is a quiet way of making sure you cannot leave. Nothing here works like that."
    },
    "items": [
      {
        "icon": null,
        "title": "The Repository Is Yours From Week One",
        "desc": "Code goes into your GitHub organisation from the first commit, not handed over at the end. You can read it, clone it, or bring in another team at any point without asking us."
      },
      {
        "icon": null,
        "title": "Nothing Only We Can Maintain",
        "desc": "Standard frameworks, ordinary patterns, comments where the reasoning is not obvious. Any competent developer should be able to open it and get to work without a handover call."
      },
      {
        "icon": null,
        "title": "The Cloud Accounts Are In Your Name",
        "desc": "AWS, Vercel, Supabase — all created under your organisation with us added as collaborators. Remove our access and everything keeps running."
      },
      {
        "icon": null,
        "title": "Put In Writing, Not Just Promised",
        "desc": "The contract assigns copyright and everything else to your company on payment. If it is not written down it does not count, so we write it down."
      }
    ]
  },
  "why-us/retention": {
    "heading": {
      "eyebrow": "WHAT HAPPENS AFTERWARDS",
      "title": "Most Clients",
      "highlight": "Come Back",
      "description": "The honest measure of an engineering team is not the launch. It is whether anyone wants to work with them again once they have seen how the project really went."
    },
    "items": [
      {
        "value": "96%",
        "label": "Came back for more work",
        "desc": "A second phase, a new product, or an ongoing arrangement to keep the first one healthy."
      },
      {
        "value": "18+ mo",
        "label": "Typical length of a relationship",
        "desc": "Most engagements do not end at handover. They turn into a smaller, steadier amount of work."
      },
      {
        "value": "84%",
        "label": "Arrived through a recommendation",
        "desc": "Most new projects come from someone we already built for telling someone else."
      },
      {
        "value": "0",
        "label": "Clients locked in",
        "desc": "Nobody stays because leaving would be difficult. The repository and the accounts are theirs the whole time."
      }
    ]
  }
};
