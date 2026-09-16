"use client";

import React, { useState, useEffect, useRef, useTransition } from "react";
import { useSiteConfig } from "@/context/SiteConfigContext";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  MessageSquare,
  X,
  Send,
  Sparkles,
  Bot,
  UserCheck,
  ShieldCheck,
  Mail,
  Phone,
  User,
  RotateCcw,
  Minimize2,
  Maximize2,
  CheckCircle2,
  AlertCircle,
  Copy,
  Check,
  Headphones,
  Zap,
  ArrowRight,
  Volume2,
  VolumeX,
  ThumbsUp,
  ThumbsDown,
  Download,
  FileText,
  Calendar,
  Paperclip,
  HelpCircle,
  AlertTriangle
} from "lucide-react";
import {
  ChatSession,
  ChatMessage,
  LeadVerificationForm
} from "@/data/chatTypes";
import {
  getAllSessions,
  getUserActiveSessionId,
  setUserActiveSessionId,
  createPendingLeadSession,
  verifySessionOtp,
  resendSessionOtp,
  sendUserMessage,
  subscribeToChatStore,
  markSessionReadByUser,
  updateSessionClientIntel,
  getChatToken,
  setChatToken,
} from "@/lib/chatStore";
import { collectBrowserIntel } from "@/lib/clientIntel";


// Synthesised soft audio chime for incoming messages (zero external audio dependency)
function playNotificationChime() {
  try {
    const AudioContextClass =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioContextClass) return;
    const ctx = new AudioContextClass();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = "sine";
    osc.frequency.setValueAtTime(587.33, ctx.currentTime); // D5
    osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.12); // A5

    gain.gain.setValueAtTime(0.08, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.25);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.25);
  } catch {
    // AudioContext blocked or not allowed yet
  }
}

// Simple Markdown Formatter Helper for Chat Bubbles
function renderFormattedMessage(text: string) {
  const parts = text.split("\n");

  return (
    <div className="space-y-1.5 text-xs sm:text-[13px] leading-relaxed">
      {parts.map((paragraph, pIdx) => {
        if (!paragraph.trim()) return <div key={pIdx} className="h-1" />;

        // Handle Bullet Points
        const isBullet = paragraph.trim().startsWith("•") || paragraph.trim().startsWith("-");
        const cleanPara = isBullet ? paragraph.trim().replace(/^[•\-]\s*/, "") : paragraph;

        // Parse Bold (**text**)
        const segmentRegex = /(\*\*.*?\*\*)/g;
        const segments = cleanPara.split(segmentRegex);

        const renderedSegments = segments.map((seg, sIdx) => {
          if (seg.startsWith("**") && seg.endsWith("**")) {
            return (
              <strong key={sIdx} className="font-extrabold text-slate-900">
                {seg.slice(2, -2)}
              </strong>
            );
          }
          return seg;
        });

        if (isBullet) {
          return (
            <div key={pIdx} className="flex items-start gap-1.5 pl-1">
              <span className="text-sky-600 font-bold shrink-0">•</span>
              <div className="text-slate-800">{renderedSegments}</div>
            </div>
          );
        }

        return (
          <p key={pIdx} className="text-slate-800">
            {renderedSegments}
          </p>
        );
      })}
    </div>
  );
}

export default function AiChatWidget() {
  const pathname = usePathname();

  const siteConfig = useSiteConfig();

  // What the assistant quotes when a visitor asks how to reach a human.
  const aiContacts = {
    contactEmail: siteConfig.contactEmail,
    supportEmail: siteConfig.supportEmail,
    contactPhone: siteConfig.contactPhone,
  };

  // Not on the authenticated surfaces, and not at all when an admin has
  // switched the widget off.
  if (pathname?.startsWith("/admin")) {
    return null;
  }
  if (!siteConfig.enableAiChat) {
    return null;
  }

  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [activeSession, setActiveSession] = useState<ChatSession | null>(null);

  // Custom in-app confirmation modal states (Zero native browser popups!)
  const [showResetModal, setShowResetModal] = useState(false);
  const [copiedMsgId, setCopiedMsgId] = useState<string | null>(null);

  // Form states for Lead Gate
  const [leadForm, setLeadForm] = useState<LeadVerificationForm>({
    name: "",
    email: "",
    phone: ""
  });
  const [leadErrors, setLeadErrors] = useState<{ name?: string; email?: string; phone?: string }>({});
  const [formStep, setFormStep] = useState<"lead" | "otp" | "chat">("lead");
  const [isSendingEmail, setIsSendingEmail] = useState(false);

  // OTP state
  const [otpInput, setOtpInput] = useState("");
  const [otpError, setOtpError] = useState("");
  const [otpNotice, setOtpNotice] = useState("");
  const [resendCooldown, setResendCooldown] = useState(45);
  const [messageFeedback, setMessageFeedback] = useState<Record<string, "up" | "down">>({});

  // Chat message input & typing
  const [inputText, setInputText] = useState("");
  const [isAiTyping, setIsAiTyping] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const [, startTransition] = useTransition();

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const lastMessageCountRef = useRef(0);

  // Auto-scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Sync state with chat store
  useEffect(() => {
    const syncCurrentSession = () => {
      const activeId = getUserActiveSessionId();
      if (!activeId) {
        setFormStep("lead");
        setActiveSession(null);
        return;
      }

      const sessions = getAllSessions();
      const current = sessions.find((s) => s.id === activeId);

      if (!current) {
        setFormStep("lead");
        setActiveSession(null);
        return;
      }

      // Check if new message arrived to play sound
      if (
        soundEnabled &&
        current.messages.length > lastMessageCountRef.current &&
        lastMessageCountRef.current > 0
      ) {
        const lastMsg = current.messages[current.messages.length - 1];
        if (lastMsg && lastMsg.sender !== "user") {
          playNotificationChime();
        }
      }
      lastMessageCountRef.current = current.messages.length;

      setActiveSession(current);

      if (!current.isVerified) {
        setFormStep("otp");
      } else {
        setFormStep("chat");
        setUnreadCount(current.unreadUserCount || 0);
      }
    };

    syncCurrentSession();
    const unsubscribe = subscribeToChatStore(() => {
      syncCurrentSession();
    });

    return () => unsubscribe();
  }, [soundEnabled]);

  // Cooldown timer for OTP
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (formStep === "otp" && resendCooldown > 0) {
      timer = setInterval(() => {
        setResendCooldown((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [formStep, resendCooldown]);

  // Scroll down when messages change or typing changes
  useEffect(() => {
    if (isOpen && !isMinimized && formStep === "chat") {
      scrollToBottom();
      if (activeSession) {
        markSessionReadByUser(activeSession.id);
        setUnreadCount(0);
      }
    }
  }, [activeSession?.messages, isAiTyping, isOpen, isMinimized, formStep]);

  // Lead Form Validation
  const validateLeadForm = () => {
    const errors: { name?: string; email?: string; phone?: string } = {};
    if (!leadForm.name.trim() || leadForm.name.trim().length < 2) {
      errors.name = "Please enter your full name.";
    }
    if (!leadForm.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(leadForm.email.trim())) {
      errors.email = "Please enter a valid business email address.";
    }
    if (!leadForm.phone.trim() || leadForm.phone.trim().length < 7) {
      errors.phone = "Please enter a valid mobile number.";
    }
    setLeadErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Handle Lead Submission -> Trigger SMTP Email & Generate OTP
  const handleLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateLeadForm()) return;

    setIsSendingEmail(true);
    // The code is generated and emailed server-side; nothing about it comes back.
    const { session } = await createPendingLeadSession(leadForm);
    setActiveSession(session);
    setFormStep("otp");
    setResendCooldown(45);
    setOtpNotice(`6-digit code dispatched via SMTP to ${leadForm.email}`);
    setIsSendingEmail(false);

    // Asynchronously collect browser and IP telemetry
    collectBrowserIntel().then((intel) => {
      updateSessionClientIntel(session.id, intel);
    });
  };

  // Handle OTP Verification
  const handleOtpVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeSession) return;

    if (!otpInput.trim() || otpInput.trim().length < 4) {
      setOtpError("Please enter the 6-digit OTP code received on your email.");
      return;
    }

    const result = await verifySessionOtp(activeSession.id, otpInput, aiContacts);
    if (result.success && result.session) {
      setActiveSession(result.session);
      setFormStep("chat");
      setOtpError("");
      if (soundEnabled) playNotificationChime();

      // Collect updated telemetry & push to server
      collectBrowserIntel().then((intel) => {
        const enrichedSession = {
          ...result.session!,
          clientIntel: intel
        };
        updateSessionClientIntel(result.session!.id, intel);

        // Instant push to server, carrying this session's write capability.
        const headers: Record<string, string> = { "Content-Type": "application/json" };
        const chatToken = getChatToken();
        if (chatToken) headers["x-chat-token"] = chatToken;

        fetch("/api/chat", {
          method: "POST",
          headers,
          body: JSON.stringify({ session: enrichedSession })
        })
          .then((res) => res.json())
          .then((data) => {
            if (data?.chatToken) setChatToken(data.chatToken);
          })
          .catch(() => {});
      });
    } else {
      setOtpError(result.message);
    }
  };

  // Handle Resend OTP
  const handleResendOtp = async () => {
    if (!activeSession || resendCooldown > 0) return;
    const result = await resendSessionOtp(activeSession.id);
    if (result.success) {
      setResendCooldown(45);
      setOtpNotice("A fresh verification code has been sent to your email.");
      setOtpError("");
    } else {
      setOtpError(result.message);
    }
  };

  // Copy message text helper
  const handleCopyMessage = (msgId: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedMsgId(msgId);
    setTimeout(() => setCopiedMsgId(null), 2000);
  };

  // Export Transcript helper
  const handleExportTranscript = () => {
    if (!activeSession || activeSession.messages.length === 0) return;
    const header = `=====================================================\nDIVANEX LIVE CHAT TRANSCRIPT\nSession ID: ${activeSession.id}\nUser: ${activeSession.userName} (${activeSession.userEmail})\nPhone: ${activeSession.userPhone}\nDate: ${new Date().toLocaleString()}\n=====================================================\n\n`;
    const body = activeSession.messages
      .map(
        (m) =>
          `[${new Date(m.timestamp).toLocaleTimeString()}] ${
            m.sender === "user" ? activeSession.userName : m.sender === "admin" ? "ADMIN (" + (m.senderName || "Tech Lead") + ")" : "DIVANEX AI"
          }:\n${m.text}\n`
      )
      .join("\n-----------------------------------------------------\n");

    const blob = new Blob([header + body], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `divanex-chat-${activeSession.userName.toLowerCase().replace(/\s+/g, "-")}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // Handle Send Message from User
  const handleSendMessage = (textToSend?: string) => {
    const text = textToSend || inputText;
    if (!text.trim() || !activeSession) return;

    setInputText("");
    startTransition(() => {
      sendUserMessage(
        activeSession.id,
        text,
        (typing) => {
          setIsAiTyping(typing);
        },
        aiContacts
      );
    });

    setTimeout(() => {
      inputRef.current?.focus();
    }, 50);
  };

  // Handle message rating feedback
  const handleRateMessage = (msgId: string, type: "up" | "down") => {
    setMessageFeedback((prev) => ({ ...prev, [msgId]: type }));
  };

  // Execute Confirmed Reset (Zero native browser popup!)
  const confirmResetChat = () => {
    setUserActiveSessionId(null);
    setActiveSession(null);
    setFormStep("lead");
    setLeadForm({ name: "", email: "", phone: "" });
    setOtpInput("");
    setOtpError("");
    setShowResetModal(false);
  };

  return (
    <div className="fixed bottom-5 right-5 z-40 font-sans">
      {/* Floating Toggle Launcher Button */}
      {!isOpen && (
        <button
          onClick={() => {
            setIsOpen(true);
            setIsMinimized(false);
          }}
          className="group relative flex items-center gap-3 px-4 py-3.5 bg-white hover:bg-sky-50/80 text-slate-900 rounded-full shadow-2xl hover:shadow-sky-500/20 transition-all duration-300 transform hover:scale-105 active:scale-95 cursor-pointer border border-sky-200"
          aria-label="Open AI Live Chat Support"
        >
          {/* Subtle Outer Glowing Ring */}
          <span className="absolute -inset-1 rounded-full bg-sky-400/20 blur-md group-hover:blur-lg transition-all"></span>

          <div className="relative flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-tr from-sky-500 to-blue-600 text-white shadow-xs">
            <Bot className="w-5 h-5 text-white" />
            <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-500 border-2 border-white rounded-full animate-pulse"></span>
          </div>

          <div className="relative flex flex-col text-left pr-1">
            <div className="flex items-center gap-1.5">
              <span className="text-[11px] font-bold tracking-wider uppercase text-sky-700">VANI AI LIVE</span>
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping"></span>
            </div>
            <span className="text-xs font-extrabold tracking-tight text-slate-900">Chat with Vani AI</span>
          </div>

          {unreadCount > 0 && (
            <span className="relative flex items-center justify-center w-5 h-5 bg-rose-500 text-white text-[11px] font-bold rounded-full border-2 border-white animate-bounce">
              {unreadCount}
            </span>
          )}
        </button>
      )}

      {/* Minimized Compact Floating Pill */}
      {isOpen && isMinimized && (
        <div
          className="flex items-center justify-between gap-3 px-4 py-2.5 bg-white border border-slate-200/90 rounded-full shadow-2xl hover:shadow-sky-500/20 transition-all duration-300 animate-fadeIn"
          style={{
            boxShadow: "0 10px 25px -5px rgba(24, 154, 145, 0.2), 0 0 0 1px rgba(223, 226, 230, 1)"
          }}
        >
          <div
            onClick={() => setIsMinimized(false)}
            className="flex items-center gap-2.5 cursor-pointer pr-1"
          >
            <div className="relative flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-tr from-sky-600 to-blue-600 text-white shadow-xs">
              <Bot className="w-4 h-4" />
              <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-500 border-2 border-white rounded-full animate-pulse" />
            </div>
            <div className="flex flex-col text-left">
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-extrabold text-slate-900">Vani AI</span>
                <span className="px-1.5 py-0.2 text-[9px] font-mono font-bold rounded-md bg-sky-50 text-sky-800 border border-sky-200">
                  {activeSession?.status === "admin_active" ? "Admin Live" : "Active"}
                </span>
              </div>
              <span className="text-[10px] font-semibold text-emerald-700">Click to expand</span>
            </div>
          </div>

          <div className="flex items-center gap-1 pl-2 border-l border-slate-200">
            <button
              onClick={() => setIsMinimized(false)}
              title="Expand Chat"
              className="p-1.5 rounded-lg text-slate-500 hover:text-sky-700 hover:bg-sky-50 transition-colors cursor-pointer"
            >
              <Maximize2 className="w-4 h-4" />
            </button>
            <button
              onClick={() => setIsOpen(false)}
              title="Close"
              className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Main Solid Light Theme Chat Window (When Expanded) */}
      {isOpen && !isMinimized && (
        <div
          className="relative flex flex-col bg-white border border-slate-200 rounded-3xl shadow-2xl transition-all duration-300 overflow-hidden w-[94vw] sm:w-[420px] md:w-[450px] h-[630px] max-h-[88vh]"
          style={{
            boxShadow: "0 25px 60px -15px rgba(24, 154, 145, 0.22), 0 0 0 1px rgba(223, 226, 230, 1)"
          }}
        >
          {/* ========================================================================= */}
          {/* IN-APP CUSTOM LIGHT CONFIRMATION POPUP (NO BROWSER POPUP) */}
          {/* ========================================================================= */}
          {showResetModal && (
            <div className="absolute inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-5 animate-fadeIn">
              <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-2xl max-w-xs w-full text-center space-y-4">
                <div className="w-12 h-12 rounded-full bg-amber-50 border border-amber-200 text-amber-600 flex items-center justify-center mx-auto shadow-xs">
                  <AlertTriangle className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <h4 className="text-sm font-bold text-slate-900">Start Fresh Chat?</h4>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    This will clear the active conversation and let you verify or start a new support thread.
                  </p>
                </div>
                <div className="flex items-center gap-2 pt-1">
                  <button
                    onClick={() => setShowResetModal(false)}
                    className="flex-1 py-2 text-xs font-semibold rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={confirmResetChat}
                    className="btn-futuristic-primary flex-1 !py-2 text-xs !rounded-xl font-semibold"
                  >
                    Yes, Restart
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Light Theme Header Bar */}
          <div className="flex items-center justify-between px-4 py-3.5 bg-gradient-to-r from-sky-50 via-white to-blue-50/80 border-b border-slate-200/90 select-none">
            <div className="flex items-center gap-2.5">
              <div className="relative flex items-center justify-center w-9 h-9 rounded-2xl bg-gradient-to-tr from-sky-600 to-blue-600 text-white shadow-sm">
                {activeSession?.status === "admin_active" ? (
                  <Headphones className="w-5 h-5 animate-pulse text-white" />
                ) : (
                  <Bot className="w-5 h-5 text-white" />
                )}
                <span
                  className={`absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full border-2 border-white ${
                    activeSession?.status === "admin_active"
                      ? "bg-purple-600 animate-ping"
                      : activeSession?.status === "resolved"
                      ? "bg-slate-400"
                      : "bg-emerald-500"
                  }`}
                />
              </div>

              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <span className="font-extrabold text-sm text-slate-900 tracking-tight">Vani AI</span>
                  <span
                    className={`px-2 py-0.5 text-[10px] font-mono font-bold rounded-md border ${
                      activeSession?.status === "admin_active"
                        ? "bg-purple-50 text-purple-700 border-purple-200"
                        : "bg-sky-100 text-sky-800 border-sky-200"
                    }`}
                  >
                    {activeSession?.status === "admin_active" ? "Admin Live" : "Vani Core"}
                  </span>
                </div>
                <span className="text-[11px] font-medium flex items-center gap-1">
                  {activeSession?.status === "admin_active" ? (
                    <span className="text-purple-700 font-bold">👨‍💻 Senior Tech Lead Connected</span>
                  ) : activeSession?.status === "resolved" ? (
                    <span className="text-slate-500 font-semibold">Session Resolved</span>
                  ) : (
                    <span className="text-emerald-700 font-semibold flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                      Vani AI Active (Sub-1s)
                    </span>
                  )}
                </span>
              </div>
            </div>

            {/* Header Action Controls */}
            <div className="flex items-center gap-1">
              <button
                onClick={() => setSoundEnabled(!soundEnabled)}
                title={soundEnabled ? "Mute notification sound" : "Unmute sound"}
                className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                  soundEnabled ? "text-sky-700 hover:bg-sky-100" : "text-slate-400 hover:bg-slate-100"
                }`}
              >
                {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
              </button>

              {formStep === "chat" && (
                <>
                  <button
                    onClick={handleExportTranscript}
                    title="Download Chat Transcript"
                    className="p-1.5 rounded-lg text-slate-500 hover:text-sky-700 hover:bg-sky-50 transition-colors cursor-pointer"
                  >
                    <Download className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => setShowResetModal(true)}
                    title="Start New Session"
                    className="p-1.5 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-colors cursor-pointer"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </button>
                </>
              )}

              <button
                onClick={() => setIsMinimized(true)}
                title="Minimize"
                className="p-1.5 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-colors cursor-pointer"
              >
                <Minimize2 className="w-4 h-4" />
              </button>

              <button
                onClick={() => setIsOpen(false)}
                title="Close"
                className="p-1.5 rounded-lg text-slate-500 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Body Content */}
          <div className="flex-1 flex flex-col min-h-0 bg-[#f7f9f9]">
              {/* ========================================================================= */}
              {/* STEP 1: LEAD INTAKE GATE (LIGHT THEME) */}
              {/* ========================================================================= */}
              {formStep === "lead" && (
                <div className="flex-1 overflow-y-auto p-5 sm:p-6 flex flex-col justify-between bg-white">
                  <div className="space-y-4">
                    <div className="p-4 rounded-2xl bg-gradient-to-br from-sky-50 via-blue-50 to-indigo-50/50 border border-sky-100 shadow-xs">
                      <div className="flex items-center gap-2 text-sky-900 font-bold text-sm">
                        <Sparkles className="w-4 h-4 text-sky-600" />
                        <span>Instant Enterprise AI & Tech Consultation</span>
                      </div>
                      <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                        Verify your email via SMTP OTP to unlock instant architecture specs, custom pricing quotes, and direct access to our tech leads.
                      </p>
                    </div>

                    <form onSubmit={handleLeadSubmit} className="space-y-3.5">
                      {/* Name Input */}
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          Full Name *
                        </label>
                        <div className="relative">
                          <User className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
                          <input
                            type="text"
                            required
                            placeholder="e.g. Rajesh Sharma"
                            value={leadForm.name}
                            onChange={(e) => setLeadForm({ ...leadForm, name: e.target.value })}
                            className={`w-full pl-9 pr-3 py-2.5 text-xs sm:text-sm rounded-xl bg-slate-50 border ${
                              leadErrors.name ? "border-rose-500" : "border-slate-300"
                            } focus:outline-none focus:bg-white focus:ring-2 focus:ring-sky-500 text-slate-900 placeholder:text-slate-400 font-medium`}
                          />
                        </div>
                        {leadErrors.name && (
                          <span className="text-[11px] font-medium text-rose-500 mt-0.5 block">{leadErrors.name}</span>
                        )}
                      </div>

                      {/* Email Input */}
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          Work / Business Email *
                        </label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
                          <input
                            type="email"
                            required
                            placeholder="name@company.com"
                            value={leadForm.email}
                            onChange={(e) => setLeadForm({ ...leadForm, email: e.target.value })}
                            className={`w-full pl-9 pr-3 py-2.5 text-xs sm:text-sm rounded-xl bg-slate-50 border ${
                              leadErrors.email ? "border-rose-500" : "border-slate-300"
                            } focus:outline-none focus:bg-white focus:ring-2 focus:ring-sky-500 text-slate-900 placeholder:text-slate-400 font-medium`}
                          />
                        </div>
                        {leadErrors.email && (
                          <span className="text-[11px] font-medium text-rose-500 mt-0.5 block">{leadErrors.email}</span>
                        )}
                      </div>

                      {/* Phone Input */}
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          Mobile / WhatsApp Number *
                        </label>
                        <div className="relative">
                          <Phone className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
                          <input
                            type="tel"
                            required
                            placeholder="+91 98765 43210"
                            value={leadForm.phone}
                            onChange={(e) => setLeadForm({ ...leadForm, phone: e.target.value })}
                            className={`w-full pl-9 pr-3 py-2.5 text-xs sm:text-sm rounded-xl bg-slate-50 border ${
                              leadErrors.phone ? "border-rose-500" : "border-slate-300"
                            } focus:outline-none focus:bg-white focus:ring-2 focus:ring-sky-500 text-slate-900 placeholder:text-slate-400 font-medium`}
                          />
                        </div>
                        {leadErrors.phone && (
                          <span className="text-[11px] font-medium text-rose-500 mt-0.5 block">{leadErrors.phone}</span>
                        )}
                      </div>

                      <button
                        type="submit"
                        disabled={isSendingEmail}
                        className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-gradient-to-r from-sky-600 to-blue-600 hover:from-sky-500 hover:to-blue-500 text-white font-bold text-xs sm:text-sm rounded-xl shadow-md hover:shadow-sky-500/25 transition-all cursor-pointer mt-3"
                      >
                        {isSendingEmail ? (
                          <span>Sending SMTP Verification Email...</span>
                        ) : (
                          <>
                            <span>Send Email OTP & Unlock Chat</span>
                            <ArrowRight className="w-4 h-4" />
                          </>
                        )}
                      </button>
                    </form>
                  </div>

                  <div className="pt-4 text-center border-t border-slate-100">
                    <div className="flex items-center justify-center gap-2 text-[11px] text-slate-500">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                      <span>SMTP 256-bit Encrypted. Zero Spam Guarantee.</span>
                    </div>
                  </div>
                </div>
              )}

              {/* ========================================================================= */}
              {/* STEP 2: OTP VERIFICATION SCREEN (LIGHT THEME) */}
              {/* ========================================================================= */}
              {formStep === "otp" && (
                <div className="flex-1 overflow-y-auto p-5 sm:p-6 flex flex-col justify-between bg-white">
                  <div className="space-y-4">
                    <div className="text-center space-y-1.5">
                      <div className="w-12 h-12 mx-auto rounded-2xl bg-sky-50 border border-sky-100 flex items-center justify-center text-sky-600 mb-2 shadow-xs">
                        <Mail className="w-6 h-6" />
                      </div>
                      <h3 className="text-base font-extrabold text-slate-900">
                        Check Your Inbox
                      </h3>
                      <p className="text-xs text-slate-600">
                        We sent a single-use verification code to:
                      </p>
                      <p className="text-xs font-mono font-bold text-sky-700 bg-sky-50 py-1 px-3 rounded-lg inline-block border border-sky-200">
                        {leadForm.email || activeSession?.userEmail}
                      </p>
                    </div>

                    {/* Security Email Notice */}
                    <div className="p-3.5 bg-sky-50/80 border border-sky-200 rounded-xl flex items-center gap-2.5 text-left">
                      <Mail className="w-5 h-5 text-sky-600 shrink-0" />
                      <div className="text-xs text-slate-600 leading-relaxed">
                        A 6-digit verification code has been dispatched via Gmail SMTP to your email inbox. Please enter the code below to start.
                      </div>
                    </div>

                    {otpNotice && (
                      <div className="text-xs font-medium text-emerald-700 bg-emerald-50 border border-emerald-200 py-2 px-3 rounded-lg flex items-center gap-1.5 justify-center">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>{otpNotice}</span>
                      </div>
                    )}

                    {otpError && (
                      <div className="text-xs font-medium text-rose-700 bg-rose-50 border border-rose-200 py-2 px-3 rounded-lg flex items-center gap-1.5 justify-center">
                        <AlertCircle className="w-3.5 h-3.5 text-rose-600 shrink-0" />
                        <span>{otpError}</span>
                      </div>
                    )}

                    <form onSubmit={handleOtpVerify} className="space-y-4">
                      <div>
                        <input
                          type="text"
                          maxLength={6}
                          placeholder="• • • • • •"
                          value={otpInput}
                          onChange={(e) => setOtpInput(e.target.value.replace(/\D/g, ""))}
                          className="w-full text-center text-2xl tracking-[0.4em] font-mono font-black py-3 rounded-xl bg-slate-50 border-2 border-slate-300 focus:outline-none focus:bg-white focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 text-slate-900"
                          autoFocus
                        />
                      </div>

                      <button
                        type="submit"
                        className="w-full py-3 px-4 bg-gradient-to-r from-sky-600 to-blue-600 hover:from-sky-500 hover:to-blue-500 text-white font-bold text-xs sm:text-sm rounded-xl shadow-md transition-all cursor-pointer"
                      >
                        Verify & Unlock Live AI Support
                      </button>
                    </form>

                    <div className="flex items-center justify-between text-xs text-slate-500 pt-1">
                      <button
                        onClick={() => setFormStep("lead")}
                        className="hover:underline font-semibold text-slate-700 cursor-pointer"
                      >
                        ← Change Email
                      </button>

                      <button
                        onClick={handleResendOtp}
                        disabled={resendCooldown > 0}
                        className={`font-bold ${
                          resendCooldown > 0
                            ? "text-slate-400 cursor-not-allowed"
                            : "text-sky-700 hover:underline cursor-pointer"
                        }`}
                      >
                        {resendCooldown > 0 ? `Resend code in ${resendCooldown}s` : "Resend OTP via SMTP"}
                      </button>
                    </div>
                  </div>

                  <div className="text-center text-[11px] text-slate-400">
                    Need help? Email directly: <span className="font-mono font-semibold text-slate-600">{siteConfig.supportEmail || siteConfig.contactEmail}</span>
                  </div>
                </div>
              )}

              {/* ========================================================================= */}
              {/* STEP 3: ACTIVE LIVE CHAT ROOM (SOLID CRISP LIGHT THEME) */}
              {/* ========================================================================= */}
              {formStep === "chat" && (
                <>
                  {/* Top Action Ribbon */}
                  <div className="px-3 py-1.5 bg-white border-b border-slate-200/80 flex items-center justify-between gap-2 text-[11px] text-slate-600 font-medium overflow-x-auto">
                    <div className="flex items-center gap-1.5 shrink-0">
                      <UserCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span className="font-bold text-slate-800 truncate max-w-[130px]">
                        {activeSession?.userName}
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0">
                      <Link
                        href="/contact"
                        target="_blank"
                        className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 font-bold transition-colors"
                      >
                        <Calendar className="w-3 h-3 text-emerald-600" />
                        <span>Book Call</span>
                      </Link>
                    </div>
                  </div>

                  {/* Message Stream Feed */}
                  <div className="flex-1 overflow-y-auto p-4 space-y-3.5 scroll-smooth bg-[#f7f9f9]">
                    {activeSession?.messages.map((msg: ChatMessage) => {
                      const isUser = msg.sender === "user";
                      const isSystem = msg.sender === "system";
                      const isAdmin = msg.sender === "admin";
                      const isAi = msg.sender === "ai";

                      if (isSystem) {
                        return (
                          <div key={msg.id} className="text-center my-2">
                            <div className="inline-block px-3 py-1.5 rounded-xl text-xs font-semibold bg-amber-50 text-amber-900 border border-amber-200 shadow-2xs max-w-[92%]">
                              {msg.text}
                            </div>
                          </div>
                        );
                      }

                      return (
                        <div
                          key={msg.id}
                          className={`group flex flex-col ${isUser ? "items-end" : "items-start"} space-y-1`}
                        >
                          <div
                            className={`flex items-end gap-2 max-w-[88%] ${
                              isUser ? "flex-row-reverse" : "flex-row"
                            }`}
                          >
                            {/* Avatar */}
                            {!isUser && (
                              <div
                                className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs shrink-0 text-white shadow-xs ${
                                  isAdmin
                                    ? "bg-gradient-to-tr from-purple-600 to-indigo-600"
                                    : "bg-gradient-to-tr from-sky-600 to-blue-600"
                                }`}
                              >
                                {isAdmin ? <Headphones className="w-3.5 h-3.5" /> : <Bot className="w-3.5 h-3.5" />}
                              </div>
                            )}

                            {/* Solid Light Theme Message Bubble */}
                            <div
                              className={`relative p-3.5 rounded-2xl text-xs sm:text-[13px] leading-relaxed shadow-xs ${
                                isUser
                                  ? "bg-gradient-to-r from-sky-600 to-blue-600 text-white rounded-br-xs font-medium"
                                  : isAdmin
                                  ? "bg-purple-50/95 border border-purple-200 text-purple-950 rounded-bl-xs"
                                  : "bg-white border border-slate-200 text-slate-800 rounded-bl-xs"
                              }`}
                            >
                              {isAdmin && (
                                <div className="text-[10px] font-extrabold text-purple-700 uppercase tracking-wider mb-1 flex items-center gap-1">
                                  <span className="w-1.5 h-1.5 rounded-full bg-purple-600 animate-ping"></span>
                                  {msg.senderName || "Senior Admin / Tech Lead"}
                                </div>
                              )}

                              {isUser ? (
                                <p className="whitespace-pre-wrap">{msg.text}</p>
                              ) : (
                                renderFormattedMessage(msg.text)
                              )}
                            </div>
                          </div>

                          {/* Quick Replies (if present on AI message) */}
                          {isAi && msg.quickReplies && msg.quickReplies.length > 0 && (
                            <div className="flex flex-wrap gap-1.5 pl-9 pt-1">
                              {msg.quickReplies.map((qr) => (
                                <button
                                  key={qr.id}
                                  onClick={() => handleSendMessage(qr.payload)}
                                  className="px-3 py-1.5 text-[11px] font-bold rounded-full bg-sky-50 hover:bg-sky-100 text-sky-800 border border-sky-200 transition-all shadow-2xs hover:shadow-xs cursor-pointer"
                                >
                                  {qr.label}
                                </button>
                              ))}
                            </div>
                          )}

                          {/* Message Footer: Timestamp, Copy Button & Reactions */}
                          <div
                            className={`flex items-center gap-2 px-1 text-[10px] text-slate-400 font-mono ${
                              isUser ? "justify-end" : "pl-9"
                            }`}
                          >
                            <span>
                              {new Date(msg.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                            </span>

                            {/* Copy Message Text */}
                            <button
                              onClick={() => handleCopyMessage(msg.id, msg.text)}
                              className="opacity-60 hover:opacity-100 text-slate-500 hover:text-sky-600 transition-opacity cursor-pointer flex items-center gap-0.5"
                              title="Copy Message"
                            >
                              {copiedMsgId === msg.id ? (
                                <Check className="w-3 h-3 text-emerald-600" />
                              ) : (
                                <Copy className="w-3 h-3" />
                              )}
                            </button>

                            {/* Reactions for AI Bot Responses */}
                            {isAi && (
                              <div className="flex items-center gap-1 ml-1 text-slate-400">
                                <button
                                  onClick={() => handleRateMessage(msg.id, "up")}
                                  className={`p-0.5 rounded hover:text-emerald-600 transition-colors cursor-pointer ${
                                    messageFeedback[msg.id] === "up" ? "text-emerald-600 font-bold" : ""
                                  }`}
                                  title="Helpful"
                                >
                                  <ThumbsUp className="w-3 h-3" />
                                </button>
                                <button
                                  onClick={() => handleRateMessage(msg.id, "down")}
                                  className={`p-0.5 rounded hover:text-rose-600 transition-colors cursor-pointer ${
                                    messageFeedback[msg.id] === "down" ? "text-rose-600 font-bold" : ""
                                  }`}
                                  title="Not helpful"
                                >
                                  <ThumbsDown className="w-3 h-3" />
                                </button>
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    })}

                    {/* AI / Admin Typing Indicator */}
                    {isAiTyping && (
                      <div className="flex items-center gap-2 pl-1 pt-1">
                        <div className="w-7 h-7 rounded-lg bg-sky-100 flex items-center justify-center text-sky-700">
                          <Bot className="w-3.5 h-3.5" />
                        </div>
                        <div className="px-3.5 py-2.5 bg-white border border-slate-200 rounded-2xl rounded-bl-xs flex items-center gap-1.5 shadow-xs">
                          <span className="w-2 h-2 rounded-full bg-sky-600 animate-bounce"></span>
                          <span className="w-2 h-2 rounded-full bg-sky-600 animate-bounce [animation-delay:0.2s]"></span>
                          <span className="w-2 h-2 rounded-full bg-sky-600 animate-bounce [animation-delay:0.4s]"></span>
                        </div>
                      </div>
                    )}

                    <div ref={messagesEndRef} />
                  </div>

                  {/* Input Footer Bar (Solid Crisp Light Theme) */}
                  <div className="p-3 bg-white border-t border-slate-200">
                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        handleSendMessage();
                      }}
                      className="flex items-center gap-2"
                    >
                      <input
                        ref={inputRef}
                        type="text"
                        placeholder={
                          activeSession?.status === "admin_active"
                            ? "Type live message to Senior Admin..."
                            : "Ask Vani AI about websites, apps, ERP, AI agents, pricing..."
                        }
                        value={inputText}
                        onChange={(e) => setInputText(e.target.value)}
                        className="flex-1 px-3.5 py-2.5 text-xs sm:text-sm rounded-xl bg-slate-50 border border-slate-300 focus:outline-none focus:bg-white focus:ring-2 focus:ring-sky-500 text-slate-900 placeholder:text-slate-400 font-medium"
                      />
                      <button
                        type="submit"
                        disabled={!inputText.trim()}
                        className={`p-2.5 rounded-xl transition-all ${
                          inputText.trim()
                            ? "bg-gradient-to-r from-sky-600 to-blue-600 hover:from-sky-500 hover:to-blue-500 text-white shadow-md cursor-pointer"
                            : "bg-slate-100 text-slate-400 cursor-not-allowed"
                        }`}
                      >
                        <Send className="w-4 h-4" />
                      </button>
                    </form>

                    <div className="flex items-center justify-between text-[10px] text-slate-400 mt-1.5 px-1">
                      <span className="flex items-center gap-1 text-emerald-700 font-medium">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                        Instant AI Answers 24/7
                      </span>
                      <span>Divanex Real-Time Fabric</span>
                    </div>
                  </div>
                </>
              )}
            </div>
        </div>
      )}
    </div>
  );
}
