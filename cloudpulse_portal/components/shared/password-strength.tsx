"use client";

import { motion } from "motion/react";

function scorePassword(password: string): number {
  let score = 0;
  if (password.length >= 8) score++;
  if (password.length >= 12) score++;
  if (/[a-z]/.test(password) && /[A-Z]/.test(password)) score++;
  if (/\d/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;
  return Math.min(score, 4);
}

const LEVELS = [
  { label: "Very weak", color: "bg-rose-400" },
  { label: "Weak", color: "bg-rose-400" },
  { label: "Fair", color: "bg-amber-400" },
  { label: "Good", color: "bg-sky-400" },
  { label: "Strong", color: "bg-emerald-400" },
];

export function PasswordStrength({ password }: { password: string }) {
  if (!password) return null;

  const score = scorePassword(password);
  const level = LEVELS[score];

  return (
    <div className="flex items-center gap-2 pt-0.5">
      <div className="flex flex-1 gap-1">
        {[0, 1, 2, 3].map((index) => (
          <motion.span
            key={index}
            layout
            className={`h-1 flex-1 rounded-full ${index < score ? level.color : "bg-zinc-200 dark:bg-white/10"}`}
            transition={{ duration: 0.25, ease: "easeOut" }}
          />
        ))}
      </div>
      <span className="w-16 shrink-0 text-right text-[11px] font-medium text-zinc-500 dark:text-zinc-400">
        {level.label}
      </span>
    </div>
  );
}
