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
    body: "Short-lived access, rotating refresh, cookies only. A replayed token signs the session out.",
  },
  {
    title: "Multi-device requests",
    body: "One request, several units, each with its own reading, its own result and its own line on the bill.",
  },
  {
    title: "AI that never blocks",
    body: "If the reading fails, the request is still saved and scheduled by hand. Customers never see the analysis.",
  },
  {
    title: "Conflict-free scheduling",
    body: "Assignment checks the technician's busy hours and refuses a clash. Back to back is fine; overlap is not.",
  },
  {
    title: "Parts catalog and stock",
    body: "Your parts at your prices, with real stock counts. Every move is on a ledger with who and why.",
  },
  {
    title: "Customer approves each part",
    body: "Every part is proposed per unit and approved or declined on the spot. A declined part never reaches the bill.",
  },
  {
    title: "A result for every unit",
    body: "Repaired, or not repaired with a structured reason. A visit cannot close with a unit left unanswered.",
  },
  {
    title: "Invoices from performed work",
    body: "Approved parts plus one labor fee per repaired unit. A unit left unrepaired costs nothing.",
  },
  {
    title: "Technician invites",
    body: "Add a technician and pass on a one-time activation link. They choose their own password; you never see it.",
  },
  {
    title: "Prices that do not drift",
    body: "Part prices are captured when proposed, the currency locks once set, and every fee change is audited.",
  },
]
