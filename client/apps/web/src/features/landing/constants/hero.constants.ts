import type {
  DrawingCallout,
  HeroStep,
} from "@/features/landing/types/landing.types"

export const HERO_STEPS: readonly HeroStep[] = [
  { n: "01", text: "Customer sends the fault with photos" },
  { n: "02", text: "Your technician checks every unit on site" },
  { n: "03", text: "Parts he used become the invoice" },
  { n: "04", text: "Paid before he leaves the flat" },
]

/** Numbered markers on the hero drawing, one per step above. */
export const HERO_CALLOUTS: readonly DrawingCallout[] = [
  { label: "1", cx: 42, cy: 82, leaderToX: 86 },
  { label: "2", cx: 510, cy: 82, leaderToX: 334 },
  { label: "3", cx: 42, cy: 299, leaderToX: 168 },
  { label: "4", cx: 510, cy: 364, leaderToX: 440 },
]
