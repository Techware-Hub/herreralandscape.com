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
            {/* Map placeholder — replace with an embedded Google Map before launch. */}
            <div className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-stone-200 shadow-sm">
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(135deg, #e7efca 0%, #b6cd6a 45%, #526f16 100%)",
                }}
              />
              <div
                className="absolute inset-0 opacity-20"
                style={{
                  backgroundImage:
                    "linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)",
                  backgroundSize: "40px 40px",
                }}
                aria-hidden
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-forest-900">
                <MapPin className="h-10 w-10 text-forest-700" aria-hidden />
                <p className="mt-3 font-display text-xl font-semibold">
                  {siteConfig.location.city}, {siteConfig.location.regionShort}
                </p>
                <p className="mt-1 max-w-xs px-6 text-sm text-forest-800/80">
                  Google Maps embed placeholder — add your business map here.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
