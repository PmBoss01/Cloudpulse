"use client";

import { Link2, Rocket, Sparkles, TrendingUp } from "lucide-react";
import { motion } from "motion/react";

const steps = [
  { icon: Link2, title: "Connect", description: "Securely connect your cloud" },
  { icon: TrendingUp, title: "Analyze", description: "Get real-time insights" },
  { icon: Sparkles, title: "Optimize", description: "Save costs and improve security" },
  { icon: Rocket, title: "Succeed", description: "Build with confidence" },
];

export function JourneyRail() {
  return (
    <div className="relative hidden shrink-0 flex-col gap-12 pr-2 xl:flex">
      <motion.div
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ duration: 1.2, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
        style={{ transformOrigin: "top" }}
        className="absolute top-4 bottom-4 left-[17px] w-px bg-gradient-to-b from-zinc-400 via-zinc-300 to-transparent dark:from-white/20 dark:via-white/10"
      />
      {steps.map((step, index) => (
        <motion.div
          key={step.title}
          initial={{ opacity: 0, x: 12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.6 + index * 0.15 }}
          className="relative flex items-start gap-3.5"
        >
          <span className="relative z-10 flex size-8 shrink-0 items-center justify-center rounded-full border border-zinc-200 bg-white text-violet-600 dark:border-white/15 dark:bg-zinc-900 dark:text-violet-300">
            <step.icon className="size-3.5" />
          </span>
          <span className="flex flex-col pt-0.5">
            <span className="text-sm font-medium text-zinc-800 dark:text-zinc-200">
              {step.title}
            </span>
            <span className="max-w-[150px] text-xs text-zinc-500">{step.description}</span>
          </span>
        </motion.div>
      ))}
    </div>
  );
}
