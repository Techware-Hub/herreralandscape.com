import type { Metadata } from "next";
import Image from "next/image";
import { Target, HeartHandshake, ShieldCheck, Sprout, CheckCircle2 } from "lucide-react";
import PageHero from "@/components/common/PageHero";
import SectionHeading from "@/components/common/SectionHeading";
import Reveal from "@/components/common/Reveal";
import Button from "@/components/common/Button";
import CTASection from "@/components/common/CTASection";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about Herrera Landscape — a local, customer-focused landscaping and hardscaping company serving Sunnyvale and the Bay Area with quality workmanship and honest service.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About Herrera Landscape",
    description:
      "A local, customer-focused landscaping and hardscaping company serving Sunnyvale and the Bay Area.",
    url: `${siteConfig.url}/about`,
  },
};

const values = [
  { icon: Target, title: "Our Mission", text: "To transform outdoor spaces with dependable, high-quality landscaping and hardscaping — treating every property as if it were our own." },
  { icon: ShieldCheck, title: "Commitment to Quality", text: "We take pride in doing the job right, using quality materials and proven methods that stand up over time." },
  { icon: HeartHandshake, title: "Customer-Focused", text: "Clear communication, honest estimates, and a friendly approach from the first call to the final walkthrough." },
  { icon: Sprout, title: "Local & Reliable", text: "Proudly serving Sunnyvale and nearby Bay Area communities with service you can count on." },
];

const whyPoints = [
  "Professional, dependable crews",
  "Quality materials and workmanship",
  "Clear, honest communication",
  "Custom outdoor solutions",
  "Residential and commercial work",
  "Free, no-pressure estimates",
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About Us"
        title="Rooted in Quality, Built on Trust"
        subtitle="Herrera Landscape is a local landscaping and hardscaping company dedicated to transforming outdoor spaces across Sunnyvale and the Bay Area."
        image="/images/about/about-2.svg"
        imageAlt="Completed landscaping project by Herrera Landscape"
        crumbs={[{ name: "About", href: "/about" }]}
      />

      {/* Intro + owner */}
      <section className="py-16 sm:py-24">
        <div className="container-page">
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
            <Reveal>
              <div className="relative mx-auto aspect-[4/5] w-full max-w-md overflow-hidden rounded-3xl shadow-xl">
                <Image
                  src="/images/team/owner.svg"
                  alt={`${siteConfig.owner}, owner of Herrera Landscape`}
                  fill
                  sizes="(max-width: 1024px) 100vw, 440px"
                  className="object-cover"
                />
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="text-sm font-semibold uppercase tracking-wider text-grass-600">
                Meet the Owner
              </p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight text-forest-900 sm:text-4xl">
                A local company that cares about your property
              </h2>
              <p className="mt-5 leading-relaxed text-stone-600">
                Herrera Landscape was founded by {siteConfig.owner} on a simple belief: every
                property deserves professional, reliable care and a finished result the owner can be
                proud of. From landscaping and hardscaping to fencing, irrigation, and maintenance,
                we bring craftsmanship and attention to detail to every project.
              </p>
              <p className="mt-4 leading-relaxed text-stone-600">
                We work closely with homeowners and property owners throughout Sunnyvale and the
                surrounding communities, listening to your goals and delivering outdoor spaces that
                are both beautiful and built to last.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button href="/quote">Request a Free Quote</Button>
                <Button href="/projects" variant="outline">
                  View Our Projects
                </Button>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-white py-16 sm:py-24">
        <div className="container-page">
          <SectionHeading
            eyebrow="What Drives Us"
            title="Our Mission & Values"
            description="The principles that guide how we work and treat every customer."
          />
          <div className="mt-12 grid gap-6 sm:grid-cols-2">
            {values.map(({ icon: Icon, title, text }, i) => (
              <Reveal key={title} delay={(i % 2) * 0.08}>
                <div className="flex h-full gap-4 rounded-2xl border border-stone-200 bg-beige-50 p-6">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-forest-600 text-white">
                    <Icon className="h-6 w-6" aria-hidden />
                  </div>
                  <div>
                    <h3 className="font-semibold text-forest-900">{title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-stone-600">{text}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal className="mx-auto mt-12 max-w-2xl rounded-2xl border border-stone-200 bg-forest-50/60 p-6 sm:p-8">
            <h3 className="text-center font-display text-xl font-semibold text-forest-900">
              Why Clients Choose Herrera Landscape
            </h3>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {whyPoints.map((p) => (
                <li key={p} className="flex items-center gap-2.5 text-sm font-medium text-forest-900">
                  <CheckCircle2 className="h-5 w-5 shrink-0 text-grass-500" aria-hidden />
                  {p}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      <WhyChooseUs />
      <CTASection />
    </>
  );
}
