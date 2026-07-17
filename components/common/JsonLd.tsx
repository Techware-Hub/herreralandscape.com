import { siteConfig } from "@/lib/site";
import type { FAQ } from "@/types";

/** Renders a JSON-LD script tag. */
function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      // JSON.stringify output is safe here — controlled data only.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

const openingHours = siteConfig.hours
  .filter((h) => h.open !== "Closed")
  .map((h) => ({
    "@type": "OpeningHoursSpecification",
    dayOfWeek: h.day,
    opens: to24h(h.open),
    closes: to24h(h.close),
  }));

function to24h(time: string): string {
  const match = time.match(/(\d+):(\d+)\s*(AM|PM)/i);
  if (!match) return "00:00";
  let hour = parseInt(match[1], 10);
  const min = match[2];
  const period = match[3].toUpperCase();
  if (period === "PM" && hour !== 12) hour += 12;
  if (period === "AM" && hour === 12) hour = 0;
  return `${String(hour).padStart(2, "0")}:${min}`;
}

/** LocalBusiness + LandscapingBusiness schema — rendered site-wide. */
export function LocalBusinessSchema() {
  const data = {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "GeneralContractor", "LandscapingBusiness"],
    "@id": `${siteConfig.url}/#business`,
    name: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    telephone: siteConfig.phoneIntl,
    email: siteConfig.email,
    image: `${siteConfig.url}/assets/images/backgrounds/og-home.webp`,
    founder: { "@type": "Person", name: siteConfig.owner },
    priceRange: "$$",
    areaServed: siteConfig.serviceAreas.map((a) => ({
      "@type": "City",
      name: a,
    })),
    address: {
      "@type": "PostalAddress",
      addressLocality: siteConfig.location.city,
      addressRegion: siteConfig.location.regionShort,
      addressCountry: siteConfig.location.countryShort,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: siteConfig.location.latitude,
      longitude: siteConfig.location.longitude,
    },
    openingHoursSpecification: openingHours,
    sameAs: Object.values(siteConfig.social).filter((v) => v !== "#"),
  };
  return <JsonLd data={data} />;
}

export function ServiceSchema({
  name,
  description,
  url,
}: {
  name: string;
  description: string;
  url: string;
}) {
  const data = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: name,
    name,
    description,
    url,
    provider: { "@id": `${siteConfig.url}/#business` },
    areaServed: siteConfig.serviceAreas.map((a) => ({ "@type": "City", name: a })),
  };
  return <JsonLd data={data} />;
}

export function FaqSchema({ faqs }: { faqs: FAQ[] }) {
  const data = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };
  return <JsonLd data={data} />;
}

export function BreadcrumbSchema({
  items,
}: {
  items: { name: string; href: string }[];
}) {
  const data = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${siteConfig.url}${item.href}`,
    })),
  };
  return <JsonLd data={data} />;
}
