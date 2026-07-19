"use client";

import {
  Boxes,
  Compass,
  DollarSign,
  Download,
  FileText,
  Gauge,
  KeyRound,
  Search,
  ShieldCheck,
  Terminal,
} from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useMemo, useState } from "react";
import type { LucideIcon } from "lucide-react";

import { MarketingPageShell } from "@/components/marketing/marketing-page-shell";
import { AwsLogo, AzureLogo, GoogleCloudLogo } from "@/components/shared/provider-icons";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

const fadeUp = {
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
};

const providerSetup = {
  Azure: {
    icon: AzureLogo,
    credentialTitle: "Create a read-only service principal for your Azure subscription",
    role: "Reader",
    command: `az ad sp create-for-rbac \\
  --name "cloudpulse-readonly" \\
  --role "Reader" \\
  --scopes /subscriptions/<subscription-id>`,
    connectDescription:
      "Paste the service principal's client ID, client secret, and tenant ID into CloudPulse. Credentials are encrypted at rest and used only to run scans.",
  },
  AWS: {
    icon: AwsLogo,
    credentialTitle: "Create a read-only IAM role for your AWS account",
    role: "ReadOnlyAccess",
    command: `aws iam create-role \\
  --role-name cloudpulse-readonly \\
  --assume-role-policy-document file://trust-policy.json

aws iam attach-role-policy \\
  --role-name cloudpulse-readonly \\
  --policy-arn arn:aws:iam::aws:policy/ReadOnlyAccess`,
    connectDescription:
      "Paste the role's ARN into CloudPulse. CloudPulse assumes the role through a scoped trust relationship — no long-lived access keys are ever stored.",
  },
  "Google Cloud": {
    icon: GoogleCloudLogo,
    credentialTitle: "Create a read-only service account for your Google Cloud project",
    role: "roles/viewer",
    command: `gcloud iam service-accounts create cloudpulse-readonly \\
  --display-name "CloudPulse Read-Only"

gcloud projects add-iam-policy-binding <PROJECT_ID> \\
  --member "serviceAccount:cloudpulse-readonly@<PROJECT_ID>.iam.gserviceaccount.com" \\
  --role "roles/viewer"`,
    connectDescription:
      "Paste the service account's JSON key into CloudPulse. Credentials are encrypted at rest and used only to run scans.",
  },
} as const;

type ProviderName = keyof typeof providerSetup;
const providerNames = Object.keys(providerSetup) as ProviderName[];

const concepts = [
  {
    icon: Gauge,
    term: "Cloud Health Score",
    definition:
      "A single number from 0–100, recalculated on every scan, that rolls up your security findings, cost efficiency, and operational hygiene into one trend you can track over time.",
  },
  {
    icon: ShieldCheck,
    term: "Security findings",
    definition:
      "Individual issues CloudPulse's checks surface — public storage exposure, permissive network rules, missing MFA, disabled audit logging, and more — each with a severity, a plain description, and a fix.",
  },
  {
    icon: DollarSign,
    term: "Cost insights",
    definition:
      "Opportunities to reduce spend: idle compute, unattached disks, unused public IPs, oversized resources, and stale snapshots, each with an estimated monthly savings figure.",
  },
  {
    icon: Boxes,
    term: "Inventory",
    definition:
      "A live, searchable record of every resource CloudPulse can see in a connected subscription — kept current on every scan rather than a point-in-time export.",
  },
];

interface Guide {
  icon: LucideIcon;
  category: string;
  title: string;
  description: string;
}

const upcomingGuides: Guide[] = [
  {
    icon: ShieldCheck,
    category: "Security",
    title: "Every security check, explained",
    description:
      "The full catalog of checks CloudPulse runs, what each one means, and how to fix it.",
  },
  {
    icon: DollarSign,
    category: "Cost",
    title: "How savings estimates are calculated",
    description: "The methodology behind the dollar figures attached to each cost finding.",
  },
  {
    icon: Terminal,
    category: "Reference",
    title: "API reference",
    description: "Programmatic access to your inventory, findings, and scores.",
  },
  {
    icon: KeyRound,
    category: "Account",
    title: "Notifications & alerting",
    description: "Configuring weekly reports, critical alerts, and (soon) Slack & Teams delivery.",
  },
];

export default function DocsPage() {
  const [query, setQuery] = useState("");
  const [provider, setProvider] = useState<ProviderName>("Azure");
  const setup = providerSetup[provider];

  const filteredGuides = useMemo(() => {
    if (!query.trim()) return upcomingGuides;
    const q = query.toLowerCase();
    return upcomingGuides.filter(
      (guide) =>
        guide.title.toLowerCase().includes(q) ||
        guide.description.toLowerCase().includes(q) ||
        guide.category.toLowerCase().includes(q),
    );
  }, [query]);

  useEffect(() => {
    function clearPrintScope() {
      document.body.removeAttribute("data-print-scope");
    }
    window.addEventListener("afterprint", clearPrintScope);
    return () => window.removeEventListener("afterprint", clearPrintScope);
  }, []);

  function downloadPrint(scope: "quickstart" | "full") {
    document.body.setAttribute("data-print-scope", scope);
    window.print();
  }

  return (
    <MarketingPageShell>
      <section className="mx-auto max-w-[1400px] px-6 pt-20 pb-12 text-center">
        <p className="text-xs font-semibold tracking-[0.2em] text-violet-600 uppercase dark:text-violet-400">
          Documentation
        </p>
        <h1 className="mx-auto mt-3 max-w-2xl text-4xl font-semibold tracking-tight text-balance text-zinc-900 sm:text-5xl dark:text-zinc-50">
          Everything you need to run CloudPulse
        </h1>
        <div className="relative mx-auto mt-8 max-w-md">
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-zinc-400 dark:text-zinc-500" />
          <Input
            value={query}
            onValueChange={setQuery}
            placeholder="Search documentation…"
            className="h-11 border-zinc-300 bg-white pl-9 text-[15px] text-zinc-900 placeholder:text-zinc-400 dark:border-white/10 dark:bg-white/[0.03] dark:text-zinc-100 dark:placeholder:text-zinc-600"
          />
        </div>
        <button
          type="button"
          onClick={() => downloadPrint("full")}
          className="mx-auto mt-5 flex items-center gap-1.5 text-sm font-medium text-violet-600 transition-colors hover:text-violet-700 dark:text-violet-400 dark:hover:text-violet-300"
        >
          <FileText className="size-4" />
          Download full documentation
        </button>
      </section>

      <div data-print-full>
        <section className="mx-auto max-w-[1400px] px-6 pb-16">
          <Card
            data-print-quickstart
            className="gap-6 rounded-2xl border-white/10 bg-zinc-900 p-8 shadow-sm transition-all duration-300 hover:border-violet-400/30 hover:shadow-xl hover:shadow-violet-500/10"
          >
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-2.5">
                <Compass className="size-5 text-violet-400" />
                <h2 className="text-lg font-semibold text-zinc-50">Quickstart</h2>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <div className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/[0.04] p-1">
                  {providerNames.map((name) => {
                    const ProviderIcon = providerSetup[name].icon;
                    return (
                      <button
                        key={name}
                        type="button"
                        onClick={() => setProvider(name)}
                        className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
                          provider === name
                            ? "bg-zinc-800 text-zinc-50 shadow-sm"
                            : "text-zinc-400 hover:text-zinc-200"
                        }`}
                      >
                        <ProviderIcon className="size-3.5" />
                        {name}
                      </button>
                    );
                  })}
                </div>
                <button
                  type="button"
                  onClick={() => downloadPrint("quickstart")}
                  className="flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs font-medium text-zinc-400 transition-colors hover:border-violet-400/30 hover:text-violet-300"
                >
                  <Download className="size-3.5" />
                  Download
                </button>
              </div>
            </div>
            <ol className="flex flex-col gap-6">
              <li className="flex gap-4">
                <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-violet-400/10 text-xs font-semibold text-violet-300">
                  1
                </span>
                <div>
                  <p className="text-sm font-medium text-zinc-100">Create your account</p>
                  <p className="mt-1 text-sm text-zinc-400">
                    Sign up with email or continue with Google or GitHub. No credit card required to
                    start on the free plan.
                  </p>
                </div>
              </li>
              <li className="flex gap-4">
                <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-violet-400/10 text-xs font-semibold text-violet-300">
                  2
                </span>
                <div>
                  <p className="text-sm font-medium text-zinc-100">{setup.credentialTitle}</p>
                  <p className="mt-1 text-sm text-zinc-400">
                    CloudPulse only ever needs the built-in{" "}
                    <code className="rounded bg-white/10 px-1 py-0.5 text-[13px]">
                      {setup.role}
                    </code>{" "}
                    role — it can never modify or delete anything in your environment.
                  </p>
                  <pre className="mt-3 overflow-x-auto rounded-lg border border-white/10 bg-black/40 p-3 text-[13px] text-zinc-200">
                    {setup.command}
                  </pre>
                </div>
              </li>
              <li className="flex gap-4">
                <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-violet-400/10 text-xs font-semibold text-violet-300">
                  3
                </span>
                <div>
                  <p className="text-sm font-medium text-zinc-100">Connect the account</p>
                  <p className="mt-1 text-sm text-zinc-400">{setup.connectDescription}</p>
                </div>
              </li>
              <li className="flex gap-4">
                <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-violet-400/10 text-xs font-semibold text-violet-300">
                  4
                </span>
                <div>
                  <p className="text-sm font-medium text-zinc-100">
                    Review your first Health Score
                  </p>
                  <p className="mt-1 text-sm text-zinc-400">
                    The first scan inventories your resources and surfaces security findings and
                    cost opportunities, ranked by severity and savings.
                  </p>
                </div>
              </li>
            </ol>
          </Card>
        </section>

        <section className="bg-white/60 dark:bg-white/[0.02]">
          <div className="mx-auto max-w-[1400px] px-6 py-16">
            <h2 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
              Core concepts
            </h2>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {concepts.map((concept) => (
                <Card
                  key={concept.term}
                  className="group flex-row items-start gap-4 rounded-2xl border-zinc-200 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-violet-300/70 hover:shadow-xl hover:shadow-violet-500/10 dark:border-white/10 dark:bg-zinc-900 dark:hover:border-violet-400/30"
                >
                  <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-violet-100 text-violet-600 transition-colors duration-300 group-hover:bg-gradient-to-br group-hover:from-violet-500 group-hover:to-sky-500 group-hover:text-white dark:bg-violet-400/10 dark:text-violet-300">
                    <concept.icon className="size-4" />
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                      {concept.term}
                    </p>
                    <p className="mt-1 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                      {concept.definition}
                    </p>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </div>

      <section className="mx-auto max-w-[1400px] px-6 py-16">
        <div className="flex items-baseline justify-between">
          <h2 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
            More guides
          </h2>
          <span className="rounded-full border border-violet-200 bg-violet-50 px-2.5 py-1 text-xs font-medium text-violet-700 dark:border-violet-400/20 dark:bg-violet-400/10 dark:text-violet-300">
            In progress
          </span>
        </div>
        <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
          These are being written as each capability ships — here&apos;s what&apos;s coming.
        </p>
        {filteredGuides.length === 0 ? (
          <p className="mt-8 text-sm text-zinc-500 dark:text-zinc-500">
            No guides match &ldquo;{query}&rdquo;.
          </p>
        ) : (
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filteredGuides.map((guide, index) => (
              <motion.div
                key={guide.title}
                {...fadeUp}
                transition={{ duration: 0.5, delay: index * 0.06, ease: [0.16, 1, 0.3, 1] }}
              >
                <Card className="gap-2 rounded-2xl border-zinc-200 bg-white p-5 opacity-70 transition-all duration-300 hover:-translate-y-1 hover:border-violet-300/70 hover:opacity-100 hover:shadow-xl hover:shadow-violet-500/10 dark:border-white/10 dark:bg-zinc-900 dark:hover:border-violet-400/30">
                  <div className="flex items-center justify-between">
                    <span className="flex size-8 items-center justify-center rounded-lg bg-zinc-100 text-zinc-500 dark:bg-white/[0.06] dark:text-zinc-400">
                      <guide.icon className="size-4" />
                    </span>
                    <span className="rounded-full border border-zinc-200 px-2 py-0.5 text-[10px] font-medium text-zinc-500 dark:border-white/10 dark:text-zinc-500">
                      Coming soon
                    </span>
                  </div>
                  <p className="text-xs font-medium text-violet-600 dark:text-violet-400">
                    {guide.category}
                  </p>
                  <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                    {guide.title}
                  </p>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400">{guide.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        )}
      </section>
    </MarketingPageShell>
  );
}
