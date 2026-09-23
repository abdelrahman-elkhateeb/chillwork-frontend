import type {
  FieldPoint,
  SiteUnit,
} from "@/features/landing/types/landing.types"

export const FIELD_POINTS: readonly FieldPoint[] = [
  {
    title: "Nothing is lost",
    body: "Each unit is saved as he finishes it, not at the end.",
  },
  {
    title: "The price is agreed first",
    body: "The customer sees the total before the work starts, so nobody argues at the door.",
  },
]

export const SITE_VISIT = {
  time: "Today, 10:18",
  customer: "Nadia Farouk — Maadi",
  summary: "2 units to check",
  action: "Show the customer the price",
  actionHint: "He agrees before anything is opened",
  units: [
    {
      name: "Bedroom — Carrier 1.5T",
      mobileName: "Bedroom — Carrier",
      status: "done",
      note: "Capacitor out of range — replaced",
    },
    {
      name: "Living room — Sharp 1T",
      mobileName: "Living room — Sharp",
      status: "checking",
      note: "Drain blocked — opening the pan",
    },
  ] satisfies SiteUnit[],
} as const
