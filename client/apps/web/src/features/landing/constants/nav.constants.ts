import type { NavLink } from "@/features/landing/types/landing.types"

/** In-page anchors; each `href` matches a section `id`. */
export const SECTION_IDS = {
  top: "top",
  leaks: "leaks",
  flow: "flow",
  billing: "billing",
  dispatch: "dispatch",
  field: "field",
  demo: "demo",
} as const

export const NAV_LINKS: readonly NavLink[] = [
  { label: "Why jobs lose money", href: `#${SECTION_IDS.leaks}` },
  { label: "How it works", href: `#${SECTION_IDS.flow}` },
  { label: "For your technicians", href: `#${SECTION_IDS.field}` },
  { label: "Getting paid", href: `#${SECTION_IDS.billing}` },
]

export const DEMO_HREF = `#${SECTION_IDS.demo}`

/** Keeps anchored sections clear of the sticky nav (58px / 74px tall). */
export const SECTION_SCROLL_OFFSET = "scroll-mt-[58px] md:scroll-mt-[74px]"
