"use client";

import { AlertCircle, ArrowRight, Eye, EyeOff, Lock, Mail } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { TbBrandGithub } from "react-icons/tb";

import { AuthCardFrame } from "@/components/auth/auth-card-frame";
import { MarketingAuthShell } from "@/components/marketing/marketing-auth-shell";
import { ApiError } from "@/lib/api/client";
import { githubLoginUrl, googleLoginUrl, loginUser } from "@/lib/api/auth";
import { LogoMark } from "@/components/shared/logo";
import { ShineButton } from "@/components/shared/shine-button";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const OAUTH_ERROR_MESSAGES: Record<string, string> = {
  access_denied: "Sign-in was cancelled.",
  invalid_state: "That sign-in link expired. Please try again.",
  token_exchange_failed: "Something went wrong contacting the provider. Please try again.",
  profile_fetch_failed: "Something went wrong contacting the provider. Please try again.",
  no_email: "That account doesn't have a public email we can use. Try a different sign-in method.",
};

export function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const oauthErrorCode = searchParams.get("oauth_error");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [error, setError] = useState<string | null>(
    oauthErrorCode
      ? (OAUTH_ERROR_MESSAGES[oauthErrorCode] ?? "Something went wrong signing you in.")
      : null,
  );

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setIsSubmitting(true);

    const formData = new FormData(event.currentTarget);
    try {
      await loginUser({
        email: formData.get("email") as string,
        password: formData.get("password") as string,
        remember: rememberMe,
      });
      router.push("/dashboard");
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Something went wrong. Please try again.");
      setIsSubmitting(false);
    }
  }

  return (
    <MarketingAuthShell>
      <AuthCardFrame>
        <Card className="gap-5 rounded-2xl border-zinc-200 bg-zinc-50 py-7 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.15)] transition-all duration-500 group-hover:bg-white group-hover:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.15),0_0_0_1px_rgba(139,92,246,0.2),0_0_20px_-6px_rgba(56,189,248,0.15)] group-focus-within:bg-white group-focus-within:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.15),0_0_0_1px_rgba(139,92,246,0.2),0_0_20px_-6px_rgba(56,189,248,0.15)] dark:border-white/10 dark:bg-white/[0.04] dark:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.4)] dark:group-hover:bg-white/[0.07] dark:group-hover:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.4),0_0_0_1px_rgba(167,139,250,0.3),0_0_20px_-6px_rgba(56,189,248,0.25)] dark:group-focus-within:bg-white/[0.07] dark:group-focus-within:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.4),0_0_0_1px_rgba(167,139,250,0.3),0_0_20px_-6px_rgba(56,189,248,0.25)]">
          <CardHeader className="gap-2">
            <LogoMark className="mb-1" />
            <CardTitle className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
              Welcome back
            </CardTitle>
            <CardDescription className="text-sm text-zinc-600 dark:text-zinc-400">
              Sign in to continue to CloudPulse
            </CardDescription>
          </CardHeader>
          <CardContent>
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
              <div className="flex flex-col gap-1.5">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password" className="text-sm text-zinc-700 dark:text-zinc-300">
                    Password
                  </Label>
                  <Link
                    href="/forgot-password"
                    className="text-xs font-medium text-zinc-500 transition-colors hover:text-zinc-900 dark:hover:text-zinc-200"
                  >
                    Forgot password?
                  </Link>
                </div>
                <div className="relative">
                  <Lock className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-zinc-400 dark:text-zinc-500" />
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    required
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
              </div>
              <div className="flex items-center gap-2">
                <Checkbox
                  id="remember"
                  name="remember"
                  checked={rememberMe}
                  onCheckedChange={setRememberMe}
                />
                <Label
                  htmlFor="remember"
                  className="text-sm font-normal text-zinc-600 dark:text-zinc-400"
                >
                  Keep me signed in
                </Label>
              </div>
              <ShineButton
                type="submit"
                className="h-10 w-full bg-gradient-to-r from-violet-500 to-sky-500 text-[15px] text-white shadow-lg shadow-violet-500/25 hover:from-violet-500/90 hover:to-sky-500/90"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  "Signing in…"
                ) : (
                  <>
                    Sign In <ArrowRight className="size-4" />
                  </>
                )}
              </ShineButton>
            </form>

            <p className="mt-4 text-center text-sm text-zinc-500">
              Don&apos;t have an account?{" "}
              <Link
                href="/register"
                className="font-medium text-zinc-800 hover:underline dark:text-zinc-200"
              >
                Create free account
              </Link>
            </p>

            <div className="mt-4 flex flex-col gap-2.5">
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  window.location.href = googleLoginUrl();
                }}
                className="h-10 w-full gap-2 border-zinc-300 bg-white text-[15px] text-zinc-800 hover:bg-zinc-50 dark:border-white/10 dark:bg-white/[0.02] dark:text-zinc-200 dark:hover:bg-white/[0.06]"
              >
                <FcGoogle className="size-4" />
                Continue with Google
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  window.location.href = githubLoginUrl();
                }}
                className="h-10 w-full gap-2 border-zinc-300 bg-white text-[15px] text-zinc-800 hover:bg-zinc-50 dark:border-white/10 dark:bg-white/[0.02] dark:text-zinc-200 dark:hover:bg-white/[0.06]"
              >
                <TbBrandGithub className="size-4" />
                Continue with GitHub
              </Button>
            </div>
          </CardContent>
        </Card>
      </AuthCardFrame>
    </MarketingAuthShell>
  );
}
