import { ROUTES } from "@/config/routes"
import type { AuthUser, StaffRole } from "@/features/auth/types/auth.types"

/** Where each role lands after sign-in. */
export const ROLE_HOME = {
  ADMIN: ROUTES.home,
  TECHNICIAN: ROUTES.visits,
} as const satisfies Record<StaffRole, string>

export function isStaff(user: AuthUser): user is AuthUser & { role: StaffRole } {
  return user.role === "ADMIN" || user.role === "TECHNICIAN"
}

/** Path prefixes each role's pages live under. */
const ROLE_AREAS = {
  ADMIN: [
    ROUTES.home,
    ROUTES.requests,
    ROUTES.technicians,
    ROUTES.parts,
    ROUTES.settings,
  ],
  TECHNICIAN: [ROUTES.visits, ROUTES.me],
} as const satisfies Record<StaffRole, readonly string[]>

export function belongsToRole(path: string, role: StaffRole): boolean {
  const pathname = path.split(/[?#]/)[0] ?? path
  return ROLE_AREAS[role].some(
    (area) => pathname === area || pathname.startsWith(`${area}/`)
  )
}
