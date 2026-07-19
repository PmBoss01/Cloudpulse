"use client";

import { ArrowRight, Clock, DollarSign, ShieldAlert, TrendingDown, Zap } from "lucide-react";
import { motion, useMotionValue, useSpring } from "motion/react";
import { useEffect, useState } from "react";

import { AnimatedNumber } from "@/components/shared/animated-number";
import { AzureLogo } from "@/components/shared/provider-icons";

const insights = [
  { count: 3, label: "Critical Issues", dot: "bg-rose-400" },
  { count: 12, label: "Cost Saving Opportunities", dot: "bg-emerald-400" },
  { count: 5, label: "Security Alerts", dot: "bg-amber-400" },
  { count: 2, label: "Performance Alerts", dot: "bg-sky-400" },
];

const miniStats = [
  { icon: ShieldAlert, label: "3 Alerts", color: "text-rose-400" },
  { icon: DollarSign, label: "$850 Saved", color: "text-sky-400" },
  { icon: Zap, label: "98% Uptime", color: "text-emerald-400" },
];

const BASE_ROTATE_X = 8;
const BASE_ROTATE_Y = 24;

// A heartbeat unit repeated twice back-to-back (second copy shifted +100 on
// x) so the scrolling loop below is seamless.
const PULSE_PATH =
  "M0,12 L30,12 L36,3 L42,21 L48,12 L80,12 L86,7 L92,17 L98,12 L100,12 " +
  "L130,12 L136,3 L142,21 L148,12 L180,12 L186,7 L192,17 L198,12 L200,12";

function MonitoringLine() {
  return (
    <div className="relative h-6 w-full overflow-hidden px-4">
      <motion.svg
        viewBox="0 0 200 24"
        className="h-6 w-[200%]"
        preserveAspectRatio="none"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 3.2, repeat: Infinity, ease: "linear" }}
      >
        <path
          d={PULSE_PATH}
          fill="none"
          stroke="url(#pulseLineGradient)"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <defs>
          <linearGradient id="pulseLineGradient" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="oklch(0.75 0.18 145)" stopOpacity="0.9" />
            <stop offset="100%" stopColor="oklch(0.7 0.2 250)" stopOpacity="0.9" />
          </linearGradient>
        </defs>
      </motion.svg>
    </div>
  );
}

export function DashboardMockup() {
  const [score, setScore] = useState(92);
  const [secondsAgo, setSecondsAgo] = useState(0);

  useEffect(() => {
    const scoreId = setInterval(() => {
      setScore((current) => {
        const delta = Math.random() > 0.5 ? 1 : -1;
        return Math.min(96, Math.max(88, current + delta));
      });
    }, 4800);
    const clockId = setInterval(() => {
      setSecondsAgo((current) => (current >= 59 ? 0 : current + 1));
    }, 1000);
    return () => {
      clearInterval(scoreId);
      clearInterval(clockId);
    };
  }, []);

  const rotateX = useMotionValue(BASE_ROTATE_X);
  const rotateY = useMotionValue(BASE_ROTATE_Y);
  const springRotateX = useSpring(rotateX, { stiffness: 150, damping: 20 });
  const springRotateY = useSpring(rotateY, { stiffness: 150, damping: 20 });

  function handleMouseMove(event: React.MouseEvent<HTMLDivElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    const px = (event.clientX - rect.left) / rect.width - 0.5;
    const py = (event.clientY - rect.top) / rect.height - 0.5;
    rotateY.set(BASE_ROTATE_Y + px * 6);
    rotateX.set(BASE_ROTATE_X - py * 6);
  }

  function handleMouseLeave() {
    rotateX.set(BASE_ROTATE_X);
    rotateY.set(BASE_ROTATE_Y);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="relative mt-12 w-full max-w-lg"
    >
      <motion.div
        className="pointer-events-none absolute left-1/2 top-[62%] h-20 w-[92%] -translate-x-1/2 rounded-full bg-gradient-to-r from-violet-500/40 via-sky-400/30 to-violet-500/40 blur-2xl"
        style={{ transform: "translateX(-50%) scaleY(0.35)" }}
        animate={{ opacity: [0.6, 0.85, 0.6], scale: [1, 1.04, 1] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        style={{
          rotateX: springRotateX,
          rotateY: springRotateY,
          transformPerspective: 1200,
        }}
        className="relative overflow-hidden rounded-2xl border border-white/10 bg-zinc-900 shadow-2xl shadow-black/50"
      >
        {/* Periodic shine sweep for a glassy, premium feel */}
        <motion.div
          className="pointer-events-none absolute inset-y-0 z-10 w-1/3 bg-gradient-to-r from-transparent via-white/[0.07] to-transparent"
          style={{ transform: "skewX(-20deg)" }}
          animate={{ x: ["-150%", "250%"] }}
          transition={{ duration: 2.6, repeat: Infinity, repeatDelay: 4.5, ease: "easeInOut" }}
        />

        <div className="flex items-center justify-between px-5 pt-5">
          <span className="text-sm font-medium text-zinc-500">Cloud Health Score</span>
          <span className="flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] font-medium text-emerald-400">
            <span className="relative flex size-1.5">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex size-1.5 rounded-full bg-emerald-400" />
            </span>
            Live
          </span>
        </div>

        <MonitoringLine />

        <div className="flex items-center gap-4 px-5 pt-1 pb-4">
          <div className="relative flex size-20 shrink-0 items-center justify-center">
            <svg viewBox="0 0 96 96" className="size-20 -rotate-90">
              <circle
                cx="48"
                cy="48"
                r="40"
                fill="none"
                stroke="oklch(1 0 0 / 8%)"
                strokeWidth="10"
              />
              <motion.circle
                cx="48"
                cy="48"
                r="40"
                fill="none"
                stroke="url(#mockupScoreGradient)"
                strokeWidth="10"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: score / 100 }}
                transition={{ duration: 1, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
              />
              <defs>
                <linearGradient id="mockupScoreGradient" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="oklch(0.7 0.2 300)" />
                  <stop offset="100%" stopColor="oklch(0.65 0.2 250)" />
                </linearGradient>
              </defs>
            </svg>
            <span className="absolute text-xl font-semibold text-white">
              <AnimatedNumber value={score} delay={0.7} />
            </span>
          </div>

          <ul className="flex flex-1 flex-col gap-1.5">
            {insights.map((insight, index) => (
              <motion.li
                key={insight.label}
                initial={{ opacity: 0, x: -6 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 1 + index * 0.1 }}
                className="flex items-center gap-2 text-xs text-zinc-300"
              >
                <motion.span
                  className={`size-1.5 shrink-0 rounded-full ${insight.dot}`}
                  animate={{ opacity: [1, 0.4, 1] }}
                  transition={{
                    duration: 2.4,
                    repeat: Infinity,
                    delay: index * 0.3,
                    ease: "easeInOut",
                  }}
                />
                {insight.count} {insight.label}
              </motion.li>
            ))}
          </ul>
        </div>

        {/* Recommended action — "what should I do next", the core product philosophy */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 1.5 }}
          className="mx-5 flex items-center justify-between gap-2 rounded-lg border border-violet-400/20 bg-violet-400/[0.08] px-3 py-2"
        >
          <span className="text-[11px] font-medium text-violet-200">
            Recommended: Fix 3 critical issues first
          </span>
          <ArrowRight className="size-3.5 shrink-0 text-violet-300" />
        </motion.div>

        <div className="mt-4 flex items-center justify-between border-t border-white/10 px-5 py-3">
          <span className="text-xs text-zinc-500">Monthly Spend</span>
          <span className="text-sm font-semibold text-white">$4,250</span>
          <span className="flex items-center gap-1 rounded-full bg-emerald-500/10 px-1.5 py-0.5 text-[10px] font-medium text-emerald-400">
            <TrendingDown className="size-3" />
            18%
          </span>
        </div>

        <div className="grid grid-cols-3 divide-x divide-white/10 border-t border-white/10">
          {miniStats.map(({ icon: Icon, label, color }, index) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ backgroundColor: "rgba(255,255,255,0.03)" }}
              transition={{ duration: 0.4, delay: 1.6 + index * 0.1 }}
              className="flex flex-col items-center gap-1 px-2 py-3"
            >
              <Icon className={`size-3.5 ${color}`} />
              <span className="text-[10px] text-zinc-400">{label}</span>
            </motion.div>
          ))}
        </div>

        <div className="flex items-center justify-between border-t border-white/10 px-5 py-2">
          <span className="flex items-center gap-1.5">
            <Clock className="size-3 text-zinc-600" />
            <span className="text-[10px] text-zinc-600">Last scan: {secondsAgo}s ago</span>
          </span>
          <span className="flex items-center gap-1 text-[10px] text-zinc-500">
            <AzureLogo className="size-3" />
            Azure
            <span className="size-1 rounded-full bg-emerald-400" />
          </span>
        </div>
      </motion.div>
    </motion.div>
  );
}
