import type { Metadata } from "next";
import LegalLayout from "@/components/common/LegalLayout";
import { siteConfig, mailtoHref } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `Privacy Policy for ${siteConfig.name} — how we collect, use, and protect your information.`,
  alternates: { canonical: "/privacy-policy" },
  robots: { index: true, follow: true },
};

export default function PrivacyPolicyPage() {
  return (
    <LegalLayout title="Privacy Policy" updated="July 2026" crumbs={[{ name: "Privacy Policy", href: "/privacy-policy" }]}>
      <p>
        {siteConfig.name} (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) respects your privacy.
        This Privacy Policy explains how we collect, use, and safeguard information when you visit our
        website or contact us about our landscaping and hardscaping services.
      </p>

      <h2>Information We Collect</h2>
      <p>We may collect the following information when you use our website or contact us:</p>
      <ul>
        <li>Contact details you provide, such as your name, email, phone number, and address.</li>
        <li>Project details you share in a quote request or contact form.</li>
        <li>Any images or files you choose to upload.</li>
        <li>Basic technical information such as browser type and general usage data.</li>
      </ul>

      <h2>How We Use Your Information</h2>
      <ul>
        <li>To respond to your inquiries and provide quotes and estimates.</li>
        <li>To schedule and carry out requested services.</li>
        <li>To communicate with you about your project.</li>
        <li>To improve our website and services.</li>
      </ul>

      <h2>How We Share Information</h2>
      <p>
        We do not sell your personal information. We may share information with trusted service
        providers who help us operate our business (for example, email or hosting providers), only as
        needed to provide our services and subject to appropriate safeguards.
      </p>

      <h2>Data Retention</h2>
      <p>
        We keep your information only as long as necessary to fulfill the purposes described in this
        policy or as required by law.
      </p>

      <h2>Your Choices</h2>
      <p>
        You may request access to, correction of, or deletion of your personal information by
        contacting us. You can also opt out of non-essential communications at any time.
      </p>

      <h2>Cookies</h2>
      <p>
        Our website may use cookies or similar technologies to support basic functionality and
        understand site usage. You can control cookies through your browser settings.
      </p>

      <h2>Contact Us</h2>
      <p>
        If you have questions about this Privacy Policy, contact us at{" "}
        <a href={mailtoHref}>{siteConfig.email}</a> or {siteConfig.phone}.
      </p>
    </LegalLayout>
  );
}
