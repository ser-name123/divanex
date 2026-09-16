import { NextResponse } from "next/server";
import { badRequest, cleanString, readJson, tooManyRequests } from "@/lib/api";
import { clientIp, rateLimit } from "@/lib/rate-limit";
import { verifyChatOtp } from "@/lib/chatOtp";

/**
 * Checks a chat verification code against the challenge held server-side.
 *
 * Verification lives here rather than in the browser, so a visitor cannot read
 * the expected value out of their own storage or skip the step entirely.
 */
export async function POST(request: Request) {
  try {
    const limit = rateLimit(`chat:otp:verify:${clientIp(request)}`, 20, 10 * 60 * 1000);
    if (!limit.ok) return tooManyRequests(limit.retryAfterSeconds);

    const body = await readJson<{ sessionId?: unknown; otp?: unknown }>(request);
    if (!body) return badRequest("Invalid request body.");

    const sessionId = cleanString(body.sessionId, 100);
    const otp = cleanString(body.otp, 10);

    if (!sessionId) return badRequest("A session identifier is required.");

    const result = verifyChatOtp(sessionId, otp);

    if (result === "ok") {
      return NextResponse.json({ success: true, message: "Verification successful!" });
    }

    const message =
      result === "expired"
        ? "This code has expired. Please request a new one."
        : result === "exhausted"
          ? "Too many incorrect attempts. Please request a new code."
          : "Invalid OTP code. Please check your email.";

    return NextResponse.json({ success: false, message }, { status: 400 });
  } catch (error) {
    console.error("[api/chat/verify-otp]", error);
    return NextResponse.json(
      { success: false, message: "Verification failed. Please try again." },
      { status: 500 }
    );
  }
}
