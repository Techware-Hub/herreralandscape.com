import { z } from "zod";
import { services } from "@/data/services";

const serviceTitles = services.map((s) => s.title) as [string, ...string[]];

export const quoteSchema = z.object({
  // Honeypot — hidden field. Left permissive here so the API route can detect a
  // filled value and silently accept it (never revealing the trap to bots).
  company: z.string().optional(),

  fullName: z
    .string()
    .trim()
    .min(2, { message: "Please enter your full name." })
    .max(100),
  email: z.string().trim().email({ message: "Enter a valid email address." }),
  phone: z
    .string()
    .trim()
    .min(7, { message: "Enter a valid phone number." })
    .max(25)
    .regex(/^[0-9()+\-.\s]+$/, { message: "Enter a valid phone number." }),
  address: z.string().trim().max(200).optional().or(z.literal("")),
  city: z.string().trim().min(2, { message: "Please enter your city." }).max(80),
  service: z.enum(serviceTitles, {
    message: "Please select a service.",
  }),
  propertyType: z.enum(["Residential", "Commercial"], {
    message: "Please select a property type.",
  }),
  contactMethod: z.enum(["Phone", "Email", "Text", "WhatsApp"], {
    message: "Please select a preferred contact method.",
  }),
  budget: z
    .enum([
      "Not sure yet",
      "Under $2,000",
      "$2,000 - $5,000",
      "$5,000 - $10,000",
      "$10,000 - $25,000",
      "$25,000+",
    ])
    .optional()
    .or(z.literal("")),
  startDate: z.string().trim().max(40).optional().or(z.literal("")),
  message: z
    .string()
    .trim()
    .min(10, { message: "Please describe your project (at least 10 characters)." })
    .max(2000),
  consent: z.literal(true, {
    message: "Please agree so we can contact you about your request.",
  }),
});

export type QuoteFormData = z.infer<typeof quoteSchema>;

export const budgetOptions = [
  "Not sure yet",
  "Under $2,000",
  "$2,000 - $5,000",
  "$5,000 - $10,000",
  "$10,000 - $25,000",
  "$25,000+",
] as const;

export const contactMethods = ["Phone", "Email", "Text", "WhatsApp"] as const;
