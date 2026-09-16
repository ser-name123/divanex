"use client";

import { Suspense, useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  ShieldCheck,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  AlertCircle,
  Loader2,
  KeyRound,
  Fingerprint,
  RefreshCw,
  ExternalLink,
  Terminal,
  Activity
} from "lucide-react";
import NeuralBackground from "@/components/NeuralBackground";

interface AccountDetails {
  email: string;
  name: string;
  role: string;
  title: string;
  avatar: string;
  badge: string;
}

function AdminLoginWizard() {
  const router = useRouter();

  // Wizard Step: 1 = Email, 2 = Password, 3 = OTP / 2FA
  const [step, setStep] = useState<1 | 2 | 3>(1);

  // Form States
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otpDigits, setOtpDigits] = useState<string[]>(["", "", "", "", "", ""]);
  const [showPassword, setShowPassword] = useState(false);

  // Account metadata returned from step 1
  const [account, setAccount] = useState<AccountDetails>({
    email: "",
    name: "",
    role: "",
    title: "",
    avatar: "",
    badge: "",
  });

  // Telemetry & UI
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(45);
  const [canResend, setCanResend] = useState(false);

  // Refs for auto-focusing OTP boxes
  const otpInputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Timer for 2FA resend cooldown
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (step === 3 && resendCooldown > 0) {
      timer = setInterval(() => {
        setResendCooldown((prev) => {
          if (prev <= 1) {
            setCanResend(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [step, resendCooldown]);

  // ===========================================================================
  // STEP 1 HANDLER: VERIFY EMAIL IDENTITY
  // ===========================================================================
  const handleVerifyEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    const cleanEmail = email.trim().toLowerCase();
    if (!cleanEmail) {
      setError("Please enter your registered administrator email.");
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          step: "check-email",
          email: cleanEmail,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        setError(data.error || "Access denied. Unrecognized operator identity.");
        return;
      }

      if (data.account) {
        setAccount(data.account);
      }
      setStep(2);
    } catch {
      setError("Network latency error. Could not connect to verification gateway.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // ===========================================================================
  // STEP 2 HANDLER: VERIFY PASSWORD & REQUEST OTP
  // ===========================================================================
  const handleVerifyPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!password) {
      setError("Please enter your master password.");
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          step: "verify-password",
          email: email.trim().toLowerCase(),
          password,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        setError(data.error || "Invalid master password credentials.");
        return;
      }

      setStep(3);
      setResendCooldown(45);
      setCanResend(false);

      // Auto focus first OTP input
      setTimeout(() => {
        otpInputRefs.current[0]?.focus();
      }, 150);
    } catch {
      setError("Authentication handshake failed. Please re-try.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // ===========================================================================
  // STEP 3 HANDLER: VERIFY OTP CODE & FINALIZE SESSION
  // ===========================================================================
  const handleVerifyOtp = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const fullOtp = otpDigits.join("").trim();

    if (fullOtp.length !== 6) {
      setError("Please enter the complete 6-digit security code.");
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          step: "verify-otp",
          email: email.trim().toLowerCase(),
          password,
          otp: fullOtp,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        setError(data.error || "Invalid or expired security code.");
        return;
      }

      // Route cleanly to /admin without any redirect parameters
      router.replace("/admin");
      router.refresh();
    } catch {
      setError("Session encryption error. Please re-enter code.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // OTP Box Navigation Helpers
  const handleOtpChange = (index: number, val: string) => {
    const digit = val.slice(-1);
    const newDigits = [...otpDigits];
    newDigits[index] = digit;
    setOtpDigits(newDigits);

    if (digit && index < 5) {
      otpInputRefs.current[index + 1]?.focus();
    }

    // Auto-submit on 6th digit entered
    if (digit && index === 5 && newDigits.every((d) => d !== "")) {
      const fullOtp = newDigits.join("");
      setTimeout(() => {
        autoSubmitOtp(fullOtp);
      }, 100);
    }
  };

  const autoSubmitOtp = async (code: string) => {
    setIsSubmitting(true);
    setError(null);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          step: "verify-otp",
          email: email.trim().toLowerCase(),
          password,
          otp: code,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        setError(data.error || "Invalid or expired security code.");
        return;
      }

      router.replace("/admin");
      router.refresh();
    } catch {
      setError("Session handshake error.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !otpDigits[index] && index > 0) {
      otpInputRefs.current[index - 1]?.focus();
    }
  };

  const handleOtpPaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    if (!pasted) return;

    const newDigits = [...otpDigits];
    for (let i = 0; i < pasted.length; i++) {
      newDigits[i] = pasted[i];
    }
    setOtpDigits(newDigits);
    otpInputRefs.current[Math.min(pasted.length, 5)]?.focus();

    if (pasted.length === 6) {
      autoSubmitOtp(pasted);
    }
  };

  const handleResendCode = async () => {
    if (!canResend) return;
    setCanResend(false);
    setResendCooldown(45);
    setIsSubmitting(true);
    setError(null);

    try {
      await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          step: "verify-password",
          email: email.trim().toLowerCase(),
          password,
        }),
      });
    } catch {
      setError("Failed to re-issue verification code.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-slate-50 text-slate-900 flex flex-col justify-between selection:bg-sky-500 selection:text-white overflow-hidden">
      {/* Background Cyber Simulation Canvas */}
      <NeuralBackground />

      {/* Layered Subtle Glow Orbs */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-gradient-to-br from-sky-400/10 via-blue-500/5 to-transparent rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-gradient-to-tl from-indigo-400/10 via-sky-400/5 to-transparent rounded-full blur-[140px] pointer-events-none" />

      {/* Top Telemetry Navigation Header */}
      <header className="relative z-20 w-full max-w-7xl mx-auto px-4 sm:px-8 pt-6 sm:pt-8 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative w-9 h-10 flex-shrink-0 group-hover:scale-105 transition-transform drop-shadow-[0_2px_8px_rgba(15,118,112,0.3)]">
            <Image
              src="/brand-logo-icon.png"
              alt="Divanex Console"
              fill
              sizes="40px"
              className="object-contain"
              priority
            />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-bold tracking-wider uppercase text-slate-900 flex items-center gap-1.5">
              DIVANEX
              <span className="w-1.5 h-1.5 rounded-full bg-sky-600 animate-pulse" />
            </span>
            <span className="text-[9px] font-mono tracking-widest uppercase text-sky-700 font-bold">
              EXECUTIVE CONSOLE
            </span>
          </div>
        </Link>

        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-sky-50 border border-sky-200 text-sky-700 text-xs font-mono font-semibold">
            <Activity className="w-3.5 h-3.5 text-sky-600 animate-pulse" />
            <span>ENCRYPTED TLS 1.3</span>
          </div>
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 hover:border-sky-400 text-xs text-slate-700 hover:text-sky-700 transition-all font-mono font-semibold shadow-2xs"
          >
            <span>Public Site</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>
        </div>
      </header>

      {/* Center Wizard Authenticator Card */}
      <main className="relative z-20 w-full max-w-xl mx-auto px-4 py-8 sm:py-12 my-auto">
        <div className="rounded-3xl border border-slate-200 bg-white/95 backdrop-blur-2xl p-6 sm:p-10 shadow-xl shadow-slate-200/50 space-y-8 relative overflow-hidden">
          
          {/* Subtle Cyber Corner Accent Line */}
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-sky-500 to-transparent" />

          {/* Card Top: Breadcrumb Multi-Step Progress HUD */}
          <div className="space-y-4">
            <div className="flex items-center justify-between text-[11px] font-mono uppercase tracking-wider">
              <span className="text-sky-700 flex items-center gap-1.5 font-bold">
                <Terminal className="w-3.5 h-3.5" />
                <span>COMMAND PROTOCOL // STEP 0{step} OF 03</span>
              </span>
              <span className="text-slate-500 font-medium">
                {step === 1 && "Identity Verification"}
                {step === 2 && "Password Handshake"}
                {step === 3 && "2FA Token Check"}
              </span>
            </div>

            {/* Glowing Multi-Step Progress Bar */}
            <div className="grid grid-cols-3 gap-2">
              {/* Step 1 Pill */}
              <div
                className={`h-1.5 rounded-full transition-all duration-500 ${
                  step >= 1
                    ? "bg-gradient-to-r from-sky-500 to-blue-600 shadow-[0_0_10px_rgba(15,118,112,0.5)]"
                    : "bg-slate-200"
                }`}
              />
              {/* Step 2 Pill */}
              <div
                className={`h-1.5 rounded-full transition-all duration-500 ${
                  step >= 2
                    ? "bg-gradient-to-r from-sky-500 to-blue-600 shadow-[0_0_10px_rgba(15,118,112,0.5)]"
                    : "bg-slate-200"
                }`}
              />
              {/* Step 3 Pill */}
              <div
                className={`h-1.5 rounded-full transition-all duration-500 ${
                  step === 3
                    ? "bg-gradient-to-r from-sky-500 to-emerald-500 shadow-[0_0_10px_rgba(92,149,86,0.5)]"
                    : "bg-slate-200"
                }`}
              />
            </div>
          </div>

          {/* =============================================================== */}
          {/* STEP 1: EMAIL VERIFICATION                                      */}
          {/* =============================================================== */}
          {step === 1 && (
            <form onSubmit={handleVerifyEmail} className="space-y-6 animate-fadeIn">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-50 border border-sky-200 text-sky-700 text-xs font-mono font-bold">
                  <Mail className="w-3.5 h-3.5" />
                  <span>STEP 1: OPERATOR EMAIL</span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
                  Executive Operator Login
                </h1>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Enter your registered administrator email address to initialize cryptographic session handshake.
                </p>
              </div>

              {/* Email Input Field */}
              <div className="space-y-2">
                <label
                  htmlFor="admin-email"
                  className="block text-xs font-mono uppercase tracking-wider text-slate-700 font-bold"
                >
                  Admin Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                    <Mail className="w-4 h-4" />
                  </div>
                  <input
                    id="admin-email"
                    type="email"
                    required
                    autoFocus
                    autoComplete="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter admin email address..."
                    className="w-full rounded-2xl bg-slate-50 border border-slate-300 pl-11 pr-4 py-3.5 text-sm text-slate-900 placeholder-slate-400 outline-none transition focus:bg-white focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 font-mono"
                  />
                </div>
              </div>

              {error && (
                <div
                  role="alert"
                  className="flex items-start gap-2.5 rounded-2xl border border-red-200 bg-red-50 p-4 text-xs sm:text-sm text-red-700 font-medium"
                >
                  <AlertCircle className="w-4 h-4 mt-0.5 shrink-0 text-red-600" />
                  <span>{error}</span>
                </div>
              )}

              {/* Step 1 Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-sky-600 via-blue-600 to-indigo-600 hover:from-sky-500 hover:via-blue-500 hover:to-indigo-500 py-3.5 px-5 text-sm font-bold text-white transition-all duration-300 hover:shadow-lg hover:shadow-sky-500/30 disabled:cursor-not-allowed disabled:opacity-60 cursor-pointer"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-white" />
                    <span className="text-white font-bold">Verifying Identity…</span>
                  </>
                ) : (
                  <>
                    <span className="text-white font-bold">Continue to Passcode</span>
                    <ArrowRight className="w-4 h-4 text-white" />
                  </>
                )}
              </button>
            </form>
          )}

          {/* =============================================================== */}
          {/* STEP 2: PASSWORD AUTHENTICATION                                 */}
          {/* =============================================================== */}
          {step === 2 && (
            <form onSubmit={handleVerifyPassword} className="space-y-6 animate-fadeIn">
              {/* Verified Identity Badge */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-sky-200 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-600 text-white font-bold flex items-center justify-center text-sm shadow-md">
                    {account.avatar || "RS"}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-slate-900">
                        {account.name || "Administrator"}
                      </span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-sky-100 text-sky-800 border border-sky-200 font-bold">
                        {account.role || "Operator"}
                      </span>
                    </div>
                    <span className="text-xs font-mono text-slate-500">
                      {account.email || email}
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setStep(1);
                    setError(null);
                  }}
                  className="text-xs font-mono text-sky-700 hover:text-sky-800 hover:underline px-2 py-1 cursor-pointer font-bold"
                >
                  Change
                </button>
              </div>

              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-mono font-bold">
                  <KeyRound className="w-3.5 h-3.5" />
                  <span>STEP 2: CRYPTOGRAPHIC PASSCODE</span>
                </div>
                <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
                  Enter Master Password
                </h2>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Provide your master authentication key to generate a single-use 2FA verification token.
                </p>
              </div>

              {/* Password Input Field */}
              <div className="space-y-2">
                <label
                  htmlFor="admin-password"
                  className="block text-xs font-mono uppercase tracking-wider text-slate-700 font-bold"
                >
                  Master Password
                </label>

                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                    <Lock className="w-4 h-4" />
                  </div>
                  <input
                    id="admin-password"
                    type={showPassword ? "text" : "password"}
                    required
                    autoFocus
                    autoComplete="current-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter master password..."
                    className="w-full rounded-2xl bg-slate-50 border border-slate-300 pl-11 pr-12 py-3.5 text-sm text-slate-900 placeholder-slate-400 outline-none transition focus:bg-white focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 font-mono"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-slate-600 cursor-pointer"
                    title={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {error && (
                <div
                  role="alert"
                  className="flex items-start gap-2.5 rounded-2xl border border-red-200 bg-red-50 p-4 text-xs sm:text-sm text-red-700 font-medium"
                >
                  <AlertCircle className="w-4 h-4 mt-0.5 shrink-0 text-red-600" />
                  <span>{error}</span>
                </div>
              )}

              {/* Step 2 Buttons */}
              <div className="flex items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setStep(1);
                    setError(null);
                  }}
                  className="px-5 py-3.5 rounded-2xl bg-white border border-slate-200 hover:border-slate-400 text-slate-700 text-sm font-semibold transition-all flex items-center gap-2 cursor-pointer shadow-2xs"
                >
                  <ArrowLeft className="w-4 h-4 text-slate-700" />
                  <span>Back</span>
                </button>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-sky-600 via-blue-600 to-indigo-600 hover:from-sky-500 hover:via-blue-500 hover:to-indigo-500 py-3.5 px-5 text-sm font-bold text-white transition-all duration-300 hover:shadow-lg hover:shadow-sky-500/30 disabled:cursor-not-allowed disabled:opacity-60 cursor-pointer"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin text-white" />
                      <span className="text-white font-bold">Verifying Passcode…</span>
                    </>
                  ) : (
                    <>
                      <span className="text-white font-bold">Dispatch 2FA Token</span>
                      <ArrowRight className="w-4 h-4 text-white" />
                    </>
                  )}
                </button>
              </div>
            </form>
          )}

          {/* =============================================================== */}
          {/* STEP 3: OTP / 2FA AUTHENTICATION                                */}
          {/* =============================================================== */}
          {step === 3 && (
            <form onSubmit={handleVerifyOtp} className="space-y-6 animate-fadeIn">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-mono font-bold">
                  <Fingerprint className="w-3.5 h-3.5" />
                  <span>STEP 3: 2FA VERIFICATION</span>
                </div>
                <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
                  Two-Factor Authentication
                </h2>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Enter the 6-digit security token dispatched to{" "}
                  <strong className="text-sky-700 font-mono font-bold">{email}</strong>.
                </p>
                <div className="flex items-center gap-2 p-3 rounded-xl bg-sky-50 border border-sky-200 text-xs font-mono text-sky-800">
                  <Mail className="w-4 h-4 text-sky-600 shrink-0" />
                  <span>Verification code dispatched to your Gmail inbox.</span>
                </div>
              </div>

              {/* 6-Digit PIN HUD Boxes */}
              <div className="space-y-3">
                <label className="block text-xs font-mono uppercase tracking-wider text-slate-700 font-bold text-center">
                  6-Digit Security Token
                </label>
                <div className="flex items-center justify-center gap-2.5 sm:gap-3.5">
                  {otpDigits.map((digit, idx) => (
                    <input
                      key={idx}
                      ref={(el) => {
                        otpInputRefs.current[idx] = el;
                      }}
                      type="text"
                      inputMode="numeric"
                      pattern="[0-9]*"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleOtpChange(idx, e.target.value)}
                      onKeyDown={(e) => handleOtpKeyDown(idx, e)}
                      onPaste={handleOtpPaste}
                      className="w-11 h-13 sm:w-13 sm:h-15 text-center text-xl sm:text-2xl font-mono font-bold text-slate-900 bg-slate-50 border border-slate-300 focus:border-sky-500 focus:bg-white focus:ring-2 focus:ring-sky-500/20 rounded-2xl outline-none transition-all shadow-inner"
                    />
                  ))}
                </div>
              </div>

              {/* Resend Code Timer */}
              <div className="flex items-center justify-between text-xs font-mono text-slate-500 pt-1">
                <span>Code expires in 10 minutes</span>
                {canResend ? (
                  <button
                    type="button"
                    onClick={handleResendCode}
                    className="text-sky-700 hover:text-sky-800 font-bold underline flex items-center gap-1 cursor-pointer"
                  >
                    <RefreshCw className="w-3 h-3" />
                    <span>Resend Code</span>
                  </button>
                ) : (
                  <span className="text-slate-400">
                    Resend in {resendCooldown}s
                  </span>
                )}
              </div>

              {error && (
                <div
                  role="alert"
                  className="flex items-start gap-2.5 rounded-2xl border border-red-200 bg-red-50 p-4 text-xs sm:text-sm text-red-700 font-medium"
                >
                  <AlertCircle className="w-4 h-4 mt-0.5 shrink-0 text-red-600" />
                  <span>{error}</span>
                </div>
              )}

              {/* Step 3 Buttons */}
              <div className="flex items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setStep(2);
                    setError(null);
                  }}
                  className="px-5 py-3.5 rounded-2xl bg-white border border-slate-200 hover:border-slate-400 text-slate-700 text-sm font-semibold transition-all flex items-center gap-2 cursor-pointer shadow-2xs"
                >
                  <ArrowLeft className="w-4 h-4 text-slate-700" />
                  <span>Back</span>
                </button>

                <button
                  type="submit"
                  disabled={isSubmitting || otpDigits.join("").length !== 6}
                  className="flex-1 inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-emerald-600 via-sky-600 to-blue-600 hover:from-emerald-500 hover:via-sky-500 hover:to-blue-500 py-3.5 px-5 text-sm font-bold text-white transition-all duration-300 hover:shadow-lg hover:shadow-emerald-500/30 disabled:cursor-not-allowed disabled:opacity-60 cursor-pointer"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin text-white" />
                      <span className="text-white font-bold">Authorizing Session…</span>
                    </>
                  ) : (
                    <>
                      <ShieldCheck className="w-4 h-4 text-white" />
                      <span className="text-white font-bold">Authorize Master Session</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          )}

          {/* Bottom Security Compliance Notice */}
          <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2 text-[11px] font-mono text-slate-500">
            <span className="flex items-center gap-1.5 text-slate-600 font-medium">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span>SOC-2 TYPE II AUDITED</span>
            </span>
            <span className="text-slate-500 font-medium">IP LOGGING ACTIVE</span>
          </div>

        </div>
      </main>

      {/* Footer System Status Strip */}
      <footer className="relative z-20 w-full max-w-7xl mx-auto px-4 py-4 text-center text-xs font-mono text-slate-500">
        <span>© {new Date().getFullYear()} Divanex Technologies Ltd. All executive sessions cryptographically sealed.</span>
      </footer>
    </div>
  );
}

export default function AdminLoginPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-slate-50 flex items-center justify-center font-mono text-sm text-sky-700 font-bold">
          Loading secure executive console…
        </div>
      }
    >
      <AdminLoginWizard />
    </Suspense>
  );
}
