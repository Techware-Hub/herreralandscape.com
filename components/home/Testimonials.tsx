import SectionHeading from "@/components/common/SectionHeading";
import TestimonialCard from "@/components/common/TestimonialCard";
import Reveal from "@/components/common/Reveal";
import { testimonials } from "@/data/testimonials";

export default function Testimonials() {
  return (
    <section className="bg-white py-16 sm:py-24" aria-labelledby="testimonials-heading">
      <div className="container-page">
        <SectionHeading
          eyebrow="What Clients Say"
          title="Trusted by Homeowners & Businesses"
          description="Sample reviews shown for layout. Real, verified customer testimonials will be added before launch."
        />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {testimonials.map((t, i) => (
            <Reveal key={t.name} delay={(i % 4) * 0.06}>
              <TestimonialCard testimonial={t} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
