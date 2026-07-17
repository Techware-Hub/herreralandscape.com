import { Star, Quote } from "lucide-react";
import type { Testimonial } from "@/types";

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
      <figcaption className="mt-5 border-t border-stone-100 pt-4">
        <p className="font-semibold text-forest-900">{testimonial.name}</p>
        <p className="text-xs text-stone-500">{testimonial.location}</p>
        {testimonial.placeholder && (
          <p className="mt-1 text-[11px] font-medium uppercase tracking-wide text-earth-500">
            Placeholder review
          </p>
        )}
      </figcaption>
    </figure>
  );
}
