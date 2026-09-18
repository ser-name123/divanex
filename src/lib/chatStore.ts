import { ChatMessage, ChatSession, LeadVerificationForm } from "@/data/chatTypes";
import { generateAiBotResponse, type AiContactDetails } from "./aiChatEngine";

// No seeded conversations. Invented clients in a console an operator reads as
// a record of real enquiries are worse than an empty list.

const STORAGE_KEY_SESSIONS = "divanex_live_chat_sessions";
const STORAGE_KEY_ACTIVE_SESSION_ID = "divanex_user_active_session_id";
/** Retired. Read only so it can be cleared from browsers that still hold it. */
const STORAGE_KEY_DELETED_IDS = "divanex_deleted_chat_session_ids";
const BROADCAST_CHANNEL_NAME = "divanex_chat_sync_channel";

/**
 * Clears the keys the old client-side store left behind.
 *
 * Conversations and a list of "deleted" ids used to be kept here, which is
 * what resurrected transcripts the server had never heard of. Any browser that
 * still holds them drops them on first load.
 */
function clearLegacyChatStorage() {
  if (typeof window === "undefined") return;
  try {
    localStorage.removeItem(STORAGE_KEY_DELETED_IDS);
  } catch {
    // Storage can be refused; nothing here is load-bearing.
  }
}

// Helper: Broadcast across open tabs
function broadcastSync(type: string, payload?: unknown) {
  if (typeof window === "undefined") return;
  try {
    const channel = new BroadcastChannel(BROADCAST_CHANNEL_NAME);
    channel.postMessage({ type, payload, timestamp: Date.now() });
    channel.close();
  } catch {
    // Fallback if BroadcastChannel is restricted
  }
}

// Subscribe to store changes
type StoreListener = (sessions: ChatSession[]) => void;
const listeners: Set<StoreListener> = new Set();

/**
 * Replaces the local copy with the server's.
 *
 * Deliberately a replace, not a merge. The merge this used to do meant any
 * browser holding a stale conversation re-introduced it on every sync — which
 * is why deleting one from the console appeared to do nothing, and why
 * transcripts the server had never heard of kept reappearing in the list.
 */
export async function syncSessionsFromServer(): Promise<ChatSession[]> {
  clearLegacyChatStorage();

  try {
    const res = await fetch("/api/chat", { cache: "no-store" });
    if (!res.ok) return getAllSessions();

    const data = await res.json();
    if (data?.success && Array.isArray(data.sessions)) {
      const sessions = (data.sessions as ChatSession[]).sort(
        (a, b) => new Date(b.updatedAt || 0).getTime() - new Date(a.updatedAt || 0).getTime()
      );

      if (typeof window !== "undefined") {
        try {
          localStorage.setItem(STORAGE_KEY_SESSIONS, JSON.stringify(sessions));
        } catch {
          // Storage can be refused; the returned list is what matters.
        }
      }
      return sessions;
    }
  } catch {
    // Offline: keep showing what is on screen rather than emptying it.
  }
  return getAllSessions();
}

/**
 * Watches the local store, and optionally the server's copy.
 *
 * Only the console needs the server: it is the one place that shows every
 * visitor's conversation, and it polls so two admins watching the same chat
 * stay in step. The widget on the public site knows about exactly one
 * conversation — its own — and it already writes that through POST.
 *
 * It used to sync regardless, which meant every visitor's browser asked an
 * admin-only endpoint for the full transcript list every two seconds, was
 * refused, and logged the refusal. The list was never used; the 401 was
 * swallowed and the local copy returned.
 */
export function subscribeToChatStore(listener: StoreListener, options?: { sync?: boolean }) {
  const syncWithServer = options?.sync === true;

  listeners.add(listener);

  if (typeof window !== "undefined") {
    if (syncWithServer) {
      syncSessionsFromServer().then((updated) => {
        listener(updated);
      });
    }

    const handleStorage = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY_SESSIONS || e.key === STORAGE_KEY_DELETED_IDS) {
        listener(getAllSessions());
      }
    };

    let channel: BroadcastChannel | null = null;
    try {
      channel = new BroadcastChannel(BROADCAST_CHANNEL_NAME);
      channel.onmessage = () => {
        listener(getAllSessions());
      };
    } catch {
      // BroadcastChannel unavailable
    }

    // Cross-client sync for the console. Left unset on the public site, where
    // there is nothing to reconcile and nobody authorised to read it.
    const pollInterval = syncWithServer
      ? setInterval(async () => {
          const fresh = await syncSessionsFromServer();
          listener(fresh);
        }, 2000)
      : null;

    window.addEventListener("storage", handleStorage);

    return () => {
      listeners.delete(listener);
      window.removeEventListener("storage", handleStorage);
      if (pollInterval) clearInterval(pollInterval);
      if (channel) channel.close();
    };
  }

  return () => {
    listeners.delete(listener);
  };
}

function notifyAllListeners() {
  const sessions = getAllSessions();
  listeners.forEach((fn) => {
    try {
      fn(sessions);
    } catch (e) {
      console.error(e);
    }
  });
  broadcastSync("SESSIONS_UPDATED");
}

// ----------------------------------------------------
// Public Store API
// ----------------------------------------------------

/**
 * The conversations this browser knows about.
 *
 * For a visitor that is their own thread, kept here so it survives a reload
 * mid-conversation. For the admin console it is whatever the last server sync
 * returned — the console never treats this as a source, only as what it is
 * currently displaying.
 *
 * It no longer seeds itself with invented demo conversations. Those made an
 * empty console look like it held two real enquiries.
 */
export function getAllSessions(): ChatSession[] {
  if (typeof window === "undefined") return [];
  try {
    const data = localStorage.getItem(STORAGE_KEY_SESSIONS);
    if (!data) return [];
    const parsed: ChatSession[] = JSON.parse(data);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function saveAllSessions(sessions: ChatSession[]) {
  if (typeof window === "undefined") return;
  const cleanSessions = sessions;
  try {
    localStorage.setItem(STORAGE_KEY_SESSIONS, JSON.stringify(cleanSessions));
    notifyAllListeners();

    // Sync to the server. The write capability issued for this visitor's own
    // session travels with it; the server applies only the records the token
    // covers and silently ignores the rest, so this can no longer be used to
    // overwrite anyone else's transcript.
    const headers: Record<string, string> = { "Content-Type": "application/json" };
    const chatToken = getChatToken();
    if (chatToken) headers["x-chat-token"] = chatToken;

    fetch("/api/chat", {
      method: "POST",
      headers,
      body: JSON.stringify({ sessions: cleanSessions })
    })
      .then((res) => res.json())
      .then((data) => {
        // Handed out once, when the server first sees this session id.
        if (data?.chatToken) setChatToken(data.chatToken);
      })
      .catch(() => {});
  } catch (err) {
    console.error("Failed to save chat sessions:", err);
  }
}

const STORAGE_KEY_CHAT_TOKEN = "divanex_chat_write_token";

/**
 * Write capability for this visitor's own chat session, issued by the server.
 * It authorises updates to that one session and nothing else.
 */
export function getChatToken(): string | null {
  if (typeof window === "undefined") return null;
  try {
    return localStorage.getItem(STORAGE_KEY_CHAT_TOKEN);
  } catch {
    return null;
  }
}

export function setChatToken(token: string): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY_CHAT_TOKEN, token);
  } catch {
    // Private mode or blocked storage: the session stays local-only.
  }
}

export function getSessionById(sessionId: string): ChatSession | null {
  const sessions = getAllSessions();
  return sessions.find((s) => s.id === sessionId) || null;
}

export function getUserActiveSessionId(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(STORAGE_KEY_ACTIVE_SESSION_ID);
}

export function setUserActiveSessionId(sessionId: string | null) {
  if (typeof window === "undefined") return;
  if (sessionId) {
    localStorage.setItem(STORAGE_KEY_ACTIVE_SESSION_ID, sessionId);
  } else {
    localStorage.removeItem(STORAGE_KEY_ACTIVE_SESSION_ID);
  }
}

// ----------------------------------------------------
// OTP & Lead Verification
// ----------------------------------------------------

// Background helper to call SMTP email API
export async function triggerSmtpEmailDispatch(
  sessionId: string,
  to: string,
  userName: string,
  userPhone?: string
) {
  try {
    // No code is sent from here. The server generates it, stores its digest
    // against this session, and emails it; the browser never sees it.
    const res = await fetch("/api/chat/send-otp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        sessionId,
        email: to,
        name: userName,
        phone: userPhone || ""
      })
    });
    return await res.json();
  } catch {
    return { success: false, error: "Network error" };
  }
}

export async function createPendingLeadSession(
  form: LeadVerificationForm
): Promise<{ session: ChatSession }> {
  const sessions = getAllSessions();
  const sessionId = `sess_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;

  const newSession: ChatSession = {
    id: sessionId,
    userName: form.name.trim(),
    userEmail: form.email.trim().toLowerCase(),
    userPhone: form.phone.trim(),
    isVerified: false,
    otpExpiresAt: Date.now() + 1000 * 60 * 10, // mirrors the server-side TTL
    status: "ai_active",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    lastMessageSnippet: "Pending OTP Verification",
    unreadAdminCount: 1,
    unreadUserCount: 0,
    messages: []
  };

  const updated = [newSession, ...sessions.filter((s) => s.id !== sessionId)];
  saveAllSessions(updated);
  setUserActiveSessionId(sessionId);

  await triggerSmtpEmailDispatch(
    sessionId,
    newSession.userEmail,
    newSession.userName,
    newSession.userPhone
  );

  return { session: newSession };
}

export async function verifySessionOtp(
  sessionId: string,
  inputOtp: string,
  // Threaded from the widget, which reads them from the site config. The
  // assistant used to quote an address and a number that were literals in
  // aiChatEngine and matched nothing in the admin console.
  contacts?: AiContactDetails
): Promise<{ success: boolean; message: string; session?: ChatSession }> {
  const sessions = getAllSessions();
  const index = sessions.findIndex((s) => s.id === sessionId);

  if (index === -1) {
    return { success: false, message: "Session not found. Please try again." };
  }

  const session = sessions[index];

  // The expected code never reaches the browser, so the comparison cannot
  // happen here. This used to match against a value in localStorage and also
  // accepted a hardcoded '777777' from anyone.
  let verdict: { success?: boolean; message?: string };
  try {
    const res = await fetch("/api/chat/verify-otp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ sessionId, otp: inputOtp.trim() })
    });
    verdict = await res.json();
  } catch {
    return { success: false, message: "Network error. Please try again." };
  }

  if (!verdict?.success) {
    return { success: false, message: verdict?.message || "Invalid OTP code. Please check your email." };
  }

  // Verified! Add initial greeting from AI
  const aiGreeting = generateAiBotResponse("hello", session.userName, contacts);
  const welcomeMessage: ChatMessage = {
    id: `msg_${Date.now()}_welcome`,
    sessionId: session.id,
    sender: "ai",
    text: `Welcome ${session.userName}! 🎉 Your email **${session.userEmail}** is successfully verified via SMTP.\n\nI am **DT AI**, your personal technical solution consultant at Divanex. How can I help you today? Ask me about our custom websites, mobile apps, ERPs, Healthcare HMIS, AI Agents, or project cost estimates.`,
    timestamp: new Date().toISOString(),
    quickReplies: aiGreeting.quickReplies
  };

  const updatedSession: ChatSession = {
    ...session,
    isVerified: true,
    otpCode: undefined, // Clear OTP after success
    updatedAt: new Date().toISOString(),
    lastMessageSnippet: welcomeMessage.text.substring(0, 60) + "...",
    messages: [welcomeMessage]
  };

  sessions[index] = updatedSession;
  saveAllSessions(sessions);

  return { success: true, message: "Verification successful!", session: updatedSession };
}

export async function resendSessionOtp(
  sessionId: string
): Promise<{ success: boolean; message: string }> {
  const sessions = getAllSessions();
  const index = sessions.findIndex((s) => s.id === sessionId);

  if (index === -1) {
    return { success: false, message: "Session not found." };
  }

  const targetSession = sessions[index];
  sessions[index] = { ...targetSession, otpExpiresAt: Date.now() + 1000 * 60 * 10 };
  saveAllSessions(sessions);

  const result = await triggerSmtpEmailDispatch(
    sessionId,
    targetSession.userEmail,
    targetSession.userName,
    targetSession.userPhone
  );

  if (!result?.success) {
    return { success: false, message: result?.error || "Could not send a new code. Please try again." };
  }

  return { success: true, message: "New OTP has been dispatched to your email via SMTP!" };
}

// ----------------------------------------------------
// Message Handling & AI Automation
// ----------------------------------------------------

export function sendUserMessage(
  sessionId: string,
  text: string,
  onAiTypingChange?: (isTyping: boolean) => void,
  contacts?: AiContactDetails
): ChatMessage | null {
  const sessions = getAllSessions();
  const index = sessions.findIndex((s) => s.id === sessionId);

  if (index === -1) return null;
  const session = sessions[index];

  const userMsg: ChatMessage = {
    id: `msg_${Date.now()}_user`,
    sessionId,
    sender: "user",
    text: text.trim(),
    timestamp: new Date().toISOString()
  };

  const updatedMessages = [...session.messages, userMsg];
  const updatedSession: ChatSession = {
    ...session,
    messages: updatedMessages,
    lastMessageSnippet: text.trim(),
    updatedAt: new Date().toISOString(),
    unreadAdminCount: session.unreadAdminCount + 1
  };

  sessions[index] = updatedSession;
  saveAllSessions(sessions);

  // CRITICAL RULE: If Admin is active / joined, AI DOES NOT RESPOND!
  if (session.status === "admin_active") {
    // AI is silenced. Admin will respond manually.
    if (onAiTypingChange) onAiTypingChange(false);
    return userMsg;
  }

  // If AI is active, simulate typing latency and auto-reply
  if (session.status === "ai_active") {
    if (onAiTypingChange) onAiTypingChange(true);

    const typingDelay = Math.min(1800, Math.max(700, text.length * 30));

    setTimeout(() => {
      // Re-fetch fresh session in case admin took over while typing
      const freshSessions = getAllSessions();
      const freshIndex = freshSessions.findIndex((s) => s.id === sessionId);
      if (freshIndex === -1) {
        if (onAiTypingChange) onAiTypingChange(false);
        return;
      }

      const currentSession = freshSessions[freshIndex];
      // Double check: if admin joined in this window, abort AI response!
      if (currentSession.status === "admin_active") {
        if (onAiTypingChange) onAiTypingChange(false);
        return;
      }

      const botReply = generateAiBotResponse(text, currentSession.userName, contacts);
      const aiMsg: ChatMessage = {
        id: `msg_${Date.now()}_ai`,
        sessionId,
        sender: "ai",
        text: botReply.text,
        timestamp: new Date().toISOString(),
        quickReplies: botReply.quickReplies
      };

      currentSession.messages.push(aiMsg);
      currentSession.lastMessageSnippet = botReply.text.substring(0, 60) + "...";
      currentSession.updatedAt = new Date().toISOString();

      freshSessions[freshIndex] = { ...currentSession };
      saveAllSessions(freshSessions);

      if (onAiTypingChange) onAiTypingChange(false);
    }, typingDelay);
  }

  return userMsg;
}

// ----------------------------------------------------
// Admin Takeover & Live Control Actions
// ----------------------------------------------------

export function adminTakeOverChat(sessionId: string, adminName: string = "Senior Tech Lead"): boolean {
  const sessions = getAllSessions();
  const index = sessions.findIndex((s) => s.id === sessionId);
  if (index === -1) return false;

  const session = sessions[index];

  const systemTakeoverMsg: ChatMessage = {
    id: `msg_${Date.now()}_sys_takeover`,
    sessionId,
    sender: "system",
    text: `👨‍💻 ${adminName} (Divanex Admin) has joined the chat session. Automated AI responses are now paused.`,
    timestamp: new Date().toISOString()
  };

  const updatedSession: ChatSession = {
    ...session,
    status: "admin_active",
    adminAssigned: adminName,
    updatedAt: new Date().toISOString(),
    messages: [...session.messages, systemTakeoverMsg]
  };

  sessions[index] = updatedSession;
  saveAllSessions(sessions);
  return true;
}

export function adminHandBackToAi(sessionId: string): boolean {
  const sessions = getAllSessions();
  const index = sessions.findIndex((s) => s.id === sessionId);
  if (index === -1) return false;

  const session = sessions[index];

  const systemResumeMsg: ChatMessage = {
    id: `msg_${Date.now()}_sys_resume`,
    sessionId,
    sender: "system",
    text: `🤖 Chat has been handed back to DT AI Assistant. Automated intelligent replies are active.`,
    timestamp: new Date().toISOString()
  };

  const updatedSession: ChatSession = {
    ...session,
    status: "ai_active",
    updatedAt: new Date().toISOString(),
    messages: [...session.messages, systemResumeMsg]
  };

  sessions[index] = updatedSession;
  saveAllSessions(sessions);
  return true;
}

export function sendAdminMessage(sessionId: string, text: string, adminName: string = "Admin"): ChatMessage | null {
  const sessions = getAllSessions();
  const index = sessions.findIndex((s) => s.id === sessionId);
  if (index === -1) return null;

  const session = sessions[index];

  const adminMsg: ChatMessage = {
    id: `msg_${Date.now()}_admin`,
    sessionId,
    sender: "admin",
    senderName: adminName,
    text: text.trim(),
    timestamp: new Date().toISOString()
  };

  const updatedSession: ChatSession = {
    ...session,
    status: "admin_active", // Ensure admin active mode
    updatedAt: new Date().toISOString(),
    lastMessageSnippet: `Admin: ${text.trim()}`,
    messages: [...session.messages, adminMsg],
    unreadUserCount: session.unreadUserCount + 1
  };

  sessions[index] = updatedSession;
  saveAllSessions(sessions);
  return adminMsg;
}

export function resolveChatSession(sessionId: string): boolean {
  const sessions = getAllSessions();
  const index = sessions.findIndex((s) => s.id === sessionId);
  if (index === -1) return false;

  const session = sessions[index];

  const sysResolvedMsg: ChatMessage = {
    id: `msg_${Date.now()}_sys_resolved`,
    sessionId,
    sender: "system",
    text: `✅ This chat session has been marked as resolved by admin. Thank you for connecting with Divanex!`,
    timestamp: new Date().toISOString()
  };

  sessions[index] = {
    ...session,
    status: "resolved",
    updatedAt: new Date().toISOString(),
    messages: [...session.messages, sysResolvedMsg]
  };

  saveAllSessions(sessions);
  return true;
}

export function markSessionReadByAdmin(sessionId: string) {
  const sessions = getAllSessions();
  const index = sessions.findIndex((s) => s.id === sessionId);
  if (index === -1) return;

  if (sessions[index].unreadAdminCount > 0) {
    sessions[index] = {
      ...sessions[index],
      unreadAdminCount: 0
    };
    saveAllSessions(sessions);
  }
}

export function markSessionReadByUser(sessionId: string) {
  const sessions = getAllSessions();
  const index = sessions.findIndex((s) => s.id === sessionId);
  if (index === -1) return;

  if (sessions[index].unreadUserCount > 0) {
    sessions[index] = {
      ...sessions[index],
      unreadUserCount: 0
    };
    saveAllSessions(sessions);
  }
}

export function updateSessionClientIntel(sessionId: string, intel: Partial<import("@/data/chatTypes").ClientIntel>) {
  const sessions = getAllSessions();
  const index = sessions.findIndex((s) => s.id === sessionId);
  if (index === -1) return;

  sessions[index] = {
    ...sessions[index],
    clientIntel: {
      ...sessions[index].clientIntel,
      ...intel
    }
  };

  saveAllSessions(sessions);
}

/**
 * Deletes a conversation.
 *
 * The server is asked first and the local copy is only dropped once it agrees,
 * so a failed delete leaves the console showing what is actually stored rather
 * than hiding a record that still exists.
 */
export async function deleteChatSession(sessionId: string): Promise<boolean> {
  try {
    const res = await fetch(`/api/chat?sessionId=${encodeURIComponent(sessionId)}`, {
      method: "DELETE",
    });
    const data = await res.json();
    if (!res.ok || !data?.success) return false;

    if (typeof window !== "undefined" && getUserActiveSessionId() === sessionId) {
      setUserActiveSessionId(null);
    }

    const remaining: ChatSession[] = Array.isArray(data.sessions) ? data.sessions : [];
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem(STORAGE_KEY_SESSIONS, JSON.stringify(remaining));
      } catch {
        // Storage can be refused; the listeners still get the new list.
      }
    }

    listeners.forEach((listener) => {
      try {
        listener(remaining);
      } catch {
        // One broken listener must not stop the others.
      }
    });
    broadcastSync("SESSIONS_UPDATED");
    return true;
  } catch {
    return false;
  }
}

/**
 * Clears conversations in bulk.
 *
 * "empty" removes the ones with no messages — a visitor who opened the widget
 * and left, or an automated check against the API. "all" removes everything.
 */
export async function clearChatSessions(scope: "empty" | "all"): Promise<{
  ok: boolean;
  removed: number;
  message: string;
}> {
  try {
    const res = await fetch(`/api/chat?scope=${scope}`, { method: "DELETE" });
    const data = await res.json();
    if (!res.ok || !data?.success) {
      return { ok: false, removed: 0, message: data?.error || "Could not clear conversations." };
    }

    const remaining: ChatSession[] = Array.isArray(data.sessions) ? data.sessions : [];
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem(STORAGE_KEY_SESSIONS, JSON.stringify(remaining));
      } catch {
        // Storage can be refused.
      }
    }

    listeners.forEach((listener) => {
      try {
        listener(remaining);
      } catch {
        // One broken listener must not stop the others.
      }
    });
    broadcastSync("SESSIONS_UPDATED");

    return { ok: true, removed: Number(data.removed) || 0, message: data.message || "Cleared." };
  } catch {
    return { ok: false, removed: 0, message: "Could not reach the server." };
  }
}

