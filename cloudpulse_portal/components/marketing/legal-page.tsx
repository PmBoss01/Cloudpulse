import type { ReactNode } from "react";

import { MarketingPageShell } from "@/components/marketing/marketing-page-shell";

export interface LegalSection {
  id: string;
  title: string;
  content: ReactNode;
}

export function LegalPage({
  eyebrow,
  title,
  lastUpdated,
  intro,
  sections,
}: {
  eyebrow: string;
  title: string;
  lastUpdated: string;
  intro: ReactNode;
  sections: LegalSection[];
}) {
  return (
    <MarketingPageShell>
      <section className="mx-auto max-w-[1400px] px-6 pt-20 pb-4 text-center">
        <p className="text-xs font-semibold tracking-[0.2em] text-violet-600 uppercase dark:text-violet-400">
          {eyebrow}
        </p>
        <h1 className="mx-auto mt-3 max-w-2xl text-4xl font-semibold tracking-tight text-balance text-zinc-900 sm:text-5xl dark:text-zinc-50">
          {title}
        </h1>
        <p className="mt-4 text-sm text-zinc-500 dark:text-zinc-500">Last updated: {lastUpdated}</p>
      </section>

      <section className="mx-auto max-w-3xl px-6 pb-24">
        <p className="mt-8 text-[15px] leading-relaxed text-zinc-600 dark:text-zinc-400">{intro}</p>

        <nav className="mt-10 rounded-2xl border border-zinc-200 bg-white p-6 dark:border-white/10 dark:bg-zinc-900">
          <p className="text-xs font-semibold tracking-[0.15em] text-zinc-500 uppercase dark:text-zinc-500">
            On this page
          </p>
          <ol className="mt-3 grid gap-1.5 sm:grid-cols-2">
            {sections.map((section, index) => (
              <li key={section.id}>
                <a
                  href={`#${section.id}`}
                  className="text-sm text-zinc-600 transition-colors hover:text-violet-600 dark:text-zinc-400 dark:hover:text-violet-400"
                >
                  {index + 1}. {section.title}
                </a>
              </li>
            ))}
          </ol>
        </nav>

        <div className="mt-12 flex flex-col gap-12">
          {sections.map((section, index) => (
            <div key={section.id} id={section.id} className="scroll-mt-24">
              <h2 className="text-xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
                {index + 1}. {section.title}
              </h2>
              <div className="mt-3 flex flex-col gap-3 text-[15px] leading-relaxed text-zinc-600 dark:text-zinc-400">
                {section.content}
              </div>
            </div>
          ))}
        </div>
      </section>
    </MarketingPageShell>
  );
}
