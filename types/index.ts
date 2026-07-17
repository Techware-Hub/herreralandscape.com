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
  image: string;
  imageWide: string;
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
  /** Optional before/after images */
  before?: string;
  after?: string;
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
