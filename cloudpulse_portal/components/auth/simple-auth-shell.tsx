"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";

import { SiteNav } from "@/components/marketing/site-nav";

export function SimpleAuthShell({ children }: { children: ReactNode }) {
  return (
    <div className="relative flex min-h-screen flex-col bg-zinc-50 text-zinc-900 dark:bg-zinc-950 dark:text-zinc-50">
      {/* Decorative layers get their own overflow-hidden wrapper — putting
          overflow-hidden on an ancestor of SiteNav breaks position:sticky. */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="absolute -inset-32 opacity-50 dark:opacity-90"
          style={{
            backgroundImage:
              "radial-gradient(circle at 25% 20%, oklch(0.511 0.262 276.97 / 0.3), transparent 50%), radial-gradient(circle at 78% 65%, oklch(0.623 0.214 277.15 / 0.22), transparent 45%)",
          }}
        />
        <div
          className="absolute inset-0 opacity-[0.035] dark:opacity-[0.045]"
          style={{
            backgroundImage:
              "linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
      </div>

      <div className="relative">
        <SiteNav />
      </div>

      <div className="relative flex flex-1 items-center justify-center px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="w-full max-w-sm"
        >
          {children}
        </motion.div>
      </div>
    </div>
  );
}
