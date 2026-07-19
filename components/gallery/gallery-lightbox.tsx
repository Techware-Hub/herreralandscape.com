"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { X, ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import type { GalleryImage } from "@/lib/gallery";

interface GalleryLightboxProps {
  images: GalleryImage[];
  /** Index of the open image, or null when closed */
  index: number | null;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

/**
 * Full-screen image lightbox.
 * Controls: previous / next / close buttons, Escape to close, and left/right
 * arrow keys to navigate. Shows an image counter and a loading state.
 */
export default function GalleryLightbox({
  images,
  index,
  onClose,
  onNavigate,
}: GalleryLightboxProps) {
  const reduce = useReducedMotion();
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const [loaded, setLoaded] = useState(false);

  const isOpen = index !== null;
  const current = isOpen ? images[index] : null;
  const total = images.length;

  const goPrev = useCallback(() => {
    if (index === null || total === 0) return;
    onNavigate((index - 1 + total) % total);
  }, [index, total, onNavigate]);

  const goNext = useCallback(() => {
    if (index === null || total === 0) return;
    onNavigate((index + 1) % total);
  }, [index, total, onNavigate]);

  // Reset the loading state whenever the visible image changes.
  const [lastIndex, setLastIndex] = useState(index);
  if (index !== lastIndex) {
    setLastIndex(index);
    setLoaded(false);
  }

  // Keyboard controls + body scroll lock while open.
  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
      } else if (event.key === "ArrowLeft") {
        event.preventDefault();
        goPrev();
      } else if (event.key === "ArrowRight") {
        event.preventDefault();
        goNext();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen, onClose, goPrev, goNext]);

  return (
    <AnimatePresence>
      {isOpen && current && (
        <motion.div
          className="fixed inset-0 z-[95] flex items-center justify-center bg-forest-950/95 p-4 backdrop-blur-sm sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          role="dialog"
          aria-modal="true"
          aria-label={`Project image ${index + 1} of ${total}`}
          onClick={onClose}
        >
          {/* Close */}
          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            aria-label="Close image viewer"
            className="absolute right-4 top-4 z-10 inline-flex h-11 w-11 items-center justify-center rounded-full bg-warm-cream/10 text-warm-cream ring-1 ring-warm-cream/20 transition-colors hover:bg-warm-cream/20 sm:right-6 sm:top-6"
          >
            <X className="h-6 w-6" aria-hidden />
          </button>

          {/* Counter */}
          <div className="absolute left-1/2 top-5 z-10 -translate-x-1/2 rounded-full bg-warm-cream/10 px-4 py-1.5 text-sm font-semibold tabular-nums text-warm-cream ring-1 ring-warm-cream/20 sm:top-7">
            {index + 1} / {total}
          </div>

          {/* Previous */}
          {total > 1 && (
            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                goPrev();
              }}
              aria-label="Previous image"
              className="absolute left-3 top-1/2 z-10 inline-flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-warm-cream/10 text-warm-cream ring-1 ring-warm-cream/20 transition-colors hover:bg-grass-600 sm:left-6"
            >
              <ChevronLeft className="h-7 w-7" aria-hidden />
            </button>
          )}

          {/* Next */}
          {total > 1 && (
            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                goNext();
              }}
              aria-label="Next image"
              className="absolute right-3 top-1/2 z-10 inline-flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-warm-cream/10 text-warm-cream ring-1 ring-warm-cream/20 transition-colors hover:bg-grass-600 sm:right-6"
            >
              <ChevronRight className="h-7 w-7" aria-hidden />
            </button>
          )}

          {/* Image */}
          <motion.div
            key={current.src}
            className="relative h-[76vh] w-full max-w-6xl sm:h-[82vh]"
            initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            onClick={(event) => event.stopPropagation()}
          >
            {!loaded && (
              <div className="absolute inset-0 flex items-center justify-center" aria-hidden>
                <Loader2 className="h-8 w-8 animate-spin text-grass-300" />
              </div>
            )}
            <Image
              src={current.src}
              alt={current.alt}
              fill
              sizes="100vw"
              quality={90}
              priority
              className={`object-contain transition-opacity duration-300 ${
                loaded ? "opacity-100" : "opacity-0"
              }`}
              onLoad={() => setLoaded(true)}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
