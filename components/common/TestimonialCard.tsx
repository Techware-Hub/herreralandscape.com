import { Star, Quote } from "lucide-react";
import type { Testimonial } from "@/types";

/** Initials from a name, e.g. "Sample Homeowner" -> "SH". */
function initials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase())
    .join("");
}

export default function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <figure className="flex h-full flex-col rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
      <Quote className="h-8 w-8 text-lavender-300" aria-hidden />
      <div className="mt-3 flex gap-0.5" aria-label={`${testimonial.rating} out of 5 stars`}>
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className={i < testimonial.rating ? "h-4 w-4 fill-gold-600 text-gold-600" : "h-4 w-4 text-stone-300"}
            aria-hidden
          />
        ))}
      </div>
      <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-stone-700">
        {testimonial.quote}
      </blockquote>
      <figcaption className="mt-5 flex items-center gap-3 border-t border-stone-100 pt-4">
        {/* CSS initials avatar — no stock portraits used */}
        <span
          aria-hidden
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-forest-700 font-display text-sm font-semibold text-warm-cream"
        >
          {initials(testimonial.name)}
        </span>
        <div>
          <p className="font-semibold text-forest-900">{testimonial.name}</p>
          <p className="text-xs text-stone-500">{testimonial.location}</p>
          {testimonial.placeholder && (
            <p className="mt-0.5 text-[11px] font-medium uppercase tracking-wide text-earth-500">
              Sample review
            </p>
          )}
        </div>
      </figcaption>
    </figure>
  );
}
