import type {
  CityPin,
  Decision,
  RequestRow,
  SidebarItem,
} from "@/features/landing/types/mockup.types"

/** Sample data for the dispatcher dashboard drawn in the hero. */
export const DISPATCHER_MOCKUP = {
  company: "Cairo Cooling Co.",
  user: "Dispatcher · Rana H.",
  title: "Incoming requests",
  unassigned: "Unassigned 6",
  filters: ["All areas", "Today"],
  action: "Assign selected",
  city: {
    label: "Today across the city",
    districts: [
      "Maadi 3",
      "Dokki 2",
      "Zamalek 1",
      "Nasr City 2",
      "Heliopolis 1",
    ],
  },
  outToday: {
    label: "Out today",
    value: "9",
    caption: "visits scheduled",
    risk: "3 on site now",
  },
  columns: [
    "Request",
    "Customer",
    "Area",
    "Units",
    "AI reading",
    "Status",
    "Technician",
  ],
  decisionsLabel: "Needs a decision",
} as const

export const DISPATCHER_SIDEBAR: readonly SidebarItem[] = [
  { label: "Requests", count: "14", alert: true, active: true },
  { label: "Day board", count: "9" },
  { label: "Technicians", count: "6" },
  { label: "Parts & stock", count: "1 out", alert: true, mono: true },
  { label: "Invoices", count: "22" },
]

export const CITY_PINS: readonly CityPin[] = [
  { x: 21, y: 38, tone: "idle" },
  { x: 39, y: 69, tone: "idle" },
  { x: 57, y: 33, tone: "active" },
  { x: 75, y: 63, tone: "idle" },
  { x: 87, y: 39, tone: "danger" },
]

export const REQUEST_ROWS: readonly RequestRow[] = [
  {
    id: "REQ-2481",
    customer: "Nadia Farouk",
    area: "Maadi",
    units: 2,
    reading: "Likely start capacitor —",
    readingNote: "3 questions for site",
    status: "needs-visit",
    technician: "—",
    highlighted: true,
  },
  {
    id: "REQ-2480",
    customer: "Sami Abdel Aziz",
    area: "Nasr City",
    units: 1,
    reading: "Compressor overheating",
    status: "scheduled",
    technician: "Hana S.",
  },
  {
    id: "REQ-2479",
    customer: "Marwa Ismail",
    area: "Zamalek",
    units: 3,
    reading: "Drain blockage ×2, gas top-up ×1",
    status: "on-site",
    technician: "Mostafa K.",
  },
  {
    id: "REQ-2477",
    customer: "Delta Pharmacy",
    area: "Dokki",
    units: 4,
    reading: "Display fridge — thermostat drift",
    status: "invoiced",
    technician: "Tarek A.",
  },
  {
    id: "REQ-2476",
    customer: "Omar Shafik",
    area: "Heliopolis",
    units: 1,
    reading: "Reading unavailable —",
    readingNote: "triaged by hand",
    status: "partly-repaired",
    technician: "Youssef M.",
  },
]

export const DECISIONS: readonly Decision[] = [
  {
    title: "Unit not repaired",
    body: "REQ-2476 — part unavailable. Nothing billed for it.",
    tone: "danger",
  },
  {
    title: "Out of stock",
    body: "COMP-2T — none on the shelf.",
    tone: "danger",
  },
  {
    title: "Waiting for a visit",
    body: "6 requests have a unit with no visit booked.",
    tone: "info",
  },
]
