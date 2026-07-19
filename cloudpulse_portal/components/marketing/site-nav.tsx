"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";

import { Logo } from "@/components/shared/logo";
import { ThemeToggle } from "@/components/shared/theme-toggle";

const navLinks = [
  { label: "Features", href: "/features" },
  { label: "Solutions", href: "/solutions" },
  { label: "Pricing", href: "/pricing" },
  { label: "Docs", href: "/docs" },
  { label: "Support", href: "/support" },
];

export function SiteNav() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 bg-zinc-50/75 backdrop-blur-xl dark:bg-zinc-950/75">
      <div className="mx-auto flex max-w-[1400px] items-center justify-between px-6 py-2.5">
        <Link href="/">
          <Logo className="text-zinc-900 [&_span:last-child]:text-zinc-900 dark:text-zinc-50 dark:[&_span:last-child]:text-zinc-50" />
        </Link>
        <nav className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={isActive ? "page" : undefined}
                className={`rounded-full px-3.5 py-1.5 text-sm transition-colors ${
                  isActive
                    ? "bg-zinc-900/[0.06] font-medium text-zinc-900 dark:bg-white/10 dark:text-white"
                    : "text-zinc-500 hover:bg-zinc-900/[0.04] hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-white/[0.06] dark:hover:text-zinc-50"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
        <ThemeToggle />
      </div>
    </header>
  );
}
