import {
  Trees,
  Blocks,
  Grid3x3,
  Fence,
  Droplets,
  Sprout,
  Layers,
  Flower2,
  Scissors,
  Trash2,
  Hammer,
} from "lucide-react";
import type { Service } from "@/types";

/**
 * All service content lives here so pages and cards render from a single
 * source. Add or edit a service by editing this array — the dynamic route
 * /services/[slug] and the homepage cards update automatically.
 */
export const services: Service[] = [
  {
    slug: "landscaping",
    title: "Landscaping",
    excerpt:
      "Full-service landscape design and installation that brings your outdoor vision to life.",
    description:
      "From concept to completion, our landscaping service transforms yards into functional, beautiful outdoor spaces. We plan layouts, select the right plants for the Bay Area climate, and build landscapes designed to thrive and mature gracefully.",
    icon: Trees,
    image: "/assets/images/services/residential-landscape-design.webp",
    heroImage: "/assets/images/services/landscaping-hero.webp",
    gallery: [
      "/assets/images/projects/front-yard-landscaping.webp",
      "/assets/images/projects/backyard-transformation.webp",
    ],
    imageAlt:
      "Thoughtfully designed residential front yard with a lawn, garden beds, and a pathway",
    includes: [
      "Custom landscape design and layout",
      "Soil preparation and grading",
      "Plant, tree, and shrub selection",
      "Mulch, edging, and ground cover",
      "Cleanup and final walkthrough",
    ],
    benefits: [
      "Boosts curb appeal and property value",
      "Climate-appropriate, low-maintenance planting",
      "Cohesive design tailored to your home",
    ],
    faqs: [
      {
        question: "Do you provide a design before starting work?",
        answer:
          "Yes. After an on-site consultation we outline a clear plan and estimate so you know exactly what to expect before any work begins.",
      },
      {
        question: "Can you work with my existing landscape?",
        answer:
          "Absolutely. We can refresh and build on what you already have, or start fresh depending on your goals and budget.",
      },
    ],
    projectCategory: "Landscaping",
  },
  {
    slug: "hardscaping",
    title: "Hardscaping",
    excerpt:
      "Patios, walkways, retaining walls, and stonework built to last and elevate your yard.",
    description:
      "Hardscaping adds structure, usability, and lasting value to your property. We design and build patios, retaining walls, seating areas, and stone features using quality materials and proper base preparation for durability.",
    icon: Blocks,
    image: "/assets/images/services/backyard-hardscaping.webp",
    heroImage: "/assets/images/services/hardscaping-hero.webp",
    gallery: [
      "/assets/images/projects/retaining-wall.webp",
      "/assets/images/projects/stone-pathway.webp",
    ],
    imageAlt:
      "Finished backyard hardscaping with a natural stone wall and planted borders",
    includes: [
      "Patios and seating areas",
      "Retaining and garden walls",
      "Stone and concrete features",
      "Proper base and drainage prep",
      "Sealing and finishing",
    ],
    benefits: [
      "Durable, low-maintenance outdoor living areas",
      "Defined, usable outdoor spaces",
      "Adds long-term property value",
    ],
    faqs: [
      {
        question: "What materials do you work with?",
        answer:
          "We work with pavers, natural stone, concrete, and block. During your consultation we recommend materials that fit your style, use, and budget.",
      },
      {
        question: "How long does a hardscape project take?",
        answer:
          "Timelines vary by size and scope. We provide an estimated schedule with your written estimate so you can plan accordingly.",
      },
    ],
    projectCategory: "Hardscaping",
  },
  {
    slug: "paver-installation",
    title: "Paver Installation",
    excerpt:
      "Precision-installed pavers for driveways, patios, and pathways with clean, lasting results.",
    description:
      "Paver installation delivers a premium, durable surface for driveways, patios, and walkways. We focus on proper excavation, base compaction, and edge restraint so your pavers stay level and beautiful for years.",
    icon: Grid3x3,
    image: "/assets/images/services/paver-walkway-installation.webp",
    heroImage: "/assets/images/services/paver-installation-hero.webp",
    gallery: [
      "/assets/images/projects/paver-walkway.webp",
      "/assets/images/projects/paver-patio.webp",
    ],
    imageAlt:
      "Professionally installed stone paver walkway winding through a landscaped yard",
    includes: [
      "Driveways, patios, and walkways",
      "Excavation and base compaction",
      "Sand setting bed and edge restraint",
      "Pattern layout and cutting",
      "Joint sand and sealing",
    ],
    benefits: [
      "Strong, slip-resistant surfaces",
      "Easy to repair individual pavers",
      "Wide range of styles and colors",
    ],
    faqs: [
      {
        question: "Are pavers better than poured concrete?",
        answer:
          "Pavers flex with the ground, resist cracking, and individual units can be replaced if damaged — making them a durable, repairable choice.",
      },
      {
        question: "Do pavers require maintenance?",
        answer:
          "Minimal. Occasional joint sand top-up and periodic sealing keep them looking their best. We'll explain simple upkeep at handoff.",
      },
    ],
    projectCategory: "Pavers",
  },
  {
    slug: "fence-installation",
    title: "Fence Installation",
    excerpt:
      "Privacy, security, and style with professionally installed wood and modern fencing.",
    description:
      "A well-built fence adds privacy, security, and definition to your property. We install wood, and modern fencing with solid posts and clean lines, built to withstand the elements and complement your landscape.",
    icon: Fence,
    image: "/assets/images/services/wood-fence-installation.webp",
    heroImage: "/assets/images/services/fence-installation-hero.webp",
    gallery: [
      "/assets/images/projects/wood-fence.webp",
      "/assets/images/projects/modern-fence.webp",
    ],
    imageAlt:
      "Professionally installed wood privacy fence beside a well-maintained garden",
    includes: [
      "Wood and modern fence styles",
      "Post setting and concrete footings",
      "Gates and hardware",
      "Line and grade layout",
      "Old fence removal and haul-away",
    ],
    benefits: [
      "Improved privacy and security",
      "Defined property boundaries",
      "Weather-resistant construction",
    ],
    faqs: [
      {
        question: "Do you remove the old fence?",
        answer:
          "Yes, we can remove and haul away your existing fence as part of the project. Let us know and we'll include it in the estimate.",
      },
      {
        question: "Can you match my neighbor's or HOA style?",
        answer:
          "We can build to common styles and heights. If your HOA has requirements, share them and we'll build to spec.",
      },
    ],
    projectCategory: "Fencing",
  },
  {
    slug: "irrigation-systems",
    title: "Irrigation Systems",
    excerpt:
      "Efficient sprinkler and drip systems that keep your landscape healthy while saving water.",
    description:
      "A properly designed irrigation system delivers the right amount of water to the right places, keeping your landscape healthy while conserving water. We install and repair sprinkler and drip systems with smart controllers for efficiency.",
    icon: Droplets,
    image: "/assets/images/services/irrigation-system.webp",
    heroImage: "/assets/images/services/irrigation-hero.webp",
    gallery: [
      "/assets/images/projects/irrigation-upgrade.webp",
      "/assets/images/projects/drip-irrigation.webp",
    ],
    imageAlt:
      "Lawn sprinkler system watering a healthy green residential lawn",
    includes: [
      "Sprinkler and drip system design",
      "Valves, zones, and controllers",
      "Smart timer setup",
      "Repairs and system tune-ups",
      "Seasonal adjustments",
    ],
    benefits: [
      "Healthier plants and lawns",
      "Lower water usage and bills",
      "Automated, worry-free watering",
    ],
    faqs: [
      {
        question: "Can you fix my existing sprinklers?",
        answer:
          "Yes. We repair broken heads, valves, and lines, and can upgrade older systems with efficient, smart controllers.",
      },
      {
        question: "Will a drip system work for my garden?",
        answer:
          "Drip irrigation is ideal for garden beds and shrubs — it delivers water directly to roots and reduces waste.",
      },
    ],
    projectCategory: "Irrigation",
  },
  {
    slug: "natural-grass-installation",
    title: "Natural Grass Installation",
    excerpt:
      "Lush, healthy lawns installed with proper grading, soil prep, and quality sod or seed.",
    description:
      "A healthy natural lawn starts with proper preparation. We grade, amend the soil, and install quality sod or seed suited to your yard's sun and use, giving you a lush green lawn that establishes strong roots.",
    icon: Sprout,
    image: "/assets/images/services/natural-lawn-installation.webp",
    heroImage: "/assets/images/services/natural-grass-hero.webp",
    gallery: [
      "/assets/images/projects/natural-sod.webp",
      "/assets/images/projects/garden-bed.webp",
    ],
    imageAlt:
      "Freshly installed healthy natural grass lawn with a clean, manicured edge",
    includes: [
      "Grading and soil preparation",
      "Sod or seed installation",
      "Starter fertilization",
      "Irrigation coordination",
      "Establishment guidance",
    ],
    benefits: [
      "Natural, cooling green space",
      "Great for families and pets",
      "Improves soil and air quality",
    ],
    faqs: [
      {
        question: "Sod or seed — which is better?",
        answer:
          "Sod gives an instant lawn, while seed is more economical but takes time to establish. We'll recommend the best fit for your yard and timeline.",
      },
      {
        question: "How do I care for a new lawn?",
        answer:
          "New lawns need consistent watering while establishing. We provide simple watering and mowing guidance at completion.",
      },
    ],
    projectCategory: "Landscaping",
  },
  {
    slug: "artificial-grass-installation",
    title: "Artificial Grass Installation",
    excerpt:
      "Evergreen, water-free lawns with realistic turf and proper drainage — no mowing required.",
    description:
      "Artificial grass gives you a green lawn year-round with no watering, mowing, or muddy patches. We install realistic, durable turf over a compacted, well-draining base for a clean look that lasts.",
    icon: Layers,
    image: "/assets/images/services/artificial-grass-installation.webp",
    heroImage: "/assets/images/services/artificial-grass-hero.webp",
    gallery: [
      "/assets/images/projects/artificial-turf.webp",
      "/assets/images/projects/artificial-turf-lawn.webp",
    ],
    imageAlt:
      "Clean, even artificial grass lawn in a modern California backyard",
    includes: [
      "Base excavation and compaction",
      "Weed barrier and drainage",
      "Premium turf installation",
      "Infill and brushing",
      "Clean, secured edges",
    ],
    benefits: [
      "No watering, mowing, or fertilizing",
      "Green all year, pet-friendly",
      "Saves water and time",
    ],
    faqs: [
      {
        question: "Is artificial grass pet-friendly?",
        answer:
          "Yes. We install turf with proper drainage and infill suited for pets, and it rinses clean easily.",
      },
      {
        question: "How long does artificial grass last?",
        answer:
          "Quality turf installed over a proper base can look great for many years with minimal upkeep — just occasional rinsing and brushing.",
      },
    ],
    projectCategory: "Artificial Grass",
  },
  {
    slug: "plants-garden-installation",
    title: "Plants & Garden Installation",
    excerpt:
      "Thoughtfully selected plants, trees, and garden beds designed for color and easy care.",
    description:
      "The right plants make a landscape feel alive. We design and install garden beds, trees, shrubs, and color plantings chosen for your light, soil, and maintenance preferences — creating gardens that flourish season after season.",
    icon: Flower2,
    image: "/assets/images/services/garden-planting.webp",
    heroImage: "/assets/images/services/plants-garden-hero.webp",
    gallery: [
      "/assets/images/projects/garden-bed.webp",
      "/assets/images/projects/front-yard-landscaping.webp",
    ],
    imageAlt:
      "Colorful flowers and shrubs planted in a freshly mulched garden bed",
    includes: [
      "Garden bed design and prep",
      "Tree, shrub, and flower planting",
      "Soil amendment and mulching",
      "Drought-tolerant plant options",
      "Care instructions",
    ],
    benefits: [
      "Year-round color and texture",
      "Options for low-water gardens",
      "Attracts pollinators and birds",
    ],
    faqs: [
      {
        question: "Can you plant drought-tolerant gardens?",
        answer:
          "Yes. We offer water-wise and native plant options that thrive in the Bay Area climate with less maintenance.",
      },
      {
        question: "Do you guarantee plants will survive?",
        answer:
          "We select healthy, appropriate plants and install them properly. Plant establishment also depends on care and conditions, and we provide guidance to help them thrive.",
      },
    ],
    projectCategory: "Landscaping",
  },
  {
    slug: "landscape-maintenance",
    title: "Landscape Maintenance",
    excerpt:
      "Reliable ongoing care — mowing, trimming, and seasonal upkeep to keep your property sharp.",
    description:
      "Consistent maintenance keeps your landscape healthy and looking its best. We offer dependable mowing, trimming, pruning, and seasonal care for residential and commercial properties on a schedule that works for you.",
    icon: Scissors,
    image: "/assets/images/services/landscape-maintenance.webp",
    heroImage: "/assets/images/services/maintenance-hero.webp",
    gallery: [
      "/assets/images/projects/lawn-maintenance.webp",
      "/assets/images/projects/property-cleanup.webp",
    ],
    imageAlt:
      "Landscaper mowing and maintaining a healthy, striped residential lawn",
    includes: [
      "Mowing, edging, and trimming",
      "Shrub and hedge pruning",
      "Weed control and bed care",
      "Seasonal cleanups",
      "Flexible schedules",
    ],
    benefits: [
      "Consistently tidy property",
      "Healthier plants and lawns",
      "Saves you time and effort",
    ],
    faqs: [
      {
        question: "Do you offer regular maintenance plans?",
        answer:
          "Yes. We offer weekly, bi-weekly, and monthly schedules for both residential and commercial properties.",
      },
      {
        question: "Do you service commercial properties?",
        answer:
          "We maintain both homes and commercial grounds. Contact us with your property details for a tailored estimate.",
      },
    ],
    projectCategory: "Maintenance",
  },
  {
    slug: "property-cleanup",
    title: "Property Cleanup",
    excerpt:
      "Overgrowth removal, debris hauling, and full yard resets to restore neglected spaces.",
    description:
      "Whether you're preparing to sell, moving in, or reclaiming an overgrown yard, our cleanup service clears debris, removes overgrowth, and resets your property to a clean, workable state.",
    icon: Trash2,
    image: "/assets/images/services/property-cleanup.webp",
    heroImage: "/assets/images/services/cleanup-hero.webp",
    gallery: [
      "/assets/images/projects/property-cleanup.webp",
      "/assets/images/projects/backyard-transformation.webp",
    ],
    imageAlt:
      "Yard cleanup with leaves and garden debris being cleared and hauled away",
    includes: [
      "Overgrowth and brush removal",
      "Leaf and debris cleanup",
      "Green waste hauling",
      "Bed and border reset",
      "Pressure-ready site prep",
    ],
    benefits: [
      "Fast, visible transformation",
      "Ready for sale or new projects",
      "Safer, cleaner outdoor space",
    ],
    faqs: [
      {
        question: "Do you haul away the debris?",
        answer:
          "Yes. Green waste and debris removal is included so you're left with a clean, ready-to-use space.",
      },
      {
        question: "Can you handle severely overgrown yards?",
        answer:
          "We handle heavy overgrowth and neglected properties regularly. Send photos and we'll provide an accurate estimate.",
      },
    ],
    projectCategory: "Maintenance",
  },
  {
    slug: "outdoor-renovations",
    title: "Outdoor Renovations",
    excerpt:
      "Complete outdoor transformations combining landscaping and hardscaping into one project.",
    description:
      "Ready for a full transformation? Our outdoor renovation service brings landscaping, hardscaping, planting, and irrigation together into one coordinated project that reinvents how you use your outdoor space.",
    icon: Hammer,
    image: "/assets/images/services/outdoor-renovation.webp",
    heroImage: "/assets/images/services/renovation-hero.webp",
    gallery: [
      "/assets/images/projects/backyard-transformation.webp",
      "/assets/images/projects/front-yard-landscaping.webp",
    ],
    imageAlt:
      "Full backyard transformation combining a lawn, planting, and hardscape features",
    includes: [
      "Full yard redesign",
      "Combined hardscape and softscape",
      "Irrigation and lighting coordination",
      "Phased project options",
      "Single point of contact",
    ],
    benefits: [
      "Cohesive, complete transformation",
      "One team for the whole project",
      "Maximizes usability and value",
    ],
    faqs: [
      {
        question: "Can a large project be done in phases?",
        answer:
          "Yes. We can phase larger renovations to match your budget and timeline while keeping the overall design cohesive.",
      },
      {
        question: "Do you handle both front and back yards?",
        answer:
          "We renovate front yards, back yards, and full properties — residential and commercial.",
      },
    ],
    projectCategory: "Landscaping",
  },
];

export function getService(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}

export function getServiceSlugs(): string[] {
  return services.map((s) => s.slug);
}
