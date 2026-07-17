import { Phone, Mail, Clock } from "lucide-react";
import QuoteForm from "@/components/forms/QuoteForm";
import Reveal from "@/components/common/Reveal";
import { siteConfig, telHref, mailtoHref } from "@/lib/site";

export default function QuoteFormSection() {
  return (
    <section id="quote" className="bg-beige-100 py-16 sm:py-24" aria-labelledby="quote-heading">
      <div className="container-page">
        <div className="grid gap-10 lg:grid-cols-5 lg:gap-14">
          <Reveal className="lg:col-span-2">
            <p className="text-sm font-semibold uppercase tracking-wider text-grass-600">
              Free Estimate
            </p>
            <h2 id="quote-heading" className="mt-3 text-3xl font-semibold tracking-tight text-forest-900 sm:text-4xl">
              Request a Free Quote
            </h2>
            <p className="mt-4 leading-relaxed text-stone-600">
              Tell us about your project and we&apos;ll get back to you with a clear, no-pressure
              estimate. Prefer to talk? Call, text, or WhatsApp us — we&apos;re happy to help.
            </p>

            <ul className="mt-8 space-y-4">
              <li className="flex items-center gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-forest-600 text-white">
                  <Phone className="h-5 w-5" aria-hidden />
                </span>
                <div>
                  <p className="text-xs font-medium uppercase tracking-wide text-stone-500">Call or Text</p>
                  <a href={telHref} className="font-semibold text-forest-900 hover:text-forest-700">
                    {siteConfig.phone}
                  </a>
                </div>
              </li>
              <li className="flex items-center gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-forest-600 text-white">
                  <Mail className="h-5 w-5" aria-hidden />
                </span>
                <div>
                  <p className="text-xs font-medium uppercase tracking-wide text-stone-500">Email</p>
                  <a href={mailtoHref} className="font-semibold text-forest-900 hover:text-forest-700 break-all">
                    {siteConfig.email}
                  </a>
                </div>
              </li>
              <li className="flex items-center gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-forest-600 text-white">
                  <Clock className="h-5 w-5" aria-hidden />
                </span>
                <div>
                  <p className="text-xs font-medium uppercase tracking-wide text-stone-500">Hours</p>
                  <p className="font-semibold text-forest-900">Mon–Sat, by appointment</p>
                </div>
              </li>
            </ul>
          </Reveal>

          <Reveal delay={0.1} className="lg:col-span-3">
            <div className="rounded-3xl border border-stone-200 bg-white p-6 shadow-sm sm:p-8">
              <QuoteForm />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
