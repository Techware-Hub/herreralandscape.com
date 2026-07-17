"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Phone, ArrowRight, ShieldCheck, Award, Building2, BadgeCheck } from "lucide-react";
import Button from "@/components/common/Button";
import { siteConfig, telHref } from "@/lib/site";

const slides = [
  { src: "/images/hero/hero-1.svg", alt: "Beautiful residential landscape in Sunnyvale, California" },
  { src: "/images/hero/hero-2.svg", alt: "Outdoor space transformation by Herrera Landscape" },
  { src: "/images/hero/hero-3.svg", alt: "Hardscape and paver installation project" },
];

const trustPoints = [
  { icon: ShieldCheck, label: "Professional Service" },
  { icon: Award, label: "Quality Workmanship" },
  { icon: Building2, label: "Residential & Commercial" },
  { icon: BadgeCheck, label: "Free Estimates" },
];

export default function Hero() {
  const [current, setCurrent] = useState(0);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce) return;
    const timer = setInterval(() => setCurrent((c) => (c + 1) % slides.length), 6000);
    return () => clearInterval(timer);
  }, [reduce]);

  return (
    <section className="relative isolate overflow-hidden" aria-label="Introduction">
      {/* Background slider */}
      <div className="absolute inset-0 -z-10">
        <AnimatePresence mode="sync">
          <motion.div
            key={current}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            <Image
              src={slides[current].src}
              alt={slides[current].alt}
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
          </motion.div>
        </AnimatePresence>
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal/70 via-charcoal/55 to-forest-900/80" />
      </div>

      <div className="container-page">
        <div className="flex min-h-[86vh] flex-col justify-center py-24 sm:min-h-[88vh]">
          <motion.div
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-2xl"
          >
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-grass-200 ring-1 ring-white/20 backdrop-blur">
              <span className="h-1.5 w-1.5 rotate-45 rounded-[2px] bg-lavender-400" aria-hidden />
              Serving {siteConfig.location.city} &amp; the Bay Area
            </span>
            <h1 className="mt-5 text-4xl font-semibold leading-[1.1] tracking-tight text-white sm:text-5xl lg:text-6xl">
              Professional Landscaping &amp; Hardscaping in Sunnyvale
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-beige-100/90">
              Transforming outdoor spaces with professional landscaping, hardscaping, fencing,
              irrigation, pavers, and property maintenance.
            </p>

            <div className="mt-8 flex flex-col flex-wrap gap-3 sm:flex-row">
              <Button href="/quote" variant="gold" size="lg">
                Request a Free Quote
              </Button>
              <Button
                href="/projects"
                size="lg"
                className="bg-white/10 text-white ring-1 ring-white/30 backdrop-blur hover:bg-white/20"
              >
                View Our Projects
                <ArrowRight className="h-5 w-5" aria-hidden />
              </Button>
              <Button
                href={telHref}
                variant="ghost"
                size="lg"
                className="text-white hover:bg-white/10"
              >
                <Phone className="h-5 w-5" aria-hidden />
                {siteConfig.phone}
              </Button>
            </div>

            {/* Trust points */}
            <ul className="mt-10 grid max-w-lg grid-cols-2 gap-x-6 gap-y-3 sm:flex sm:flex-wrap sm:gap-x-6">
              {trustPoints.map(({ icon: Icon, label }) => (
                <li key={label} className="flex items-center gap-2 text-sm font-medium text-beige-100">
                  <Icon className="h-5 w-5 shrink-0 text-grass-300" aria-hidden />
                  {label}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>

      {/* Slide dots */}
      <div className="absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setCurrent(i)}
            aria-label={`Go to slide ${i + 1}`}
            aria-current={i === current}
            className={`h-2 rounded-full transition-all ${
              i === current ? "w-8 bg-grass-400" : "w-2 bg-white/50 hover:bg-white/80"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
