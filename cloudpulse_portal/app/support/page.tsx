"use client";

import { AnimatePresence, motion } from "motion/react";
import { BookOpen, ChevronDown, Mail, MessageCircle } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

import { MarketingPageShell } from "@/components/marketing/marketing-page-shell";
import { ShineButton } from "@/components/shared/shine-button";
import { Card } from "@/components/ui/card";

const fadeUp = {
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
};

const faqs = [
  {
    question: "Which cloud providers does CloudPulse support today?",
    answer:
      "Azure, AWS, and Google Cloud are all supported on the same architecture — the same dashboard, scoring, and findings across every provider, not a separate product per cloud.",
  },
  {
    question: "Do I need to use the AI features?",
    answer:
      "No. CloudPulse's core product — Health Score, security findings, cost insights, and inventory — works completely on its own. AI is an optional paid add-on for plain-English explanations and summaries, never required for core functionality.",
  },
  {
    question: "What access does CloudPulse need to my cloud account?",
    answer:
      "Read-only access only. You create a service principal scoped to the built-in Reader role, which can view your resources but can never modify or delete anything in your environment.",
  },
  {
    question: "Is there a free plan?",
    answer:
      "Yes — the Starter plan is free for one Azure subscription with Health Score, security findings, cost insights, and weekly email reports included, no credit card required.",
  },
  {
    question: "Can I cancel anytime?",
    answer:
      "Yes. There are no long-term contracts. You can upgrade, downgrade, or cancel from your account settings at any time.",
  },
];

export default function SupportPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <MarketingPageShell>
      <section className="mx-auto max-w-[1400px] px-6 pt-20 pb-12 text-center">
        <p className="text-xs font-semibold tracking-[0.2em] text-violet-600 uppercase dark:text-violet-400">
          Support
        </p>
        <h1 className="mx-auto mt-3 max-w-2xl text-4xl font-semibold tracking-tight text-balance text-zinc-900 sm:text-5xl dark:text-zinc-50">
          We&apos;re here if you get stuck
        </h1>
        <p className="mx-auto mt-5 max-w-xl text-lg text-zinc-600 dark:text-zinc-400">
          Check the answers below, or reach out directly — a real person reads every message.
        </p>
      </section>

      <section className="mx-auto max-w-[1400px] px-6 pb-16">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <motion.div {...fadeUp} transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}>
            <Card className="group h-full gap-3 rounded-2xl border-zinc-200 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-violet-300/70 hover:shadow-xl hover:shadow-violet-500/10 dark:border-white/10 dark:bg-zinc-900 dark:hover:border-violet-400/30">
              <span className="flex size-10 items-center justify-center rounded-xl bg-violet-100 text-violet-600 transition-colors duration-300 group-hover:bg-gradient-to-br group-hover:from-violet-500 group-hover:to-sky-500 group-hover:text-white dark:bg-violet-400/10 dark:text-violet-300">
                <Mail className="size-5" />
              </span>
              <h3 className="text-base font-semibold text-zinc-900 dark:text-zinc-50">
                Email support
              </h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                For account issues, billing questions, or anything specific to your setup.
              </p>
              <a
                href="mailto:support@cloudpulse.io"
                className="text-sm font-medium text-violet-600 hover:text-violet-700 dark:text-violet-400 dark:hover:text-violet-300"
              >
                support@cloudpulse.io
              </a>
            </Card>
          </motion.div>
          <motion.div
            {...fadeUp}
            transition={{ duration: 0.5, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
          >
            <Card className="group h-full gap-3 rounded-2xl border-zinc-200 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-violet-300/70 hover:shadow-xl hover:shadow-violet-500/10 dark:border-white/10 dark:bg-zinc-900 dark:hover:border-violet-400/30">
              <span className="flex size-10 items-center justify-center rounded-xl bg-violet-100 text-violet-600 transition-colors duration-300 group-hover:bg-gradient-to-br group-hover:from-violet-500 group-hover:to-sky-500 group-hover:text-white dark:bg-violet-400/10 dark:text-violet-300">
                <BookOpen className="size-5" />
              </span>
              <h3 className="text-base font-semibold text-zinc-900 dark:text-zinc-50">
                Documentation
              </h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                Quickstart guides and core concepts to get connected and understand your results.
              </p>
              <Link
                href="/docs"
                className="text-sm font-medium text-violet-600 hover:text-violet-700 dark:text-violet-400 dark:hover:text-violet-300"
              >
                Browse docs →
              </Link>
            </Card>
          </motion.div>
          <motion.div
            {...fadeUp}
            transition={{ duration: 0.5, delay: 0.16, ease: [0.16, 1, 0.3, 1] }}
          >
            <Card className="group h-full gap-3 rounded-2xl border-zinc-200 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-violet-300/70 hover:shadow-xl hover:shadow-violet-500/10 dark:border-white/10 dark:bg-zinc-900 dark:hover:border-violet-400/30">
              <span className="flex size-10 items-center justify-center rounded-xl bg-violet-100 text-violet-600 transition-colors duration-300 group-hover:bg-gradient-to-br group-hover:from-violet-500 group-hover:to-sky-500 group-hover:text-white dark:bg-violet-400/10 dark:text-violet-300">
                <MessageCircle className="size-5" />
              </span>
              <h3 className="text-base font-semibold text-zinc-900 dark:text-zinc-50">
                Product feedback
              </h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                Have a feature request or found something confusing? We read every one of these.
              </p>
              <a
                href="mailto:feedback@cloudpulse.io"
                className="text-sm font-medium text-violet-600 hover:text-violet-700 dark:text-violet-400 dark:hover:text-violet-300"
              >
                feedback@cloudpulse.io
              </a>
            </Card>
          </motion.div>
        </div>
      </section>

      <section className="bg-white/60 dark:bg-white/[0.02]">
        <div className="mx-auto max-w-2xl px-6 py-16">
          <h2 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
            Frequently asked questions
          </h2>
          <div className="mt-8 flex flex-col divide-y divide-zinc-200 dark:divide-white/10">
            {faqs.map((faq, index) => {
              const isOpen = openIndex === index;
              return (
                <div key={faq.question} className="py-2">
                  <button
                    type="button"
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                    className="flex w-full items-center justify-between gap-4 py-3 text-left"
                    aria-expanded={isOpen}
                  >
                    <span className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
                      {faq.question}
                    </span>
                    <motion.span
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                      className="shrink-0 text-zinc-400"
                    >
                      <ChevronDown className="size-4" />
                    </motion.span>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden"
                      >
                        <p className="pb-3 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                          {faq.answer}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1400px] px-6 py-16 text-center">
        <h2 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
          Still need a hand?
        </h2>
        <p className="mt-3 text-zinc-600 dark:text-zinc-400">
          Send us a message — we typically reply within one business day.
        </p>
        <div className="mt-6">
          <a href="mailto:support@cloudpulse.io">
            <ShineButton className="h-11 gap-2 bg-gradient-to-r from-violet-500 to-sky-500 px-6 text-[15px] text-white shadow-lg shadow-violet-500/25 hover:from-violet-500/90 hover:to-sky-500/90">
              <Mail className="size-4" /> Email support
            </ShineButton>
          </a>
        </div>
      </section>
    </MarketingPageShell>
  );
}
