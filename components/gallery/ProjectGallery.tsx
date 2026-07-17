"use client";

import { useMemo, useState } from "react";
import { projects as allProjects, projectCategories } from "@/data/projects";
import type { Project, ProjectCategory } from "@/types";
import ProjectCard from "./ProjectCard";
import Lightbox from "./Lightbox";
import { cn } from "@/lib/utils";
import Button from "@/components/common/Button";

const PAGE_SIZE = 6;

interface ProjectGalleryProps {
  /** Optionally limit to a subset of projects (e.g. related to a service). */
  projects?: Project[];
  /** Show the category filter row */
  showFilter?: boolean;
  /** Enable load-more pagination */
  paginate?: boolean;
  initialCount?: number;
}

type Filter = "All" | ProjectCategory;

export default function ProjectGallery({
  projects = allProjects,
  showFilter = true,
  paginate = true,
  initialCount = PAGE_SIZE,
}: ProjectGalleryProps) {
  const [filter, setFilter] = useState<Filter>("All");
  const [visible, setVisible] = useState(initialCount);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filtered = useMemo(
    () => (filter === "All" ? projects : projects.filter((p) => p.category === filter)),
    [filter, projects]
  );

  const shown = paginate ? filtered.slice(0, visible) : filtered;

  const filters: Filter[] = ["All", ...projectCategories];

  return (
    <div>
      {showFilter && (
        <div className="no-scrollbar mb-8 flex gap-2 overflow-x-auto pb-1">
          {filters.map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => {
                setFilter(f);
                setVisible(initialCount);
              }}
              aria-pressed={filter === f}
              className={cn(
                "shrink-0 rounded-full border px-4 py-2 text-sm font-medium transition-colors",
                filter === f
                  ? "border-forest-600 bg-forest-600 text-white"
                  : "border-stone-300 bg-white text-stone-700 hover:border-forest-400 hover:text-forest-700"
              )}
            >
              {f}
            </button>
          ))}
        </div>
      )}

      {shown.length === 0 ? (
        <p className="py-12 text-center text-stone-500">No projects in this category yet.</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {shown.map((project) => (
            <ProjectCard
              key={project.slug}
              project={project}
              onOpen={(p) =>
                setLightboxIndex(filtered.findIndex((fp) => fp.slug === p.slug))
              }
            />
          ))}
        </div>
      )}

      {paginate && visible < filtered.length && (
        <div className="mt-10 text-center">
          <Button variant="outline" onClick={() => setVisible((v) => v + PAGE_SIZE)}>
            Load More Projects
          </Button>
        </div>
      )}

      <Lightbox
        projects={filtered}
        index={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        onNavigate={setLightboxIndex}
      />
    </div>
  );
}
