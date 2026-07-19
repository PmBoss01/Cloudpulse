import type { ReactNode } from "react";

import { SiteFooter } from "@/components/marketing/site-footer";
import { SiteNav } from "@/components/marketing/site-nav";

export function MarketingPageShell({ children }: { children: ReactNode }) {
  return (
    <div className="relative min-h-screen bg-zinc-50 text-zinc-900 dark:bg-zinc-950 dark:text-zinc-50">
      {/* Decorative layers get their own overflow-hidden wrapper — putting
          overflow-hidden on an ancestor of SiteNav breaks position:sticky. */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="absolute inset-0 opacity-40 dark:opacity-80"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 0%, oklch(0.511 0.262 276.97 / 0.25), transparent 55%), radial-gradient(circle at 80% 10%, oklch(0.623 0.214 277.15 / 0.18), transparent 50%), radial-gradient(circle at 25% 100%, oklch(0.511 0.262 276.97 / 0.2), transparent 50%), radial-gradient(circle at 85% 100%, oklch(0.623 0.214 277.15 / 0.16), transparent 45%)",
          }}
        />
        <div
          className="absolute inset-0 opacity-[0.03] dark:opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
      </div>

      <div className="relative flex min-h-screen flex-col">
        <SiteNav />
        <main className="flex-1">{children}</main>
        <div className="mx-auto w-full max-w-[1400px] px-6">
          <SiteFooter />
        </div>
      </div>
    </div>
  );
}
