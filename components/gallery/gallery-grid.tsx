"use client";

import { useState } from "react";
import Image from "next/image";
import { ZoomIn, ImageOff } from "lucide-react";
import type { GalleryImage } from "@/lib/gallery";
import GalleryLightbox from "./gallery-lightbox";

interface GalleryGridProps {
  images: GalleryImage[];
  /**
   * How many leading images to eagerly preload. Use the default for
   * above-the-fold grids (the /gallery page); pass 0 when the grid sits below
   * the fold (the homepage section) so every image lazy-loads instead.
   */
  priorityCount?: number;
}

/**
 * Responsive image-only gallery grid.
 * 1 column on mobile, 2 on tablet, 3 on desktop, 4 on large screens.
 * No titles, captions, filenames, or categories are rendered — images only.
 *
 * Owns the lightbox state, so any consumer gets full lightbox behaviour
 * (prev/next, Escape, arrow keys, counter) without duplicating logic.
 */
export default function GalleryGrid({ images, priorityCount = 4 }: GalleryGridProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [loaded, setLoaded] = useState<Record<number, boolean>>({});

  if (images.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-stone-300 bg-white/60 px-6 py-20 text-center">
        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-forest-50 text-forest-600">
          <ImageOff className="h-8 w-8" aria-hidden />
        </div>
        <h2 className="font-display text-xl font-semibold text-forest-800">
          No project photos yet
        </h2>
        <p className="mt-2 max-w-sm text-sm text-stone-600">
          Project photos will appear here as soon as they&apos;re added.
        </p>
      </div>
    );
  }

  return (
    <>
      <ul
        className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
        role="list"
      >
        {images.map((image, index) => (
          <li key={image.src}>
            <button
              type="button"
              onClick={() => setOpenIndex(index)}
              aria-label={`View project image ${index + 1} of ${images.length} full screen`}
              className="group relative block w-full overflow-hidden rounded-2xl border border-stone-200 bg-beige-200 shadow-sm ring-offset-2 transition-shadow duration-300 hover:shadow-xl focus-visible:outline-2 focus-visible:outline-offset-2"
            >
              <div className="relative aspect-[4/3] w-full overflow-hidden">
                {/* Loading skeleton */}
                {!loaded[index] && (
                  <div
                    className="absolute inset-0 animate-pulse bg-gradient-to-br from-beige-200 via-stone-200 to-beige-100"
                    aria-hidden
                  />
                )}

                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                  priority={index < priorityCount}
                  className={`object-cover transition-all duration-500 ease-out group-hover:scale-[1.06] ${
                    loaded[index] ? "opacity-100" : "opacity-0"
                  }`}
                  onLoad={() => setLoaded((prev) => ({ ...prev, [index]: true }))}
                />

                {/* Forest-green overlay on hover */}
                <div
                  className="absolute inset-0 bg-gradient-to-t from-forest-900/75 via-forest-900/15 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100"
                  aria-hidden
                />

                {/* Zoom icon on hover */}
                <div
                  className="absolute inset-0 flex items-center justify-center"
                  aria-hidden
                >
                  <span className="flex h-14 w-14 scale-75 items-center justify-center rounded-full bg-warm-cream/95 text-forest-800 opacity-0 shadow-lg transition-all duration-300 group-hover:scale-100 group-hover:opacity-100 group-focus-visible:scale-100 group-focus-visible:opacity-100">
                    <ZoomIn className="h-6 w-6" />
                  </span>
                </div>
              </div>
            </button>
          </li>
        ))}
      </ul>

      <GalleryLightbox
        images={images}
        index={openIndex}
        onClose={() => setOpenIndex(null)}
        onNavigate={setOpenIndex}
      />
    </>
  );
}
