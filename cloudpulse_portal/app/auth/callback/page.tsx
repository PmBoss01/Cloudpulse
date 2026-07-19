"use client";

import { AlertCircle, Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { SimpleAuthShell } from "@/components/auth/simple-auth-shell";
import { storeTokens } from "@/lib/api/auth";
import { Card, CardContent } from "@/components/ui/card";

export default function OAuthCallbackPage() {
  const router = useRouter();
  const [error, setError] = useState(false);

  useEffect(() => {
    // The URL fragment (#access=...&refresh=...) is never sent to any server —
    // that's the whole point of putting tokens there instead of a query string —
    // but it also means there's no router API for it; window.location.hash is
    // the only way to read it, and only after mount.
    const params = new URLSearchParams(window.location.hash.slice(1));
    const access = params.get("access");
    const refresh = params.get("refresh");

    if (!access || !refresh) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- see comment above
      setError(true);
      return;
    }

    storeTokens(access, refresh, true);
    router.replace("/dashboard");
  }, [router]);

  return (
    <SimpleAuthShell>
      <Card className="gap-3 rounded-2xl border-zinc-200 bg-white py-10 text-center shadow-[0_25px_50px_-12px_rgba(0,0,0,0.15)] dark:border-white/10 dark:bg-white/[0.04] dark:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.4)]">
        <CardContent className="flex flex-col items-center gap-3">
          {error ? (
            <>
              <span className="flex size-11 items-center justify-center rounded-full bg-rose-100 text-rose-600 dark:bg-rose-400/10 dark:text-rose-400">
                <AlertCircle className="size-5" />
              </span>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                Something went wrong signing you in.
              </p>
              <Link
                href="/login"
                className="text-sm font-medium text-violet-600 hover:text-violet-700 dark:text-violet-400 dark:hover:text-violet-300"
              >
                Back to sign in
              </Link>
            </>
          ) : (
            <>
              <Loader2 className="size-6 animate-spin text-violet-500" />
              <p className="text-sm text-zinc-600 dark:text-zinc-400">Signing you in…</p>
            </>
          )}
        </CardContent>
      </Card>
    </SimpleAuthShell>
  );
}
