"use client";

import { motion, useMotionTemplate, useMotionValue } from "motion/react";
import type { ReactNode } from "react";

import { DashboardMockup } from "@/components/marketing/dashboard-mockup";
import { HeroCopy } from "@/components/marketing/hero-copy";
import { JourneyRail } from "@/components/marketing/journey-rail";
import { SiteFooter } from "@/components/marketing/site-footer";
import { SiteNav } from "@/components/marketing/site-nav";
import { TrustBadges } from "@/components/marketing/trust-badges";
import { TrustedByStrip } from "@/components/marketing/trusted-by-strip";
import { AmbientParticles } from "@/components/shared/ambient-particles";

export function MarketingAuthShell({ children }: { children: ReactNode }) {
  const spotlightX = useMotionValue(-500);
  const spotlightY = useMotionValue(-500);
  const spotlightBackground = useMotionTemplate`radial-gradient(650px circle at ${spotlightX}px ${spotlightY}px, oklch(0.511 0.262 276.97 / 0.14), transparent 70%)`;

  function handleMouseMove(event: React.MouseEvent<HTMLDivElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    spotlightX.set(event.clientX - rect.left);
    spotlightY.set(event.clientY - rect.top);
  }

  function handleMouseLeave() {
    spotlightX.set(-500);
    spotlightY.set(-500);
  }

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative h-screen bg-zinc-50 text-zinc-900 dark:bg-zinc-950 dark:text-zinc-50"
    >
      {/* Decorative layers get their own overflow-hidden wrapper — putting
          overflow-hidden on an ancestor of SiteNav breaks position:sticky. */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute -inset-32 opacity-60 dark:opacity-100"
          animate={{ x: [0, 40, -20, 0], y: [0, -30, 20, 0] }}
          transition={{ duration: 24, repeat: Infinity, ease: "easeInOut" }}
          style={{
            backgroundImage:
              "radial-gradient(circle at 30% 20%, oklch(0.511 0.262 276.97 / 0.35), transparent 50%), radial-gradient(circle at 75% 55%, oklch(0.623 0.214 277.15 / 0.25), transparent 45%)",
          }}
        />
        <div
          className="absolute inset-0 opacity-[0.04] dark:opacity-[0.05]"
          style={{
            backgroundImage:
              "linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
        <motion.div className="absolute inset-0" style={{ background: spotlightBackground }} />
        <AmbientParticles className="opacity-50" />
      </div>

      <div className="relative flex h-full flex-col">
        <SiteNav />

        <main className="mx-auto flex w-full max-w-[1400px] min-h-0 flex-1 flex-col items-start justify-start gap-6 overflow-hidden px-6 py-3 lg:flex-row lg:items-center">
          <div className="w-full flex-1">
            <HeroCopy />
            <DashboardMockup />
            <TrustedByStrip />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="w-full max-w-sm shrink-0 lg:ml-6"
          >
            {children}
          </motion.div>

          <JourneyRail />
        </main>

        <TrustBadges />
        <SiteFooter />
      </div>
    </div>
  );
}
