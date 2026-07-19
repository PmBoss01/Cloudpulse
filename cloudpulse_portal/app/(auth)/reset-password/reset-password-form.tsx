"use client";

import { AlertCircle, ArrowRight, CheckCircle2, Eye, EyeOff, Lock } from "lucide-react";
import { motion } from "motion/react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

import { AuthCardFrame } from "@/components/auth/auth-card-frame";
import { SimpleAuthShell } from "@/components/auth/simple-auth-shell";
import { confirmPasswordReset } from "@/lib/api/auth";
import { ApiError } from "@/lib/api/client";
import { LogoMark } from "@/components/shared/logo";
import { PasswordStrength } from "@/components/shared/password-strength";
import { ShineButton } from "@/components/shared/shine-button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function ResetPasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const uid = searchParams.get("uid");
  const token = searchParams.get("token");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);
  const [password, setPassword] = useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);

    const formData = new FormData(event.currentTarget);
    const password = formData.get("password") as string;
    const confirmPassword = formData.get("confirmPassword") as string;

    if (password !== confirmPassword) {
      setError("Passwords don't match.");
      return;
    }
    if (!uid || !token) {
      setError("This reset link is missing information. Request a new one.");
      return;
    }

    setIsSubmitting(true);
    try {
      await confirmPasswordReset({ uid, token, password });
      setDone(true);
      setTimeout(() => router.push("/login"), 2000);
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Something went wrong. Please try again.");
      setIsSubmitting(false);
    }
  }

  const missingLink = !uid || !token;

  return (
    <SimpleAuthShell>
      <AuthCardFrame>
        <Card className="gap-5 rounded-2xl border-zinc-200 bg-zinc-50 py-7 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.15)] transition-all duration-500 group-hover:bg-white group-hover:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.15),0_0_0_1px_rgba(139,92,246,0.2),0_0_20px_-6px_rgba(56,189,248,0.15)] group-focus-within:bg-white group-focus-within:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.15),0_0_0_1px_rgba(139,92,246,0.2),0_0_20px_-6px_rgba(56,189,248,0.15)] dark:border-white/10 dark:bg-white/[0.04] dark:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.4)] dark:group-hover:bg-white/[0.07] dark:group-hover:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.4),0_0_0_1px_rgba(167,139,250,0.3),0_0_20px_-6px_rgba(56,189,248,0.25)] dark:group-focus-within:bg-white/[0.07] dark:group-focus-within:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.4),0_0_0_1px_rgba(167,139,250,0.3),0_0_20px_-6px_rgba(56,189,248,0.25)]">
          <CardHeader className="gap-2">
            <LogoMark className="mb-1" />
            <CardTitle className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
              Set a new password
            </CardTitle>
            <CardDescription className="text-sm text-zinc-600 dark:text-zinc-400">
              Choose a new password for your CloudPulse account
            </CardDescription>
          </CardHeader>
          <CardContent>
            {done ? (
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
                  Your password has been reset. Taking you to sign in…
                </p>
                <div className="h-0.5 w-24 overflow-hidden rounded-full bg-zinc-200 dark:bg-white/10">
                  <motion.div
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 2, ease: "linear" }}
                    style={{ transformOrigin: "left" }}
                    className="h-full w-full bg-gradient-to-r from-violet-500 to-sky-500"
                  />
                </div>
              </div>
            ) : (
              <>
                {(error || missingLink) && (
                  <div className="mb-4 flex items-start gap-2 rounded-lg border border-rose-300 bg-rose-50 px-3 py-2 text-sm text-rose-700 dark:border-rose-400/20 dark:bg-rose-400/10 dark:text-rose-300">
                    <AlertCircle className="mt-0.5 size-4 shrink-0" />
                    {error ??
                      "This reset link is invalid. Request a new one from the sign-in page."}
                  </div>
                )}
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  <div className="flex flex-col gap-1.5">
                    <Label htmlFor="password" className="text-sm text-zinc-700 dark:text-zinc-300">
                      New password
                    </Label>
                    <div className="relative">
                      <Lock className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-zinc-400 dark:text-zinc-500" />
                      <Input
                        id="password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Create a new password"
                        minLength={8}
                        required
                        disabled={missingLink}
                        value={password}
                        onValueChange={setPassword}
                        className="h-10 border-zinc-300 bg-white px-9 text-[15px] text-zinc-900 placeholder:text-zinc-400 dark:border-white/10 dark:bg-white/[0.03] dark:text-zinc-100 dark:placeholder:text-zinc-600"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword((current) => !current)}
                        aria-label={showPassword ? "Hide password" : "Show password"}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 transition-colors hover:text-zinc-900 dark:text-zinc-500 dark:hover:text-zinc-200"
                      >
                        {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                      </button>
                    </div>
                    <PasswordStrength password={password} />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <Label
                      htmlFor="confirmPassword"
                      className="text-sm text-zinc-700 dark:text-zinc-300"
                    >
                      Confirm password
                    </Label>
                    <div className="relative">
                      <Lock className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-zinc-400 dark:text-zinc-500" />
                      <Input
                        id="confirmPassword"
                        name="confirmPassword"
                        type={showPassword ? "text" : "password"}
                        placeholder="Re-enter your new password"
                        minLength={8}
                        required
                        disabled={missingLink}
                        className="h-10 border-zinc-300 bg-white pl-9 text-[15px] text-zinc-900 placeholder:text-zinc-400 dark:border-white/10 dark:bg-white/[0.03] dark:text-zinc-100 dark:placeholder:text-zinc-600"
                      />
                    </div>
                  </div>
                  <ShineButton
                    type="submit"
                    className="h-10 w-full bg-gradient-to-r from-violet-500 to-sky-500 text-[15px] text-white shadow-lg shadow-violet-500/25 hover:from-violet-500/90 hover:to-sky-500/90"
                    disabled={isSubmitting || missingLink}
                  >
                    {isSubmitting ? (
                      "Resetting…"
                    ) : (
                      <>
                        Reset password <ArrowRight className="size-4" />
                      </>
                    )}
                  </ShineButton>
                </form>
              </>
            )}

            {!done && (
              <p className="mt-5 text-center text-sm text-zinc-500">
                Remembered it?{" "}
                <Link
                  href="/login"
                  className="font-medium text-zinc-800 hover:underline dark:text-zinc-200"
                >
                  Sign in
                </Link>
              </p>
            )}
          </CardContent>
        </Card>
      </AuthCardFrame>
    </SimpleAuthShell>
  );
}
