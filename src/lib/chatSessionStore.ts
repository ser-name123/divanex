import "server-only";
import { getSupabase } from "@/lib/supabase";
import type { ChatSession } from "@/data/chatTypes";

/**
 * Storage for live chat transcripts.
 *
 * These used to live in a JSON file under os.tmpdir(), mirrored into every
 * admin's own localStorage. That arrangement had two failures that showed up
 * together: a container restart lost real conversations, and a conversation
 * deleted from the console came back on the next sync from whichever browser
 * still held a copy. One table, one source of truth, fixes both — a delete is
 * a delete.
 *
 * The in-memory map behind it is a cache, not a second store: it serves a
 * machine with no database attached and rides out a brief outage, and every
 * write goes to Postgres first.
 */

const TABLE = "chat_sessions";

declare global {
  var __DIVANEX_CHAT_CACHE__: Map<string, ChatSession> | undefined;
}

function cache(): Map<string, ChatSession> {
  if (!globalThis.__DIVANEX_CHAT_CACHE__) {
    globalThis.__DIVANEX_CHAT_CACHE__ = new Map();
  }
  return globalThis.__DIVANEX_CHAT_CACHE__;
}

function newestFirst(sessions: ChatSession[]): ChatSession[] {
  return [...sessions].sort(
    (a, b) => new Date(b.updatedAt || 0).getTime() - new Date(a.updatedAt || 0).getTime()
  );
}

/** Every stored transcript, newest first. */
export async function listSessions(): Promise<ChatSession[]> {
  try {
    const supabase = getSupabase();
    const { data, error } = await supabase
      .from(TABLE)
      .select("payload")
      .order("updated_at", { ascending: false });

    if (!error && Array.isArray(data)) {
      const sessions = data
        .map((row) => row.payload as ChatSession)
        .filter((session) => session && typeof session.id === "string");

      // Refresh the cache so an outage a moment from now still serves these.
      cache().clear();
      for (const session of sessions) cache().set(session.id, session);

      return newestFirst(sessions);
    }
  } catch {
    // Fall through to whatever this process last saw.
  }

  return newestFirst([...cache().values()]);
}

export async function getSession(sessionId: string): Promise<ChatSession | null> {
  try {
    const supabase = getSupabase();
    const { data, error } = await supabase
      .from(TABLE)
      .select("payload")
      .eq("id", sessionId)
      .maybeSingle();

    if (!error && data?.payload) {
      const session = data.payload as ChatSession;
      cache().set(sessionId, session);
      return session;
    }
    if (!error) return null;
  } catch {
    // Fall through.
  }

  return cache().get(sessionId) ?? null;
}

/** True when a transcript with this id already exists. */
export async function sessionExists(sessionId: string): Promise<boolean> {
  return (await getSession(sessionId)) !== null;
}

export async function saveSession(session: ChatSession): Promise<void> {
  cache().set(session.id, session);

  try {
    const supabase = getSupabase();
    await supabase.from(TABLE).upsert({
      id: session.id,
      payload: session,
      updated_at: session.updatedAt || new Date().toISOString(),
    });
  } catch {
    // No database attached: the cache still serves this process.
  }
}

/**
 * Removes a transcript for good.
 *
 * No tombstone list. The previous design kept one because the record could
 * also exist in a browser, so a delete had to be remembered to stop it coming
 * back; with a single store there is nothing to come back from.
 */
export async function deleteSession(sessionId: string): Promise<boolean> {
  cache().delete(sessionId);

  try {
    const supabase = getSupabase();
    const { error } = await supabase.from(TABLE).delete().eq("id", sessionId);
    return !error;
  } catch {
    return false;
  }
}

/** Removes many at once, for the console's bulk clear. */
export async function deleteSessions(sessionIds: string[]): Promise<number> {
  if (!sessionIds.length) return 0;

  for (const id of sessionIds) cache().delete(id);

  try {
    const supabase = getSupabase();
    const { error } = await supabase.from(TABLE).delete().in("id", sessionIds);
    return error ? 0 : sessionIds.length;
  } catch {
    return 0;
  }
}

/**
 * Removes every transcript that carries no messages.
 *
 * A visitor who opens the widget and leaves without typing still creates a
 * record, and automated checks against the API leave them behind too. They
 * carry nothing worth reading and crowd out the real conversations.
 */
export async function deleteEmptySessions(): Promise<number> {
  const sessions = await listSessions();
  const empty = sessions
    .filter((session) => !Array.isArray(session.messages) || session.messages.length === 0)
    .map((session) => session.id);

  if (!empty.length) return 0;
  await deleteSessions(empty);
  return empty.length;
}
