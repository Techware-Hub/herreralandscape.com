import type { Metadata } from "next";
import LegalLayout from "@/components/common/LegalLayout";
import { siteConfig, mailtoHref } from "@/lib/site";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description: `Terms and Conditions for using the ${siteConfig.name} website and services.`,
  alternates: { canonical: "/terms" },
  robots: { index: true, follow: true },
};

export default function TermsPage() {
  return (
    <LegalLayout title="Terms & Conditions" updated="July 2026" crumbs={[{ name: "Terms & Conditions", href: "/terms" }]}>
      <p>
        These Terms and Conditions govern your use of the {siteConfig.name} website. By using this
        website, you agree to these terms. If you do not agree, please do not use the site.
      </p>

      <h2>Use of Our Website</h2>
      <p>
        You may use our website for lawful purposes only. You agree not to misuse the site, interfere
        with its operation, or attempt to access it in an unauthorized way.
      </p>

      <h2>Services & Estimates</h2>
      <p>
        Information on this website about our landscaping and hardscaping services is provided for
        general guidance. Any quotes or estimates are provided separately and are subject to a formal
        agreement. Project scope, pricing, and timelines are confirmed in writing before work begins.
      </p>

      <h2>Quote & Contact Submissions</h2>
      <p>
        When you submit a quote request or contact form, you confirm that the information you provide
        is accurate and that you consent to be contacted regarding your request.
      </p>

      <h2>Intellectual Property</h2>
      <p>
        The content, branding, and materials on this website are the property of {siteConfig.name} or
        its licensors and may not be copied or reused without permission.
      </p>

      <h2>Third-Party Links</h2>
      <p>
        Our website may contain links to third-party sites. We are not responsible for the content or
        practices of those websites.
      </p>

      <h2>Limitation of Liability</h2>
      <p>
        This website is provided on an &quot;as is&quot; basis. To the fullest extent permitted by
        law, {siteConfig.name} is not liable for any damages arising from your use of the website.
      </p>

      <h2>Changes to These Terms</h2>
      <p>
        We may update these Terms and Conditions from time to time. Continued use of the website after
        changes are posted constitutes acceptance of the updated terms.
      </p>

      <h2>Contact Us</h2>
      <p>
        Questions about these terms? Contact us at <a href={mailtoHref}>{siteConfig.email}</a> or{" "}
        {siteConfig.phone}.
      </p>
    </LegalLayout>
  );
}
