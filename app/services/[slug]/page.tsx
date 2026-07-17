import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import Link from "next/link";
import { CheckCircle2, ArrowRight } from "lucide-react";
import PageHero from "@/components/common/PageHero";
import SectionHeading from "@/components/common/SectionHeading";
import Reveal from "@/components/common/Reveal";
import Button from "@/components/common/Button";
import CTASection from "@/components/common/CTASection";
import FAQAccordion from "@/components/common/FAQAccordion";
import ProjectGallery from "@/components/gallery/ProjectGallery";
import ServiceCard from "@/components/services/ServiceCard";
import { ServiceSchema, FaqSchema } from "@/components/common/JsonLd";
import { getService, getServiceSlugs, services } from "@/data/services";
import { getProjectsByCategory } from "@/data/projects";
import { processSteps } from "@/data/process";
import { siteConfig } from "@/lib/site";

interface Params {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return getServiceSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return { title: "Service Not Found" };

  const title = `${service.title} in Sunnyvale`;
  return {
    title,
    description: service.excerpt,
    alternates: { canonical: `/services/${service.slug}` },
    openGraph: {
      title: `${service.title} | Herrera Landscape`,
      description: service.excerpt,
      url: `${siteConfig.url}/services/${service.slug}`,
      images: [{ url: service.heroImage, width: 1600, height: 760, alt: service.imageAlt }],
    },
  };
}

export default async function ServiceDetailPage({ params }: Params) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  const relatedProjects = getProjectsByCategory(service.projectCategory).slice(0, 3);
  const relatedServices = services.filter((s) => s.slug !== service.slug).slice(0, 3);
  const url = `${siteConfig.url}/services/${service.slug}`;

  return (
    <>
      <ServiceSchema name={service.title} description={service.excerpt} url={url} />
      <FaqSchema faqs={service.faqs} />

      <PageHero
        eyebrow="Service"
        title={service.title}
        subtitle={service.description}
        image={service.heroImage}
        imageAlt={service.imageAlt}
        crumbs={[
          { name: "Services", href: "/services" },
          { name: service.title, href: `/services/${service.slug}` },
        ]}
      >
        <Button href="/quote" variant="gold" size="lg">
          Request a Free Quote
        </Button>
      </PageHero>

      {/* Overview: benefits + includes */}
      <section className="py-16 sm:py-20">
        <div className="container-page">
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-14">
            <Reveal>
              <h2 className="text-2xl font-semibold text-forest-900 sm:text-3xl">
                Benefits of {service.title}
              </h2>
              <ul className="mt-6 space-y-3">
                {service.benefits.map((b) => (
                  <li key={b} className="flex items-start gap-3 text-stone-700">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-grass-500" aria-hidden />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="rounded-3xl border border-stone-200 bg-white p-6 shadow-sm sm:p-8">
                <h2 className="text-2xl font-semibold text-forest-900 sm:text-3xl">
                  What&apos;s Included
                </h2>
                <ul className="mt-6 space-y-3">
                  {service.includes.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-stone-700">
                      <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-forest-500" aria-hidden />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>

          {/* Supporting images — a closer look at this service */}
          <div className="mt-12 grid gap-6 sm:grid-cols-2">
            {service.gallery.map((src, i) => (
              <Reveal key={src} delay={i * 0.1}>
                <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-stone-200 shadow-sm">
                  <Image
                    src={src}
                    alt={`${service.title} — example ${i + 1}: ${service.imageAlt}`}
                    fill
                    sizes="(max-width: 640px) 100vw, 50vw"
                    className="object-cover"
                  />
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="bg-white py-16 sm:py-20">
        <div className="container-page">
          <SectionHeading
            eyebrow="How It Works"
            title="Our Service Process"
            description="A clear, straightforward path from first contact to a finished project."
          />
          <ol className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {processSteps.map(({ step, title, description, icon: Icon }, i) => (
              <Reveal key={step} delay={i * 0.08}>
                <li className="h-full rounded-2xl border border-stone-200 bg-beige-50 p-6">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-forest-600 text-white">
                    <Icon className="h-5 w-5" aria-hidden />
                  </div>
                  <p className="mt-4 text-xs font-semibold uppercase tracking-wide text-grass-600">
                    Step {step}
                  </p>
                  <h3 className="mt-1 font-semibold text-forest-900">{title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-stone-600">{description}</p>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* Related projects */}
      {relatedProjects.length > 0 && (
        <section className="py-16 sm:py-20">
          <div className="container-page">
            <SectionHeading
              eyebrow="Related Work"
              title={`Recent ${service.projectCategory} Projects`}
            />
            <div className="mt-10">
              <ProjectGallery projects={relatedProjects} showFilter={false} paginate={false} />
            </div>
          </div>
        </section>
      )}

      {/* FAQs */}
      <section className="bg-white py-16 sm:py-20">
        <div className="container-page">
          <SectionHeading eyebrow="FAQs" title={`${service.title} — Frequently Asked Questions`} />
          <div className="mx-auto mt-10 max-w-3xl">
            <FAQAccordion faqs={service.faqs} />
          </div>
        </div>
      </section>

      {/* Related services */}
      <section className="py-16 sm:py-20">
        <div className="container-page">
          <div className="flex items-end justify-between gap-4">
            <SectionHeading eyebrow="Explore More" title="Related Services" align="left" className="mx-0" />
            <Link
              href="/services"
              className="hidden shrink-0 items-center gap-1.5 text-sm font-semibold text-forest-700 hover:text-grass-600 sm:inline-flex"
            >
              All services <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </div>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {relatedServices.map((s) => (
              <ServiceCard key={s.slug} service={s} />
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
