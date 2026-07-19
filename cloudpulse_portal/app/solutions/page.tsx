"use client";

import { ArrowRight, Briefcase, Rocket, Terminal } from "lucide-react";
import { motion } from "motion/react";
import Link from "next/link";
import type { LucideIcon } from "lucide-react";

import { MarketingPageShell } from "@/components/marketing/marketing-page-shell";
import { ShineButton } from "@/components/shared/shine-button";
import { Card } from "@/components/ui/card";

const fadeUp = {
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
};

interface Audience {
  icon: LucideIcon;
  role: string;
  headline: string;
  pain: string;
  solution: string;
  capabilities: string[];
}

const audiences: Audience[] = [
  {
    icon: Terminal,
    role: "DevOps, Platform & SRE engineers",
    headline: "One signal instead of five consoles",
    pain: "You're the one who actually knows if the cloud is healthy, but that knowledge lives across the Azure Portal, a Slack channel of half-remembered alerts, and whatever you personally checked last week.",
    solution:
      'CloudPulse gives you a single Health Score built from real security and cost signals, a searchable inventory of everything you\'re running, and findings ranked by severity — so "is production okay?" has a real answer.',
    capabilities: ["Health Score", "Security findings", "Full inventory", "Weekly reports"],
  },
  {
    icon: Rocket,
    role: "CTOs & technical founders",
    headline: "Cloud risk and spend, without living in the console",
    pain: "You don't have time to be the resident Azure expert, but you're still the one who has to answer for security posture and cloud spend when it comes up in a board meeting or an investor update.",
    solution:
      "Get a trend line you can actually track, savings opportunities surfaced automatically with dollar estimates attached, and findings written in plain terms — no cloud certification required to understand what's wrong.",
    capabilities: [
      "Cost optimization",
      "Trend over time",
      "Plain-English findings",
      "No setup overhead",
    ],
  },
  {
    icon: Briefcase,
    role: "Cloud consulting firms",
    headline: "A repeatable audit, not a custom project every time",
    pain: "Every client health-check or security review starts from scratch — spreadsheets, manual console digging, and a report you have to assemble by hand before you can even start giving advice.",
    solution:
      "Connect a client's subscription with a read-only service principal and get a structured, prioritized findings and savings report in minutes. Run the same process on every engagement instead of rebuilding it each time.",
    capabilities: [
      "Fast onboarding",
      "Structured findings",
      "Cost savings report",
      "Read-only access",
    ],
  },
];

export default function SolutionsPage() {
  return (
    <MarketingPageShell>
      <section className="mx-auto max-w-[1400px] px-6 pt-20 pb-16 text-center">
        <p className="text-xs font-semibold tracking-[0.2em] text-violet-600 uppercase dark:text-violet-400">
          Solutions
        </p>
        <h1 className="mx-auto mt-3 max-w-3xl text-4xl font-semibold tracking-tight text-balance text-zinc-900 sm:text-5xl dark:text-zinc-50">
          Built for the teams closest to the cloud
        </h1>
        <p className="mx-auto mt-5 max-w-2xl text-lg text-zinc-600 dark:text-zinc-400">
          CloudPulse isn&apos;t enterprise observability software with a hundred dashboards nobody
          opens. It&apos;s built for startups, SMEs, and the specific people who actually own cloud
          health day to day.
        </p>
      </section>

      <section className="mx-auto max-w-[1400px] px-6 pb-20">
        <div className="flex flex-col gap-6">
          {audiences.map((audience, index) => (
            <motion.div
              key={audience.role}
              {...fadeUp}
              transition={{ duration: 0.5, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
            >
              <Card className="group grid gap-8 rounded-2xl border-zinc-200 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-violet-300/70 hover:shadow-xl hover:shadow-violet-500/10 md:grid-cols-[280px_1fr] dark:border-white/10 dark:bg-zinc-900 dark:hover:border-violet-400/30 dark:hover:shadow-violet-500/5">
                <div className="flex flex-col gap-3">
                  <span className="flex size-11 items-center justify-center rounded-xl bg-violet-100 text-violet-600 transition-colors duration-300 group-hover:bg-gradient-to-br group-hover:from-violet-500 group-hover:to-sky-500 group-hover:text-white dark:bg-violet-400/10 dark:text-violet-300">
                    <audience.icon className="size-5" />
                  </span>
                  <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
                    {audience.role}
                  </h2>
                  <p className="text-sm font-medium text-violet-600 dark:text-violet-400">
                    {audience.headline}
                  </p>
                </div>
                <div className="flex flex-col gap-4">
                  <p className="text-sm leading-relaxed text-zinc-500 dark:text-zinc-500">
                    {audience.pain}
                  </p>
                  <p className="text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
                    {audience.solution}
                  </p>
                  <div className="flex flex-wrap gap-2 pt-1">
                    {audience.capabilities.map((capability) => (
                      <span
                        key={capability}
                        className="rounded-full border border-zinc-200 bg-zinc-50 px-3 py-1 text-xs font-medium text-zinc-600 dark:border-white/10 dark:bg-white/[0.06] dark:text-zinc-400"
                      >
                        {capability}
                      </span>
                    ))}
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="bg-gradient-to-b from-transparent to-violet-50/60 dark:to-violet-500/[0.04]">
        <div className="mx-auto max-w-[1400px] px-6 py-16 text-center">
          <h2 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
            See which one sounds like you
          </h2>
          <p className="mt-3 text-zinc-600 dark:text-zinc-400">
            Connect a cloud account and get your first Health Score in minutes.
          </p>
          <div className="mt-6">
            <Link href="/register">
              <ShineButton className="h-11 gap-2 bg-gradient-to-r from-violet-500 to-sky-500 px-6 text-[15px] text-white shadow-lg shadow-violet-500/25 hover:from-violet-500/90 hover:to-sky-500/90">
                Create free account <ArrowRight className="size-4" />
              </ShineButton>
            </Link>
          </div>
        </div>
      </section>
    </MarketingPageShell>
  );
}
