import Image from "next/image";
import Breadcrumbs, { type Crumb } from "./Breadcrumbs";
import Reveal from "./Reveal";

interface PageHeroProps {
  title: string;
  subtitle?: string;
  eyebrow?: string;
  image?: string;
  imageAlt?: string;
  crumbs?: Crumb[];
  children?: React.ReactNode;
}

/** Reusable inner-page banner with background image, heading, and breadcrumbs. */
export default function PageHero({
  title,
  subtitle,
  eyebrow,
  image = "/images/services/landscaping-wide.svg",
  imageAlt = "",
  crumbs,
  children,
}: PageHeroProps) {
  return (
    <section className="relative isolate overflow-hidden bg-forest-900">
      <div className="absolute inset-0 -z-10">
        <Image src={image} alt={imageAlt} fill priority sizes="100vw" className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-forest-900/90 via-forest-900/75 to-forest-800/60" />
      </div>
      <div className="container-page">
        <div className="max-w-3xl py-16 sm:py-20">
          {crumbs && (
            <div className="mb-5 [&_a]:text-beige-100/70 [&_a:hover]:text-white [&_span]:text-white [&_svg]:text-beige-100/50">
              <Breadcrumbs items={crumbs} />
            </div>
          )}
          <Reveal>
            {eyebrow && (
              <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-grass-300">
                {eyebrow}
              </p>
            )}
            <h1 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl lg:text-5xl">
              {title}
            </h1>
            {subtitle && (
              <p className="mt-4 max-w-2xl text-lg leading-relaxed text-beige-100/90">{subtitle}</p>
            )}
            {children && <div className="mt-8">{children}</div>}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
