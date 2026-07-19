"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { type AuthUser, clearTokens, fetchCurrentUser, getAccessToken } from "@/lib/api/auth";

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!getAccessToken()) {
      router.replace("/login");
      return;
    }

    fetchCurrentUser()
      .then(setUser)
      .catch(() => {
        clearTokens();
        router.replace("/login");
      })
      .finally(() => setLoading(false));
  }, [router]);

  function handleLogout() {
    clearTokens();
    router.replace("/login");
  }

  if (loading) {
    return <div className="flex min-h-screen items-center justify-center text-sm">Loading…</div>;
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4">
      <div className="text-center">
        <h1 className="text-2xl font-semibold">Welcome, {user?.full_name || user?.email}</h1>
        <p className="mt-1 text-sm text-zinc-500">
          Signed in as {user?.email}. The real dashboard is coming in the next phase.
        </p>
      </div>
      <Button variant="outline" onClick={handleLogout}>
        Sign out
      </Button>
    </div>
  );
}
