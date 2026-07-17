import { services } from "@/data/services";

export interface NavLink {
  label: string;
  href: string;
}

export const mainNav: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Projects", href: "/projects" },
  { label: "Contact", href: "/contact" },
];

export const servicesNav: NavLink[] = services.map((s) => ({
  label: s.title,
  href: `/services/${s.slug}`,
}));

export const footerServiceNav: NavLink[] = servicesNav.slice(0, 8);

export const legalNav: NavLink[] = [
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms & Conditions", href: "/terms" },
];
