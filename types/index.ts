import type { LucideIcon } from "lucide-react";

export interface ServiceFAQ {
  question: string;
  answer: string;
}

export interface Service {
  slug: string;
  title: string;
  /** Short one-line summary for cards */
  excerpt: string;
  /** Longer intro paragraph for the detail page */
  description: string;
  icon: LucideIcon;
  /** Card image (4:3) */
  image: string;
  /** Wide banner image for the detail-page hero */
  heroImage: string;
  /** Two supporting images shown on the detail page */
  gallery: [string, string];
  /** Descriptive alt text for the primary image */
  imageAlt: string;
  /** Bullet list of what's included */
  includes: string[];
  /** Key benefits */
  benefits: string[];
  faqs: ServiceFAQ[];
  /** Category keys used to relate projects */
  projectCategory: ProjectCategory;
}

export type ProjectCategory =
  | "Landscaping"
  | "Hardscaping"
  | "Pavers"
  | "Fencing"
  | "Artificial Grass"
  | "Irrigation"
  | "Maintenance";

export interface Project {
  slug: string;
  title: string;
  category: ProjectCategory;
  location: string;
  description: string;
  image: string;
  /** Descriptive alt text */
  imageAlt: string;
  /** Optional before/after images */
  before?: string;
  after?: string;
  /** Marks a project as featured for prominent placement */
  featured?: boolean;
}

export interface Testimonial {
  name: string;
  location: string;
  rating: number;
  quote: string;
  /** Flag so placeholder reviews are never presented as verified. */
  placeholder: boolean;
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface ProcessStep {
  step: number;
  title: string;
  description: string;
  icon: LucideIcon;
}
