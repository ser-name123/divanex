export interface ProjectInstallment {
  id: string;
  milestoneNumber: number;
  title: string;
  amount: number;
  currency: string;
  percentage: number;
  dueDate: string;
  status: "paid" | "due" | "upcoming" | "overdue";
  paidAt?: string;
  invoiceNumber?: string;
  invoiceUrl?: string;
  paymentMethod?: string;
  transactionRef?: string;
  notes?: string;
  deliverablesSummary?: string;
  releaseRequestedAt?: string;
  releaseStatus?: "none" | "pending_client_approval" | "approved" | "revision_requested";
  releaseNotes?: string;
  stagingLink?: string;
  testCoveragePercent?: number;
  assignedEngineer?: string;
}

export interface ProjectDocument {
  id: string;
  title: string;
  category: "prd" | "architecture" | "design" | "deliverable" | "contract" | "asset" | "invoice" | "other";
  fileName: string;
  fileSize: string;
  fileType?: "pdf" | "figma" | "zip" | "docx" | "image" | "code";
  version?: string;
  tags?: string[];
  uploadedBy: "admin" | "client";
  uploadedAt: string;
  url?: string;
  fileData?: string;
  description?: string;
}

export interface ProjectFeedback {
  id: string;
  type: "approval" | "revision" | "feedback" | "bug";
  milestoneOrPhase: string;
  rating: number;
  message: string;
  submittedAt: string;
  clientName: string;
  status: "pending" | "reviewed" | "resolved";
  adminReply?: string;
  replyAt?: string;
}

export interface ProjectDeliverableLink {
  id: string;
  title: string;
  url: string;
  category: "staging" | "production" | "figma" | "github" | "docs" | "other";
  description?: string;
}

export interface AdminProjectSprint {
  id: string;
  clientId?: string;
  projectName: string;
  clientName: string;
  clientEmail?: string;
  clientPhone?: string;
  description?: string;
  /** Proposed delivery window, as submitted by the client. */
  timelineWeeks?: number;
  serviceCategory: string;
  currentPhase: number;
  phaseName: string;
  progressPercent: number;
  startDate: string;
  targetHandover: string;
  assignedLead: string;
  contractValue: string;
  totalBudget?: number;
  currency?: string;
  paidEscrowValue?: string;
  priority: "urgent" | "high" | "normal";
  status: "active" | "in_review" | "completed" | "on_hold";
  repoUrl?: string;
  stagingUrl?: string;
  productionUrl?: string;
  figmaUrl?: string;
  apiDocsUrl?: string;
  techStack?: string[];
  cloudProvider?: string;
  targetPlatforms?: string[];
  complianceStandards?: string[];
  thirdPartyIntegrations?: string;
  referenceProducts?: string;
  referenceWebsites?: Array<{ url: string; description?: string }>;
  customMilestonesNote?: string;
  internalNotes?: string;
  teamMembers?: string[];
  handoverChecklist: {
    item: string;
    completed: boolean;
  }[];
  installments?: ProjectInstallment[];
  documents?: ProjectDocument[];
  feedbacks?: ProjectFeedback[];
  deliverables?: ProjectDeliverableLink[];
  proposalStatus?: "submitted" | "proposal_sent" | "accepted" | "revision_requested";
  proposalDetails?: {
    sentAt?: string;
    proposedBudget?: number;
    currency?: string;
    proposedTimelineWeeks?: number;
    scopeSummary?: string;
    deliverables?: string[];
    sowDocUrl?: string;
    adminNotes?: string;
  };
  proposalRevisions?: Array<{
    id: string;
    requestedAt: string;
    message: string;
    status: "pending" | "reviewed" | "resolved";
    adminResponse?: string;
  }>;
}

export interface AdminSystemLog {
  id: string;
  timestamp: string;
  level: "info" | "warn" | "error";
  service: string;
  message: string;
  latencyMs?: number;
  ipAddress: string;
}

export interface AdminServiceConfig {
  id: string;
  name: string;
  slug: string;
  active: boolean;
  mvpPrice: string;
  scalePrice: string;
  enterprisePrice: string;
  sprintDuration: string;
  slaUptime: string;
  leadCountThisMonth: number;
}

export const initialAdminProjects: AdminProjectSprint[] = [];

export const initialAdminLogs: AdminSystemLog[] = [
  {
    id: "log-901",
    timestamp: "18:59:12 UTC",
    level: "info",
    service: "auth-gateway",
    message: "Admin authentication token validated. Session initialized for UID_SUPERADMIN_01.",
    latencyMs: 14,
    ipAddress: "152.58.12.44"
  },
  {
    id: "log-902",
    timestamp: "18:58:45 UTC",
    level: "info",
    service: "edge-router",
    message: "Incoming traffic dispatched across 3 regions: US-East (12ms), EU-Central (24ms), AP-South (4ms).",
    latencyMs: 6,
    ipAddress: "104.28.14.99"
  },
  {
    id: "log-903",
    timestamp: "18:56:02 UTC",
    level: "warn",
    service: "database-pool",
    message: "PostgreSQL connection pool reached 78% capacity under concurrent analytics query spike.",
    latencyMs: 38,
    ipAddress: "10.0.4.12"
  },
  {
    id: "log-905",
    timestamp: "18:49:33 UTC",
    level: "error",
    service: "webhook-listener",
    message: "Transient timeout on external Slack notifications webhook. Auto-retried and resolved in 820ms.",
    latencyMs: 820,
    ipAddress: "54.192.88.1"
  }
];

export const initialAdminServices: AdminServiceConfig[] = [
  {
    id: "hospital-healthcare-management",
    name: "Hospital HMIS & Healthcare Systems",
    slug: "hospital-healthcare-management",
    active: true,
    mvpPrice: "$6,500 - $11,000",
    scalePrice: "$14,000 - $26,000",
    enterprisePrice: "$30,000 - $60,000+",
    sprintDuration: "4 - 14 Weeks",
    slaUptime: "HIPAA / ABDM Ready",
    leadCountThisMonth: 14
  },
  {
    id: "enterprise-erp-systems",
    name: "Enterprise ERP & Supply Chain Core",
    slug: "enterprise-erp-systems",
    active: true,
    mvpPrice: "$12,000 - $22,000",
    scalePrice: "$24,000 - $45,000",
    enterprisePrice: "$50,000 - $90,000+",
    sprintDuration: "6 - 18 Weeks",
    slaUptime: "99.99%",
    leadCountThisMonth: 18
  },
  {
    id: "fintech-banking-solutions",
    name: "Fintech, Digital Banking & Payment Rails",
    slug: "fintech-banking-solutions",
    active: true,
    mvpPrice: "$8,500 - $15,000",
    scalePrice: "$18,000 - $35,000",
    enterprisePrice: "$40,000 - $80,000+",
    sprintDuration: "4 - 14 Weeks",
    slaUptime: "PCI-DSS Level 1",
    leadCountThisMonth: 16
  },
  {
    id: "custom-crm-automation",
    name: "Custom CRM & Omnichannel Sales Engine",
    slug: "custom-crm-automation",
    active: true,
    mvpPrice: "$5,500 - $9,500",
    scalePrice: "$12,000 - $22,000",
    enterprisePrice: "$26,000 - $48,000+",
    sprintDuration: "3 - 12 Weeks",
    slaUptime: "99.95%",
    leadCountThisMonth: 21
  },
  {
    id: "ecommerce-marketplace-platforms",
    name: "Multi-Vendor Marketplace & Commerce",
    slug: "ecommerce-marketplace-platforms",
    active: true,
    mvpPrice: "$7,500 - $14,000",
    scalePrice: "$18,000 - $32,000",
    enterprisePrice: "$38,000 - $70,000+",
    sprintDuration: "4 - 14 Weeks",
    slaUptime: "99.99%",
    leadCountThisMonth: 19
  },
  {
    id: "edtech-learning-management",
    name: "EdTech, School ERP & LMS Platforms",
    slug: "edtech-learning-management",
    active: true,
    mvpPrice: "$6,000 - $11,000",
    scalePrice: "$14,000 - $28,000",
    enterprisePrice: "$32,000 - $65,000+",
    sprintDuration: "4 - 14 Weeks",
    slaUptime: "99.95%",
    leadCountThisMonth: 11
  },
  {
    id: "saas-development",
    name: "SaaS Development & Multi-Tenancy",
    slug: "saas-development",
    active: true,
    mvpPrice: "$4,500 - $7,500",
    scalePrice: "$8,500 - $14,000",
    enterprisePrice: "$16,000 - $30,000+",
    sprintDuration: "4 - 12 Weeks",
    slaUptime: "99.999%",
    leadCountThisMonth: 12
  },
  {
    id: "web-app-development",
    name: "Web & Cross-Platform Mobile Apps",
    slug: "web-app-development",
    active: true,
    mvpPrice: "$3,500 - $6,000",
    scalePrice: "$7,000 - $12,000",
    enterprisePrice: "$14,000 - $25,000+",
    sprintDuration: "4 - 10 Weeks",
    slaUptime: "99.95%",
    leadCountThisMonth: 9
  },
  {
    id: "ai-solutions-automation",
    name: "Autonomous AI Agents & Vector RAG",
    slug: "ai-solutions-automation",
    active: true,
    mvpPrice: "$5,000 - $8,500",
    scalePrice: "$9,500 - $16,000",
    enterprisePrice: "$18,000 - $35,000+",
    sprintDuration: "3 - 8 Weeks",
    slaUptime: "99.99%",
    leadCountThisMonth: 15
  },
  {
    id: "seo-digital-growth",
    name: "Technical SEO & Programmatic Growth",
    slug: "seo-digital-growth",
    active: true,
    mvpPrice: "$2,500 - $4,500/mo",
    scalePrice: "$5,000 - $9,000/mo",
    enterprisePrice: "$10,000 - $18,000/mo",
    sprintDuration: "Continuous Retainer",
    slaUptime: "100/100 CWV",
    leadCountThisMonth: 8
  },
  {
    id: "ui-ux-design",
    name: "UI/UX Product Design Systems",
    slug: "ui-ux-design",
    active: true,
    mvpPrice: "$2,800 - $5,000",
    scalePrice: "$5,500 - $9,500",
    enterprisePrice: "$11,000 - $20,000+",
    sprintDuration: "2 - 6 Weeks",
    slaUptime: "Figma Tokenized",
    leadCountThisMonth: 6
  },
  {
    id: "cloud-devops",
    name: "Cloud DevOps & Kubernetes Infra",
    slug: "cloud-devops",
    active: true,
    mvpPrice: "$3,800 - $6,500",
    scalePrice: "$7,500 - $13,000",
    enterprisePrice: "$15,000 - $28,000+",
    sprintDuration: "2 - 6 Weeks",
    slaUptime: "99.999%",
    leadCountThisMonth: 7
  }
];
