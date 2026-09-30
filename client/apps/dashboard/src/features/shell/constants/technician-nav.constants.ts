import { ROUTES } from "@/config/routes"

/** The bottom tabs on a phone, the sidebar links from `md` up. */
export const TECHNICIAN_NAV = [
  { label: "Visits", to: ROUTES.visits },
  { label: "Me", to: ROUTES.me },
] as const
