import type { Project, ProjectCategory } from "@/types";

/**
 * Project gallery data. Replace the placeholder images (public/images/projects)
 * and the copy below with the client's real completed-project photos.
 * Keep the `category` values in sync with ProjectCategory in types/index.ts.
 */
export const projectCategories: ProjectCategory[] = [
  "Landscaping",
  "Hardscaping",
  "Pavers",
  "Fencing",
  "Artificial Grass",
  "Irrigation",
  "Maintenance",
];

export const projects: Project[] = [
  {
    slug: "backyard-paver-patio",
    title: "Backyard Paver Patio",
    category: "Pavers",
    location: "Sunnyvale, CA",
    description:
      "A durable paver patio built for outdoor dining and entertaining, with a compacted base and clean edge restraint.",
    image: "/images/projects/project-01.svg",
  },
  {
    slug: "front-yard-renewal",
    title: "Front Yard Renewal",
    category: "Landscaping",
    location: "Santa Clara, CA",
    description:
      "A tired front yard reimagined with fresh planting beds, ground cover, and crisp edging for standout curb appeal.",
    image: "/images/projects/project-02.svg",
    before: "/images/before-after/before.svg",
    after: "/images/before-after/after.svg",
  },
  {
    slug: "modern-fence-line",
    title: "Modern Fence Line",
    category: "Fencing",
    location: "Mountain View, CA",
    description:
      "Clean-lined privacy fencing with solid posts and concrete footings, installed to grade along the property line.",
    image: "/images/projects/project-03.svg",
  },
  {
    slug: "artificial-turf-lawn",
    title: "Artificial Turf Lawn",
    category: "Artificial Grass",
    location: "San Jose, CA",
    description:
      "A water-free, evergreen turf lawn installed over a draining base — pet-friendly and mow-free year round.",
    image: "/images/projects/project-04.svg",
  },
  {
    slug: "drip-irrigation-install",
    title: "Drip Irrigation Install",
    category: "Irrigation",
    location: "Cupertino, CA",
    description:
      "An efficient drip system with zoned valves and a smart controller delivering water directly to garden beds.",
    image: "/images/projects/project-05.svg",
  },
  {
    slug: "stone-pathway",
    title: "Stone Pathway",
    category: "Hardscaping",
    location: "Palo Alto, CA",
    description:
      "A natural stone pathway connecting the garden zones, set on a stable base for a comfortable, lasting walk.",
    image: "/images/projects/project-06.svg",
  },
  {
    slug: "garden-bed-planting",
    title: "Garden Bed Planting",
    category: "Landscaping",
    location: "Sunnyvale, CA",
    description:
      "Layered garden beds with drought-tolerant plants and fresh mulch, designed for year-round color and easy care.",
    image: "/images/projects/project-07.svg",
  },
  {
    slug: "retaining-wall-build",
    title: "Retaining Wall Build",
    category: "Hardscaping",
    location: "Milpitas, CA",
    description:
      "A block retaining wall that levels a sloped yard, with proper drainage to protect against water pressure.",
    image: "/images/projects/project-08.svg",
  },
  {
    slug: "full-yard-transformation",
    title: "Full Yard Transformation",
    category: "Landscaping",
    location: "San Jose, CA",
    description:
      "A complete outdoor renovation combining hardscape, planting, and irrigation into one cohesive backyard retreat.",
    image: "/images/projects/project-09.svg",
    before: "/images/before-after/before.svg",
    after: "/images/before-after/after.svg",
  },
  {
    slug: "commercial-grounds",
    title: "Commercial Grounds Care",
    category: "Maintenance",
    location: "Santa Clara, CA",
    description:
      "Ongoing grounds maintenance for a commercial property, keeping lawns, beds, and entrances consistently sharp.",
    image: "/images/projects/project-10.svg",
  },
  {
    slug: "poolside-hardscape",
    title: "Poolside Hardscape",
    category: "Pavers",
    location: "Cupertino, CA",
    description:
      "Slip-resistant paver decking around a pool, creating a clean, cohesive surface for lounging and entertaining.",
    image: "/images/projects/project-11.svg",
  },
  {
    slug: "seasonal-cleanup",
    title: "Seasonal Property Cleanup",
    category: "Maintenance",
    location: "Mountain View, CA",
    description:
      "A full seasonal cleanup clearing overgrowth and debris, resetting the yard to a clean, healthy baseline.",
    image: "/images/projects/project-12.svg",
  },
];

export function getProjectsByCategory(category: ProjectCategory): Project[] {
  return projects.filter((p) => p.category === category);
}

export function getFeaturedProjects(count = 6): Project[] {
  return projects.slice(0, count);
}
