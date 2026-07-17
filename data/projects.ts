import type { Project, ProjectCategory } from "@/types";

/**
 * DEVELOPMENT NOTE (do not surface prominently on the live frontend):
 * Current website imagery is licensed stock photography (Unsplash License) and
 * must NOT be represented as completed Herrera Landscape projects unless approved
 * by the client. Replace these images and copy with the client's own project
 * photographs before presenting them as real, completed work.
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
    slug: "front-yard-landscaping",
    title: "Front Yard Landscaping",
    category: "Landscaping",
    location: "Sunnyvale, CA",
    description:
      "A refreshed front yard with layered planting beds, ground cover, and crisp edging for standout curb appeal.",
    image: "/assets/images/projects/front-yard-landscaping.webp",
    imageAlt:
      "Residential front yard with colorful planting beds and a tidy lawn",
    featured: true,
  },
  {
    slug: "backyard-transformation",
    title: "Backyard Transformation",
    category: "Landscaping",
    location: "San Jose, CA",
    description:
      "A complete backyard makeover combining fresh planting, defined borders, and a private, usable outdoor space.",
    image: "/assets/images/projects/backyard-transformation.webp",
    imageAlt:
      "Transformed backyard with shrubs, garden borders, and a fence line",
    before: "/assets/images/before-after/overgrown-yard-before.webp",
    after: "/assets/images/before-after/landscaped-yard-after.webp",
    featured: true,
  },
  {
    slug: "paver-walkway-installation",
    title: "Paver Walkway Installation",
    category: "Pavers",
    location: "Santa Clara, CA",
    description:
      "A durable stone paver walkway set on a compacted base, connecting garden zones with a clean, lasting finish.",
    image: "/assets/images/projects/paver-walkway.webp",
    imageAlt:
      "Stone paver walkway winding through a planted residential garden",
    featured: true,
  },
  {
    slug: "backyard-paver-patio",
    title: "Backyard Paver Patio",
    category: "Pavers",
    location: "Cupertino, CA",
    description:
      "A paver patio built for outdoor dining and entertaining, with a compacted base and clean edge restraint.",
    image: "/assets/images/projects/paver-patio.webp",
    imageAlt:
      "Backyard paver patio with a fire pit and surrounding lawn",
  },
  {
    slug: "retaining-wall-build",
    title: "Retaining Wall Build",
    category: "Hardscaping",
    location: "Milpitas, CA",
    description:
      "A natural stone retaining wall that levels a sloped yard, with proper drainage to protect against water pressure.",
    image: "/assets/images/projects/retaining-wall.webp",
    imageAlt:
      "Natural stone retaining wall bordering a landscaped garden",
    featured: true,
  },
  {
    slug: "stone-pathway",
    title: "Stone Pathway Hardscaping",
    category: "Hardscaping",
    location: "Palo Alto, CA",
    description:
      "A natural stone pathway set on a stable base, creating a comfortable, lasting walk through the landscape.",
    image: "/assets/images/projects/stone-pathway.webp",
    imageAlt:
      "Flagstone pathway set into a planted rock garden",
  },
  {
    slug: "wood-fence-installation",
    title: "Wood Fence Installation",
    category: "Fencing",
    location: "Mountain View, CA",
    description:
      "A wood privacy fence with solid posts and concrete footings, installed to grade along the property line.",
    image: "/assets/images/projects/wood-fence.webp",
    imageAlt:
      "Newly installed horizontal wood fence beside a maintained lawn",
  },
  {
    slug: "modern-fence-line",
    title: "Modern Fence Line",
    category: "Fencing",
    location: "Sunnyvale, CA",
    description:
      "Clean-lined vertical fencing that adds privacy and definition while complementing the surrounding landscape.",
    image: "/assets/images/projects/modern-fence.webp",
    imageAlt:
      "Modern vertical wood privacy fence along a garden boundary",
  },
  {
    slug: "artificial-turf-lawn",
    title: "Artificial Turf Lawn",
    category: "Artificial Grass",
    location: "San Jose, CA",
    description:
      "A water-free, evergreen turf lawn installed over a draining base — pet-friendly and mow-free all year.",
    image: "/assets/images/projects/artificial-turf.webp",
    imageAlt:
      "Evenly laid artificial turf lawn in a residential backyard",
  },
  {
    slug: "synthetic-grass-play-area",
    title: "Synthetic Grass Area",
    category: "Artificial Grass",
    location: "Santa Clara, CA",
    description:
      "A clean synthetic grass area with a compacted, well-draining base for a low-maintenance green space.",
    image: "/assets/images/projects/artificial-turf-lawn.webp",
    imageAlt:
      "Close-up of a freshly installed synthetic grass lawn",
  },
  {
    slug: "natural-sod-installation",
    title: "Natural Sod Installation",
    category: "Landscaping",
    location: "Cupertino, CA",
    description:
      "Fresh natural sod laid over prepared, amended soil for an instant, healthy lawn ready to establish strong roots.",
    image: "/assets/images/projects/natural-sod.webp",
    imageAlt:
      "Freshly laid natural sod forming a healthy green lawn",
  },
  {
    slug: "irrigation-system-upgrade",
    title: "Irrigation System Upgrade",
    category: "Irrigation",
    location: "Sunnyvale, CA",
    description:
      "An efficient sprinkler upgrade with zoned valves and a smart controller for healthy plants and lower water use.",
    image: "/assets/images/projects/irrigation-upgrade.webp",
    imageAlt:
      "Sprinkler head watering a healthy green lawn near a tree",
  },
  {
    slug: "drip-irrigation-install",
    title: "Drip Irrigation Install",
    category: "Irrigation",
    location: "Palo Alto, CA",
    description:
      "A drip irrigation system delivering water directly to garden beds, reducing waste while keeping plants thriving.",
    image: "/assets/images/projects/drip-irrigation.webp",
    imageAlt:
      "Drip irrigation line running through a planted garden bed",
  },
  {
    slug: "garden-bed-installation",
    title: "Garden Bed Installation",
    category: "Landscaping",
    location: "Mountain View, CA",
    description:
      "Layered garden beds with flowering plants and fresh mulch, designed for year-round color and easy care.",
    image: "/assets/images/projects/garden-bed.webp",
    imageAlt:
      "Planted garden bed full of colorful flowering plants",
  },
  {
    slug: "landscape-maintenance",
    title: "Landscape Maintenance",
    category: "Maintenance",
    location: "Santa Clara, CA",
    description:
      "Ongoing maintenance keeping lawns, beds, and edges consistently sharp for a residential property.",
    image: "/assets/images/projects/lawn-maintenance.webp",
    imageAlt:
      "Freshly mowed lawn with clean stripes after maintenance",
  },
  {
    slug: "seasonal-property-cleanup",
    title: "Seasonal Property Cleanup",
    category: "Maintenance",
    location: "Milpitas, CA",
    description:
      "A full seasonal cleanup clearing leaves and debris, resetting the yard to a clean, healthy baseline.",
    image: "/assets/images/projects/property-cleanup.webp",
    imageAlt:
      "Seasonal yard cleanup clearing fallen leaves from the ground",
  },
];

export function getProjectsByCategory(category: ProjectCategory): Project[] {
  return projects.filter((p) => p.category === category);
}

export function getFeaturedProjects(count = 6): Project[] {
  const featured = projects.filter((p) => p.featured);
  const rest = projects.filter((p) => !p.featured);
  return [...featured, ...rest].slice(0, count);
}
