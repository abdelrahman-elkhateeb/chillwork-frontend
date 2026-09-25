import type { AppRole } from "@/features/landing/types/landing.types"
import type {
  InspectionCheck,
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
      "Photos on intake, live status, the price they agreed, what was done to each unit, and the invoice.",
  },
  {
    id: "dispatcher",
    role: "Dispatcher & admin",
    title: "Triage & assign",
    summary:
      "The whole queue and the whole day. Conflicts are refused at save, stock is visible, escalations surface on their own.",
  },
  {
    id: "technician",
    role: "Technician",
    title: "Inspect & close",
    summary:
      "Designed at 390px first. Findings save per check, so a two-hour visit is never one long form he loses at the end.",
  },
]

export const CUSTOMER_PREVIEW = {
  request: "REQ-2481",
  status: "On the way",
  visit: "Mostafa K. · 10:00–12:00",
  units: "2 units · Maadi",
  rows: [
    { label: "Agreed price", value: "[AMOUNT]", kind: "amount" },
    { label: "Service report", value: "Open", kind: "link" },
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
  checklist: "DEV-01 checks",
  totalChecks: 6,
  checks: [
    { label: "Capacitor reading out of range", done: true },
    { label: "Contactor pitted, replaced", done: true },
    { label: "Gas pressure check", done: false },
  ] satisfies InspectionCheck[],
  /** Checks done so far, including ones scrolled out of view. */
  completed: 4,
  action: "Show the price",
} as const
