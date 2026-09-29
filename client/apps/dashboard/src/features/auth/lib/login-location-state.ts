import { ROUTES } from "@/config/routes"
import { ROLE_HOME, belongsToRole } from "@/features/auth/lib/role-home"
import type {
  AuthUser,
  LoginLocationState,
  StaffRole,
} from "@/features/auth/types/auth.types"

/** `location.state` is untyped and user-controllable — read it defensively. */
export function readLoginLocationState(state: unknown): LoginLocationState {
  if (typeof state !== "object" || state === null) {
    return {}
  }

  const { from, email, signedOutCustomer } = state as Record<string, unknown>

  return {
    from: typeof from === "string" ? from : undefined,
    email: typeof email === "string" ? email : undefined,
    signedOutCustomer: signedOutCustomer === true,
  }
}

/**
 * Where to land after signing in: the page the guard bounced them from if
 * it is a same-app path in their own area (so a technician is never sent
 * to /parts), else their role's home.
 */
export function getPostLoginPath(
  state: LoginLocationState,
  user: AuthUser
): string {
  if (user.role === "CUSTOMER") {
    return ROUTES.root
  }

  const role: StaffRole = user.role
  const { from } = state

  if (
    from?.startsWith("/") &&
    !from.startsWith("//") &&
    from !== ROUTES.login &&
    belongsToRole(from, role)
  ) {
    return from
  }

  return ROLE_HOME[role]
}
