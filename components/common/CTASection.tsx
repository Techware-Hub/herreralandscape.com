import { Phone, Mail } from "lucide-react";
import Button from "./Button";
import Reveal from "./Reveal";
import StakeDivider from "./StakeDivider";
import { siteConfig, telHref, mailtoHref } from "@/lib/site";

interface CTASectionProps {
  title?: string;
  description?: string;
  compact?: boolean;
}

export default function CTASection({
  title = "Ready to Transform Your Outdoor Space?",
  description = "Request a free quote today. Call, text, or message us and we'll help you plan your next landscaping or hardscaping project.",
  compact = false,
}: CTASectionProps) {
  return (
    <section className={compact ? "py-12" : "py-16 sm:py-20"} aria-labelledby="cta-heading">
      <div className="container-page">
        <div className="relative overflow-hidden rounded-3xl bg-forest-800 px-6 py-12 text-center shadow-xl sm:px-12 sm:py-16">
          {/* decorative gradients — moss glow + lavender floral hint */}
          <div
            className="pointer-events-none absolute inset-0 opacity-50"
            style={{
              background:
                "radial-gradient(55% 80% at 50% 0%, rgba(82,111,22,0.45), transparent 70%), radial-gradient(30% 50% at 92% 100%, rgba(136,98,141,0.28), transparent 70%)",
            }}
            aria-hidden
          />
          <Reveal className="relative">
            <StakeDivider tone="cream" className="mb-5 flex justify-center" />
            <h2
              id="cta-heading"
              className="mx-auto max-w-2xl text-2xl font-semibold text-white sm:text-3xl md:text-4xl"
            >
              {title}
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-beige-100/90">{description}</p>
            <div className="mt-8 flex flex-col flex-wrap items-center justify-center gap-3 sm:flex-row">
              <Button href="/quote" variant="gold" size="lg">
                Request a Free Quote
              </Button>
              <Button
                href={telHref}
                variant="secondary"
                size="lg"
                className="bg-white/10 text-white ring-1 ring-white/30 hover:bg-white/20"
              >
                <Phone className="h-5 w-5" aria-hidden />
                Call {siteConfig.phone}
              </Button>
            </div>
            <div className="mt-6 flex flex-col items-center justify-center gap-2 text-sm text-beige-100/80 sm:flex-row sm:gap-6">
              <a href={telHref} className="inline-flex items-center gap-2 hover:text-white">
                <Phone className="h-4 w-4" aria-hidden /> {siteConfig.phone}
              </a>
              <a href={mailtoHref} className="inline-flex items-center gap-2 hover:text-white">
                <Mail className="h-4 w-4" aria-hidden /> {siteConfig.email}
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
