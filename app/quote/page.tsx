import type { Metadata } from "next";
import { Phone, MessageCircle, Mail, ShieldCheck } from "lucide-react";
import PageHero from "@/components/common/PageHero";
import QuoteForm from "@/components/forms/QuoteForm";
import Reveal from "@/components/common/Reveal";
import { siteConfig, telHref, mailtoHref, whatsappHref } from "@/lib/site";

export const metadata: Metadata = {
  title: "Request a Free Quote",
  description:
    "Request a free landscaping or hardscaping quote from Herrera Landscape in Sunnyvale. Tell us about your project and we'll get back to you with a clear, no-pressure estimate.",
  alternates: { canonical: "/quote" },
  openGraph: {
    title: "Request a Free Quote | Herrera Landscape",
    description: "Get a free, no-pressure estimate for your landscaping or hardscaping project.",
    url: `${siteConfig.url}/quote`,
  },
};

const perks = [
  "Free, no-pressure estimates",
  "Residential & commercial projects",
  "Local Sunnyvale & Bay Area service",
  "Quick, friendly response",
];

export default function QuotePage() {
  return (
    <>
      <PageHero
        eyebrow="Free Estimate"
        title="Request a Free Quote"
        subtitle="Tell us about your project and we'll provide a clear, no-pressure estimate. Prefer to talk? Call, text, or WhatsApp us anytime."
        image="/images/services/outdoor-renovations-wide.svg"
        imageAlt="Outdoor renovation project"
        crumbs={[{ name: "Request a Quote", href: "/quote" }]}
      />

      <section className="py-16 sm:py-20">
        <div className="container-page">
          <div className="grid gap-10 lg:grid-cols-5 lg:gap-14">
            {/* Sidebar */}
            <Reveal className="lg:col-span-2">
              <h2 className="text-2xl font-semibold text-forest-900">Let&apos;s plan your project</h2>
              <p className="mt-4 leading-relaxed text-stone-600">
                Share a few details and we&apos;ll follow up to schedule a visit and provide your free
                estimate. The more you tell us, the more accurate we can be.
              </p>

              <ul className="mt-6 space-y-2.5">
                {perks.map((p) => (
                  <li key={p} className="flex items-center gap-2.5 text-sm font-medium text-forest-900">
                    <ShieldCheck className="h-5 w-5 shrink-0 text-grass-500" aria-hidden />
                    {p}
                  </li>
                ))}
              </ul>

              <div className="mt-8 space-y-3 rounded-2xl border border-stone-200 bg-white p-5">
                <p className="text-sm font-semibold text-forest-900">Prefer to reach out directly?</p>
                <a href={telHref} className="flex items-center gap-3 text-sm text-stone-700 hover:text-forest-700">
                  <Phone className="h-4 w-4 text-forest-600" aria-hidden /> {siteConfig.phone}
                </a>
                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-sm text-stone-700 hover:text-forest-700"
                >
                  <MessageCircle className="h-4 w-4 text-forest-600" aria-hidden /> WhatsApp us
                </a>
                <a href={mailtoHref} className="flex items-center gap-3 break-all text-sm text-stone-700 hover:text-forest-700">
                  <Mail className="h-4 w-4 text-forest-600" aria-hidden /> {siteConfig.email}
                </a>
              </div>
            </Reveal>

            {/* Form */}
            <Reveal delay={0.1} className="lg:col-span-3">
              <div className="rounded-3xl border border-stone-200 bg-white p-6 shadow-sm sm:p-8">
                <QuoteForm />
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
