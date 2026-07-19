import type { Metadata } from "next";
import PageHero from "@/components/common/PageHero";
import CTASection from "@/components/common/CTASection";
import GalleryGrid from "@/components/gallery/gallery-grid";
import { getGalleryImages, getGalleryBanner } from "@/lib/gallery";
import { siteConfig } from "@/lib/site";

/**
 * Statically prerendered so the gallery folder is scanned at build time.
 * This keeps the filesystem read off the request path (required on Netlify,
 * where serverless functions cannot read `public/`).
 */
export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Project Gallery",
  description:
    "Browse photos of completed landscaping and hardscaping work by Herrera Landscape in Sunnyvale and the surrounding Bay Area.",
  alternates: { canonical: "/gallery" },
  openGraph: {
    title: "Project Gallery | Herrera Landscape",
    description:
      "Photos of completed landscaping and hardscaping projects in Sunnyvale and the Bay Area.",
    url: `${siteConfig.url}/gallery`,
  },
};

export default async function GalleryPage() {
  const images = await getGalleryImages();

  return (
    <>
      <PageHero
        eyebrow="Our Work"
        title="Project Gallery"
        subtitle="A look at completed landscaping and hardscaping work across Sunnyvale and the Bay Area."
        // Uses the most landscape-oriented real project photo as the banner.
        image={getGalleryBanner(images)}
        imageAlt=""
        crumbs={[{ name: "Gallery", href: "/gallery" }]}
      />

      <section className="py-16 sm:py-20" aria-label="Project photo gallery">
        <div className="container-page">
          <GalleryGrid images={images} />
        </div>
      </section>

      <CTASection />
    </>
  );
}
