import Button from "@/components/common/Button";
import SectionHeading from "@/components/common/SectionHeading";
import Reveal from "@/components/common/Reveal";
import GalleryGrid from "@/components/gallery/gallery-grid";
import { getGalleryImages } from "@/lib/gallery";

/**
 * Homepage gallery preview.
 *
 * Server Component: the gallery folder is scanned at build time via the shared
 * `getGalleryImages()` utility (no filesystem code reaches the browser, and no
 * hardcoded image list). It renders a limited subset while /gallery continues
 * to show every image.
 *
 * All grid, hover, and lightbox behaviour is reused from <GalleryGrid />.
 */
const MAX_HOMEPAGE_IMAGES = 8;

export default async function HomeGallery() {
  const images = (await getGalleryImages()).slice(0, MAX_HOMEPAGE_IMAGES);

  // Nothing to show yet — skip the section entirely rather than render an
  // empty state on the homepage.
  if (images.length === 0) return null;

  return (
    <section
      className="bg-white py-16 sm:py-24"
      aria-label="Recent landscaping projects gallery"
    >
      <div className="container-page">
        <SectionHeading
          eyebrow="Our Work"
          title="Recent Landscaping Projects"
          description="Take a look at some of our recent landscaping and outdoor transformation work."
        />

        {/* Subtle fade-up entrance; Reveal honors prefers-reduced-motion. */}
        <Reveal delay={0.1} className="mt-12">
          {/* priorityCount={0}: this grid is below the fold, so every image lazy-loads. */}
          <GalleryGrid images={images} priorityCount={0} />
        </Reveal>

        <Reveal delay={0.15} className="mt-12 text-center">
          <Button href="/gallery" variant="primary" size="lg">
            View Full Gallery
          </Button>
        </Reveal>
      </div>
    </section>
  );
}
