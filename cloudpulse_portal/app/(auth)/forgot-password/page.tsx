"use client";

import { AlertCircle, ArrowLeft, ArrowRight, CheckCircle2, Mail } from "lucide-react";
import { motion } from "motion/react";
import Link from "next/link";
import { useEffect, useState } from "react";

import { AuthCardFrame } from "@/components/auth/auth-card-frame";
import { SimpleAuthShell } from "@/components/auth/simple-auth-shell";
import { requestPasswordReset } from "@/lib/api/auth";
import { ApiError } from "@/lib/api/client";
import { LogoMark } from "@/components/shared/logo";
import { ShineButton } from "@/components/shared/shine-button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const RESEND_COOLDOWN_SECONDS = 45;

export default function ForgotPasswordPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sent, setSent] = useState(false);
  const [submittedEmail, setSubmittedEmail] = useState("");
  const [cooldown, setCooldown] = useState(0);
  const [isResending, setIsResending] = useState(false);

  useEffect(() => {
    if (cooldown <= 0) return;
    const id = setInterval(() => setCooldown((current) => Math.max(0, current - 1)), 1000);
    return () => clearInterval(id);
  }, [cooldown]);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setIsSubmitting(true);

    const email = new FormData(event.currentTarget).get("email") as string;
    try {
      await requestPasswordReset(email);
      setSubmittedEmail(email);
      setSent(true);
      setCooldown(RESEND_COOLDOWN_SECONDS);
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleResend() {
    if (cooldown > 0 || isResending) return;
    setIsResending(true);
    try {
      await requestPasswordReset(submittedEmail);
      setCooldown(RESEND_COOLDOWN_SECONDS);
    } catch {
      // The initial send already succeeded; a resend hiccup isn't worth surfacing as an error.
    } finally {
      setIsResending(false);
    }
  }

  return (
    <SimpleAuthShell>
      <AuthCardFrame>
        <Card className="gap-5 rounded-2xl border-zinc-200 bg-zinc-50 py-7 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.15)] transition-all duration-500 group-hover:bg-white group-hover:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.15),0_0_0_1px_rgba(139,92,246,0.2),0_0_20px_-6px_rgba(56,189,248,0.15)] group-focus-within:bg-white group-focus-within:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.15),0_0_0_1px_rgba(139,92,246,0.2),0_0_20px_-6px_rgba(56,189,248,0.15)] dark:border-white/10 dark:bg-white/[0.04] dark:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.4)] dark:group-hover:bg-white/[0.07] dark:group-hover:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.4),0_0_0_1px_rgba(167,139,250,0.3),0_0_20px_-6px_rgba(56,189,248,0.25)] dark:group-focus-within:bg-white/[0.07] dark:group-focus-within:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.4),0_0_0_1px_rgba(167,139,250,0.3),0_0_20px_-6px_rgba(56,189,248,0.25)]">
          <CardHeader className="gap-2">
            <LogoMark className="mb-1" />
            <CardTitle className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
              Forgot your password?
            </CardTitle>
            <CardDescription className="text-sm text-zinc-600 dark:text-zinc-400">
              Enter your email and we&apos;ll send you a link to reset it
            </CardDescription>
          </CardHeader>
          <CardContent>
            {sent ? (
              <div className="flex flex-col items-center gap-3 py-2 text-center">
                <motion.span
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: "spring", stiffness: 400, damping: 20 }}
                  className="flex size-11 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 dark:bg-emerald-400/10 dark:text-emerald-400"
                >
                  <CheckCircle2 className="size-5" />
                </motion.span>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">
                  If an account exists for{" "}
                  <span className="font-medium text-zinc-800 dark:text-zinc-200">
                    {submittedEmail}
                  </span>
                  , we&apos;ve sent a link to reset the password. Check your inbox.
                </p>
                <button
                  type="button"
                  onClick={handleResend}
                  disabled={cooldown > 0 || isResending}
                  className="text-sm font-medium text-violet-600 transition-colors hover:text-violet-700 disabled:cursor-not-allowed disabled:text-zinc-400 dark:text-violet-400 dark:hover:text-violet-300 dark:disabled:text-zinc-600"
                >
                  {cooldown > 0
                    ? `Resend email in ${cooldown}s`
                    : isResending
                      ? "Resending…"
                      : "Didn't get it? Resend email"}
                </button>
              </div>
            ) : (
              <>
                {error && (
                  <div className="mb-4 flex items-start gap-2 rounded-lg border border-rose-300 bg-rose-50 px-3 py-2 text-sm text-rose-700 dark:border-rose-400/20 dark:bg-rose-400/10 dark:text-rose-300">
                    <AlertCircle className="mt-0.5 size-4 shrink-0" />
                    {error}
                  </div>
                )}
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  <div className="flex flex-col gap-1.5">
                    <Label htmlFor="email" className="text-sm text-zinc-700 dark:text-zinc-300">
                      Email
                    </Label>
                    <div className="relative">
                      <Mail className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-zinc-400 dark:text-zinc-500" />
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="you@company.com"
                        required
                        className="h-10 border-zinc-300 bg-white pl-9 text-[15px] text-zinc-900 placeholder:text-zinc-400 dark:border-white/10 dark:bg-white/[0.03] dark:text-zinc-100 dark:placeholder:text-zinc-600"
                      />
                    </div>
                  </div>
                  <ShineButton
                    type="submit"
                    className="h-10 w-full bg-gradient-to-r from-violet-500 to-sky-500 text-[15px] text-white shadow-lg shadow-violet-500/25 hover:from-violet-500/90 hover:to-sky-500/90"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      "Sending…"
                    ) : (
                      <>
                        Send reset link <ArrowRight className="size-4" />
                      </>
                    )}
                  </ShineButton>
                </form>
              </>
            )}

            <Link
              href="/login"
              className="mt-5 flex items-center justify-center gap-1.5 text-sm font-medium text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-200"
            >
              <ArrowLeft className="size-3.5" />
              Back to sign in
            </Link>
          </CardContent>
        </Card>
      </AuthCardFrame>
    </SimpleAuthShell>
  );
}
