import {
  PhoneCall,
  ClipboardList,
  FileText,
  Sparkles,
  type LucideIcon,
} from "lucide-react";

export interface ProcessStep {
  step: number;
  title: string;
  description: string;
  icon: LucideIcon;
}

/** The four-step service process shown on the home and service pages. */
export const processSteps: ProcessStep[] = [
  {
    step: 1,
    title: "Request a Consultation",
    description:
      "Reach out by phone, text, WhatsApp, or our quote form. Tell us about your property and what you'd like to achieve.",
    icon: PhoneCall,
  },
  {
    step: 2,
    title: "Discuss Your Project",
    description:
      "We visit your site, listen to your goals, and share ideas and material options tailored to your space and budget.",
    icon: ClipboardList,
  },
  {
    step: 3,
    title: "Receive a Clear Estimate",
    description:
      "You get a straightforward written estimate outlining the work and scope — no surprises, no pressure.",
    icon: FileText,
  },
  {
    step: 4,
    title: "We Transform Your Space",
    description:
      "Our crew completes the work with quality materials and attention to detail, then walks the finished project with you.",
    icon: Sparkles,
  },
];
