"use client";

import { ArrowRight, Check, Sparkles } from "lucide-react";
import { motion } from "motion/react";
import Link from "next/link";
import { useState } from "react";

import { MarketingPageShell } from "@/components/marketing/marketing-page-shell";
import { AwsLogo, AzureLogo, GoogleCloudLogo } from "@/components/shared/provider-icons";
import { ShineButton } from "@/components/shared/shine-button";
import { Card } from "@/components/ui/card";

const fadeUp = {
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
};

interface Tier {
  name: string;
  description: string;
  monthlyPrice: number;
  featured?: boolean;
  aiUsage: string;
  features: string[];
}

const tiers: Tier[] = [
  {
    name: "Starter",
    description: "Validate the product on a single cloud subscription.",
    monthlyPrice: 0,
    aiUsage: "Limited usage",
    features: [
      "1 cloud subscription",
      "Cloud Health Score & trend",
      "Security findings",
      "Cost optimization insights",
      "Weekly email report",
      "Community support",
    ],
  },
  {
    name: "Growth",
    description: "For teams actively managing production cloud.",
    monthlyPrice: 49,
    featured: true,
    aiUsage: "Unlimited usage",
    features: [
      "Up to 5 cloud subscriptions",
      "Everything in Starter",
      "Real-time critical alerts",
      "Daily scans",
      "Priority email support",
    ],
  },
  {
    name: "Team",
    description: "For consulting firms and multi-account orgs.",
    monthlyPrice: 149,
    aiUsage: "Unlimited usage",
    features: [
      "Unlimited cloud subscriptions",
      "Everything in Growth",
      "Team seats (multi-org)",
      "Slack & Teams notifications",
      "Priority support, faster SLA",
    ],
  },
];

const providers = [
  { icon: AzureLogo, name: "Azure" },
  { icon: AwsLogo, name: "AWS" },
  { icon: GoogleCloudLogo, name: "Google Cloud" },
];

export default function PricingPage() {
  const [annual, setAnnual] = useState(false);

  return (
    <MarketingPageShell>
      <section className="mx-auto max-w-[1400px] px-6 pt-20 pb-12 text-center">
        <p className="text-xs font-semibold tracking-[0.2em] text-violet-600 uppercase dark:text-violet-400">
          Pricing
        </p>
        <h1 className="mx-auto mt-3 max-w-2xl text-4xl font-semibold tracking-tight text-balance text-zinc-900 sm:text-5xl dark:text-zinc-50">
          Simple pricing that scales with your cloud
        </h1>
        <p className="mx-auto mt-5 max-w-xl text-lg text-zinc-600 dark:text-zinc-400">
          Start free on one subscription. Upgrade when you need more accounts, faster scans, or a
          team. AI assistance is included on every plan.
        </p>

        <div className="mt-6 flex items-center justify-center gap-3">
          <span className="text-xs font-medium text-zinc-500 dark:text-zinc-500">Works with</span>
          {providers.map((provider) => (
            <span key={provider.name} className="flex items-center gap-1.5">
              <provider.icon className="size-4" />
              <span className="text-xs font-medium text-zinc-600 dark:text-zinc-400">
                {provider.name}
              </span>
            </span>
          ))}
        </div>

        <div className="mt-8 inline-flex items-center gap-3 rounded-full border border-zinc-200 bg-white p-1 dark:border-white/10 dark:bg-white/[0.06]">
          <button
            type="button"
            onClick={() => setAnnual(false)}
            className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
              !annual
                ? "bg-zinc-900 text-white dark:bg-white dark:text-zinc-900"
                : "text-zinc-500 dark:text-zinc-400"
            }`}
          >
            Monthly
          </button>
          <button
            type="button"
            onClick={() => setAnnual(true)}
            className={`flex items-center gap-1.5 rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
              annual
                ? "bg-zinc-900 text-white dark:bg-white dark:text-zinc-900"
                : "text-zinc-500 dark:text-zinc-400"
            }`}
          >
            Annual
            <span className="rounded-full bg-emerald-100 px-1.5 py-0.5 text-[10px] font-semibold text-emerald-700 dark:bg-emerald-400/10 dark:text-emerald-400">
              2 months free
            </span>
          </button>
        </div>
      </section>

      <section className="mx-auto max-w-[1400px] px-6 pb-16">
        <div className="grid gap-6 lg:grid-cols-3">
          {tiers.map((tier, index) => {
            const price = annual ? Math.round((tier.monthlyPrice * 10) / 12) : tier.monthlyPrice;
            return (
              <motion.div
                key={tier.name}
                {...fadeUp}
                transition={{ duration: 0.5, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
              >
                <Card
                  className={`h-full gap-5 rounded-2xl p-8 transition-all duration-300 hover:-translate-y-1 ${
                    tier.featured
                      ? "border-violet-300 bg-white shadow-[0_0_0_1px_rgba(139,92,246,0.3),0_20px_40px_-16px_rgba(139,92,246,0.25)] hover:shadow-[0_0_0_1px_rgba(139,92,246,0.4),0_28px_48px_-16px_rgba(139,92,246,0.35)] dark:border-violet-400/30 dark:bg-zinc-900"
                      : "border-zinc-200 bg-white shadow-sm hover:border-violet-300/70 hover:shadow-xl hover:shadow-violet-500/10 dark:border-white/10 dark:bg-zinc-900 dark:hover:border-violet-400/30"
                  }`}
                >
                  {tier.featured && (
                    <span className="w-fit rounded-full bg-gradient-to-r from-violet-500 to-sky-500 px-3 py-1 text-xs font-semibold text-white">
                      Most popular
                    </span>
                  )}
                  <div>
                    <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
                      {tier.name}
                    </h2>
                    <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-500">
                      {tier.description}
                    </p>
                  </div>
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
                      ${price}
                    </span>
                    <span className="text-sm text-zinc-500 dark:text-zinc-500">/month</span>
                  </div>
                  <Link href="/register">
                    <ShineButton
                      className={`h-10 w-full text-[15px] ${
                        tier.featured
                          ? "bg-gradient-to-r from-violet-500 to-sky-500 text-white shadow-lg shadow-violet-500/25 hover:from-violet-500/90 hover:to-sky-500/90"
                          : "border border-zinc-300 bg-white text-zinc-800 hover:bg-zinc-50 dark:border-white/10 dark:bg-white/[0.02] dark:text-zinc-200 dark:hover:bg-white/[0.06]"
                      }`}
                    >
                      {tier.monthlyPrice === 0 ? "Start for free" : "Get started"}
                    </ShineButton>
                  </Link>
                  <ul className="flex flex-col gap-2.5 border-t border-zinc-100 pt-5 dark:border-white/10">
                    {tier.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2 text-sm">
                        <Check className="mt-0.5 size-4 shrink-0 text-emerald-500" />
                        <span className="text-zinc-700 dark:text-zinc-300">{feature}</span>
                      </li>
                    ))}
                    <li className="flex items-start gap-2 text-sm">
                      <Sparkles className="mt-0.5 size-4 shrink-0 text-violet-500 dark:text-violet-400" />
                      <span className="text-zinc-700 dark:text-zinc-300">
                        AI assistant — {tier.aiUsage}
                      </span>
                    </li>
                  </ul>
                </Card>
              </motion.div>
            );
          })}
        </div>

        <p className="mt-8 text-center text-sm text-zinc-500 dark:text-zinc-500">
          Every plan and every AI usage level works identically across Azure, AWS, and Google Cloud
          — no per-provider pricing.
        </p>
      </section>

      <section className="bg-gradient-to-b from-transparent to-violet-50/60 dark:to-violet-500/[0.04]">
        <div className="mx-auto max-w-[1400px] px-6 py-16 text-center">
          <h2 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
            Start free — upgrade only when you need to
          </h2>
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
