"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  MessageSquare,
  Search,
  Bot,
  User,
  ShieldCheck,
  Headphones,
  Send,
  CheckCircle2,
  AlertCircle,
  Clock,
  Mail,
  Phone,
  ArrowRight,
  Filter,
  Check,
  RefreshCw,
  Power,
  RotateCcw,
  Sparkles,
  Zap,
  ChevronRight,
  AlertTriangle,
  Info,
  Trash2,
  Globe,
  Laptop,
  MapPin,
  Activity,
  Wifi,
  Cpu,
  Monitor,
  Copy,
  ExternalLink,
  Shield,
  X,
  Radio,
  Maximize2
} from "lucide-react";
import { ChatSession, ChatMessage, ClientIntel } from "@/data/chatTypes";
import {
  getAllSessions,
  saveAllSessions,
  subscribeToChatStore,
  adminTakeOverChat,
  adminHandBackToAi,
  sendAdminMessage,
  resolveChatSession,
  markSessionReadByAdmin,
  deleteChatSession,
  clearChatSessions
} from "@/lib/chatStore";

export default function AdminChatsView() {
  const [sessions, setSessions] = useState<ChatSession[]>([]);
  const [selectedSessionId, setSelectedSessionId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "ai_active" | "admin_active" | "resolved">("all");
  const [adminReplyText, setAdminReplyText] = useState("");
  const [adminName, setAdminName] = useState("Alex (Tech Lead)");

  // Modals state
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [copiedIp, setCopiedIp] = useState(false);
  const [copiedJson, setCopiedJson] = useState(false);
  const [copiedUa, setCopiedUa] = useState(false);

  // What just happened, shown above the list. A delete that fails has to say
  // so — the console used to remove the row either way.
  const [notice, setNotice] = useState<string | null>(null);
  const [clearing, setClearing] = useState(false);

  const announce = (message: string) => {
    setNotice(message);
    setTimeout(() => setNotice(null), 5000);
  };

  const handleClear = async (scope: "empty" | "all") => {
    const prompt =
      scope === "empty"
        ? "Delete every conversation that has no messages?"
        : `Delete all ${sessions.length} conversations? This cannot be undone.`;
    if (!confirm(prompt)) return;

    setClearing(true);
    const result = await clearChatSessions(scope);
    setClearing(false);
    announce(result.message);
    if (result.ok) setSelectedSessionId(null);
  };

  const emptyCount = sessions.filter((s) => (s.messages?.length ?? 0) === 0).length;

  const transcriptEndRef = useRef<HTMLDivElement>(null);

  // Subscribe to real-time chat sessions
  useEffect(() => {
    setSessions(getAllSessions());
    const unsubscribe = subscribeToChatStore((updatedSessions) => {
      setSessions(updatedSessions);
    }, { sync: true });
    return () => unsubscribe();
  }, []);

  // Auto-select first session if none selected
  useEffect(() => {
    if (!selectedSessionId && sessions.length > 0) {
      setSelectedSessionId(sessions[0].id);
    }
  }, [sessions, selectedSessionId]);

  // Mark session read on selection
  useEffect(() => {
    if (selectedSessionId) {
      markSessionReadByAdmin(selectedSessionId);
    }
  }, [selectedSessionId]);

  // Auto-scroll transcript to bottom
  const selectedSession = sessions.find((s) => s.id === selectedSessionId) || null;

  useEffect(() => {
    transcriptEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [selectedSession?.messages]);

  // Filtered session list
  const filteredSessions = sessions.filter((s) => {
    const matchesSearch =
      s.userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.userEmail.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.userPhone.includes(searchQuery) ||
      (s.lastMessageSnippet && s.lastMessageSnippet.toLowerCase().includes(searchQuery.toLowerCase()));

    if (!matchesSearch) return false;
    if (statusFilter === "all") return true;
    return s.status === statusFilter;
  });

  // Action handlers
  const handleTakeOver = () => {
    if (!selectedSessionId) return;
    adminTakeOverChat(selectedSessionId, adminName);
  };

  const handleHandBackToAi = () => {
    if (!selectedSessionId) return;
    adminHandBackToAi(selectedSessionId);
  };

  const handleResolve = () => {
    if (!selectedSessionId) return;
    resolveChatSession(selectedSessionId);
  };

  const handleDeleteSession = async () => {
    if (!selectedSessionId) return;
    const currId = selectedSessionId;

    const ok = await deleteChatSession(currId);
    setShowDeleteModal(false);

    if (!ok) {
      announce("Could not delete that conversation. Nothing was removed.");
      return;
    }

    const remaining = sessions.filter((s) => s.id !== currId);
    setSelectedSessionId(remaining.length > 0 ? remaining[0].id : null);
    announce("Conversation deleted.");
  };

  const handleQuickDelete = async (e: React.MouseEvent, sessionId: string) => {
    e.stopPropagation();

    const ok = await deleteChatSession(sessionId);
    if (!ok) {
      announce("Could not delete that conversation. Nothing was removed.");
      return;
    }

    const remaining = sessions.filter((s) => s.id !== sessionId);
    if (selectedSessionId === sessionId) {
      if (remaining.length > 0) {
        setSelectedSessionId(remaining[0].id);
      } else {
        setSelectedSessionId(null);
      }
    }
  };

  const handleCopyIp = (ip: string) => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(ip);
      setCopiedIp(true);
      setTimeout(() => setCopiedIp(false), 2000);
    }
  };

  const handleCopyJson = (data: unknown) => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(JSON.stringify(data, null, 2));
      setCopiedJson(true);
      setTimeout(() => setCopiedJson(false), 2000);
    }
  };

  const handleCopyUa = (ua: string) => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(ua);
      setCopiedUa(true);
      setTimeout(() => setCopiedUa(false), 2000);
    }
  };

  const handleSendAdminReply = (e?: React.FormEvent, cannedText?: string) => {
    if (e) e.preventDefault();
    const text = cannedText || adminReplyText;
    if (!text.trim() || !selectedSessionId) return;

    sendAdminMessage(selectedSessionId, text, adminName);
    setAdminReplyText("");
  };

  // Canned quick responses for Admin
  const cannedResponses = [
    "Hi, I am reviewing your project requirements right now.",
    "Let's schedule a 20-minute Zoom technical discovery call.",
    "I can send over a custom architectural proposal & ballpark estimate.",
    "Could you share more details about your target user volume and integrations?"
  ];

  // Fallback / default intel for display
  const intel: ClientIntel = selectedSession?.clientIntel || {
    ip: "103.21.244.15",
    country: "India",
    countryCode: "IN",
    city: "New Delhi",
    region: "Delhi",
    timezone: "Asia/Kolkata",
    localTime: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    browser: "Google Chrome",
    browserVersion: "128.0.0.0",
    os: "Windows 11",
    deviceType: "Desktop",
    screenResolution: "1920 x 1080",
    windowSize: "1536 x 864",
    colorDepth: "24-bit",
    devicePixelRatio: 1.25,
    cpuCores: 16,
    deviceMemoryGb: 16,
    language: "en-US",
    languages: ["en-US", "en-IN", "hi"],
    connectionType: "4G / Broadband",
    downlinkSpeed: "45 Mbps",
    roundTripTime: "18 ms",
    referrerUrl: "https://www.google.com",
    currentPageUrl: typeof window !== "undefined" ? window.location.href : "https://divanex.vercel.app/services",
    platform: "Win32",
    cookiesEnabled: true,
    online: true,
    touchPoints: 0,
    batteryStatus: "AC Power Connected (100%)"
  };

  return (
    <div className="space-y-4 animate-fadeIn font-mono">
      {/* Main 2-Column Live Console Layout in Clean Light Theme */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden min-h-[680px]">
        {/* ========================================================================= */}
        {/* LEFT COLUMN: SESSIONS LIST & FILTER (4 COLS) */}
        {/* ========================================================================= */}
        <div className="lg:col-span-4 border-r border-slate-200 flex flex-col bg-slate-50/50">
          {/* Search & Filters */}
          <div className="p-4 border-b border-slate-200 space-y-3 bg-white">
            <div className="relative">
              <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search by name, email, phone..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-xs rounded-xl bg-slate-50 border border-slate-300 focus:outline-none focus:bg-white focus:border-sky-500 text-slate-900 placeholder:text-slate-400 transition-all"
              />
            </div>

            {/* Filter Chips in Light Theme */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
              <button
                type="button"
                onClick={() => setStatusFilter("all")}
                className={`px-2.5 py-1 rounded-lg font-medium whitespace-nowrap transition-colors cursor-pointer ${
                  statusFilter === "all"
                    ? "bg-sky-600 text-white font-bold shadow-2xs"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200"
                }`}
              >
                All ({sessions.length})
              </button>
              <button
                type="button"
                onClick={() => setStatusFilter("ai_active")}
                className={`px-2.5 py-1 rounded-lg font-medium whitespace-nowrap transition-colors cursor-pointer ${
                  statusFilter === "ai_active"
                    ? "bg-emerald-600 text-white font-bold shadow-2xs"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200"
                }`}
              >
                AI Active
              </button>
              <button
                type="button"
                onClick={() => setStatusFilter("admin_active")}
                className={`px-2.5 py-1 rounded-lg font-medium whitespace-nowrap transition-colors cursor-pointer ${
                  statusFilter === "admin_active"
                    ? "bg-purple-600 text-white font-bold shadow-2xs"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200"
                }`}
              >
                Admin Live
              </button>
              <button
                type="button"
                onClick={() => setStatusFilter("resolved")}
                className={`px-2.5 py-1 rounded-lg font-medium whitespace-nowrap transition-colors cursor-pointer ${
                  statusFilter === "resolved"
                    ? "bg-slate-800 text-white font-bold shadow-2xs"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200"
                }`}
              >
                Resolved
              </button>
            </div>

            {/* Bulk clear. Empty conversations accumulate from visitors who
                open the widget and never type. */}
            <div className="flex items-center gap-2 mt-2.5">
              <button
                type="button"
                onClick={() => handleClear("empty")}
                disabled={clearing || emptyCount === 0}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 transition-colors disabled:opacity-40 cursor-pointer"
              >
                <Trash2 className="w-3 h-3" />
                <span>Clear empty{emptyCount > 0 ? ` (${emptyCount})` : ""}</span>
              </button>
              <button
                type="button"
                onClick={() => handleClear("all")}
                disabled={clearing || sessions.length === 0}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-semibold bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 transition-colors disabled:opacity-40 cursor-pointer"
              >
                <Trash2 className="w-3 h-3" />
                <span>Delete all</span>
              </button>
            </div>

            {notice && (
              <div className="mt-2.5 flex items-center gap-2 p-2.5 rounded-lg bg-sky-50 border border-sky-200 text-sky-800 text-[11px]">
                <Info className="w-3.5 h-3.5 shrink-0" />
                <span>{notice}</span>
              </div>
            )}
          </div>

          {/* Session Cards List in Light Theme */}
          <div className="flex-1 overflow-y-auto divide-y divide-slate-200 max-h-[600px]">
            {filteredSessions.length === 0 ? (
              <div className="p-8 text-center text-slate-500 text-xs">
                No support sessions match your filter.
              </div>
            ) : (
              filteredSessions.map((session) => {
                const isSelected = session.id === selectedSessionId;
                return (
                  <div
                    key={session.id}
                    onClick={() => setSelectedSessionId(session.id)}
                    className={`p-4 cursor-pointer transition-all border-l-4 ${
                      isSelected
                        ? "bg-sky-50/90 border-l-sky-600 shadow-2xs"
                        : "border-l-transparent hover:bg-slate-100/70"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <div
                          className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-xs ${
                            isSelected
                              ? "bg-sky-600 text-white shadow-2xs"
                              : "bg-slate-200 text-slate-700"
                          }`}
                        >
                          {session.userName ? session.userName.charAt(0).toUpperCase() : "U"}
                        </div>
                        <div className="min-w-0">
                          <h4 className="text-xs font-bold text-slate-900 truncate font-sans">
                            {session.userName || "Anonymous Visitor"}
                          </h4>
                          <span className="text-[11px] text-slate-500 truncate block font-sans">
                            {session.userEmail || session.userPhone || "Live Guest"}
                          </span>
                        </div>
                      </div>

                      <div className="flex flex-col items-end shrink-0 gap-1">
                        <div className="flex items-center gap-1.5">
                          <span className="text-[10px] text-slate-500 font-mono">
                            {!session.updatedAt || isNaN(new Date(session.updatedAt).getTime())
                              ? "Live"
                              : new Date(session.updatedAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                          </span>
                          <button
                            type="button"
                            onClick={(e) => handleQuickDelete(e, session.id)}
                            title="Delete this chat session"
                            className="p-1 rounded-md text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        {session.unreadAdminCount > 0 && (
                          <span className="mt-0.5 px-1.5 py-0.2 bg-rose-600 text-white text-[10px] font-bold rounded-full">
                            {session.unreadAdminCount}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Status & Snippet */}
                    <div className="mt-2 text-xs text-slate-600 font-sans line-clamp-1">
                      {session.lastMessageSnippet || "No messages yet"}
                    </div>

                    <div className="mt-2.5 flex items-center gap-2">
                      <span
                        className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-medium ${
                          session.status === "admin_active"
                            ? "bg-purple-50 text-purple-800 border border-purple-200 font-bold"
                            : session.status === "ai_active"
                            ? "bg-emerald-50 text-emerald-800 border border-emerald-200 font-bold"
                            : "bg-slate-100 text-slate-700 border border-slate-200 font-medium"
                        }`}
                      >
                        {session.status === "admin_active" ? (
                          <>
                            <Headphones className="w-2.5 h-2.5 text-purple-600" />
                            <span>Admin Joined</span>
                          </>
                        ) : session.status === "ai_active" ? (
                          <>
                            <Bot className="w-2.5 h-2.5 text-emerald-600" />
                            <span>AI Responding</span>
                          </>
                        ) : (
                          <>
                            <Check className="w-2.5 h-2.5 text-slate-600" />
                            <span>Resolved</span>
                          </>
                        )}
                      </span>

                      <span className="text-[10px] text-slate-500 font-mono">
                        {session.messages.length} msg{session.messages.length === 1 ? "" : "s"}
                      </span>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* ========================================================================= */}
        {/* RIGHT COLUMN: LIVE CHAT ROOM & ADMIN TAKEOVER (8 COLS) */}
        {/* ========================================================================= */}
        <div className="lg:col-span-8 flex flex-col bg-white">
          {selectedSession ? (
            <>
              {/* User Metadata & Control Toolbar in Light Theme */}
              <div className="p-4 border-b border-slate-200 flex flex-wrap items-center justify-between gap-3 bg-slate-50/80">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-sky-600 to-blue-700 text-white flex items-center justify-center font-bold text-sm shadow-xs">
                    {selectedSession.userName ? selectedSession.userName.charAt(0).toUpperCase() : "U"}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold text-sm text-slate-900 font-sans">
                        {selectedSession.userName}
                      </h3>
                      {selectedSession.isVerified ? (
                        <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                          <ShieldCheck className="w-3 h-3 text-emerald-600" /> OTP Verified
                        </span>
                      ) : (
                        <span className="text-[10px] text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
                          Unverified
                        </span>
                      )}
                    </div>
                    <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 mt-0.5 font-sans">
                      <span className="flex items-center gap-1">
                        <Mail className="w-3 h-3 text-slate-400" /> {selectedSession.userEmail || "N/A"}
                      </span>
                      <span className="flex items-center gap-1">
                        <Phone className="w-3 h-3 text-slate-400" /> {selectedSession.userPhone || "N/A"}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Control Actions (Details, Take Over/Hand Back, Resolve, Delete) */}
                <div className="flex flex-wrap items-center gap-2">
                  {/* Client Details / Telemetry Intel Button */}
                  <button
                    type="button"
                    onClick={() => setShowDetailsModal(true)}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-sky-50 hover:bg-sky-100 text-sky-800 text-xs font-semibold rounded-xl border border-sky-200 transition-colors cursor-pointer shadow-2xs"
                    title="View Full Client IP & Browser Intelligence"
                  >
                    <Info className="w-3.5 h-3.5 text-sky-600" />
                    <span>Details</span>
                  </button>

                  {/* Takeover Control Actions */}
                  {selectedSession.status === "ai_active" ? (
                    <button
                      type="button"
                      onClick={handleTakeOver}
                      className="flex items-center gap-1.5 px-3.5 py-1.5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-xs font-semibold rounded-xl shadow-md transition-all cursor-pointer"
                    >
                      <Headphones className="w-3.5 h-3.5" />
                      <span>Take Over Chat (Join)</span>
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={handleHandBackToAi}
                      className="flex items-center gap-1.5 px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold rounded-xl shadow-md transition-all cursor-pointer"
                    >
                      <Bot className="w-3.5 h-3.5" />
                      <span>Hand Back to AI</span>
                    </button>
                  )}

                  <button
                    type="button"
                    onClick={handleResolve}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-white hover:bg-slate-100 text-slate-700 text-xs font-semibold rounded-xl border border-slate-300 transition-colors cursor-pointer shadow-2xs"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Resolve</span>
                  </button>

                  {/* Delete Chat Button */}
                  <button
                    type="button"
                    onClick={() => setShowDeleteModal(true)}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-rose-50 hover:bg-rose-100 text-rose-700 text-xs font-semibold rounded-xl border border-rose-200 transition-colors cursor-pointer shadow-2xs"
                    title="Delete Chat Session"
                  >
                    <Trash2 className="w-3.5 h-3.5 text-rose-600" />
                    <span>Delete</span>
                  </button>
                </div>
              </div>

              {/* Status Alert Banner in Light Theme */}
              {selectedSession.status === "admin_active" ? (
                <div className="px-4 py-2 bg-purple-50 border-b border-purple-200 flex items-center justify-between text-xs text-purple-900">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-purple-600 animate-ping"></span>
                    <span className="font-semibold font-sans">
                      Admin Mode Active: Automated AI replies are PAUSED. You are chatting live with the client.
                    </span>
                  </div>
                  <span className="font-mono text-[11px] opacity-75 font-semibold">
                    Assigned: {selectedSession.adminAssigned || adminName}
                  </span>
                </div>
              ) : (
                <div className="px-4 py-2 bg-emerald-50 border-b border-emerald-200 flex items-center justify-between text-xs text-emerald-900">
                  <div className="flex items-center gap-2">
                    <Bot className="w-4 h-4 text-emerald-600" />
                    <span className="font-sans font-medium">
                      Autonomous AI Mode: DT AI Bot is actively replying to user queries in real-time.
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={handleTakeOver}
                    className="text-xs text-emerald-800 hover:text-emerald-950 font-bold underline cursor-pointer"
                  >
                    click &quot;Take Over&quot; to join
                  </button>
                </div>
              )}

              {/* Transcript Chat Body in Light Theme */}
              <div className="flex-1 p-4 overflow-y-auto space-y-4 max-h-[460px] bg-slate-50/30">
                {selectedSession.messages.map((msg) => {
                  const isUser = msg.sender === "user";
                  const isAdmin = msg.sender === "admin";
                  const isAi = msg.sender === "ai";
                  const isSystem = msg.sender === "system";

                  if (isSystem) {
                    return (
                      <div key={msg.id} className="flex items-center justify-center my-2">
                        <div className="px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-slate-600 text-[11px] font-sans text-center">
                          {msg.text}
                        </div>
                      </div>
                    );
                  }

                  return (
                    <div
                      key={msg.id}
                      className={`flex items-start gap-2.5 ${
                        isAdmin ? "justify-end" : "justify-start"
                      }`}
                    >
                      {!isAdmin && (
                        <div
                          className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 text-xs font-bold ${
                            isUser
                              ? "bg-slate-800 text-white"
                              : "bg-sky-600 text-white"
                          }`}
                        >
                          {isUser ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                        </div>
                      )}

                      <div className={`max-w-[78%] ${isAdmin ? "items-end" : "items-start"}`}>
                        <div
                          className={`p-3 rounded-2xl text-xs font-sans shadow-2xs leading-relaxed ${
                            isAdmin
                              ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-tr-xs"
                              : isUser
                              ? "bg-white border border-slate-200 text-slate-900 rounded-tl-xs"
                              : "bg-sky-50 border border-sky-200 text-slate-900 rounded-tl-xs"
                          }`}
                        >
                          <div className="flex items-center justify-between gap-4 mb-1 text-[10px] opacity-75 font-semibold font-mono">
                            <span>{isAdmin ? "You (Admin)" : isAi ? "DT AI Assistant" : selectedSession.userName}</span>
                            <span>
                              {new Date(msg.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                            </span>
                          </div>
                          <div className="text-slate-900 font-normal">
                            {msg.text}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
                <div ref={transcriptEndRef} />
              </div>

              {/* Admin Canned Quick Responses in Light Theme */}
              <div className="p-2.5 bg-slate-100 border-t border-slate-200">
                <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
                  <span className="text-[11px] font-semibold text-slate-500 shrink-0 font-sans">Quick Canned:</span>
                  {cannedResponses.map((cr, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => handleSendAdminReply(undefined, cr)}
                      className="px-2.5 py-1 text-[11px] rounded-lg bg-white hover:bg-sky-50 text-slate-700 hover:text-sky-800 border border-slate-200 hover:border-sky-300 whitespace-nowrap transition-colors cursor-pointer shadow-2xs font-sans"
                    >
                      {cr.substring(0, 32)}...
                    </button>
                  ))}
                </div>
              </div>

              {/* Admin Live Input Bar in Light Theme */}
              <div className="p-3.5 bg-white border-t border-slate-200">
                <form onSubmit={(e) => handleSendAdminReply(e)} className="flex items-center gap-2">
                  <input
                    type="text"
                    placeholder="Type live admin message (will send directly to user and pause AI)..."
                    value={adminReplyText}
                    onChange={(e) => setAdminReplyText(e.target.value)}
                    className="flex-1 px-4 py-2.5 text-xs sm:text-sm rounded-xl bg-slate-50 border border-slate-300 focus:outline-none focus:bg-white focus:border-purple-500 text-slate-900 placeholder:text-slate-400 font-sans"
                  />
                  <button
                    type="submit"
                    disabled={!adminReplyText.trim()}
                    className={`px-4 py-2.5 rounded-xl font-semibold text-xs sm:text-sm flex items-center gap-2 transition-all cursor-pointer ${
                      adminReplyText.trim()
                        ? "bg-purple-600 hover:bg-purple-500 text-white shadow-md cursor-pointer"
                        : "bg-slate-200 text-slate-400 cursor-not-allowed"
                    }`}
                  >
                    <span>Send</span>
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </form>
              </div>
            </>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center p-8 text-center text-slate-400">
              <MessageSquare className="w-12 h-12 mb-2 text-slate-300" />
              <p className="text-sm font-medium font-sans">Select a chat session from the left pane to monitor or join.</p>
            </div>
          )}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 1. CLIENT INTELLIGENCE & BROWSER TELEMETRY MODAL (LIGHT THEME) */}
      {/* ========================================================================= */}
      {showDetailsModal && selectedSession && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs animate-fadeIn font-sans">
          <div className="bg-white border border-slate-200 rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] flex flex-col overflow-hidden animate-scaleUp">
            {/* Modal Header */}
            <div className="p-4 sm:p-5 border-b border-slate-200 flex items-center justify-between bg-slate-50">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-sky-100 border border-sky-200 flex items-center justify-center text-sky-700">
                  <Laptop className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-sm sm:text-base flex items-center gap-2">
                    <span>Client Intelligence & Browser Telemetry</span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 border border-emerald-300 font-bold">
                      LIVE
                    </span>
                  </h3>
                  <p className="text-xs text-slate-500 font-mono mt-0.5">
                    Session: {selectedSession.id} • {selectedSession.userName}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setShowDetailsModal(false)}
                className="w-8 h-8 rounded-lg bg-white border border-slate-200 hover:bg-slate-100 text-slate-500 hover:text-slate-800 flex items-center justify-center transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Scrollable Body */}
            <div className="p-5 sm:p-6 overflow-y-auto space-y-5 max-h-[calc(90vh-140px)]">
              {/* Highlighted IP & Geolocation Box */}
              <div className="p-4 rounded-xl bg-gradient-to-br from-sky-50 to-blue-50/50 border border-sky-200 space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <Globe className="w-4 h-4 text-sky-600" />
                    <span className="text-xs font-bold text-sky-950 uppercase tracking-wider font-mono">
                      Network IP & Geolocation
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-xs sm:text-sm text-sky-900 bg-white px-2.5 py-1 rounded-lg border border-sky-200 shadow-2xs">
                      {intel.ip || "103.21.244.15"}
                    </span>
                    <button
                      type="button"
                      onClick={() => handleCopyIp(intel.ip || "103.21.244.15")}
                      className="px-2.5 py-1 rounded-lg bg-white hover:bg-sky-100 text-sky-700 border border-sky-300 text-xs font-medium flex items-center gap-1 transition-colors cursor-pointer"
                    >
                      {copiedIp ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedIp ? "Copied" : "Copy IP"}</span>
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 text-xs font-mono">
                  <div className="p-2.5 rounded-lg bg-white/80 border border-sky-100">
                    <span className="text-[10px] text-slate-500 block uppercase">Country</span>
                    <span className="font-bold text-slate-900">
                      {intel.country || "India"} ({intel.countryCode || "IN"})
                    </span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-white/80 border border-sky-100">
                    <span className="text-[10px] text-slate-500 block uppercase">City & Region</span>
                    <span className="font-bold text-slate-900">
                      {intel.city || "New Delhi"}, {intel.region || "Delhi"}
                    </span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-white/80 border border-sky-100">
                    <span className="text-[10px] text-slate-500 block uppercase">Timezone</span>
                    <span className="font-bold text-slate-900 truncate block">
                      {intel.timezone || "Asia/Kolkata"}
                    </span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-white/80 border border-sky-100">
                    <span className="text-[10px] text-slate-500 block uppercase">Local Time</span>
                    <span className="font-bold text-slate-900">
                      {intel.localTime || new Date().toLocaleTimeString()}
                    </span>
                  </div>
                </div>
              </div>

              {/* Grid 2: Device, Browser & Hardware Telemetry */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider font-mono flex items-center gap-1.5">
                  <Monitor className="w-3.5 h-3.5 text-slate-600" />
                  <span>Browser, OS & Device Hardware</span>
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                    <span className="text-[10px] font-mono text-slate-500 uppercase block">Browser</span>
                    <span className="font-bold text-slate-900">
                      {intel.browser || "Google Chrome"} {intel.browserVersion ? `v${intel.browserVersion}` : ""}
                    </span>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                    <span className="text-[10px] font-mono text-slate-500 uppercase block">Operating System</span>
                    <span className="font-bold text-slate-900">
                      {intel.os || "Windows 11"}
                    </span>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                    <span className="text-[10px] font-mono text-slate-500 uppercase block">Device Form Factor</span>
                    <span className="font-bold text-slate-900">
                      {intel.deviceType || "Desktop"} ({intel.platform || "Win32"})
                    </span>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                    <span className="text-[10px] font-mono text-slate-500 uppercase block">Screen Resolution</span>
                    <span className="font-mono font-bold text-slate-900">
                      {intel.screenResolution || "1920 x 1080"}
                    </span>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                    <span className="text-[10px] font-mono text-slate-500 uppercase block">Viewport Window Size</span>
                    <span className="font-mono font-bold text-slate-900">
                      {intel.windowSize || "1536 x 864"}
                    </span>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                    <span className="text-[10px] font-mono text-slate-500 uppercase block">Display Depth & Ratio</span>
                    <span className="font-mono font-bold text-slate-900">
                      {intel.colorDepth || "24-bit"} • {intel.devicePixelRatio || 1.25}x
                    </span>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                    <span className="text-[10px] font-mono text-slate-500 uppercase block">CPU Threads</span>
                    <span className="font-mono font-bold text-slate-900">
                      {intel.cpuCores ? `${intel.cpuCores} Logical Cores` : "16 Cores"}
                    </span>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                    <span className="text-[10px] font-mono text-slate-500 uppercase block">Device RAM</span>
                    <span className="font-mono font-bold text-slate-900">
                      {intel.deviceMemoryGb ? `${intel.deviceMemoryGb} GB+` : "16 GB"}
                    </span>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                    <span className="text-[10px] font-mono text-slate-500 uppercase block">Battery & Power</span>
                    <span className="font-mono font-bold text-slate-900">
                      {intel.batteryStatus || "AC Connected (100%)"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Grid 3: Network, Locale & Ingress Source */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider font-mono flex items-center gap-1.5">
                  <Wifi className="w-3.5 h-3.5 text-slate-600" />
                  <span>Network Speed, Locale & Ingress Source</span>
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                    <span className="text-[10px] font-mono text-slate-500 uppercase block">Network Type</span>
                    <span className="font-bold text-slate-900">
                      {intel.connectionType || "4G / Broadband"}
                    </span>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                    <span className="text-[10px] font-mono text-slate-500 uppercase block">Downlink Bandwidth</span>
                    <span className="font-mono font-bold text-slate-900">
                      {intel.downlinkSpeed || "45 Mbps"}
                    </span>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                    <span className="text-[10px] font-mono text-slate-500 uppercase block">Round-Trip Latency (RTT)</span>
                    <span className="font-mono font-bold text-emerald-700">
                      {intel.roundTripTime || "18 ms"}
                    </span>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                    <span className="text-[10px] font-mono text-slate-500 uppercase block">Primary Language</span>
                    <span className="font-bold text-slate-900">
                      {intel.language || "en-US"}
                    </span>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 sm:col-span-2">
                    <span className="text-[10px] font-mono text-slate-500 uppercase block">Accepted Locales</span>
                    <span className="font-mono font-bold text-slate-900 truncate block">
                      {intel.languages?.join(", ") || "en-US, en-IN, hi"}
                    </span>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 sm:col-span-3">
                    <span className="text-[10px] font-mono text-slate-500 uppercase block">Current Active Page</span>
                    <span className="font-mono text-slate-900 text-[11px] truncate block">
                      {intel.currentPageUrl || "https://divanex.vercel.app/services"}
                    </span>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 sm:col-span-3">
                    <span className="text-[10px] font-mono text-slate-500 uppercase block">Traffic Referrer Source</span>
                    <span className="font-mono text-slate-900 text-[11px] truncate block">
                      {intel.referrerUrl || "Direct Ingress / Bookmark"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Raw User-Agent Block */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-slate-600 font-bold uppercase">Raw User-Agent Header</span>
                  <button
                    type="button"
                    onClick={() => handleCopyUa(intel.userAgent || navigator.userAgent)}
                    className="text-sky-700 hover:text-sky-800 font-semibold flex items-center gap-1 cursor-pointer"
                  >
                    {copiedUa ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                    <span>{copiedUa ? "Copied" : "Copy UA"}</span>
                  </button>
                </div>
                <div className="p-3 rounded-xl bg-slate-900 text-slate-200 font-mono text-[11px] leading-relaxed break-all select-all">
                  {intel.userAgent || (typeof window !== "undefined" ? navigator.userAgent : "Mozilla/5.0...")}
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 border-t border-slate-200 bg-slate-50 flex items-center justify-between gap-3">
              <button
                type="button"
                onClick={() => handleCopyJson({ session: selectedSession, clientIntel: intel })}
                className="px-4 py-2 rounded-xl bg-white hover:bg-slate-100 text-slate-700 border border-slate-300 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer shadow-2xs font-mono"
              >
                {copiedJson ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedJson ? "Exported to Clipboard!" : "Copy Telemetry JSON"}</span>
              </button>

              <button
                type="button"
                onClick={() => setShowDetailsModal(false)}
                className="px-5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold transition-colors cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 2. DELETE CHAT CONFIRMATION MODAL (LIGHT THEME) */}
      {/* ========================================================================= */}
      {showDeleteModal && selectedSession && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs animate-fadeIn font-sans">
          <div className="bg-white border border-slate-200 rounded-2xl shadow-2xl w-full max-w-md p-6 space-y-5 animate-scaleUp">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-rose-100 border border-rose-200 flex items-center justify-center text-rose-600 shrink-0">
                <Trash2 className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-base">
                  Delete Chat Session?
                </h3>
                <p className="text-xs text-slate-500 font-mono mt-0.5">
                  ID: {selectedSession.id}
                </p>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700 space-y-1 leading-relaxed">
              <p>
                Are you sure you want to permanently delete the chat history with <strong>{selectedSession.userName}</strong> ({selectedSession.userEmail})?
              </p>
              <p className="text-slate-500 font-mono text-[11px] pt-1">
                • {selectedSession.messages.length} message(s) and client telemetry will be deleted.
              </p>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-colors cursor-pointer"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleDeleteSession}
                className="px-5 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold flex items-center gap-1.5 shadow-md transition-colors cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Confirm Delete</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
