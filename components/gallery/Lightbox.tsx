"use client";

import { useEffect, useCallback } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight, MapPin } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import type { Project } from "@/types";

interface LightboxProps {
  projects: Project[];
  index: number | null;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

export default function Lightbox({ projects, index, onClose, onNavigate }: LightboxProps) {
  const open = index !== null;
  const project = open ? projects[index] : null;

  const prev = useCallback(() => {
    if (index === null) return;
    onNavigate((index - 1 + projects.length) % projects.length);
  }, [index, projects.length, onNavigate]);

  const next = useCallback(() => {
    if (index === null) return;
    onNavigate((index + 1) % projects.length);
  }, [index, projects.length, onNavigate]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose, prev, next]);

  return (
    <AnimatePresence>
      {open && project && (
        <motion.div
          className="fixed inset-0 z-[90] flex items-center justify-center bg-charcoal/90 p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          role="dialog"
          aria-modal="true"
          aria-label={`${project.title} — enlarged image`}
          onClick={onClose}
        >
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="absolute right-4 top-4 z-10 inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20"
          >
            <X className="h-6 w-6" aria-hidden />
          </button>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              prev();
            }}
            aria-label="Previous"
            className="absolute left-3 top-1/2 z-10 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 sm:left-6"
          >
            <ChevronLeft className="h-6 w-6" aria-hidden />
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              next();
            }}
            aria-label="Next"
            className="absolute right-3 top-1/2 z-10 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 sm:right-6"
          >
            <ChevronRight className="h-6 w-6" aria-hidden />
          </button>

          <motion.div
            key={project.slug}
            className="relative w-full max-w-4xl overflow-hidden rounded-2xl bg-white"
            initial={{ scale: 0.96, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.96, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative aspect-[3/2] w-full">
              <Image
                src={project.image}
                alt={project.imageAlt}
                fill
                sizes="(max-width: 1024px) 100vw, 900px"
                className="object-cover"
              />
            </div>
            <div className="p-5">
              <span className="rounded-full bg-forest-50 px-2.5 py-1 text-xs font-semibold text-forest-700">
                {project.category}
              </span>
              <h3 className="mt-3 text-xl font-semibold text-forest-900">{project.title}</h3>
              <p className="mt-1 inline-flex items-center gap-1 text-sm text-stone-500">
                <MapPin className="h-4 w-4" aria-hidden /> {project.location}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-stone-600">{project.description}</p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
