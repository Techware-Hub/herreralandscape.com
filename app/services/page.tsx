import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import PageHero from "@/components/common/PageHero";
import SectionHeading from "@/components/common/SectionHeading";
import Reveal from "@/components/common/Reveal";
import Button from "@/components/common/Button";
import CTASection from "@/components/common/CTASection";
import ProcessSection from "@/components/home/ProcessSection";
import { services } from "@/data/services";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Landscaping & Hardscaping Services",
  description:
    "Explore Herrera Landscape's services in Sunnyvale — landscaping, hardscaping, pavers, fencing, irrigation, artificial and natural grass, plants, maintenance, cleanup, and outdoor renovations.",
  alternates: { canonical: "/services" },
  openGraph: {
    title: "Landscaping & Hardscaping Services | Herrera Landscape",
    description:
      "Professional landscaping and hardscaping services in Sunnyvale and the Bay Area.",
    url: `${siteConfig.url}/services`,
  },
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Our Services"
        title="Complete Landscaping & Hardscaping Services"
        subtitle="From design and installation to ongoing care, we offer everything you need to build and maintain a beautiful outdoor space in Sunnyvale and the Bay Area."
        image="/images/services/hardscaping-wide.svg"
        imageAlt="Hardscaping and landscaping work in progress"
        crumbs={[{ name: "Services", href: "/services" }]}
      >
        <Button href="/quote" variant="gold" size="lg">
          Request a Free Quote
        </Button>
      </PageHero>

      <section className="py-16 sm:py-24">
        <div className="container-page">
          <SectionHeading
            eyebrow="What We Offer"
            title="Services Built Around Your Property"
            description="Every service is delivered with quality materials, professional crews, and attention to detail. Click any service to learn more."
          />

          <div className="mt-14 space-y-16 sm:space-y-20">
            {services.map((service, i) => {
              const Icon = service.icon;
              const reversed = i % 2 === 1;
              return (
                <Reveal key={service.slug}>
                  <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-14">
                    <div className={reversed ? "lg:order-2" : ""}>
                      <div className="relative aspect-[16/10] overflow-hidden rounded-3xl shadow-lg">
                        <Image
                          src={service.imageWide}
                          alt={`${service.title} service by Herrera Landscape`}
                          fill
                          sizes="(max-width: 1024px) 100vw, 560px"
                          className="object-cover"
                        />
                      </div>
                    </div>
                    <div className={reversed ? "lg:order-1" : ""}>
                      <div className="flex items-center gap-3">
                        <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-forest-600 text-white">
                          <Icon className="h-5 w-5" aria-hidden />
                        </span>
                        <h3 className="text-2xl font-semibold text-forest-900">{service.title}</h3>
                      </div>
                      <p className="mt-4 leading-relaxed text-stone-600">{service.description}</p>
                      <ul className="mt-5 grid gap-2 sm:grid-cols-2">
                        {service.benefits.map((b) => (
                          <li key={b} className="flex items-start gap-2 text-sm text-forest-900">
                            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-grass-500" aria-hidden />
                            {b}
                          </li>
                        ))}
                      </ul>
                      <div className="mt-6 flex flex-wrap gap-3">
                        <Link
                          href={`/services/${service.slug}`}
                          className="inline-flex items-center gap-1.5 rounded-full bg-forest-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-forest-700"
                        >
                          Learn More
                          <ArrowRight className="h-4 w-4" aria-hidden />
                        </Link>
                        <Link
                          href="/quote"
                          className="inline-flex items-center gap-1.5 rounded-full border-2 border-forest-600 px-5 py-2.5 text-sm font-semibold text-forest-700 transition-colors hover:bg-forest-50"
                        >
                          Get a Quote
                        </Link>
                      </div>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <ProcessSection />
      <CTASection />
    </>
  );
}
