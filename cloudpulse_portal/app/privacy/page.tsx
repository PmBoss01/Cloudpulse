import type { LegalSection } from "@/components/marketing/legal-page";
import { LegalPage } from "@/components/marketing/legal-page";

const sections: LegalSection[] = [
  {
    id: "information-we-collect",
    title: "Information we collect",
    content: (
      <>
        <p>We collect the minimum information needed to run the product:</p>
        <ul className="flex list-disc flex-col gap-1.5 pl-5">
          <li>
            <strong className="text-zinc-800 dark:text-zinc-200">Account information</strong> — your
            name and email address, whether you register with a password or continue with Google or
            GitHub. If you use Google or GitHub sign-in, we receive your name, email, and account ID
            from that provider — never your password.
          </li>
          <li>
            <strong className="text-zinc-800 dark:text-zinc-200">Cloud provider credentials</strong>{" "}
            — when you connect an Azure, AWS, or Google Cloud account, we store the read-only
            credentials you provide (service principal, IAM role ARN, or service account key),
            encrypted at rest. These credentials are scoped to read-only access and are used solely
            to run scans.
          </li>
          <li>
            <strong className="text-zinc-800 dark:text-zinc-200">Scan data</strong> — inventory,
            security findings, and cost data that our scans read from your connected cloud accounts,
            along with the Health Score history we compute from it.
          </li>
          <li>
            <strong className="text-zinc-800 dark:text-zinc-200">Usage data</strong> — basic product
            usage (pages visited, features used, scan frequency) so we can operate and improve the
            service.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "how-we-use-it",
    title: "How we use your information",
    content: (
      <ul className="flex list-disc flex-col gap-1.5 pl-5">
        <li>
          To provide the core product: running scans, computing your Health Score, and surfacing
          findings.
        </li>
        <li>
          To send account-related email: password resets, critical alerts, and weekly reports.
        </li>
        <li>To provide customer support when you contact us.</li>
        <li>To maintain the security and integrity of the service.</li>
        <li>
          If you enable the optional AI assistant, to generate plain-English explanations,
          summaries, and remediation suggestions from your scan data. AI features are off by default
          and never required for the product to work.
        </li>
      </ul>
    ),
  },
  {
    id: "cloud-provider-access",
    title: "Cloud provider access",
    content: (
      <>
        <p>
          CloudPulse only ever requests read-only access to your Azure, AWS, or Google Cloud account
          — the built-in Reader role (Azure), a ReadOnlyAccess IAM policy (AWS), or the roles/viewer
          role (Google Cloud). We cannot create, modify, or delete anything in your cloud
          environment through this access.
        </p>
        <p>
          You can revoke this access at any time by removing the corresponding role, service
          principal, or service account from your cloud provider console — this immediately stops
          all future scans for that account.
        </p>
      </>
    ),
  },
  {
    id: "sharing",
    title: "How we share information",
    content: (
      <>
        <p>We do not sell your data. We share information only with:</p>
        <ul className="flex list-disc flex-col gap-1.5 pl-5">
          <li>
            <strong className="text-zinc-800 dark:text-zinc-200">Your cloud providers</strong>{" "}
            (Azure, AWS, Google Cloud) — to perform the scans you&apos;ve authorized.
          </li>
          <li>
            <strong className="text-zinc-800 dark:text-zinc-200">Google and GitHub</strong> — if you
            choose to sign in with one of those providers.
          </li>
          <li>
            <strong className="text-zinc-800 dark:text-zinc-200">
              Our email delivery provider
            </strong>{" "}
            — to send account and notification emails on our behalf.
          </li>
          <li>
            <strong className="text-zinc-800 dark:text-zinc-200">Our AI service provider</strong> —
            only if you enable the optional AI assistant, and only the specific finding or summary
            data needed to generate that response.
          </li>
          <li>
            If required by law, or to protect the rights and safety of CloudPulse and its users.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "cookies",
    title: "Cookies and local storage",
    content: (
      <p>
        We don&apos;t use advertising or tracking cookies. After you sign in, your session tokens
        are stored in your browser&apos;s local or session storage (depending on whether you
        selected &ldquo;Keep me signed in&rdquo;) so you stay authenticated between visits. A
        short-lived cookie is used only during the Google/GitHub sign-in redirect to prevent
        cross-site request forgery, and is deleted immediately afterward.
      </p>
    ),
  },
  {
    id: "security",
    title: "Data security",
    content: (
      <p>
        Cloud provider credentials are encrypted at rest. All traffic between your browser and
        CloudPulse is encrypted in transit. Access to production data is limited to what&apos;s
        needed to operate the service. No method of storage or transmission is 100% secure, but we
        design the system so a breach of CloudPulse&apos;s infrastructure cannot be used to modify
        or delete anything in your cloud environment, since we never hold write access.
      </p>
    ),
  },
  {
    id: "retention",
    title: "Data retention",
    content: (
      <p>
        We retain your account and scan data for as long as your account is active. If you delete
        your account, we delete your stored cloud credentials and personal information within 30
        days, except where we&apos;re required to retain records for legal or accounting purposes.
      </p>
    ),
  },
  {
    id: "your-rights",
    title: "Your rights",
    content: (
      <>
        <p>Depending on where you live, you may have the right to:</p>
        <ul className="flex list-disc flex-col gap-1.5 pl-5">
          <li>Access the personal data we hold about you.</li>
          <li>Correct inaccurate data.</li>
          <li>Request deletion of your data.</li>
          <li>Export your data in a portable format.</li>
          <li>Withdraw consent for optional processing, such as the AI assistant, at any time.</li>
        </ul>
        <p>
          To exercise any of these rights, email{" "}
          <a
            href="mailto:privacy@cloudpulse.io"
            className="font-medium text-violet-600 hover:text-violet-700 dark:text-violet-400 dark:hover:text-violet-300"
          >
            privacy@cloudpulse.io
          </a>
          .
        </p>
      </>
    ),
  },
  {
    id: "children",
    title: "Children's privacy",
    content: (
      <p>
        CloudPulse is a business tool and is not directed at children. We do not knowingly collect
        personal information from anyone under 16.
      </p>
    ),
  },
  {
    id: "changes",
    title: "Changes to this policy",
    content: (
      <p>
        If we make material changes to this policy, we&apos;ll notify you by email or through the
        product before the change takes effect. The &ldquo;Last updated&rdquo; date at the top of
        this page always reflects the current version.
      </p>
    ),
  },
  {
    id: "contact",
    title: "Contact us",
    content: (
      <p>
        Questions about this policy or your data can be sent to{" "}
        <a
          href="mailto:privacy@cloudpulse.io"
          className="font-medium text-violet-600 hover:text-violet-700 dark:text-violet-400 dark:hover:text-violet-300"
        >
          privacy@cloudpulse.io
        </a>
        .
      </p>
    ),
  },
];

export default function PrivacyPage() {
  return (
    <LegalPage
      eyebrow="Legal"
      title="Privacy Policy"
      lastUpdated="July 19, 2026"
      intro={
        <>
          CloudPulse (&ldquo;we,&rdquo; &ldquo;us&rdquo;) is built by IndoorTech. This policy
          explains what data we collect when you use CloudPulse, why we collect it, and the choices
          you have — including the read-only access model we use for every cloud provider
          connection, and the fact that AI features are entirely optional and off by default.
        </>
      }
      sections={sections}
    />
  );
}
