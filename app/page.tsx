import Hero from "@/components/home/Hero";
import Intro from "@/components/home/Intro";
import ServicesSection from "@/components/home/ServicesSection";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import FeaturedProjects from "@/components/home/FeaturedProjects";
import BeforeAfterSection from "@/components/home/BeforeAfterSection";
import ProcessSection from "@/components/home/ProcessSection";
import Testimonials from "@/components/home/Testimonials";
import ServiceArea from "@/components/home/ServiceArea";
import HomeGallery from "@/components/home/home-gallery";
import QuoteFormSection from "@/components/home/QuoteFormSection";
import CTASection from "@/components/common/CTASection";
import { FaqSchema } from "@/components/common/JsonLd";
import { generalFaqs } from "@/data/faqs";

export default function HomePage() {
  return (
    <>
      <FaqSchema faqs={generalFaqs} />
      <Hero />
      <Intro />
      <ServicesSection />
      <WhyChooseUs />
      <FeaturedProjects />
      <BeforeAfterSection />
      <ProcessSection />
      <Testimonials />
      <ServiceArea />
      <HomeGallery />
      <QuoteFormSection />
      <CTASection />
    </>
  );
}
