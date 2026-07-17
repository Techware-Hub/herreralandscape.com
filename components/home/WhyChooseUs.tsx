import {
  ShieldCheck,
  Gem,
  Palette,
  MessagesSquare,
  SearchCheck,
  Building2,
  BadgeDollarSign,
  MapPin,
} from "lucide-react";
import SectionHeading from "@/components/common/SectionHeading";
import Reveal from "@/components/common/Reveal";

const reasons = [
  { icon: ShieldCheck, title: "Reliable & Professional", text: "Dependable service and crews who show up and do the job right." },
  { icon: Gem, title: "Quality Materials", text: "We use quality materials built to last through the seasons." },
  { icon: Palette, title: "Custom Solutions", text: "Outdoor designs tailored to your property, style, and budget." },
  { icon: MessagesSquare, title: "Clear Communication", text: "Straightforward updates and honest answers at every step." },
  { icon: SearchCheck, title: "Attention to Detail", text: "A meticulous finish that elevates the whole project." },
  { icon: Building2, title: "Residential & Commercial", text: "Experienced with homes and commercial properties alike." },
  { icon: BadgeDollarSign, title: "Free Estimates", text: "Clear, no-pressure project estimates at no cost to you." },
  { icon: MapPin, title: "Local Sunnyvale Service", text: "Proudly serving Sunnyvale and nearby Bay Area communities." },
];

export default function WhyChooseUs() {
  return (
    <section className="py-16 sm:py-24" aria-labelledby="why-heading">
      <div className="container-page">
        <SectionHeading
          eyebrow="Why Choose Us"
          title="Why Homeowners Choose Herrera Landscape"
          description="We combine quality workmanship with clear communication and genuine care for your property."
        />

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {reasons.map(({ icon: Icon, title, text }, i) => (
            <Reveal key={title} delay={(i % 4) * 0.06}>
              <div className="h-full rounded-2xl border border-stone-200 bg-white p-6 transition-shadow hover:shadow-md">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-forest-50 text-forest-600">
                  <Icon className="h-6 w-6" aria-hidden />
                </div>
                <h3 className="mt-4 font-semibold text-forest-900">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-stone-600">{text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
