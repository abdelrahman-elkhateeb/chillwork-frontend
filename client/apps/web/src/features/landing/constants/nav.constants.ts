import type { NavLink } from "@/features/landing/types/landing.types"

/** In-page anchors; each `href` matches a section `id`. */
export const SECTION_IDS = {
  top: "top",
  steps: "how-it-runs",
  apps: "apps",
  triage: "triage",
  handles: "what-it-handles",
  billing: "billing",
  leaks: "leaks",
  contact: "contact",
} as const

export const NAV_LINKS: readonly NavLink[] = [
  { label: "The three apps", href: `#${SECTION_IDS.apps}` },
  { label: "How a job runs", href: `#${SECTION_IDS.steps}` },
  { label: "AI triage", href: `#${SECTION_IDS.triage}` },
  { label: "What it handles", href: `#${SECTION_IDS.handles}` },
]

/** Keeps anchored sections clear of the sticky nav (58px / 74px tall). */
export const SECTION_SCROLL_OFFSET = "scroll-mt-[58px] md:scroll-mt-[74px]"
