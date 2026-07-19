import { cn } from "@/lib/utils";

/**
 * Custom mark for IndoorTech: a minimal house silhouette with a solid dot
 * at its center, reading as "a connected/smart space" — indoor (the house)
 * plus tech (the node) in one small glyph.
 */
export function IndoorTechMark({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "flex size-4 shrink-0 items-center justify-center rounded-md bg-gradient-to-br from-cyan-500 to-emerald-500 text-white",
        className,
      )}
    >
      <svg viewBox="0 0 24 24" className="size-2.5" fill="none">
        <path
          d="M4 11.5 12 4.5 20 11.5"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M6 10.5V19H18V10.5"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="12" cy="14.5" r="1.7" fill="currentColor" />
      </svg>
    </span>
  );
}
