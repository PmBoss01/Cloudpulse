import Link from "next/link";

import type { LegalSection } from "@/components/marketing/legal-page";
import { LegalPage } from "@/components/marketing/legal-page";

const sections: LegalSection[] = [
  {
    id: "acceptance",
    title: "Acceptance of terms",
    content: (
      <p>
        By creating a CloudPulse account or using the service, you agree to these Terms of Service
        and our{" "}
        <Link
          href="/privacy"
          className="font-medium text-violet-600 hover:text-violet-700 dark:text-violet-400 dark:hover:text-violet-300"
        >
          Privacy Policy
        </Link>
        . If you&apos;re using CloudPulse on behalf of a company, you&apos;re confirming you have
        the authority to bind that company to these terms.
      </p>
    ),
  },
  {
    id: "the-service",
    title: "The service",
    content: (
      <p>
        CloudPulse connects to your Azure, AWS, or Google Cloud accounts using read-only credentials
        to compute a Cloud Health Score, surface security findings, identify cost savings, and
        maintain a searchable inventory of your resources. CloudPulse never requests write access
        and cannot create, modify, or delete resources in your connected cloud accounts. An optional
        AI assistant is available on top of this — it is never required for the core product to
        function.
      </p>
    ),
  },
  {
    id: "accounts",
    title: "Accounts",
    content: (
      <>
        <p>
          You must provide accurate information when creating an account and keep your login
          credentials secure. You&apos;re responsible for all activity that happens under your
          account. Let us know immediately if you suspect unauthorized access.
        </p>
        <p>
          You must be at least 16 years old and have the legal capacity to enter into these terms to
          use CloudPulse.
        </p>
      </>
    ),
  },
  {
    id: "plans-and-billing",
    title: "Plans and billing",
    content: (
      <ul className="flex list-disc flex-col gap-1.5 pl-5">
        <li>
          The Starter plan is free and does not require a credit card. Paid plans (Growth, Team) are
          billed monthly or annually, as shown on the{" "}
          <Link
            href="/pricing"
            className="font-medium text-violet-600 hover:text-violet-700 dark:text-violet-400 dark:hover:text-violet-300"
          >
            pricing page
          </Link>
          .
        </li>
        <li>
          There are no long-term contracts — you can upgrade, downgrade, or cancel at any time from
          your account settings.
        </li>
        <li>Fees already paid are non-refundable except where required by law.</li>
        <li>We&apos;ll notify you before any price change takes effect on your account.</li>
      </ul>
    ),
  },
  {
    id: "cloud-access",
    title: "Cloud provider connections",
    content: (
      <p>
        When you connect a cloud account, you&apos;re representing that you&apos;re authorized to
        grant CloudPulse read-only access to it. You are responsible for creating credentials scoped
        to read-only permissions as documented — if you grant broader access than requested,
        that&apos;s outside CloudPulse&apos;s control. You can revoke access at any time from your
        cloud provider&apos;s console.
      </p>
    ),
  },
  {
    id: "acceptable-use",
    title: "Acceptable use",
    content: (
      <>
        <p>You agree not to:</p>
        <ul className="flex list-disc flex-col gap-1.5 pl-5">
          <li>Use CloudPulse to access cloud accounts you&apos;re not authorized to access.</li>
          <li>Attempt to bypass, disable, or interfere with the security of the service.</li>
          <li>Reverse-engineer or resell the service without our written permission.</li>
          <li>Use the service to violate any law or the rights of others.</li>
        </ul>
      </>
    ),
  },
  {
    id: "ai-features",
    title: "AI features",
    content: (
      <p>
        The optional AI assistant generates explanations, summaries, and suggestions based on your
        scan data. These outputs are provided to help you understand your results faster — they are
        not a substitute for your own judgment, and CloudPulse does not guarantee their accuracy.
        You&apos;re responsible for verifying any recommendation before acting on it, especially
        anything that affects security or cost decisions.
      </p>
    ),
  },
  {
    id: "intellectual-property",
    title: "Intellectual property",
    content: (
      <p>
        CloudPulse and its original content, features, and functionality are owned by IndoorTech.
        You retain all rights to your own data — the inventory, findings, and scan results generated
        from your connected cloud accounts belong to you, not to us.
      </p>
    ),
  },
  {
    id: "disclaimers",
    title: "Disclaimers and limitation of liability",
    content: (
      <p>
        CloudPulse is provided &ldquo;as is,&rdquo; without warranties of any kind. We do not
        guarantee that findings are exhaustive or that following a recommendation will prevent every
        security or cost issue. To the maximum extent permitted by law, CloudPulse and IndoorTech
        are not liable for indirect, incidental, or consequential damages arising from your use of
        the service.
      </p>
    ),
  },
  {
    id: "termination",
    title: "Termination",
    content: (
      <p>
        You can stop using CloudPulse and delete your account at any time. We may suspend or
        terminate accounts that violate these terms, with notice where reasonably possible. On
        termination, your cloud provider credentials and stored data are deleted per our{" "}
        <Link
          href="/privacy"
          className="font-medium text-violet-600 hover:text-violet-700 dark:text-violet-400 dark:hover:text-violet-300"
        >
          Privacy Policy
        </Link>
        .
      </p>
    ),
  },
  {
    id: "changes",
    title: "Changes to these terms",
    content: (
      <p>
        We&apos;ll notify you by email or through the product before any material change to these
        terms takes effect. Continuing to use CloudPulse after a change takes effect means you
        accept the updated terms.
      </p>
    ),
  },
  {
    id: "contact",
    title: "Contact us",
    content: (
      <p>
        Questions about these terms can be sent to{" "}
        <a
          href="mailto:support@cloudpulse.io"
          className="font-medium text-violet-600 hover:text-violet-700 dark:text-violet-400 dark:hover:text-violet-300"
        >
          support@cloudpulse.io
        </a>
        .
      </p>
    ),
  },
];

export default function TermsPage() {
  return (
    <LegalPage
      eyebrow="Legal"
      title="Terms of Service"
      lastUpdated="July 19, 2026"
      intro={
        <>
          These terms govern your use of CloudPulse, built by IndoorTech. They cover how accounts
          and billing work, what read-only access to your cloud accounts means in practice, and the
          boundaries of the optional AI assistant.
        </>
      }
      sections={sections}
    />
  );
}
