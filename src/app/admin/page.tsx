"use client";

import { useState, useEffect, useCallback, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminHeader from "@/components/admin/AdminHeader";
import AdminOverviewView from "@/components/admin/AdminOverviewView";
import AdminChatsView from "@/components/admin/AdminChatsView";
import AdminProjectsView from "@/components/admin/AdminProjectsView";
import AdminLogsView from "@/components/admin/AdminLogsView";
import AdminBlogView from "@/components/admin/AdminBlogView";
import AdminSettingsView from "@/components/admin/AdminSettingsView";
import AdminTestimonialsView from "@/components/admin/AdminTestimonialsView";
import AdminSiteConfigView from "@/components/admin/AdminSiteConfigView";
import AdminSeoView from "@/components/admin/AdminSeoView";
import AdminCacheView from "@/components/admin/AdminCacheView";
import AdminNavigationView from "@/components/admin/AdminNavigationView";
import AdminPagesView from "@/components/admin/AdminPagesView";
import AdminContentToolsView from "@/components/admin/AdminContentToolsView";
import AdminSectionsView from "@/components/admin/AdminSectionsView";
import AdminFormsView from "@/components/admin/AdminFormsView";
import AdminSubscribersView from "@/components/admin/AdminSubscribersView";
import {
  AdminPortfolioTab,
  AdminServicesTab,
  AdminTechTab,
} from "@/components/admin/ContentTabs";
import DatabaseStatusBanner from "@/components/admin/DatabaseStatusBanner";
import AdminUsersView from "@/components/admin/AdminUsersView";
import AdminAuditView from "@/components/admin/AdminAuditView";
import AdminSitemapView from "@/components/admin/AdminSitemapView";
import AdminRobotsView from "@/components/admin/AdminRobotsView";
import AdminLegalView from "@/components/admin/AdminLegalView";
import { can, canSeeTab, type Role } from "@/lib/permissions";

import {
  AdminProjectSprint,
  AdminSystemLog,
  AdminServiceConfig,
  initialAdminProjects,
  initialAdminLogs,
  initialAdminServices
} from "@/data/adminData";

function AdminDashboardContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // The URL is the single source of truth for the active tab. Mirroring it into
  // state would need an effect to resync, which causes cascading renders.
  const activeTab = searchParams.get("tab") || "overview";

  const setActiveTab = useCallback(
    (tab: string) => {
      router.replace(`/admin?tab=${encodeURIComponent(tab)}`, { scroll: false });
    },
    [router]
  );
  const [collapsed, setCollapsed] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // The signed-in operator. Null while it loads and if the session is gone,
  // which is why every role-gated tab below checks before it renders.
  const [me, setMe] = useState<{ id: string; role: Role } | null>(null);

  useEffect(() => {
    let active = true;
    (async () => {
      try {
        const res = await fetch("/api/auth/session");
        const json = await res.json();
        if (active && json?.success) setMe({ id: json.user.id, role: json.user.role });
      } catch {
        // Leaving it null hides the role-gated tabs, which is the safe default.
      }
    })();
    return () => {
      active = false;
    };
  }, []);

  // Consistent Initial States (matches SSR to eliminate hydration mismatch)
  const [services, setServices] = useState<AdminServiceConfig[]>(initialAdminServices);
  const [projects, setProjects] = useState<AdminProjectSprint[]>(initialAdminProjects);
  const [logs, setLogs] = useState<AdminSystemLog[]>(initialAdminLogs);

  // Client-side cache restoration & real-time synchronization with Supabase Cloud
  useEffect(() => {
    // Data comes from the API only. The local cache this used to restore
    // could show an operator stale rows for minutes after a change, and rows
    // another admin had already deleted.
    // 2. Fetch fresh live data from Supabase
    async function syncFromSupabase() {
      let sessionExpired = false;

      const load = async (url: string) => {
        try {
          const res = await fetch(url);
          if (res.status === 401) {
            sessionExpired = true;
            return null;
          }
          return await res.json();
        } catch {
          return null;
        }
      };

      try {
        const [projectsRes, servicesRes, logsRes] = await Promise.all([
          load("/api/projects"),
          load("/api/services"),
          load("/api/logs")
        ]);

        if (sessionExpired) {
          window.location.assign(new URL("/admin/login?next=/admin", window.location.origin));
          return;
        }

        // Note: an empty array is a valid answer (everything was deleted), so
        // these must not be gated on `length > 0` — doing so would pin stale
        // localStorage data on screen forever.
        if (projectsRes?.success && Array.isArray(projectsRes.projects)) {
          setProjects(projectsRes.projects);
        }
        if (servicesRes?.success && Array.isArray(servicesRes.services)) {
          setServices(servicesRes.services);
        }
        if (logsRes?.success && Array.isArray(logsRes.logs)) {
          setLogs(logsRes.logs);
        }
      } catch (err) {
        console.warn("Supabase cloud sync notification:", err);
      }
    }
    syncFromSupabase();
  }, []);

  // Handle updates with automatic Supabase persistence and log generation
  const handleUpdateService = (updatedService: AdminServiceConfig) => {
    const updated = services.map((s) => (s.id === updatedService.id ? updatedService : s));
    setServices(updated);
    if (typeof window !== "undefined") {
    }
    fetch("/api/services", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedService)
    }).catch(console.error);

    // Add audit log
    const newLog: AdminSystemLog = {
      id: `log-${crypto.randomUUID()}`,
      timestamp: new Date().toISOString().slice(11, 19) + " UTC",
      level: "warn",
      service: "pricing-engine",
      message: `Service tier pricing modified for [${updatedService.name}]. Syncing to public catalog.`,
      ipAddress: "server"
    };
    const updatedLogs = [newLog, ...logs];
    setLogs(updatedLogs);
    if (typeof window !== "undefined") {
    }
    fetch("/api/logs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newLog)
    }).catch(console.error);
  };

  const handleUpdateProject = (updatedProject: AdminProjectSprint) => {
    const updated = projects.map((p) => (p.id === updatedProject.id ? updatedProject : p));
    setProjects(updated);
    if (typeof window !== "undefined") {
    }
    fetch("/api/projects", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedProject)
    }).catch(console.error);
  };

  const handleCreateProject = (newProject: AdminProjectSprint) => {
    const updated = [newProject, ...projects];
    setProjects(updated);
    if (typeof window !== "undefined") {
    }
    fetch("/api/projects", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newProject)
    }).catch(console.error);

    const newLog: AdminSystemLog = {
      id: `log-${crypto.randomUUID()}`,
      timestamp: new Date().toISOString().slice(11, 19) + " UTC",
      level: "info",
      service: "sprint-registry",
      message: `New client project initialized: [${newProject.projectName}] for ${newProject.clientName} (${newProject.contractValue}).`,
      ipAddress: "server"
    };
    const updatedLogs = [newLog, ...logs];
    setLogs(updatedLogs);
    if (typeof window !== "undefined") {
    }
    fetch("/api/logs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newLog)
    }).catch(console.error);
  };

  const handleDeleteProject = (projectId: string) => {
    const target = projects.find((p) => p.id === projectId);
    const updated = projects.filter((p) => p.id !== projectId);
    setProjects(updated);
    if (typeof window !== "undefined") {
    }
    fetch(`/api/projects?id=${projectId}`, {
      method: "DELETE"
    }).catch(console.error);

    const newLog: AdminSystemLog = {
      id: `log-${crypto.randomUUID()}`,
      timestamp: new Date().toISOString().slice(11, 19) + " UTC",
      level: "warn",
      service: "sprint-registry",
      message: `Project ${target?.projectName || projectId} removed from active sprint pipeline.`,
      ipAddress: "server"
    };
    const updatedLogs = [newLog, ...logs];
    setLogs(updatedLogs);
    if (typeof window !== "undefined") {
    }
    fetch("/api/logs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newLog)
    }).catch(console.error);
  };

  const handleClearLogs = () => {
    setLogs([]);
    if (typeof window !== "undefined") {
    }
    fetch("/api/logs", {
      method: "DELETE"
    }).catch(console.error);
  };


  return (
    <div className="flex min-h-screen bg-slate-50 text-slate-900 selection:bg-sky-500 selection:text-white">
      {/* Autonomous Cyber Sidebar */}
      <AdminSidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        collapsed={collapsed}
        setCollapsed={setCollapsed}
        role={me?.role ?? null}
      />

      {/* Main Command Center Container */}
      <div
        className={`flex-1 flex flex-col min-w-0 transition-all duration-300 ${
          collapsed ? "lg:ml-20" : "lg:ml-72"
        }`}
      >
        {/* Sticky Header */}
        <AdminHeader
          activeTab={activeTab}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          onNotificationClick={() => setActiveTab("projects")}
        />

        {/* Ambient Top Glow Grid */}
        <div className="relative pointer-events-none">
          <div className="absolute top-0 left-1/4 w-[500px] h-48 bg-gradient-to-r from-sky-400/10 to-blue-500/10 blur-[120px] rounded-full" />
          <div className="absolute top-8 right-1/4 w-[450px] h-48 bg-gradient-to-r from-indigo-400/10 to-sky-400/10 blur-[120px] rounded-full" />
        </div>

        {/* Scrollable Dashboard View Area (Generous Padding - Zero Popups!) */}
        <main className="flex-1 p-6 sm:p-8 lg:p-10 w-full space-y-8">
          {/* Shown on every tab: an admin editing content needs to know if it is
              actually being stored. */}
          <DatabaseStatusBanner />

          {activeTab === "overview" && (
            <AdminOverviewView projects={projects} />
          )}

          {activeTab === "chats" && <AdminChatsView />}



          {activeTab === "subscribers" && <AdminSubscribersView />}

          {activeTab === "services" && (
            <AdminServicesTab services={services} onUpdateService={handleUpdateService} />
          )}

          {activeTab === "projects" && (
            <AdminProjectsView
              projects={projects}
              onUpdateProject={handleUpdateProject}
              onCreateProject={handleCreateProject}
              onDeleteProject={handleDeleteProject}
            />
          )}

          {activeTab === "portfolio" && <AdminPortfolioTab />}

          {activeTab === "testimonials" && <AdminTestimonialsView />}

          {activeTab === "techstack" && <AdminTechTab />}

          {activeTab === "blog" && <AdminBlogView />}

          {activeTab === "seo" && <AdminSeoView />}

          {activeTab === "siteconfig" && <AdminSiteConfigView />}

          {activeTab === "navigation" && <AdminNavigationView />}

          {activeTab === "pages" && <AdminPagesView />}

          {activeTab === "sections" && <AdminSectionsView />}

          {activeTab === "forms" && <AdminFormsView />}

          {activeTab === "content-tools" && <AdminContentToolsView />}

          {activeTab === "cache" && <AdminCacheView />}

          {activeTab === "logs" && (
            <AdminLogsView
              logs={logs}
              onClearLogs={handleClearLogs}
            />
          )}

          {activeTab === "legal" && canSeeTab(me?.role ?? null, "legal") && (
            <AdminLegalView canEdit={can(me?.role ?? null, "content.edit")} />
          )}

          {activeTab === "robots" && canSeeTab(me?.role ?? null, "robots") && (
            <AdminRobotsView canEdit={can(me?.role ?? null, "content.edit")} />
          )}

          {activeTab === "sitemap" && canSeeTab(me?.role ?? null, "sitemap") && (
            <AdminSitemapView canEdit={can(me?.role ?? null, "content.edit")} />
          )}

          {activeTab === "audit" && canSeeTab(me?.role ?? null, "audit") && <AdminAuditView />}

          {activeTab === "users" && canSeeTab(me?.role ?? null, "users") && me && (
            <AdminUsersView currentUserId={me.id} canManage={me.role === "owner"} />
          )}

          {activeTab === "settings" && canSeeTab(me?.role ?? null, "settings") && (
            <AdminSettingsView />
          )}

          {me && !canSeeTab(me.role, activeTab) && (
            <div className="p-6 rounded-2xl bg-white border border-slate-200 text-center">
              <p className="text-sm font-semibold text-slate-900">
                That screen is not available to your role.
              </p>
              <p className="text-xs text-slate-500 mt-1">
                You are signed in as {me.role}. Ask an owner if you need access.
              </p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default function AdminPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-slate-50 flex items-center justify-center font-mono text-sky-700 text-sm">
          <div className="flex items-center gap-3">
            <span className="w-3 h-3 rounded-full bg-sky-600 animate-ping" />
            <span>INITIALIZING DIVANEX ENTERPRISE SECURE CONSOLE...</span>
          </div>
        </div>
      }
    >
      <AdminDashboardContent />
    </Suspense>
  );
}
