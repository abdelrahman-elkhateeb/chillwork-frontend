import type {
  DeviceReading,
  TriageFact,
} from "@/features/landing/types/mockup.types"

export const TRIAGE_SECTION = {
  eyebrow: "AI triage",
  title: "The request is read before it is even saved.",
  aside:
    "Her words and her photos stay side by side with the reading — never merged, so your dispatcher can always see what she actually said.",
} as const

export const CUSTOMER_REPORT = {
  label: "In her words",
  quote:
    "“The bedroom one clicks three times then stops. The living room one is dripping water on the floor.”",
  photoCount: 4,
  photoNote: "4 photos · stored privately, signed links only",
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
      parts: [
        { code: "CAP-45/5", note: "12 in stock", available: true },
        { code: "CONT-30A", note: "4 in stock", available: true },
      ],
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
      parts: [{ code: "DRN-KIT", note: "none on the shelf", available: false }],
    },
  ] satisfies DeviceReading[],
  facts: [
    { label: "Skill needed", value: "Electrical — not a gas job" },
    { label: "Estimated on site", value: "90 minutes, both units" },
    { label: "Van checklist", value: "2 parts ready, 1 to order" },
  ] satisfies TriageFact[],
  disclaimer:
    "A reading, not a ruling. The technician's inspection is what the invoice is built from.",
} as const
