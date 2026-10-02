import type {
  DeviceReading,
  TriageFact,
} from "@/features/landing/types/mockup.types"

export const TRIAGE_SECTION = {
  eyebrow: "AI triage",
  title: "The request is read before it is even saved.",
  aside:
    "Her words stay exactly as she wrote them, next to the reading — never merged, so your dispatcher can always see what she actually said.",
} as const

export const CUSTOMER_REPORT = {
  label: "In her words",
  quote:
    "“The bedroom one clicks three times then stops. The living room one is dripping water on the floor.”",
  units: ["DEV-01 · Bedroom split", "DEV-02 · Living room"],
  fallbackLabel: "If the reading fails",
  fallback:
    "The request is still created and the dispatcher schedules it by hand. Analysis is never a gate.",
} as const

export const TRIAGE_ANALYSIS = {
  title: "Analysis attached to REQ-2481",
  timing: "Before the request is stored",
  devices: [
    {
      id: "DEV-01",
      name: "bedroom split",
      model: "Carrier 1.5T",
      finding: {
        lead: "Likely",
        emphasis: "start-capacitor failure",
        rest: "— three clicks is the compressor trying to start.",
      },
      causes: ["Start capacitor", "Contactor", "Low voltage"],
    },
    {
      id: "DEV-02",
      name: "living room",
      model: "Sharp 1T",
      finding: {
        lead: "Likely",
        emphasis: "blocked condensate drain",
        rest: "— water indoors with normal cooling points to the pan, not the gas.",
      },
      causes: ["Blocked drain line", "Cracked drain pan"],
    },
  ] satisfies DeviceReading[],
  facts: [
    { label: "Missing information", value: "Age of the living room unit" },
    { label: "Ask on site", value: "Does the outdoor fan spin?" },
    { label: "Who sees it", value: "Your team only — never the customer" },
  ] satisfies TriageFact[],
  disclaimer:
    "A reading, not a ruling. The technician's inspection is what the invoice is built from.",
} as const
