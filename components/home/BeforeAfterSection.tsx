import SectionHeading from "@/components/common/SectionHeading";
import Reveal from "@/components/common/Reveal";
import BeforeAfterSlider from "@/components/gallery/BeforeAfterSlider";

export default function BeforeAfterSection() {
  return (
    <section className="py-16 sm:py-24" aria-labelledby="before-after-heading">
      <div className="container-page">
        <SectionHeading
          eyebrow="Transformations"
          title="See the Difference"
          description="Drag the slider to reveal a real outdoor transformation — from an overgrown yard to a clean, professionally landscaped space."
        />
        <Reveal className="mx-auto mt-12 max-w-3xl">
          <BeforeAfterSlider
            beforeSrc="/assets/images/before-after/overgrown-yard-before.webp"
            afterSrc="/assets/images/before-after/landscaped-yard-after.webp"
            beforeAlt="Overgrown, worn yard before landscaping work"
            afterAlt="Clean, healthy green lawn after professional landscaping"
          />
          <p className="mt-4 text-center text-sm text-stone-500">
            Demonstration images shown for illustration — replace with a real Herrera Landscape
            before/after project set before launch.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
