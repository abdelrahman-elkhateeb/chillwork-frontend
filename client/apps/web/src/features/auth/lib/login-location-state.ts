import { ROUTES } from "@/config/routes"
import type { LoginLocationState } from "@/features/auth/types/auth-form.types"

const AUTH_PAGES: readonly string[] = [ROUTES.login, ROUTES.signup]

/** `location.state` is untyped and user-controllable — read it defensively. */
export function readLoginLocationState(state: unknown): LoginLocationState {
  if (typeof state !== "object" || state === null) {
    return {}
  }

  const { from, email, justRegistered } = state as Record<string, unknown>

  return {
    from: typeof from === "string" ? from : undefined,
    email: typeof email === "string" ? email : undefined,
    justRegistered: justRegistered === true,
  }
}

/**
 * Where to land after signing in. Only same-app paths are honoured, so a
 * crafted `from` can't bounce the user to another site.
 */
export function getPostLoginPath(state: LoginLocationState): string {
  const { from } = state

  if (
    from?.startsWith("/") &&
    !from.startsWith("//") &&
    !AUTH_PAGES.includes(from)
  ) {
    return from
  }

  return ROUTES.requests
}
