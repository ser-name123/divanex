"use client";

import { NotesField } from "@/components/admin/fields";
import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import {
  Search,
  Clock,
  Activity,
  Bell,
  ExternalLink,
  X,
  CheckCheck,
  AlertTriangle,
  CreditCard,
  MessageSquare,
  FileText,
  UserCheck,
  LogOut
} from "lucide-react";
import { AppNotification } from "@/lib/notificationsStore";

interface AdminHeaderProps {
  activeTab: string;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  onNotificationClick?: () => void;
}

export default function AdminHeader({
  activeTab,
  searchQuery,
  setSearchQuery,
  onNotificationClick
}: AdminHeaderProps) {
  const [currentTime, setCurrentTime] = useState("");
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [notifications, setNotifications] = useState<AppNotification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);


  const fetchNotifications = useCallback(async () => {
    try {
      const res = await fetch("/api/notifications");
      const data = await res.json();
      if (data?.success && Array.isArray(data.notifications)) {
        setNotifications(data.notifications);
        setUnreadCount(data.unreadCount ?? 0);
      }
    } catch {
      // ignore network errors in polling
    }
  }, []);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(now.toUTCString().slice(17, 25));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    fetchNotifications();
    const notifInterval = setInterval(fetchNotifications, 15000);
    return () => clearInterval(notifInterval);
  }, [fetchNotifications]);

  const handleMarkAllRead = async () => {
    try {
      await fetch("/api/notifications", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ markAll: true }),
      });
      setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
      setUnreadCount(0);
    } catch (err) {
      console.error(err);
    }
  };

  const handleMarkRead = async (id: string) => {
    try {
      await fetch("/api/notifications", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      setNotifications((prev) =>
        prev.map((n) => (n.id === id ? { ...n, read: true } : n))
      );
      setUnreadCount((c) => Math.max(0, c - 1));
    } catch (err) {
      console.error(err);
    }
  };

  const getTabTitle = () => {
    switch (activeTab) {
      case "overview":
        return "Telemetry Overview & Agency KPIs";
      case "chats":
        return "Live AI & Human Support Command Center";
      case "services":
        return "Core Services Catalog & Pricing Controller";
      case "projects":
        return "Client Sprints & Active Delivery";
      case "portfolio":
        return "Portfolio & Client Architecture Showcase";
      case "testimonials":
        return "Client Reviews & Verified Audit Badges";
      case "techstack":
        return "Tech Stack & Frameworks Registry";
      case "blog":
        return "Engineering Blog & Content Publishing Studio";
      case "siteconfig":
        return "Global Website Content & Live Customizer";
      case "logs":
        return "System Telemetry & Security Audit Console";
      case "settings":
        return "API Keys, RBAC & Agency Governance";
      default:
        return "Command Center";
    }
  };

  const getNotifIcon = (type: AppNotification["type"]) => {
    switch (type) {
      case "payment":
        return <CreditCard className="w-3.5 h-3.5 text-emerald-600" />;
      case "feedback":
        return <MessageSquare className="w-3.5 h-3.5 text-sky-600" />;
      case "document":
        return <FileText className="w-3.5 h-3.5 text-blue-600" />;
      case "profile":
        return <UserCheck className="w-3.5 h-3.5 text-purple-600" />;
      default:
        return <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />;
    }
  };

  return (
    <>
      <header className="sticky top-0 z-30 w-full h-20 bg-white/95 backdrop-blur-2xl border-b border-slate-200 px-4 sm:px-8 flex items-center justify-between shadow-sm transition-all">
        {/* Left: Active Section Title & Breadcrumb */}
        <div className="flex items-center gap-3 min-w-0">
          <div className="min-w-0">
            <div className="text-[10px] font-mono uppercase tracking-wider text-sky-700 font-bold flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-sky-600" />
              <span>DIVANEX CONSOLE</span>
              <span className="text-slate-400">{"//"}</span>
              <span className="text-slate-600 capitalize">{activeTab}</span>
            </div>
            <h1 className="text-sm sm:text-base font-bold tracking-tight text-slate-900 truncate mt-0.5">
              {getTabTitle()}
            </h1>
          </div>
        </div>

        {/* Center: Global Omni-Search Bar */}
        <div className="hidden md:flex items-center flex-1 max-w-md mx-6">
          <div className="relative w-full">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search leads, companies, services, or scopes..."
              className="w-full pl-10 pr-14 py-2 rounded-xl bg-slate-50 border border-slate-200 hover:border-sky-400 text-xs font-mono text-slate-900 placeholder:text-slate-400 focus:outline-none focus:bg-white focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 transition-all shadow-2xs"
            />
            <div className="absolute right-2.5 top-1/2 -translate-y-1/2 px-1.5 py-0.5 rounded bg-slate-100 border border-slate-200 text-[9px] font-mono text-slate-500 pointer-events-none">
              Ctrl K
            </div>
          </div>
        </div>

        {/* Right Controls: Real-time Clock, Health Badge, Notifications, Public Link */}
        <div className="flex items-center gap-3 shrink-0">
          {/* UTC Live Time Clock */}
          <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-mono text-slate-700 shadow-2xs">
            <Clock className="w-3.5 h-3.5 text-sky-600" />
            <span className="font-bold text-slate-900">{currentTime || "18:45:00 UTC"}</span>
            <span className="text-[10px] text-slate-500 font-semibold">UTC</span>
          </div>

          {/* Supabase Cloud Live Database Pill */}
          <div className="hidden xl:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-mono shadow-2xs">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-600" />
            </span>
            <span className="font-bold">Supabase: Connected</span>
          </div>

          {/* 99.9% SLA Indicator Pill */}
          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-mono shadow-2xs">
            <Activity className="w-3.5 h-3.5 text-emerald-600" />
            <span className="font-bold">99.9% SLA</span>
          </div>

          {/* Notifications Button with Inline Drawer */}
          <div className="relative">
            <button
              type="button"
              onClick={() => {
                setNotificationsOpen(!notificationsOpen);
                if (!notificationsOpen) fetchNotifications();
              }}
              className="relative w-9 h-9 rounded-xl bg-white border border-slate-200 hover:border-sky-400 text-slate-600 hover:text-sky-700 flex items-center justify-center transition-all hover:scale-105 shadow-2xs cursor-pointer"
              title="System Notifications & Client Updates"
            >
              <Bell className="w-4 h-4" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 min-w-4 h-4 px-1 rounded-full bg-sky-600 text-white text-[10px] font-mono font-bold flex items-center justify-center shadow-xs animate-pulse">
                  {unreadCount}
                </span>
              )}
            </button>

            {/* Inline Notifications Dropdown Drawer */}
            {notificationsOpen && (
              <div className="absolute right-0 mt-3 w-80 sm:w-[420px] rounded-2xl bg-white border border-slate-200 shadow-2xl p-4 z-50 animate-fadeIn space-y-3 font-mono">
                <div className="flex items-center justify-between pb-2.5 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <Bell className="w-4 h-4 text-sky-600" />
                    <span className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                      SYSTEM NOTIFICATIONS
                    </span>
                    {unreadCount > 0 && (
                      <span className="px-1.5 py-0.2 rounded-full text-[9px] font-bold bg-sky-100 text-sky-800 border border-sky-300">
                        {unreadCount} NEW
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    {unreadCount > 0 && (
                      <button
                        type="button"
                        onClick={handleMarkAllRead}
                        className="text-[10px] text-sky-700 hover:text-sky-800 font-bold hover:underline flex items-center gap-1 cursor-pointer"
                        title="Mark all as read"
                      >
                        <CheckCheck className="w-3 h-3" />
                        <span>Clear</span>
                      </button>
                    )}
                    <button
                      type="button"
                      onClick={() => setNotificationsOpen(false)}
                      className="text-slate-400 hover:text-slate-700 p-1 rounded cursor-pointer"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Notifications Scroll List */}
                <div className="space-y-2 max-h-80 overflow-y-auto scrollbar-thin pr-1">
                  {notifications.length === 0 ? (
                    <div className="p-6 text-center text-slate-500 text-xs">
                      No notifications recorded.
                    </div>
                  ) : (
                    notifications.map((n) => {
                      const isUnread = !n.read;
                      return (
                        <div
                          key={n.id}
                          onClick={() => {
                            if (isUnread) handleMarkRead(n.id);
                            if (onNotificationClick) onNotificationClick();
                          }}
                          className={`p-3 rounded-xl border transition-all cursor-pointer group space-y-1.5 ${
                            isUnread
                              ? "bg-sky-50/70 border-sky-200 shadow-2xs"
                              : "bg-slate-50 border-slate-200 hover:border-slate-300"
                          }`}
                        >
                          <div className="flex items-center justify-between text-[10px]">
                            <div className="flex items-center gap-1.5 min-w-0">
                              {getNotifIcon(n.type)}
                              <span className="text-slate-900 font-bold group-hover:text-sky-700 truncate">
                                {n.title}
                              </span>
                            </div>
                            <div className="flex items-center gap-1.5 shrink-0">
                              <span className="text-slate-500 text-[9px] font-medium">
                                {new Date(n.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                              </span>
                              {isUnread && (
                                <span className="w-2 h-2 rounded-full bg-sky-600 animate-pulse" />
                              )}
                            </div>
                          </div>

                          <p className="text-[11px] text-slate-600 leading-snug break-words">
                            {n.message}
                          </p>

                          <div className="flex items-center justify-between text-[9px] text-slate-500 pt-1 border-t border-slate-200/60">
                            <span className="truncate">From: {n.senderName}</span>
                            <span className="uppercase px-1.5 py-0.2 rounded bg-slate-100 text-slate-600 font-mono font-bold">
                              {n.type}
                            </span>
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>

                <div className="pt-2 border-t border-slate-100 text-center">
                  <button
                    type="button"
                    onClick={() => {
                      setNotificationsOpen(false);
                      if (onNotificationClick) onNotificationClick();
                    }}
                    className="text-xs text-sky-700 hover:text-sky-800 underline font-bold cursor-pointer"
                  >
                    View Inbound Opportunities in CRM →
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Live Site Direct Shortcut */}
          <Link
            href="/"
            target="_blank"
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-slate-200 hover:border-sky-400 text-xs font-mono font-bold text-slate-700 hover:text-sky-700 transition-all shadow-2xs"
          >
            <span>Live Site</span>
            <ExternalLink className="w-3 h-3 text-sky-600" />
          </Link>

          {/* Sign Out Button in Header */}
          <button
            type="button"
            onClick={async () => {
              await fetch("/api/auth/logout", { method: "POST" }).catch(() => {});
              window.location.assign(new URL("/admin/login", window.location.origin));
            }}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-red-50 hover:bg-red-100 border border-red-200 hover:border-red-300 text-xs font-mono font-bold text-red-700 hover:text-red-800 transition-all shadow-2xs cursor-pointer"
            title="Sign out of Admin Console"
          >
            <LogOut className="w-3.5 h-3.5 text-red-600" />
            <span className="hidden sm:inline">Sign out</span>
          </button>
        </div>
      </header>

    </>
  );
}

