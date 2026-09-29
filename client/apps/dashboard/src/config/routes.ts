/**
 * Every dashboard path. Admins land on /dashboard, technicians on /visits
 * (the design's "where login sends them" table).
 */
export const ROUTES = {
  root: "/",
  login: "/login",
  activate: "/activate/:token",

  // Admin
  home: "/dashboard",
  requests: "/requests",
  request: "/requests/:requestId",
  scheduleVisit: "/requests/:requestId/schedule",
  technicians: "/technicians",
  newTechnician: "/technicians/new",
  technician: "/technicians/:technicianId",
  parts: "/parts",
  newPart: "/parts/new",
  part: "/parts/:partId",
  settings: "/settings",

  // Technician
  visits: "/visits",
  visit: "/visits/:visitId",
  deviceParts: "/visits/:visitId/units/:deviceId/parts",
  approveParts: "/visits/:visitId/units/:deviceId/approve",
  outcome: "/visits/:visitId/units/:deviceId/outcome",
  invoice: "/visits/:visitId/invoice",
  me: "/me",
} as const

/** Fills `:params` in a route pattern. */
export function pathTo(
  pattern: string,
  params: Record<string, string>
): string {
  return pattern.replace(/:(\w+)/g, (_, key: string) =>
    encodeURIComponent(params[key] ?? "")
  )
}

/** Where the customer site lives (the "Sign in on the main site" links). */
export const CUSTOMER_SITE_URL =
  import.meta.env.VITE_CUSTOMER_SITE_URL ?? "http://localhost:5173"
