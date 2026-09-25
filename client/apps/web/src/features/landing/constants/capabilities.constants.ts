import type { Capability } from "@/features/landing/types/landing.types"

export const CAPABILITIES_SECTION = {
  eyebrow: "What it handles",
  title: "Not a job list with a phone number on it.",
  aside:
    "Every line below is a rule the system enforces, not a feature you have to remember to use.",
} as const

export const CAPABILITIES: readonly Capability[] = [
  {
    title: "Company boundary",
    body: "Every record belongs to one company from the moment it is created. Nothing crosses.",
  },
  {
    title: "Roles and ownership",
    body: "A technician sees the visits assigned to him. A customer sees his own. Checked server-side, every call.",
  },
  {
    title: "Sessions that expire",
    body: "Short-lived access, separate refresh, cookies only. Nothing a browser script can read.",
  },
  {
    title: "Multi-device requests",
    body: "One call, several units, each with its own findings, its own outcome and its own line on the bill.",
  },
  {
    title: "Private photo storage",
    body: "Intake and on-site photos are stored privately and served by signed link. No public URLs.",
  },
  {
    title: "Conflict-free scheduling",
    body: "Assignment checks the technician's day and refuses a clash. Reschedule and cancel close once work starts.",
  },
  {
    title: "Parts catalog and stock",
    body: "Your parts at your prices. Availability shows at triage; stock moves when the part is fitted.",
  },
  {
    title: "Work agreement first",
    body: "The estimate is shown and accepted before work begins. Nothing new appears at the end.",
  },
  {
    title: "Reports on the spot",
    body: "Published from the technician's phone before he leaves, with what was found and done per unit.",
  },
  {
    title: "Invoices from performed work",
    body: "Only successful repairs reach the bill. A unit left unfinished cannot be charged for.",
  },
  {
    title: "Follow-ups and escalations",
    body: "A recurring fault opens a follow-up on its own. Customers and technicians can both escalate.",
  },
  {
    title: "Audited corrections",
    body: "An admin can correct a payment, and the correction is recorded with who did it and when.",
  },
]
