import { Lock, ShieldCheck, UserCheck } from "lucide-react";

const badges = [
  { icon: ShieldCheck, label: "SOC 2 Compliant" },
  { icon: Lock, label: "End-to-End Encryption" },
  { icon: UserCheck, label: "Your Data, Your Control" },
];

export function TrustBadges() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-1 px-6 py-2">
      {badges.map(({ icon: Icon, label }) => (
        <span
          key={label}
          className="flex items-center gap-1.5 text-xs text-zinc-600 dark:text-zinc-500"
        >
          <Icon className="size-3.5" />
          {label}
        </span>
      ))}
    </div>
  );
}
