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
            beforeSrc="/images/before-after/before.svg"
            afterSrc="/images/before-after/after.svg"
            beforeAlt="Overgrown yard before landscaping"
            afterAlt="Professionally landscaped yard after Herrera Landscape"
          />
          <p className="mt-4 text-center text-sm text-stone-500">
            Placeholder images — replace with a real before/after project photo set.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
