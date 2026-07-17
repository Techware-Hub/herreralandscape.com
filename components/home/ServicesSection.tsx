import SectionHeading from "@/components/common/SectionHeading";
import ServiceCard from "@/components/services/ServiceCard";
import Reveal from "@/components/common/Reveal";
import Button from "@/components/common/Button";
import { services } from "@/data/services";

export default function ServicesSection() {
  return (
    <section className="bg-white py-16 sm:py-24" aria-labelledby="services-heading">
      <div className="container-page">
        <SectionHeading
          eyebrow="What We Do"
          title="Our Landscaping & Hardscaping Services"
          description="From complete outdoor transformations to ongoing maintenance, Herrera Landscape offers a full range of professional services for your property."
        />

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, i) => (
            <Reveal key={service.slug} delay={(i % 3) * 0.08}>
              <ServiceCard service={service} />
            </Reveal>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Button href="/services" variant="outline" size="lg">
            View All Services
          </Button>
        </div>
      </div>
    </section>
  );
}
