import { ROUTES } from "@/config/routes"

export type AdminNavCount = "waiting" | "technicians" | "outOfStock"

export type AdminNavItem = {
  label: string
  to: string
  count?: AdminNavCount
  /** Set apart below a divider. */
  separated?: boolean
}

export const ADMIN_NAV: readonly AdminNavItem[] = [
  { label: "Home", to: ROUTES.home },
  { label: "Requests", to: ROUTES.requests, count: "waiting" },
  { label: "Technicians", to: ROUTES.technicians, count: "technicians" },
  { label: "Parts", to: ROUTES.parts, count: "outOfStock" },
  { label: "Company settings", to: ROUTES.settings, separated: true },
]
