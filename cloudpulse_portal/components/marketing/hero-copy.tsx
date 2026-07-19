"use client";

import { CircleDollarSign, Infinity as InfinityIcon, ShieldCheck, Sparkles } from "lucide-react";
import { motion } from "motion/react";

const featureTags = [
  { icon: InfinityIcon, label: "Cloud Insights" },
  { icon: CircleDollarSign, label: "Cost Optimization" },
  { icon: ShieldCheck, label: "Security Monitoring" },
  { icon: Sparkles, label: "Smart Recommendations" },
];

export function HeroCopy() {
  return (
    <div className="flex flex-col gap-4">
      <motion.h1
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="text-5xl leading-[1.1] font-semibold tracking-tight text-zinc-900 dark:text-zinc-50"
      >
        <span className="block">Your Cloud.</span>
        <span className="block">
          Clearer.{" "}
          <span className="bg-gradient-to-r from-violet-500 to-sky-500 bg-clip-text text-transparent dark:from-violet-400 dark:to-sky-400">
            Smarter.
          </span>{" "}
          Safer.
        </span>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="max-w-lg text-base leading-relaxed text-zinc-600 dark:text-zinc-400"
      >
        CloudPulse gives you real-time insights, cost savings, and security recommendations — so you
        can focus on building, not firefighting.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="flex flex-wrap items-center gap-x-5 gap-y-2"
      >
        {featureTags.map(({ icon: Icon, label }) => (
          <span
            key={label}
            className="flex items-center gap-1.5 text-sm text-zinc-600 dark:text-zinc-400"
          >
            <Icon className="size-4 text-violet-600 dark:text-violet-400" />
            {label}
          </span>
        ))}
      </motion.div>
    </div>
  );
}
