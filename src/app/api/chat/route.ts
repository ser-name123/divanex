import { NextResponse } from "next/server";
import { ChatSession } from "@/data/chatTypes";
import { requireAdmin } from "@/lib/guard";
import { cookies } from "next/headers";
import { SESSION_COOKIE, verifySessionToken } from "@/lib/auth";
import { CHAT_TOKEN_HEADER, issueChatToken, verifyChatToken } from "@/lib/chatToken";
import { clientIp, rateLimit } from "@/lib/rate-limit";
import { readJson, tooManyRequests } from "@/lib/api";
import {
  deleteEmptySessions,
  deleteSession,
  deleteSessions,
  getSession,
  listSessions,
  saveSession,
  sessionExists,
} from "@/lib/chatSessionStore";

/**
 * Live chat transcripts.
 *
 * Backed by the database. Two earlier arrangements are gone deliberately:
 *
 *  - The JSON file under os.tmpdir(), which lost real conversations whenever
 *    the container restarted and gave every instance its own idea of history.
 *  - The list of deleted ids kept alongside it. That existed because the same
 *    records also lived in each admin's localStorage, so a delete had to be
 *    remembered to stop the browser re-uploading what it still held. With one
 *    store there is nothing to come back from, and a delete is just a delete.
 *
 * The demo conversations this file used to fall back to are gone too: invented
 * clients in a console an operator reads as a record of real enquiries are
 * worse than an empty list.
 */

export async function GET(request: Request) {
  try {
    const denied = await requireAdmin();
    if (denied) return denied;

    const { searchParams } = new URL(request.url);
    const sessionId = searchParams.get("sessionId");

    if (sessionId) {
      return NextResponse.json({ success: true, session: await getSession(sessionId) });
    }

    return NextResponse.json({ success: true, sessions: await listSessions() });
  } catch (error) {
    console.error("[api/chat] GET error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch chat sessions" },
      { status: 500 }
    );
  }
}

/**
 * Writes a chat session.
 *
 * Public, because the widget has no login — but scoped. A visitor may write
 * only the session their token was issued for; an admin may write any. The
 * former bulk path accepted an arbitrary array of sessions from anyone, which
 * meant any caller could overwrite or destroy every transcript on the server
 * and plant fabricated ones in the admin console.
 */
export async function POST(request: Request) {
  try {
    const limit = rateLimit("chat:write:" + clientIp(request), 60, 5 * 60 * 1000);
    if (!limit.ok) return tooManyRequests(limit.retryAfterSeconds);

    const body = await readJson<{
      session?: ChatSession;
      sessions?: ChatSession[];
    }>(request);
    if (!body) {
      return NextResponse.json({ success: false, error: "Invalid request body." }, { status: 400 });
    }

    const cookieStore = await cookies();
    const isAdmin = Boolean(verifySessionToken(cookieStore.get(SESSION_COOKIE)?.value));

    const incoming: ChatSession[] = Array.isArray(body.sessions)
      ? body.sessions
      : body.session
        ? [body.session]
        : [];

    if (incoming.length === 0) {
      return NextResponse.json({ success: true, applied: 0 });
    }
    if (incoming.length > 200) {
      return NextResponse.json(
        { success: false, error: "Too many sessions in a single request." },
        { status: 413 }
      );
    }

    // Server-observed network origin. A client-supplied IP is worthless in a
    // record the admin console treats as evidence.
    const headerIp =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      request.headers.get("x-real-ip") ||
      request.headers.get("cf-connecting-ip") ||
      "";
    const headerCountry = request.headers.get("x-vercel-ip-country") || "";
    const headerCity = request.headers.get("x-vercel-ip-city") || "";
    const headerRegion = request.headers.get("x-vercel-ip-country-region") || "";

    const presentedToken = request.headers.get(CHAT_TOKEN_HEADER);
    let issuedToken: string | null = null;
    let applied = 0;

    for (const candidate of incoming) {
      if (!candidate || typeof candidate.id !== "string" || !candidate.id) continue;

      const exists = await sessionExists(candidate.id);

      if (!isAdmin) {
        if (exists) {
          // Updating a record that already exists requires the capability that
          // was handed to whoever created it.
          if (!verifyChatToken(candidate.id, presentedToken)) continue;
        } else {
          // First write for an unseen id creates the session and mints its
          // token. Only one new session per request, so a single call cannot
          // be used to bulk-seed records.
          if (issuedToken) continue;

          // A brand-new session with nothing in it is not worth a row. The
          // widget writes one the moment it opens, so without this every
          // visitor who never typed left a blank conversation in the console.
          if (!Array.isArray(candidate.messages) || candidate.messages.length === 0) {
            issuedToken = issueChatToken(candidate.id);
            continue;
          }

          issuedToken = issueChatToken(candidate.id);
        }
      }

      const record: ChatSession = {
        ...candidate,
        // The verification code never belongs in the stored record; it lives
        // server-side in the OTP challenge store.
        otpCode: undefined,
        messages: Array.isArray(candidate.messages) ? candidate.messages.slice(-500) : [],
      };

      if (headerIp && (!record.clientIntel?.ip || record.clientIntel.ip === "127.0.0.1")) {
        record.clientIntel = {
          ...record.clientIntel,
          ip: headerIp,
          country: headerCountry || record.clientIntel?.country || "",
          city: headerCity || record.clientIntel?.city || "",
          region: headerRegion || record.clientIntel?.region || "",
        };
      }

      await saveSession(record);
      applied++;
    }

    // Only an admin gets the full list back; a visitor is told what happened to
    // their own write and nothing about anyone else's.
    if (isAdmin) {
      return NextResponse.json({ success: true, applied, sessions: await listSessions() });
    }
    return NextResponse.json({
      success: true,
      applied,
      ...(issuedToken ? { chatToken: issuedToken } : {}),
    });
  } catch (error) {
    console.error("[api/chat] POST error:", error);
    return NextResponse.json({ success: false, error: "Failed to update chat" }, { status: 500 });
  }
}

/**
 * Deletes transcripts.
 *
 *  - `?sessionId=…` removes one.
 *  - `?scope=empty` removes every conversation with no messages.
 *  - `?scope=all` removes every conversation.
 */
export async function DELETE(request: Request) {
  try {
    const denied = await requireAdmin();
    if (denied) return denied;

    const { searchParams } = new URL(request.url);
    const sessionId = searchParams.get("sessionId");
    const scope = searchParams.get("scope");

    if (sessionId) {
      const ok = await deleteSession(sessionId);
      return NextResponse.json({
        success: ok,
        removed: ok ? 1 : 0,
        ...(ok ? {} : { error: "Could not delete that conversation." }),
        sessions: await listSessions(),
      });
    }

    if (scope === "empty") {
      const removed = await deleteEmptySessions();
      return NextResponse.json({
        success: true,
        removed,
        message:
          removed === 0
            ? "No empty conversations to clear."
            : `Cleared ${removed} conversation${removed === 1 ? "" : "s"} with no messages.`,
        sessions: await listSessions(),
      });
    }

    if (scope === "all") {
      const all = await listSessions();
      const removed = await deleteSessions(all.map((session) => session.id));
      return NextResponse.json({
        success: true,
        removed,
        message: `Deleted ${removed} conversation${removed === 1 ? "" : "s"}.`,
        sessions: await listSessions(),
      });
    }

    return NextResponse.json(
      { success: false, error: "Pass sessionId, or scope=empty or scope=all." },
      { status: 400 }
    );
  } catch (error) {
    console.error("[api/chat] DELETE error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to delete chat session" },
      { status: 500 }
    );
  }
}
