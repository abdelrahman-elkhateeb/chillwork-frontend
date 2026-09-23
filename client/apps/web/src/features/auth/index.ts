// Public surface of the auth feature. Other features import from here,
// never from its internals.
export { authKeys } from "@/features/auth/api/auth.query-keys"
export { GuestOnly } from "@/features/auth/guards/guest-only"
export { RequireAuth } from "@/features/auth/guards/require-auth"
export { useCurrentUser } from "@/features/auth/hooks/use-current-user"
export { useLogout } from "@/features/auth/hooks/use-logout"
export { LoginPage } from "@/features/auth/pages/login-page"
export { SignupPage } from "@/features/auth/pages/signup-page"
export type { AuthUser } from "@/features/auth/types/auth.types"
