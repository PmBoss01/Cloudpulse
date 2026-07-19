"use client";

import { motion } from "motion/react";
import type { ComponentProps, ReactNode } from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function ShineButton({
  className,
  children,
  ...props
}: ComponentProps<typeof Button> & { children: ReactNode }) {
  return (
    <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.98 }} className="group">
      <Button className={cn("relative overflow-hidden", className)} {...props}>
        <span className="pointer-events-none absolute inset-0 z-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full" />
        <span className="relative z-10 inline-flex items-center gap-1.5">{children}</span>
      </Button>
    </motion.div>
  );
}
