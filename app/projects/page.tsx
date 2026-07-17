import type { Metadata } from "next";
import PageHero from "@/components/common/PageHero";
import SectionHeading from "@/components/common/SectionHeading";
import Reveal from "@/components/common/Reveal";
import ProjectGallery from "@/components/gallery/ProjectGallery";
import BeforeAfterSlider from "@/components/gallery/BeforeAfterSlider";
import CTASection from "@/components/common/CTASection";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Projects & Gallery",
  description:
    "Browse completed landscaping and hardscaping projects by Herrera Landscape across Sunnyvale and the Bay Area — pavers, fencing, artificial grass, irrigation, and full outdoor transformations.",
  alternates: { canonical: "/projects" },
  openGraph: {
    title: "Projects & Gallery | Herrera Landscape",
    description: "Completed landscaping and hardscaping projects across the Bay Area.",
    url: `${siteConfig.url}/projects`,
  },
};

export default function ProjectsPage() {
  return (
    <>
      <PageHero
        eyebrow="Our Work"
        title="Projects & Gallery"
        subtitle="A selection of landscaping and hardscaping work across Sunnyvale and the Bay Area. Filter by category and click any project to view it larger."
        image="/assets/images/backgrounds/projects-banner.webp"
        imageAlt="Landscaped garden bordered by a white picket fence"
        crumbs={[{ name: "Projects", href: "/projects" }]}
      />

      <section className="py-16 sm:py-20">
        <div className="container-page">
          <ProjectGallery />
        </div>
      </section>

      <section className="bg-white py-16 sm:py-20">
        <div className="container-page">
          <SectionHeading
            eyebrow="Before & After"
            title="Real Outdoor Transformations"
            description="Drag the slider to see how we transform overgrown and dated yards into clean, functional outdoor spaces."
          />
          <Reveal className="mx-auto mt-12 max-w-3xl">
            <BeforeAfterSlider
              beforeSrc="/assets/images/before-after/overgrown-yard-before.webp"
              afterSrc="/assets/images/before-after/landscaped-yard-after.webp"
              beforeAlt="Overgrown, worn yard before landscaping work"
              afterAlt="Clean, healthy green lawn after professional landscaping"
            />
          </Reveal>
        </div>
      </section>

      <CTASection />
    </>
  );
}
