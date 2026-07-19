"use client";

import { AlertCircle, ArrowRight, Eye, EyeOff, Lock, Mail, User } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { TbBrandGithub } from "react-icons/tb";

import { AuthCardFrame } from "@/components/auth/auth-card-frame";
import { MarketingAuthShell } from "@/components/marketing/marketing-auth-shell";
import { ApiError } from "@/lib/api/client";
import { githubLoginUrl, googleLoginUrl, registerUser } from "@/lib/api/auth";
import { LogoMark } from "@/components/shared/logo";
import { ShineButton } from "@/components/shared/shine-button";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function RegisterPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setIsSubmitting(true);

    const formData = new FormData(event.currentTarget);
    try {
      await registerUser({
        full_name: formData.get("name") as string,
        email: formData.get("email") as string,
        password: formData.get("password") as string,
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
              Create your account
            </CardTitle>
            <CardDescription className="text-sm text-zinc-600 dark:text-zinc-400">
              Start monitoring your cloud in minutes
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
                <Label htmlFor="name" className="text-sm text-zinc-700 dark:text-zinc-300">
                  Full name
                </Label>
                <div className="relative">
                  <User className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-zinc-400 dark:text-zinc-500" />
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Jane Doe"
                    required
                    className="h-10 border-zinc-300 bg-white pl-9 text-[15px] text-zinc-900 placeholder:text-zinc-400 dark:border-white/10 dark:bg-white/[0.03] dark:text-zinc-100 dark:placeholder:text-zinc-600"
                  />
                </div>
              </div>
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="email" className="text-sm text-zinc-700 dark:text-zinc-300">
                  Work email
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
                <Label htmlFor="password" className="text-sm text-zinc-700 dark:text-zinc-300">
                  Password
                </Label>
                <div className="relative">
                  <Lock className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-zinc-400 dark:text-zinc-500" />
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Create a password"
                    minLength={8}
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
              <div className="flex items-start gap-2">
                <Checkbox id="terms" name="terms" required className="mt-0.5" />
                <Label
                  htmlFor="terms"
                  className="text-sm font-normal leading-snug text-zinc-600 dark:text-zinc-400"
                >
                  I agree to the Terms of Service and Privacy Policy
                </Label>
              </div>
              <ShineButton
                type="submit"
                className="h-10 w-full bg-gradient-to-r from-violet-500 to-sky-500 text-[15px] text-white shadow-lg shadow-violet-500/25 hover:from-violet-500/90 hover:to-sky-500/90"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  "Creating account…"
                ) : (
                  <>
                    Create account <ArrowRight className="size-4" />
                  </>
                )}
              </ShineButton>
            </form>

            <p className="mt-4 text-center text-sm text-zinc-500">
              Already have an account?{" "}
              <Link
                href="/login"
                className="font-medium text-zinc-800 hover:underline dark:text-zinc-200"
              >
                Sign in
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
