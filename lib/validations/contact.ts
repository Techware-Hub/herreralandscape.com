import { z } from "zod";

export const contactSchema = z.object({
  // Honeypot field — hidden. Permissive so the API can silently accept spam.
  company: z.string().optional(),

  name: z.string().trim().min(2, { message: "Please enter your name." }).max(100),
  email: z.string().trim().email({ message: "Enter a valid email address." }),
  phone: z
    .string()
    .trim()
    .max(25)
    .regex(/^[0-9()+\-.\s]*$/, { message: "Enter a valid phone number." })
    .optional()
    .or(z.literal("")),
  subject: z.string().trim().min(2, { message: "Please add a subject." }).max(150),
  message: z
    .string()
    .trim()
    .min(10, { message: "Please enter a message (at least 10 characters)." })
    .max(2000),
});

export type ContactFormData = z.infer<typeof contactSchema>;
