import type { Metadata } from "next";
import Image from "next/image";
import { Phone, Mail, MapPin, Clock, MessageCircle } from "lucide-react";
import PageHero from "@/components/common/PageHero";
import SectionHeading from "@/components/common/SectionHeading";
import Reveal from "@/components/common/Reveal";
import ContactForm from "@/components/forms/ContactForm";
import FAQAccordion from "@/components/common/FAQAccordion";
import { FaqSchema } from "@/components/common/JsonLd";
import { contactFaqs } from "@/data/faqs";
import { siteConfig, telHref, mailtoHref, whatsappHref } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Contact Herrera Landscape in Sunnyvale. Call, text, WhatsApp, or email us, or send a message and we'll respond quickly. Free estimates for landscaping and hardscaping projects.",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Contact Herrera Landscape",
    description: "Get in touch for a free landscaping or hardscaping estimate in Sunnyvale.",
    url: `${siteConfig.url}/contact`,
  },
};

export default function ContactPage() {
  return (
    <>
      <FaqSchema faqs={contactFaqs} />
      <PageHero
        eyebrow="Contact"
        title="Get in Touch"
        subtitle="Have a question or ready to start a project? Reach out and we'll be glad to help. We serve Sunnyvale and the surrounding Bay Area."
        image="/assets/images/contact/garden-walkway.webp"
        imageAlt="Landscaped garden courtyard with a paved walkway and seating"
        crumbs={[{ name: "Contact", href: "/contact" }]}
      />

      <section className="py-16 sm:py-20">
        <div className="container-page">
          <div className="grid gap-10 lg:grid-cols-5 lg:gap-14">
            {/* Info */}
            <Reveal className="lg:col-span-2">
              <h2 className="text-2xl font-semibold text-forest-900">Contact Information</h2>
              <p className="mt-3 text-stone-600">
                Call or text for the fastest response, or send us a message using the form.
              </p>
              <ul className="mt-8 space-y-5">
                <li className="flex gap-4">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-forest-600 text-white">
                    <Phone className="h-5 w-5" aria-hidden />
                  </span>
                  <div>
                    <p className="text-xs font-medium uppercase tracking-wide text-stone-500">Phone / Text</p>
                    <a href={telHref} className="font-semibold text-forest-900 hover:text-forest-700">
                      {siteConfig.phone}
                    </a>
                  </div>
                </li>
                <li className="flex gap-4">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#25D366] text-white">
                    <MessageCircle className="h-5 w-5" aria-hidden />
                  </span>
                  <div>
                    <p className="text-xs font-medium uppercase tracking-wide text-stone-500">WhatsApp</p>
                    <a
                      href={whatsappHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-semibold text-forest-900 hover:text-forest-700"
                    >
                      Message us on WhatsApp
                    </a>
                  </div>
                </li>
                <li className="flex gap-4">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-forest-600 text-white">
                    <Mail className="h-5 w-5" aria-hidden />
                  </span>
                  <div>
                    <p className="text-xs font-medium uppercase tracking-wide text-stone-500">Email</p>
                    <a href={mailtoHref} className="font-semibold text-forest-900 hover:text-forest-700 break-all">
                      {siteConfig.email}
                    </a>
                  </div>
                </li>
                <li className="flex gap-4">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-forest-600 text-white">
                    <MapPin className="h-5 w-5" aria-hidden />
                  </span>
                  <div>
                    <p className="text-xs font-medium uppercase tracking-wide text-stone-500">Service Area</p>
                    <p className="font-semibold text-forest-900">
                      {siteConfig.location.city}, {siteConfig.location.region}
                    </p>
                    <p className="text-sm text-stone-500">& surrounding Bay Area communities</p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-forest-600 text-white">
                    <Clock className="h-5 w-5" aria-hidden />
                  </span>
                  <div>
                    <p className="text-xs font-medium uppercase tracking-wide text-stone-500">Business Hours</p>
                    <ul className="mt-1 space-y-0.5 text-sm text-stone-700">
                      {siteConfig.hours.map((h) => (
                        <li key={h.day} className="flex justify-between gap-6">
                          <span>{h.day}</span>
                          <span className="text-stone-500">
                            {h.open === "Closed" ? "Closed" : `${h.open} – ${h.close}`}
                          </span>
                        </li>
                      ))}
                    </ul>
                    <p className="mt-1 text-xs text-stone-400">Hours are a placeholder — update as needed.</p>
                  </div>
                </li>
              </ul>
            </Reveal>

            {/* Form */}
            <Reveal delay={0.1} className="lg:col-span-3">
              <div className="rounded-3xl border border-stone-200 bg-white p-6 shadow-sm sm:p-8">
                <h2 className="text-2xl font-semibold text-forest-900">Send Us a Message</h2>
                <p className="mt-2 text-sm text-stone-600">
                  We&apos;ll get back to you as soon as possible during business hours.
                </p>
                <div className="mt-6">
                  <ContactForm />
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Service-area image band (a Google Map embed can be added here later) */}
      <section className="pb-16 sm:pb-20">
        <div className="container-page">
          <div className="relative aspect-[21/9] overflow-hidden rounded-3xl border border-stone-200 shadow-sm">
            <Image
              src="/assets/images/contact/landscaped-front-yard.webp"
              alt="Landscaped front yard with garden plants and a stone path in a California neighborhood"
              fill
              sizes="(max-width: 1280px) 100vw, 1200px"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-forest-900/75 via-forest-900/25 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 flex flex-col items-start gap-1 p-6 text-white">
              <MapPin className="h-8 w-8 text-grass-300" aria-hidden />
              <p className="font-display text-xl font-semibold">
                Serving {siteConfig.location.city}, {siteConfig.location.regionShort} &amp; the
                surrounding Bay Area
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="bg-white py-16 sm:py-20">
        <div className="container-page">
          <SectionHeading eyebrow="Questions" title="Frequently Asked Questions" />
          <div className="mx-auto mt-10 max-w-3xl">
            <FAQAccordion faqs={contactFaqs} />
          </div>
        </div>
      </section>
    </>
  );
}
