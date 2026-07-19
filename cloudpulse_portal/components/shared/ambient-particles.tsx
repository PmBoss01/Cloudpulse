"use client";

import { motion } from "motion/react";

type Particle = { left: string; top: string; size: number; duration: number; delay: number };

const particles: Particle[] = [
  { left: "8%", top: "82%", size: 3, duration: 9, delay: 0 },
  { left: "22%", top: "68%", size: 2, duration: 11, delay: 1.4 },
  { left: "38%", top: "90%", size: 4, duration: 8, delay: 0.6 },
  { left: "55%", top: "72%", size: 2, duration: 12, delay: 2.1 },
  { left: "68%", top: "94%", size: 3, duration: 10, delay: 0.9 },
  { left: "80%", top: "62%", size: 2, duration: 13, delay: 1.8 },
  { left: "90%", top: "86%", size: 3, duration: 9.5, delay: 0.3 },
];

export function AmbientParticles({ className }: { className?: string }) {
  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className ?? ""}`}>
      {particles.map((particle, index) => (
        <motion.span
          key={index}
          className="absolute rounded-full bg-violet-600 dark:bg-violet-400"
          style={{
            left: particle.left,
            top: particle.top,
            width: particle.size,
            height: particle.size,
          }}
          initial={{ opacity: 0, y: 0 }}
          animate={{ opacity: [0, 0.7, 0], y: -140 }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}
