import type { PhotoFeature } from "@/features/landing/types/landing.types"

// TODO(swap-photo): temporary stock photos until the real shoot. Brief from
// the design: real site, real dust — hands and machines, no studio benches.
export const ON_SITE_FEATURE: PhotoFeature = {
  eyebrow: "On site",
  title: "Built for the balcony, not the back office.",
  body: "Your technician works from a phone, on a ladder, with one hand free. They see only the visits assigned to them, and only the next step that visit allows.",
  points: [
    "Start, record, complete — one step at a time",
    "Parts proposed per unit, approved by the customer",
    "Invoice issued before they leave the building",
  ],
  photo: {
    src: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=1000&q=80",
    alt: "Technician in a hard hat testing wiring with a meter",
  },
}

export const PER_UNIT_FEATURE: PhotoFeature = {
  eyebrow: "Per unit",
  title: "Every unit gets a straight answer.",
  body: "Repaired, or not repaired and why — part unavailable, customer refused, too expensive. The visit cannot close until each unit has one, and only the repaired ones are billed.",
  points: [
    "Structured reasons, not free-text excuses",
    "Results lock once the visit is completed",
    "The customer sees the outcome on their timeline",
  ],
  photo: {
    src: "https://images.unsplash.com/photo-1621905252472-943afaa20e20?auto=format&fit=crop&w=1000&q=80",
    alt: "Technician holding a hard hat on site",
    focus: "center 30%",
  },
}
