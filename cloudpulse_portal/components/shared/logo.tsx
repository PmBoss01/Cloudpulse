import { Activity } from "lucide-react";

import { cn } from "@/lib/utils";

export function Logo({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <LogoMark />
      <span className="text-base font-semibold tracking-tight">CloudPulse</span>
    </div>
  );
}

export function LogoMark({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "flex size-10 items-center justify-center rounded-xl bg-primary text-primary-foreground",
        className,
      )}
    >
      <Activity className="size-5" strokeWidth={2.5} />
    </span>
  );
}
