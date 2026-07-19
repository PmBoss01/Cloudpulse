import Link from "next/link";

import { IndoorTechMark } from "@/components/shared/indoortech-mark";

export function SiteFooter() {
  return (
    <div className="flex flex-col items-center justify-between gap-1 px-6 py-2 text-[11px] text-zinc-500 sm:flex-row dark:text-zinc-600">
      <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 sm:justify-start">
        <span>&copy; {new Date().getFullYear()} CloudPulse. All rights reserved.</span>
        <span className="hidden text-zinc-300 sm:inline dark:text-zinc-700">·</span>
        <span className="flex items-center gap-1.5">
          Built by <IndoorTechMark />
          <span className="font-medium text-zinc-600 dark:text-zinc-400">IndoorTech</span>
        </span>
      </div>
      <div className="flex items-center gap-5">
        <Link
          href="/privacy"
          className="transition-colors hover:text-zinc-900 dark:hover:text-zinc-300"
        >
          Privacy Policy
        </Link>
        <Link
          href="/terms"
          className="transition-colors hover:text-zinc-900 dark:hover:text-zinc-300"
        >
          Terms of Service
        </Link>
      </div>
    </div>
  );
}
