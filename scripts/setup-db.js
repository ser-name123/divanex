const { Client } = require("pg");
const fs = require("fs");
const path = require("path");

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  console.error(
    "DATABASE_URL is not set. Export it (or put it in .env.local and run with --env-file=.env.local) before running this script."
  );
  process.exit(1);
}

async function setup() {
  // Verify the server certificate against Supabase's own CA.
  //
  // The connection pooler presents a chain rooted at "Supabase Root 2021 CA",
  // which is not in Node's default trust store — so plain verification fails
  // with SELF_SIGNED_CERT_IN_CHAIN. The fix is to trust that one root, not to
  // set rejectUnauthorized:false, which would accept any certificate at all and
  // hand the database connection to anyone able to intercept it.
  const caPath = path.join(__dirname, "supabase-ca.crt");
  const ssl = fs.existsSync(caPath)
    ? { rejectUnauthorized: true, ca: fs.readFileSync(caPath, "utf8") }
    : { rejectUnauthorized: true };

  const client = new Client({ connectionString, ssl });

  try {
    console.log("Connecting to Supabase PostgreSQL database...");
    await client.connect();
    console.log("Connected successfully!");

    // 1. Create Tables
    console.log("Creating database schema...");

    await client.query(`
      -- 1. LEADS TABLE
      CREATE TABLE IF NOT EXISTS leads (
        id TEXT PRIMARY KEY,
        client_name TEXT NOT NULL,
        company_name TEXT NOT NULL,
        email TEXT NOT NULL,
        phone TEXT,
        service_requested TEXT NOT NULL,
        budget_range TEXT NOT NULL,
        timeline TEXT NOT NULL,
        status TEXT NOT NULL DEFAULT 'new',
        priority TEXT NOT NULL DEFAULT 'normal',
        created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
        message TEXT NOT NULL,
        internal_notes TEXT DEFAULT '',
        assigned_architect TEXT DEFAULT 'Rajan S. (Lead Solutions Architect)'
      );

      -- 2. ESTIMATES TABLE
      CREATE TABLE IF NOT EXISTS estimates (
        id TEXT PRIMARY KEY,
        client_name TEXT NOT NULL,
        company_name TEXT NOT NULL,
        email TEXT NOT NULL,
        selected_tier TEXT NOT NULL,
        tier_name TEXT NOT NULL,
        base_price NUMERIC NOT NULL,
        calculated_price TEXT NOT NULL,
        estimated_weeks TEXT NOT NULL,
        selected_features JSONB DEFAULT '[]'::jsonb,
        submission_date TIMESTAMPTZ NOT NULL DEFAULT now(),
        status TEXT NOT NULL DEFAULT 'pending_review'
      );

      -- 3. PROJECTS TABLE
      CREATE TABLE IF NOT EXISTS projects (
        id TEXT PRIMARY KEY,
        project_name TEXT NOT NULL,
        client_name TEXT NOT NULL,
        client_email TEXT,
        client_phone TEXT,
        service_category TEXT NOT NULL,
        current_phase INT NOT NULL DEFAULT 1,
        phase_name TEXT NOT NULL,
        progress_percent INT NOT NULL DEFAULT 0,
        start_date TEXT NOT NULL,
        target_handover TEXT NOT NULL,
        assigned_lead TEXT NOT NULL,
        contract_value TEXT NOT NULL,
        paid_escrow_value TEXT,
        priority TEXT NOT NULL DEFAULT 'normal',
        status TEXT NOT NULL DEFAULT 'active',
        repo_url TEXT,
        staging_url TEXT,
        internal_notes TEXT,
        team_members JSONB DEFAULT '[]'::jsonb,
        handover_checklist JSONB NOT NULL DEFAULT '[]'::jsonb,
        created_at TIMESTAMPTZ NOT NULL DEFAULT now()
      );

      -- 4. SERVICES TABLE
      CREATE TABLE IF NOT EXISTS services (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        slug TEXT UNIQUE NOT NULL,
        active BOOLEAN NOT NULL DEFAULT true,
        mvp_price TEXT NOT NULL,
        scale_price TEXT NOT NULL,
        enterprise_price TEXT NOT NULL,
        sprint_duration TEXT NOT NULL,
        sla_uptime TEXT NOT NULL,
        lead_count_this_month INT NOT NULL DEFAULT 0,
        updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
      );

      -- 5. SYSTEM LOGS TABLE
      CREATE TABLE IF NOT EXISTS system_logs (
        id TEXT PRIMARY KEY,
        timestamp TEXT NOT NULL,
        level TEXT NOT NULL,
        service TEXT NOT NULL,
        message TEXT NOT NULL,
        latency_ms INT DEFAULT 12,
        ip_address TEXT DEFAULT '127.0.0.1',
        created_at TIMESTAMPTZ NOT NULL DEFAULT now()
      );
    `);

    // Site-wide settings, including everything the SEO layer reads. A single
    // row holding a JSONB document, so adding a field never needs a migration.
    await client.query(`
      CREATE TABLE IF NOT EXISTS site_settings (
        id TEXT PRIMARY KEY,
        payload JSONB NOT NULL,
        updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
      );
    `);

    // Admin-editable site content: one row per collection, payload as JSONB.
    // Adding a collection needs no migration.
    await client.query(`
      CREATE TABLE IF NOT EXISTS site_content (
        id TEXT PRIMARY KEY,
        payload JSONB NOT NULL,
        updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
      );
    `);

    // Live chat transcripts.
    //
    // These lived in os.tmpdir() and in each admin's own localStorage, which
    // meant a deleted conversation came back on the next sync from whichever
    // browser still had a copy, and a container restart lost real transcripts.
    await client.query(`
      CREATE TABLE IF NOT EXISTS chat_sessions (
        id TEXT PRIMARY KEY,
        payload JSONB NOT NULL,
        updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
      );
      CREATE INDEX IF NOT EXISTS chat_sessions_updated_at_idx
        ON chat_sessions (updated_at DESC);
    `);

    // Newsletter subscribers.
    //
    // The footer and blog signup forms used to set a "subscribed!" flag in
    // React state and do nothing else — no request, no row, no record. Every
    // address anyone ever entered was discarded the moment the page changed.
    await client.query(`
      CREATE TABLE IF NOT EXISTS subscribers (
        id TEXT PRIMARY KEY,
        email TEXT NOT NULL UNIQUE,
        name TEXT,
        source TEXT NOT NULL DEFAULT 'website',
        status TEXT NOT NULL DEFAULT 'subscribed',
        ip_address TEXT,
        created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
        unsubscribed_at TIMESTAMPTZ
      );
      CREATE INDEX IF NOT EXISTS subscribers_created_at_idx
        ON subscribers (created_at DESC);
    `);

    console.log("Tables created successfully!");

    // 1b. Lock every table down with Row Level Security.
    //
    // RLS is enabled with NO policies, which denies all access to the `anon` and
    // `authenticated` roles. The anon key is public (it ships in the browser
    // bundle), so without this anyone could read and write these tables
    // directly. The app's route handlers use the service-role key, which
    // bypasses RLS by design.
    console.log("Enabling Row Level Security...");

    const TABLES = ["leads", "estimates", "projects", "services", "system_logs", "site_settings", "site_content", "chat_sessions", "subscribers"];

    for (const table of TABLES) {
      await client.query(`ALTER TABLE ${table} ENABLE ROW LEVEL SECURITY;`);
      // FORCE also applies RLS to the table owner, so a compromised owner
      // connection cannot read around it either.
      await client.query(`ALTER TABLE ${table} FORCE ROW LEVEL SECURITY;`);
      // Revoke the blanket grants Supabase gives these roles on new tables.
      await client.query(`REVOKE ALL ON ${table} FROM anon, authenticated;`);
    }

    console.log("Row Level Security enabled on all tables (no public policies).");

    // 1c. Indexes for the ordering the API routes actually use.
    console.log("Creating indexes...");
    await client.query(`
      CREATE INDEX IF NOT EXISTS leads_created_at_idx ON leads (created_at DESC);
      CREATE INDEX IF NOT EXISTS estimates_submission_date_idx ON estimates (submission_date DESC);
      CREATE INDEX IF NOT EXISTS projects_created_at_idx ON projects (created_at DESC);
      CREATE INDEX IF NOT EXISTS system_logs_created_at_idx ON system_logs (created_at DESC);
    `);
    console.log("Indexes created.");

    // 2. Check and Seed Leads
    const leadsCount = await client.query("SELECT COUNT(*) FROM leads;");
    if (parseInt(leadsCount.rows[0].count, 10) === 0) {
      console.log("Seeding initial enterprise leads...");
      const sampleLeads = [
        [
          "lead-101",
          "David Vance",
          "Hyperion Capital Partners",
          "dvance@hyperioncap.io",
          "+1 (415) 890-2341",
          "SaaS Development & Multi-Tenancy",
          "$20,000 - $35,000",
          "6 - 8 Weeks",
          "new",
          "urgent",
          "We need an institutional-grade multi-tenant platform for managing 4,000 corporate investment portfolios with isolated PostgreSQL row-level data segregation and automated quarterly LP distributions.",
          "High-value enterprise lead. Needs SOC-2 Type II audit readiness. Assign Lead Architect today.",
          "Rajan S. (Lead Solutions Architect)"
        ],
        [
          "lead-102",
          "Elena Rostova",
          "Vanguard Health Analytics",
          "elena.r@vanguardhealth.ai",
          "+1 (617) 552-8901",
          "AI Solutions & Autonomous Workflows",
          "$15,000 - $25,000",
          "4 - 6 Weeks",
          "scoping",
          "high",
          "Seeking fine-tuned agentic workflow to synthesize clinical trial telemetry and extract adverse drug event vectors into private pgvector embeddings with zero PHI egress.",
          "Technical scoping call completed. Drafting custom HIPAA compliance protocol.",
          "Rajan S. (Lead Solutions Architect)"
        ],
        [
          "lead-103",
          "Marcus Thorne",
          "Aether Logistics Global",
          "m.thorne@aetherlogistics.com",
          "+44 20 7946 0912",
          "Cloud & DevOps Architecture",
          "$10,000 - $20,000",
          "3 - 5 Weeks",
          "contacted",
          "normal",
          "Complete multi-region AWS EKS Kubernetes migration with Terraform IaC, blue/green rollout mesh, and automated disaster recovery under 45 seconds RTO.",
          "Initial discovery email sent with architecture blueprint deck.",
          "DevOps Lead Architect"
        ],
        [
          "lead-104",
          "Sophia Lin",
          "OmniPay FinTech",
          "slin@omnipay.network",
          "+1 (212) 401-7782",
          "Web & Mobile Engineering",
          "$25,000 - $45,000",
          "8 - 10 Weeks",
          "proposal_sent",
          "urgent",
          "Next.js 16 + React Native high-frequency payments terminal with biometrics, sub-millisecond offline ledger sync, and PCI-DSS compliance.",
          "Proposal submitted ($38,500 contracted). Awaiting legal signatory review.",
          "Rajan S. (Lead Solutions Architect)"
        ],
        [
          "lead-105",
          "Jonathan Sterling",
          "Sterling & Sterling Bio",
          "jsterling@sterlingbio.org",
          "+1 (312) 880-9923",
          "Technical SEO & Growth Engine",
          "$5,000 - $10,000",
          "2 - 4 Weeks",
          "won",
          "normal",
          "Algorithmic programmatic SEO directory generating 25,000 indexed clinical trials pages with Next.js edge caching and dynamic JSON-LD medical schema.",
          "Contract executed. Escrow deposit verified via Stripe. Moving to Phase 1 architecture.",
          "Growth Engineering Lead"
        ]
      ];

      for (const l of sampleLeads) {
        await client.query(
          `INSERT INTO leads (id, client_name, company_name, email, phone, service_requested, budget_range, timeline, status, priority, message, internal_notes, assigned_architect)
           VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)
           ON CONFLICT (id) DO NOTHING;`,
          l
        );
      }
    }

    // 3. Check and Seed Estimates
    const estCount = await client.query("SELECT COUNT(*) FROM estimates;");
    if (parseInt(estCount.rows[0].count, 10) === 0) {
      console.log("Seeding initial scope estimates...");
      const sampleEstimates = [
        [
          "est-8491",
          "Thomas Wright",
          "Apex Capital Advisors",
          "twright@apexcap.io",
          "scale",
          "Scale Pod",
          8500,
          "$13,400",
          "4 - 6 Weeks",
          JSON.stringify([
            "AI Autonomous Copilot / RAG Knowledge Hub",
            "Multi-Tenant SaaS Database Schema & Sharding",
            "Enterprise SSO & SAML Authentication",
            "Continuous Security Hardening & Penetration Testing"
          ]),
          "pending_review"
        ],
        [
          "est-8492",
          "Claire Dupont",
          "Lumina Retail Systems",
          "cdupont@luminaretail.com",
          "mvp",
          "MVP Sprint",
          4500,
          "$6,800",
          "2 - 3 Weeks",
          JSON.stringify([
            "Stripe Recurring Metered Billing & Webhook Hub",
            "Next.js High-Performance SEO Architecture"
          ]),
          "scoping_scheduled"
        ],
        [
          "est-8493",
          "Harrison Reed",
          "Novus Healthtech Inc.",
          "hreed@novushealth.ai",
          "enterprise",
          "Enterprise Core",
          16000,
          "$22,900",
          "6 - 10 Weeks",
          JSON.stringify([
            "AI Autonomous Copilot / RAG Knowledge Hub",
            "Multi-Tenant SaaS Database Schema & Sharding",
            "Kubernetes (EKS) Terraform Infrastructure as Code",
            "White-Glove 24/7 Production SLA Guarantee"
          ]),
          "contract_drafted"
        ]
      ];

      for (const e of sampleEstimates) {
        await client.query(
          `INSERT INTO estimates (id, client_name, company_name, email, selected_tier, tier_name, base_price, calculated_price, estimated_weeks, selected_features, status)
           VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
           ON CONFLICT (id) DO NOTHING;`,
          e
        );
      }
    }

    // 4. Check and Seed Projects
    const projCount = await client.query("SELECT COUNT(*) FROM projects;");
    if (parseInt(projCount.rows[0].count, 10) === 0) {
      console.log("Seeding initial client project sprints...");
      const sampleProjects = [
        [
          "proj-101",
          "Hyperion Multi-Tenant Core",
          "Hyperion Capital Partners",
          "dvance@hyperioncap.io",
          "+1 (415) 890-2341",
          "SaaS Development",
          3,
          "Phase 3: High-Fi Frontend & Core Sprint",
          65,
          "2026-08-15",
          "2026-09-30",
          "Rajan S. (Lead Solutions Architect)",
          "$32,500",
          "$16,250",
          "urgent",
          "active",
          "github.com/divanex-enterprise/hyperion-core",
          "https://hyperion-staging.divanextechnologies.dev",
          "Sprint cadence is on track. Stripe integration passing tests.",
          JSON.stringify(["Rajan S.", "Elena V.", "Tariq M."]),
          JSON.stringify([
            { item: "Multi-Tenant PostgreSQL Schema with RLS", completed: true },
            { item: "Stripe Billing & Automated Webhook Dispatch", completed: true },
            { item: "Granular RBAC Permission Matrix & Audit Trails", completed: true },
            { item: "High-Fi Next.js 16 Dashboard Frontend", completed: false },
            { item: "SOC2 Compliance Verification & OWASP ZAP Scan", completed: false },
            { item: "Production Deployment & DNS Handover", completed: false }
          ])
        ],
        [
          "proj-102",
          "Vanguard Clinical Vector Engine",
          "Vanguard Health Analytics",
          "elena.r@vanguardhealth.ai",
          "+1 (617) 552-8901",
          "AI Solutions & Automation",
          2,
          "Phase 2: Core Microservices & Security",
          40,
          "2026-08-25",
          "2026-10-15",
          "Rajan S. (Lead Solutions Architect)",
          "$24,000",
          "$12,000",
          "high",
          "active",
          "github.com/divanex-enterprise/vanguard-ai",
          "https://vanguard-staging.divanextechnologies.dev",
          "Local embedding model benchmarking completed. Zero PHI leakage verified.",
          JSON.stringify(["Rajan S.", "Kenji S."]),
          JSON.stringify([
            { item: "pgvector Index Optimization & Schema Pipeline", completed: true },
            { item: "Autonomous LangChain / Claude Tool Routing Mesh", completed: true },
            { item: "Private RAG Ingestion Pipeline & Chunk Cache", completed: false },
            { item: "HIPAA Compliant Logging & Zero Egress Filter", completed: false },
            { item: "Frontend Medical Dossier Interface", completed: false },
            { item: "Client Signoff & Production Model Transfer", completed: false }
          ])
        ],
        [
          "proj-103",
          "Aether Kubernetes Mesh Migration",
          "Aether Logistics Global",
          "m.thorne@aetherlogistics.com",
          "+44 20 7946 0912",
          "Cloud & DevOps",
          5,
          "Phase 5: Production Handover & Hypercare",
          100,
          "2026-07-20",
          "2026-09-02",
          "Marcus Thorne (DevOps Lead)",
          "$18,000",
          "$18,000",
          "normal",
          "completed",
          "github.com/divanex-enterprise/aether-devops",
          "https://aether-live.divanextechnologies.dev",
          "Production handover complete. Client signed SLA agreement.",
          JSON.stringify(["Marcus T.", "Sarah C."]),
          JSON.stringify([
            { item: "Terraform Multi-Region IaC Scripts", completed: true },
            { item: "Zero-Downtime Blue/Green CI/CD Pipeline", completed: true },
            { item: "Prometheus & Grafana Alerting Dashboards", completed: true },
            { item: "VPC Peering & mTLS Ingress Encryption", completed: true },
            { item: "Disaster Recovery Drill (42s Failover)", completed: true },
            { item: "Client Operational Handover & Runbook", completed: true }
          ])
        ]
      ];

      for (const p of sampleProjects) {
        await client.query(
          `INSERT INTO projects (id, project_name, client_name, client_email, client_phone, service_category, current_phase, phase_name, progress_percent, start_date, target_handover, assigned_lead, contract_value, paid_escrow_value, priority, status, repo_url, staging_url, internal_notes, team_members, handover_checklist)
           VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21)
           ON CONFLICT (id) DO NOTHING;`,
          p
        );
      }
    }

    // 5. Check and Seed Services
    const svcCount = await client.query("SELECT COUNT(*) FROM services;");
    if (parseInt(svcCount.rows[0].count, 10) === 0) {
      console.log("Seeding services catalog...");
      const sampleServices = [
        ["svc-saas", "SaaS Development & Architecture", "saas-development", true, "$4,500", "$8,500", "$16,000", "2 - 6 Weeks", "99.99% Uptime SLA", 14],
        ["svc-ai", "AI Solutions & Autonomous Workflows", "ai-solutions", true, "$5,000", "$9,500", "$18,500", "3 - 8 Weeks", "Zero-Hallucination SLA", 19],
        ["svc-web", "High-Performance Web & Mobile Apps", "web-mobile-apps", true, "$3,800", "$7,200", "$14,000", "2 - 5 Weeks", "100/100 Lighthouse SLA", 12],
        ["svc-cloud", "Cloud Architecture & DevOps Pipelines", "cloud-devops", true, "$4,200", "$8,000", "$15,500", "2 - 4 Weeks", "Zero-Downtime Rollout SLA", 8],
        ["svc-seo", "Technical SEO & Growth Acceleration", "technical-seo", true, "$2,500", "$4,800", "$9,000", "1 - 3 Weeks", "Top 3 Indexing SLA", 11],
        ["svc-ui", "UI/UX Product Design & Design Systems", "ui-ux-design", true, "$3,200", "$6,000", "$11,500", "2 - 4 Weeks", "WCAG AAA Compliant SLA", 9]
      ];

      for (const s of sampleServices) {
        await client.query(
          `INSERT INTO services (id, name, slug, active, mvp_price, scale_price, enterprise_price, sprint_duration, sla_uptime, lead_count_this_month)
           VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
           ON CONFLICT (id) DO NOTHING;`,
          s
        );
      }
    }

    // 6. Check and Seed Logs
    const logsCount = await client.query("SELECT COUNT(*) FROM system_logs;");
    if (parseInt(logsCount.rows[0].count, 10) === 0) {
      console.log("Seeding telemetry audit logs...");
      const sampleLogs = [
        ["log-01", "18:42:15 UTC", "info", "supabase-auth", "Admin session authenticated via WebAuthn Hardware Key.", 14, "127.0.0.1"],
        ["log-02", "18:40:02 UTC", "info", "crm-pipeline", "Inbound opportunity received from Hyperion Capital (SaaS Tier).", 19, "198.51.100.4"],
        ["log-03", "18:35:44 UTC", "info", "escrow-vault", "Stripe webhook verified deposit for Aether Logistics ($18,000).", 32, "54.187.12.89"],
        ["log-04", "18:29:11 UTC", "warn", "ingress-waf", "Rate-limit threshold warning on edge node bom1 (AP-South).", 4, "203.0.113.42"],
        ["log-05", "18:14:20 UTC", "info", "cluster-telemetry", "PostgreSQL database connected: aws-0-ap-south-1.pooler.supabase.com.", 8, "127.0.0.1"]
      ];

      for (const lg of sampleLogs) {
        await client.query(
          `INSERT INTO system_logs (id, timestamp, level, service, message, latency_ms, ip_address)
           VALUES ($1, $2, $3, $4, $5, $6, $7)
           ON CONFLICT (id) DO NOTHING;`,
          lg
        );
      }
    }

    // Print summary counts
    console.log("\n--- Database Verification Summary ---");
    const rLeads = await client.query("SELECT COUNT(*) FROM leads;");
    const rEst = await client.query("SELECT COUNT(*) FROM estimates;");
    const rProj = await client.query("SELECT COUNT(*) FROM projects;");
    const rSvc = await client.query("SELECT COUNT(*) FROM services;");
    const rLogs = await client.query("SELECT COUNT(*) FROM system_logs;");

    console.log(`✅ Leads in Supabase:      ${rLeads.rows[0].count}`);
    console.log(`✅ Estimates in Supabase:  ${rEst.rows[0].count}`);
    console.log(`✅ Projects in Supabase:   ${rProj.rows[0].count}`);
    console.log(`✅ Services in Supabase:   ${rSvc.rows[0].count}`);
    console.log(`✅ System Logs in Supabase:${rLogs.rows[0].count}`);

    await client.end();
    console.log("\nDatabase setup and seeding completed successfully!");
  } catch (err) {
    console.error("Database setup failed:", err);
    try { await client.end(); } catch {}
    process.exit(1);
  }
}

setup();
