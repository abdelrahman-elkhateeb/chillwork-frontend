import { ROUTES } from "@/config/routes"
import { SECTION_IDS } from "@/features/landing/constants/nav.constants"
import type { FooterColumn } from "@/features/landing/types/landing.types"

export const FOOTER_TAGLINE =
  "Job management for AC, refrigeration and appliance repair companies."

/** `href`s starting with "/" are app routes, "#" in-page anchors. */
export const FOOTER_COLUMNS: readonly FooterColumn[] = [
  {
    heading: "Product",
    links: [
      { label: "Why jobs lose money", href: `#${SECTION_IDS.leaks}` },
      { label: "How it works", href: `#${SECTION_IDS.flow}` },
      { label: "The day board", href: `#${SECTION_IDS.dispatch}` },
    ],
  },
  {
    heading: "Sign in",
    links: [
      { label: "Customers", href: ROUTES.login },
      { label: "Your team", href: ROUTES.login },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "Contact", href: "#contact" },
      { label: "Privacy", href: "#privacy" },
    ],
  },
]
