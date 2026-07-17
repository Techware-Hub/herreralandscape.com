/**
 * Central site configuration. All business details live here so they can be
 * updated in one place and reused across metadata, schema, and UI components.
 */

export const siteConfig = {
  name: "Herrera Landscape",
  legalName: "Herrera Landscape",
  owner: "Arturo Herrera",
  tagline: "Professional Landscaping & Hardscaping in Sunnyvale",
  description:
    "Herrera Landscape provides professional landscaping, hardscaping, pavers, fencing, irrigation, and property maintenance for residential and commercial properties in Sunnyvale and the Bay Area.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://herreralandscape.com",
  email: "herreramaintenance@yahoo.com",
  phone: "(650) 669-1780",
  phoneRaw: "6506691780",
  phoneIntl: "+16506691780",
  whatsapp: "+16506691780",
  location: {
    city: "Sunnyvale",
    region: "California",
    regionShort: "CA",
    country: "United States",
    countryShort: "US",
    // Approximate Sunnyvale coordinates for LocalBusiness schema.
    latitude: 37.36883,
    longitude: -122.03635,
  },
  hours: [
    { day: "Monday", open: "8:00 AM", close: "6:00 PM" },
    { day: "Tuesday", open: "8:00 AM", close: "6:00 PM" },
    { day: "Wednesday", open: "8:00 AM", close: "6:00 PM" },
    { day: "Thursday", open: "8:00 AM", close: "6:00 PM" },
    { day: "Friday", open: "8:00 AM", close: "6:00 PM" },
    { day: "Saturday", open: "9:00 AM", close: "4:00 PM" },
    { day: "Sunday", open: "Closed", close: "Closed" },
  ],
  serviceAreas: [
    "Sunnyvale",
    "San Jose",
    "Santa Clara",
    "Mountain View",
    "Cupertino",
    "Milpitas",
    "Palo Alto",
    "Los Altos",
  ],
  social: {
    facebook: "#",
    instagram: "#",
    yelp: "#",
    google: "#",
  },
} as const;

export type SiteConfig = typeof siteConfig;

/** tel: href helper */
export const telHref = `tel:${siteConfig.phoneIntl}`;
/** mailto: href helper */
export const mailtoHref = `mailto:${siteConfig.email}`;
/** WhatsApp click-to-chat href */
export const whatsappHref = `https://wa.me/${siteConfig.whatsapp.replace(
  "+",
  ""
)}?text=${encodeURIComponent(
  "Hi Herrera Landscape, I'd like to request a free quote."
)}`;
