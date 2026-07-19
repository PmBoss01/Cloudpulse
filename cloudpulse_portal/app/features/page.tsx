"use client";

import {
  ArrowRight,
  Bell,
  Boxes,
  Clock,
  DollarSign,
  Gauge,
  Lock,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { motion } from "motion/react";
import Link from "next/link";

import { MarketingPageShell } from "@/components/marketing/marketing-page-shell";
import { AwsLogo, AzureLogo, GoogleCloudLogo } from "@/components/shared/provider-icons";
import { ShineButton } from "@/components/shared/shine-button";
import { Card } from "@/components/ui/card";

const capabilities = [
  {
    icon: Gauge,
    title: "Cloud Health Score",
    description:
      "One number, 0–100, that rolls up security posture, cost efficiency, and operational hygiene into a trend you can track week over week — instead of digging through five different consoles to guess how things are going.",
  },
  {
    icon: ShieldCheck,
    title: "Security findings",
    description:
      "Continuous checks for public storage exposure, overly permissive network rules, accounts without MFA, disabled audit logging, unencrypted disks, and unused credentials. Every finding ships with its severity, why it matters, and the exact fix.",
  },
  {
    icon: DollarSign,
    title: "Cost optimization",
    description:
      "Idle compute, unattached disks, unused public IPs, oversized resources, and stale snapshots — surfaced with an estimated monthly savings figure next to each one, so cleanup is a prioritized list, not a guessing game.",
  },
  {
    icon: Boxes,
    title: "Infrastructure inventory",
    description:
      "A searchable, filterable view of every VM, storage account, database, function, network, and load balancer you're running — kept current on every scan, so it's always the real state of your cloud, not a stale spreadsheet.",
  },
  {
    icon: Bell,
    title: "Notifications that matter",
    description:
      "Weekly health reports, critical alerts the moment a serious finding appears, and a heads-up whenever your Health Score moves. Email today; Slack and Teams are next on the roadmap.",
  },
  {
    icon: Sparkles,
    title: "AI — entirely optional",
    description:
      "CloudPulse works completely on its own. If you want it, an optional AI layer can explain findings in plain English, summarize weekly changes, and suggest remediations — never required, never in the critical path.",
  },
];

const stats = [
  { icon: Clock, label: "Under 2 minutes to first scan" },
  { icon: Lock, label: "Read-only access, always" },
  { icon: Sparkles, label: "Zero AI dependency" },
];

const steps = [
  {
    number: "01",
    title: "Connect",
    description:
      "Link your Azure, AWS, or Google Cloud account with read-only credentials in under a minute. No agents to install, nothing running inside your infrastructure.",
  },
  {
    number: "02",
    title: "Scan",
    description:
      "CloudPulse inventories your resources and runs its full set of security and cost checks, then rolls the results into your Health Score.",
  },
  {
    number: "03",
    title: "Act",
    description:
      "Work a single prioritized list of findings — each with severity and a concrete fix — instead of triaging alerts across disconnected tools.",
  },
];

const providers = [
  { icon: AzureLogo, name: "Azure" },
  { icon: AwsLogo, name: "AWS" },
  { icon: GoogleCloudLogo, name: "Google Cloud" },
];

const fadeUp = {
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
};

export default function FeaturesPage() {
  return (
    <MarketingPageShell>
      <section className="mx-auto max-w-[1400px] px-6 pt-20 pb-10 text-center">
        <p className="text-xs font-semibold tracking-[0.2em] text-violet-600 uppercase dark:text-violet-400">
          Platform
        </p>
        <h1 className="mx-auto mt-3 max-w-3xl text-4xl font-semibold tracking-tight text-balance text-zinc-900 sm:text-5xl dark:text-zinc-50">
          Everything you need to know about your cloud, in one place
        </h1>
        <p className="mx-auto mt-5 max-w-2xl text-lg text-zinc-600 dark:text-zinc-400">
          CloudPulse answers one question on every screen: what should you do next? No enterprise
          clutter, no dashboards you need a manual for — just health, security, and cost, kept
          current and actionable.
        </p>
        <div className="mt-8 flex items-center justify-center gap-3">
          <Link href="/register">
            <ShineButton className="h-11 gap-2 bg-gradient-to-r from-violet-500 to-sky-500 px-6 text-[15px] text-white shadow-lg shadow-violet-500/25 hover:from-violet-500/90 hover:to-sky-500/90">
              Start for free <ArrowRight className="size-4" />
            </ShineButton>
          </Link>
          <Link href="/pricing">
            <ShineButton
              variant="outline"
              className="h-11 border-zinc-300 bg-white px-6 text-[15px] text-zinc-800 hover:bg-zinc-50 dark:border-white/10 dark:bg-white/[0.02] dark:text-zinc-200 dark:hover:bg-white/[0.06]"
            >
              See pricing
            </ShineButton>
          </Link>
        </div>

        <div className="mx-auto mt-12 flex max-w-2xl flex-wrap items-center justify-center gap-x-8 gap-y-3">
          {stats.map((stat) => (
            <span
              key={stat.label}
              className="flex items-center gap-2 text-sm text-zinc-500 dark:text-zinc-500"
            >
              <stat.icon className="size-4 text-violet-500 dark:text-violet-400" />
              {stat.label}
            </span>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-[1400px] px-6 pb-24">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {capabilities.map((capability, index) => (
            <motion.div
              key={capability.title}
              {...fadeUp}
              transition={{ duration: 0.5, delay: index * 0.06, ease: [0.16, 1, 0.3, 1] }}
            >
              <Card className="group h-full gap-3 rounded-2xl border-zinc-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-violet-300/70 hover:shadow-xl hover:shadow-violet-500/10 dark:border-white/10 dark:bg-zinc-900 dark:hover:border-violet-400/30 dark:hover:shadow-violet-500/5">
                <span className="flex size-10 items-center justify-center rounded-xl bg-violet-100 text-violet-600 transition-colors duration-300 group-hover:bg-gradient-to-br group-hover:from-violet-500 group-hover:to-sky-500 group-hover:text-white dark:bg-violet-400/10 dark:text-violet-300">
                  <capability.icon className="size-5" />
                </span>
                <h3 className="text-base font-semibold text-zinc-900 dark:text-zinc-50">
                  {capability.title}
                </h3>
                <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                  {capability.description}
                </p>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="bg-white/60 dark:bg-white/[0.02]">
        <div className="mx-auto max-w-[1400px] px-6 py-20">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-semibold tracking-[0.2em] text-violet-600 uppercase dark:text-violet-400">
              How it works
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
              From nothing connected to a prioritized fix list
            </h2>
          </div>
          <div className="mt-12 grid gap-8 sm:grid-cols-3">
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                {...fadeUp}
                transition={{ duration: 0.5, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="group relative"
              >
                <span className="text-4xl font-bold text-zinc-200 transition-colors duration-300 group-hover:text-violet-300 dark:text-white/10 dark:group-hover:text-violet-400/40">
                  {step.number}
                </span>
                <h3 className="mt-2 text-lg font-semibold text-zinc-900 dark:text-zinc-50">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1400px] px-6 py-20">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold tracking-[0.2em] text-violet-600 uppercase dark:text-violet-400">
            Provider coverage
          </p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
            Multi-cloud from day one
          </h2>
          <p className="mt-4 text-zinc-600 dark:text-zinc-400">
            Azure, AWS, and Google Cloud all run on the same architecture, with the same dashboard,
            scoring, and findings across every provider — no separate product to learn per cloud.
          </p>
        </div>
        <div className="mx-auto mt-10 grid max-w-2xl gap-4 sm:grid-cols-3">
          {providers.map((provider, index) => (
            <motion.div
              key={provider.name}
              {...fadeUp}
              transition={{ duration: 0.5, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
            >
              <Card className="gap-2 rounded-2xl border-zinc-200 bg-white p-5 text-center transition-all duration-300 hover:-translate-y-1 hover:border-emerald-300/70 hover:shadow-xl hover:shadow-emerald-500/10 dark:border-white/10 dark:bg-zinc-900 dark:hover:border-emerald-400/30">
                <provider.icon className="mx-auto size-9" />
                <p className="mt-1 text-sm font-medium text-zinc-900 dark:text-zinc-100">
                  {provider.name}
                </p>
                <span className="mx-auto flex items-center gap-1.5 text-xs font-medium text-emerald-600 dark:text-emerald-400">
                  <span className="size-1.5 rounded-full bg-emerald-500" />
                  Live
                </span>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="bg-gradient-to-b from-transparent to-violet-50/60 dark:to-violet-500/[0.04]">
        <div className="mx-auto max-w-[1400px] px-6 py-16 text-center">
          <h2 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
            Ready to see your Health Score?
          </h2>
          <p className="mt-3 text-zinc-600 dark:text-zinc-400">
            Connect a cloud account and get your first scan in minutes.
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
