import PageHero from "./PageHero";
import type { Crumb } from "./Breadcrumbs";

/** Shared layout + prose styling for legal pages. */
export default function LegalLayout({
  title,
  updated,
  crumbs,
  children,
}: {
  title: string;
  updated: string;
  crumbs: Crumb[];
  children: React.ReactNode;
}) {
  return (
    <>
      <PageHero title={title} subtitle={`Last updated: ${updated}`} crumbs={crumbs} />
      <section className="py-16 sm:py-20">
        <div className="container-page">
          <div className="mx-auto max-w-3xl space-y-6 text-stone-700 [&_h2]:mt-8 [&_h2]:font-display [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:text-forest-900 [&_p]:leading-relaxed [&_ul]:list-disc [&_ul]:space-y-1.5 [&_ul]:pl-6 [&_a]:text-forest-700 [&_a]:underline">
            <p className="rounded-xl border border-gold-300 bg-gold-300/15 p-4 text-sm text-earth-800">
              This is a general template provided for launch and is not legal advice. Please have it
              reviewed and customized by a qualified professional before publishing.
            </p>
            {children}
          </div>
        </div>
      </section>
    </>
  );
}
