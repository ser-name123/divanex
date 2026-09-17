"use client";

import Image from "next/image";
import Link from "next/link";
import {
  LayoutDashboard,
  Layers,
  Kanban,
  Terminal,
  Settings,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  BookOpen,
  MessageSquare,
  FolderGit2,
  MessageSquareQuote,
  Cpu,
  Sliders,
  Search,
  Database,
  Navigation,
  LayoutTemplate,
  Wrench,
  LayoutList,
  Mail,
  Inbox,
  Users,
  ScrollText,
  Map as MapIcon,
  Bot,
  Scale,
} from "lucide-react";
import { canSeeTab, type Role } from "@/lib/permissions";

interface AdminSidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  collapsed: boolean;
  setCollapsed: (val: boolean) => void;
  /** Null until the session resolves, which hides everything role-gated. */
  role: Role | null;
}

export default function AdminSidebar({
  activeTab,
  setActiveTab,
  collapsed,
  setCollapsed,
  role
}: AdminSidebarProps) {
  const allNavItems = [
    {
      id: "overview",
      label: "Telemetry Overview",
      icon: LayoutDashboard,
      badge: null
    },
    {
      id: "chats",
      label: "Live AI & Support Chats",
      icon: MessageSquare,
      badge: "LIVE",
      badgeColor: "bg-purple-100 text-purple-800 border border-purple-300 font-bold"
    },
    {
      id: "subscribers",
      label: "Newsletter Subscribers",
      icon: Inbox,
      badge: null
    },
    {
      id: "services",
      label: "Services Catalog",
      icon: Layers,
      badge: "24 Live",
      badgeColor: "bg-slate-100 text-slate-700 border border-slate-300 font-bold"
    },
    {
      id: "projects",
      label: "Client Sprints",
      icon: Kanban,
      badge: "3 Active",
      badgeColor: "bg-blue-100 text-blue-800 border border-blue-300 font-bold"
    },
    {
      id: "portfolio",
      label: "Portfolio & Cases",
      icon: FolderGit2,
      badge: "24 Live",
      badgeColor: "bg-blue-100 text-blue-800 border border-blue-300 font-bold"
    },
    {
      id: "testimonials",
      label: "Client Reviews",
      icon: MessageSquareQuote,
      badge: "50+ 5.0★",
      badgeColor: "bg-amber-100 text-amber-800 border border-amber-300 font-bold"
    },
    {
      id: "techstack",
      label: "Tech Stack Registry",
      icon: Cpu,
      badge: "50+ Tech",
      badgeColor: "bg-emerald-100 text-emerald-800 border border-emerald-300 font-bold"
    },
    {
      id: "blog",
      label: "Blog CMS Studio",
      icon: BookOpen,
      badge: "6 Posts",
      badgeColor: "bg-purple-100 text-purple-800 border border-purple-300 font-bold"
    },
    {
      id: "sitemap",
      label: "Sitemap",
      icon: MapIcon,
      badge: null
    },
    {
      id: "robots",
      label: "Robots & Crawlers",
      icon: Bot,
      badge: null
    },
    {
      id: "seo",
      label: "Search & Metadata",
      icon: Search,
      badge: "SEO",
      badgeColor: "bg-emerald-100 text-emerald-800 border border-emerald-300 font-bold"
    },
    {
      id: "siteconfig",
      label: "Site Content & CMS",
      icon: Sliders,
      badge: "Live CMS",
      badgeColor: "bg-sky-100 text-sky-800 border border-sky-300 font-bold"
    },
    {
      id: "navigation",
      label: "Header & Footer Menus",
      icon: Navigation,
      badge: null
    },
    {
      id: "pages",
      label: "Page Content",
      icon: LayoutTemplate,
      badge: null
    },
    {
      id: "sections",
      label: "Page Sections",
      icon: LayoutList,
      badge: null
    },
    {
      id: "legal",
      label: "Legal Pages",
      icon: Scale,
      badge: null
    },
    {
      id: "forms",
      label: "Forms & Notifications",
      icon: Mail,
      badge: null
    },
    {
      id: "content-tools",
      label: "Backup, Audit & Search",
      icon: Wrench,
      badge: null
    },
    {
      id: "cache",
      label: "Cache & Performance",
      icon: Database,
      badge: null
    },
    {
      id: "logs",
      label: "Audit Telemetry",
      icon: Terminal,
      badge: "LIVE",
      badgeColor: "bg-emerald-50 text-emerald-700 border border-emerald-300 font-bold"
    },
    {
      id: "audit",
      label: "Audit Trail",
      icon: ScrollText,
      badge: null
    },
    {
      id: "users",
      label: "Admins & Roles",
      icon: Users,
      badge: null
    },
    {
      id: "settings",
      label: "System Settings",
      icon: Settings,
      badge: null
    }
  ];

  // Drawn from the same matrix the server enforces, so a tab cannot appear
  // here and refuse on arrival. Hiding it is courtesy; the route is the gate.
  const navItems = allNavItems.filter((item) => canSeeTab(role, item.id));

  return (
    <aside
      className={`fixed top-0 left-0 bottom-0 z-40 bg-white/95 backdrop-blur-2xl border-r border-slate-200 transition-all duration-300 flex flex-col justify-between shadow-lg shadow-slate-200/50 ${
        collapsed ? "w-20" : "w-72"
      }`}
    >
      {/* Top Header Section: Brand & Sidebar Collapse */}
      <div className="p-3 sm:p-3.5 border-b border-slate-200 relative z-10">
        <div className="flex items-center justify-between">
          <Link href="/admin" className="flex items-center gap-2.5 group">
            <div className="relative w-[34px] h-[38px] flex-shrink-0 group-hover:scale-105 transition-transform duration-300 drop-shadow-[0_2px_8px_rgba(15,118,112,0.3)]">
              <Image
                src="/brand-logo-icon.png"
                alt="Divanex Admin Console"
                fill
                sizes="40px"
                className="object-contain"
                priority
              />
            </div>
            {!collapsed && (
              <div className="flex flex-col select-none">
                <span className="text-sm font-bold tracking-[0.02em] uppercase leading-none text-slate-900 flex items-center gap-1.5">
                  DIVANEX
                  <span className="w-1.5 h-1.5 rounded-full bg-sky-600 animate-pulse" />
                </span>
                <span className="text-[8.5px] font-mono tracking-[0.2em] uppercase font-bold text-sky-700 mt-1">
                  COMMAND CENTER
                </span>
              </div>
            )}
          </Link>

          <button
            type="button"
            onClick={() => setCollapsed(!collapsed)}
            className="w-7 h-7 rounded-lg bg-slate-50 border border-slate-200 hover:border-sky-400 text-slate-600 hover:text-sky-700 flex items-center justify-center transition-all hover:scale-105 shadow-2xs cursor-pointer"
            title={collapsed ? "Expand Sidebar" : "Collapse Sidebar"}
          >
            {collapsed ? <ChevronRight className="w-3.5 h-3.5" /> : <ChevronLeft className="w-3.5 h-3.5" />}
          </button>
        </div>

        {!collapsed && (
          <div className="mt-2.5 pt-2 border-t border-slate-100 flex items-center justify-between text-[10px] font-mono">
            <div className="flex items-center gap-1.5 text-emerald-700 font-bold">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75" />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-600" />
              </span>
              <span>EDGE RUNTIME</span>
            </div>
            <span className="px-1.5 py-0.2 rounded bg-sky-50 border border-sky-200 text-sky-700 text-[9.5px] font-bold">
              v3.4.0
            </span>
          </div>
        )}
      </div>

      {/* Navigation Links Area - Compact Spacing */}
      <nav className="flex-1 px-2.5 py-2 space-y-0.5 overflow-y-auto scrollbar-thin relative z-10">
        {!collapsed && (
          <div className="px-2.5 pb-1.5 pt-0.5 text-[9.5px] font-mono uppercase tracking-wider text-slate-500 font-bold flex items-center justify-between">
            <span>Agency Operations</span>
            <span className="text-sky-600">● {navItems.length} Panels</span>
          </div>
        )}

        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center justify-between px-2.5 py-1.5 sm:py-2 rounded-lg text-xs font-mono font-medium transition-all duration-150 group relative cursor-pointer ${
                isActive
                  ? "bg-sky-50 border border-sky-300 text-sky-900 font-bold shadow-2xs"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-50 border border-transparent hover:border-slate-200"
              }`}
              title={collapsed ? item.label : undefined}
            >
              {/* Active illuminated left indicator line */}
              {isActive && (
                <span className="absolute left-0 top-1.5 bottom-1.5 w-1 rounded-r-full bg-sky-600 shadow-[0_0_6px_rgba(15,118,112,0.5)]" />
              )}

              <div className="flex items-center gap-2.5 truncate min-w-0">
                <div
                  className={`w-6 h-6 rounded-md flex items-center justify-center transition-all ${
                    isActive
                      ? "bg-sky-100 text-sky-700"
                      : "text-slate-500 group-hover:text-sky-600 group-hover:bg-slate-100"
                  }`}
                >
                  <Icon className="w-3.5 h-3.5 shrink-0 transition-transform group-hover:scale-110" />
                </div>
                {!collapsed && <span className="truncate text-xs">{item.label}</span>}
              </div>

              {!collapsed && item.badge && (
                <span
                  suppressHydrationWarning
                  className={`px-1.5 py-0.2 rounded text-[9.5px] font-mono shrink-0 shadow-2xs ${
                    item.badgeColor || "bg-slate-100 text-slate-700 border border-slate-200"
                  }`}
                >
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Bottom Section: Executive Architect Profile Card */}
      <div className="p-2.5 sm:p-3 border-t border-slate-200 relative z-10 bg-slate-50/70">
        {!collapsed ? (
          <div className="p-2 rounded-xl bg-white border border-slate-200 flex items-center justify-between font-mono text-xs shadow-2xs">
            <div className="flex items-center gap-2 truncate">
              <div className="w-7 h-7 rounded-lg bg-blue-600 text-white font-bold flex items-center justify-center text-xs shrink-0 shadow-xs">
                RS
              </div>
              <div className="truncate">
                <div className="text-slate-900 font-bold text-xs truncate">Rajan Soni</div>
                <div className="text-[9.5px] text-sky-700 font-semibold truncate flex items-center gap-1">
                  <span>Lead Architect</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-1.5 pl-1.5" title="Security-Verified Operator">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
            </div>
          </div>
        ) : (
          <div className="flex justify-center" title="Rajan Soni (Lead Architect)">
            <div className="w-7 h-7 rounded-lg bg-blue-600 text-white font-bold flex items-center justify-center text-xs shadow-xs">
              RS
            </div>
          </div>
        )}
      </div>
    </aside>
  );
}

