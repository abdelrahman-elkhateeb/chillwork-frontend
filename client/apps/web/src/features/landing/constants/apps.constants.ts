import type { AppRole } from "@/features/landing/types/landing.types"
import type {
  PartProposal,
  ScheduleRow,
} from "@/features/landing/types/mockup.types"

export const APPS_SECTION = {
  eyebrow: "Three apps, one system",
  title: "Each role gets its own app, not its own tab.",
  aside:
    "Separate sign-ins, separate permissions, enforced on the server for every request — a customer who lands in the dashboard is refused and signed out.",
} as const

export const APP_ROLES: readonly AppRole[] = [
  {
    id: "customer",
    role: "Customer",
    title: "Report & follow",
    summary:
      "Each unit described in their own words, a live timeline of every visit, the outcome per unit, and the invoice.",
  },
  {
    id: "dispatcher",
    role: "Dispatcher & admin",
    title: "Triage & assign",
    summary:
      "The whole queue with its AI readings, every technician's day, parts, stock and your labor fee. Conflicts are refused at save.",
  },
  {
    id: "technician",
    role: "Technician",
    title: "Inspect & close",
    summary:
      "Designed at 390px first. Parts proposed and decided per unit, results saved as he goes, invoice issued before he leaves.",
  },
]

export const CUSTOMER_PREVIEW = {
  request: "REQ-2481",
  status: "Scheduled",
  visit: "Mostafa K. · 10:00–12:00",
  units: "2 units · Maadi",
  rows: [
    { label: "Bedroom split", value: "Scheduled", kind: "status" },
    { label: "Timeline", value: "Open", kind: "link" },
  ],
} as const

export const DISPATCHER_PREVIEW = {
  date: "Thursday 12 March",
  schedule: [
    {
      technician: "Mostafa",
      slots: [
        { kind: "job", span: 2 },
        { kind: "free", span: 1 },
        { kind: "job", span: 2 },
      ],
    },
    {
      technician: "Hana",
      slots: [
        { kind: "free", span: 1 },
        { kind: "job", span: 3 },
        { kind: "free", span: 1 },
      ],
    },
    {
      technician: "Tarek",
      slots: [
        { kind: "job", span: 2.5 },
        { kind: "blocked", span: 2.5 },
      ],
    },
  ] satisfies ScheduleRow[],
  refusal: {
    title: "Assignment refused",
    body: "Tarek is already on a visit at that hour.",
  },
} as const

export const TECHNICIAN_PREVIEW = {
  visit: "VIS-3390",
  customer: "Nadia Farouk · Maadi",
  device: "DEV-01 parts",
  proposals: [
    { name: "Start capacitor", code: "CAP-45/5", decision: "approved" },
    { name: "Contactor", code: "CONT-30A", decision: "rejected" },
    { name: "Fan motor", code: "FAN-1T", decision: "proposed" },
  ] satisfies PartProposal[],
  action: "Record the customer's answer",
} as const
