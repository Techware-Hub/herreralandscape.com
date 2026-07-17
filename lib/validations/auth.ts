import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().trim().email({ message: "Enter a valid email address." }),
  password: z.string().min(6, { message: "Password must be at least 6 characters." }),
  remember: z.boolean().optional(),
});

export type LoginFormData = z.infer<typeof loginSchema>;

export const signupSchema = z
  .object({
    fullName: z.string().trim().min(2, { message: "Please enter your name." }).max(100),
    email: z.string().trim().email({ message: "Enter a valid email address." }),
    password: z.string().min(6, { message: "Password must be at least 6 characters." }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
  });

export type SignupFormData = z.infer<typeof signupSchema>;
