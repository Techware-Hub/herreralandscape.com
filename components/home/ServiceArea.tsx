import Image from "next/image";
import { MapPin } from "lucide-react";
import SectionHeading from "@/components/common/SectionHeading";
import Reveal from "@/components/common/Reveal";
import { siteConfig } from "@/lib/site";

export default function ServiceArea() {
  return (
    <section className="py-16 sm:py-24" aria-labelledby="area-heading">
      <div className="container-page">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <Reveal>
            <SectionHeading
              eyebrow="Where We Work"
              title="Proudly Serving Sunnyvale & the Bay Area"
              description="Herrera Landscape provides landscaping and hardscaping services across Sunnyvale and nearby communities. Don't see your city? Reach out — we likely serve your area too."
              align="left"
            />
            <ul className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-2">
              {siteConfig.serviceAreas.map((area) => (
                <li
                  key={area}
                  className="flex items-center gap-2 rounded-xl border border-stone-200 bg-white px-4 py-3 text-sm font-medium text-forest-900"
                >
                  <MapPin className="h-4 w-4 shrink-0 text-grass-500" aria-hidden />
                  {area}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-stone-200 shadow-sm">
              <Image
                src="/assets/images/backgrounds/california-neighborhood.webp"
                alt="Well-maintained California residential neighborhood home with a landscaped lawn"
                fill
                sizes="(max-width: 1024px) 100vw, 560px"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-forest-900/70 via-forest-900/10 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 flex items-center gap-2 p-5 text-white">
                <MapPin className="h-5 w-5 text-grass-300" aria-hidden />
                <p className="font-display text-lg font-semibold">
                  {siteConfig.location.city}, {siteConfig.location.regionShort} &amp; nearby Bay Area
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
