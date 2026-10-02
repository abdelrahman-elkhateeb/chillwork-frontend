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
      { label: "How a job runs", href: `#${SECTION_IDS.steps}` },
      { label: "The three apps", href: `#${SECTION_IDS.apps}` },
      { label: "AI triage", href: `#${SECTION_IDS.triage}` },
      { label: "Billing", href: `#${SECTION_IDS.billing}` },
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
      { label: "Contact", href: `#${SECTION_IDS.contact}` },
      { label: "Privacy", href: "#privacy" },
    ],
  },
]
