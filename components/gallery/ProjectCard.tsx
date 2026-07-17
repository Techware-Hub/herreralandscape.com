"use client";

import Image from "next/image";
import { MapPin, Expand } from "lucide-react";
import type { Project } from "@/types";

export default function ProjectCard({
  project,
  onOpen,
}: {
  project: Project;
  onOpen?: (project: Project) => void;
}) {
  return (
    <button
      type="button"
      onClick={() => onOpen?.(project)}
      className="group relative block w-full overflow-hidden rounded-2xl border border-stone-200 bg-white text-left shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={project.image}
          alt={`${project.title} — ${project.category} project in ${project.location}`}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 400px"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/70 via-transparent to-transparent opacity-70" />
        <span className="absolute left-3 top-3 rounded-full bg-white/90 px-2.5 py-1 text-xs font-semibold text-forest-800">
          {project.category}
        </span>
        <span className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-forest-700 opacity-0 transition-opacity group-hover:opacity-100">
          <Expand className="h-4 w-4" aria-hidden />
        </span>
        <div className="absolute inset-x-0 bottom-0 p-4 text-white">
          <h3 className="font-semibold">{project.title}</h3>
          <p className="mt-0.5 inline-flex items-center gap-1 text-xs text-beige-100/90">
            <MapPin className="h-3 w-3" aria-hidden /> {project.location}
          </p>
        </div>
      </div>
    </button>
  );
}
