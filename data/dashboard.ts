/**
 * Demo data for the customer dashboard. This is placeholder content displayed
 * until a real database and customer records are connected. Replace with live
 * data from Supabase (or another source) before launch.
 */

export interface QuoteRequest {
  id: string;
  service: string;
  status: "New" | "In Review" | "Estimate Sent" | "Approved" | "Completed";
  submittedOn: string;
  amount?: string;
}

export interface ProjectStatus {
  id: string;
  name: string;
  stage: "Planning" | "Scheduled" | "In Progress" | "Completed";
  progress: number; // 0-100
  updatedOn: string;
  image: string;
  imageAlt: string;
}

export interface Appointment {
  id: string;
  title: string;
  date: string;
  time: string;
  type: "Consultation" | "Site Visit" | "Service";
}

export interface DocumentItem {
  id: string;
  name: string;
  type: "Estimate" | "Invoice" | "Contract" | "Photo";
  date: string;
}

export interface MessageItem {
  id: string;
  from: string;
  preview: string;
  date: string;
  unread: boolean;
}

export const demoCustomer = {
  name: "Valued Customer",
  email: "customer@example.com",
  memberSince: "2025",
  phone: "(650) 000-0000",
};

export const demoQuotes: QuoteRequest[] = [
  {
    id: "Q-1042",
    service: "Backyard Paver Patio",
    status: "Estimate Sent",
    submittedOn: "May 2, 2026",
    amount: "$6,800",
  },
  {
    id: "Q-1039",
    service: "Irrigation System Upgrade",
    status: "In Review",
    submittedOn: "Apr 24, 2026",
  },
  {
    id: "Q-1031",
    service: "Front Yard Landscaping",
    status: "Completed",
    submittedOn: "Mar 15, 2026",
    amount: "$4,200",
  },
];

export const demoProjects: ProjectStatus[] = [
  {
    id: "P-208",
    name: "Backyard Transformation",
    stage: "In Progress",
    progress: 60,
    updatedOn: "Jul 14, 2026",
    image: "/assets/images/projects/backyard-transformation.webp",
    imageAlt: "Backyard transformation project in progress",
  },
  {
    id: "P-197",
    name: "Front Yard Landscaping",
    stage: "Completed",
    progress: 100,
    updatedOn: "Mar 28, 2026",
    image: "/assets/images/projects/front-yard-landscaping.webp",
    imageAlt: "Completed front yard landscaping project",
  },
];

/** Sample uploaded project photos shown on the dashboard. */
export const demoPhotos = [
  { src: "/assets/images/projects/paver-walkway.webp", alt: "Paver walkway installation photo" },
  { src: "/assets/images/projects/garden-bed.webp", alt: "Garden bed planting photo" },
  { src: "/assets/images/projects/retaining-wall.webp", alt: "Retaining wall build photo" },
  { src: "/assets/images/projects/lawn-maintenance.webp", alt: "Lawn maintenance photo" },
];

export const demoAppointments: Appointment[] = [
  {
    id: "A-55",
    title: "Site Visit — Patio Layout",
    date: "Jul 22, 2026",
    time: "10:00 AM",
    type: "Site Visit",
  },
  {
    id: "A-56",
    title: "Progress Walkthrough",
    date: "Jul 29, 2026",
    time: "2:00 PM",
    type: "Service",
  },
];

export const demoDocuments: DocumentItem[] = [
  { id: "D-01", name: "Estimate — Backyard Patio.pdf", type: "Estimate", date: "May 2, 2026" },
  { id: "D-02", name: "Contract — Backyard Project.pdf", type: "Contract", date: "May 6, 2026" },
  { id: "D-03", name: "Progress Photos — Week 1.zip", type: "Photo", date: "Jul 8, 2026" },
];

export const demoMessages: MessageItem[] = [
  {
    id: "M-01",
    from: "Herrera Landscape",
    preview: "Your paver materials are scheduled to arrive Monday. We'll begin installation Tuesday.",
    date: "Jul 15, 2026",
    unread: true,
  },
  {
    id: "M-02",
    from: "Herrera Landscape",
    preview: "Thanks for approving the estimate! We'll reach out to confirm your start date.",
    date: "May 7, 2026",
    unread: false,
  },
];

export const demoInvoices = [
  { id: "INV-1031", project: "Front Yard Landscaping", amount: "$4,200", status: "Paid", date: "Mar 30, 2026" },
  { id: "INV-1042", project: "Backyard Patio (Deposit)", amount: "$2,000", status: "Due", date: "Jul 10, 2026" },
];
