import type { JobStep } from "@/features/landing/types/landing.types"

export const STEPS_SECTION = {
  eyebrow: "How a job runs",
  title: "Five steps, in the order they happen.",
  aside:
    "A job cannot skip a step. The invoice cannot exist before the work is recorded.",
  hatchLegend:
    "Hatching means blocked or excluded — a slot that cannot be booked, a part that is not on the shelf, a repair that cannot be charged for. Same mark everywhere in the product.",
} as const

export const JOB_STEPS: readonly JobStep[] = [
  {
    n: 1,
    stage: "Intake",
    title: "The call comes in",
    body: "The customer photographs each unit and says what it is doing. One call covers the whole flat.",
    illustration: "intake",
  },
  {
    n: 2,
    stage: "Triage",
    title: "Read before it is saved",
    body: "Likely fault per unit, the parts it usually needs, checked against your shelf.",
    illustration: "triage",
  },
  {
    n: 3,
    stage: "Dispatch",
    title: "A slot that is free",
    body: "The board checks his day first. A clash is refused, not warned about.",
    illustration: "dispatch",
  },
  {
    n: 4,
    stage: "On site",
    title: "Agreed at the door",
    body: "Each unit inspected, the price shown and accepted before a screw comes out.",
    illustration: "on-site",
  },
  {
    n: 5,
    stage: "Close",
    title: "Paid before he leaves",
    body: "Only the units he actually fixed reach the bill. The rest becomes a follow-up.",
    illustration: "close",
  },
]
