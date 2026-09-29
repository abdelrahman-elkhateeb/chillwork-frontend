// Public surface of the auth feature. Other features import from here,
// never from its internals.
export { authKeys } from "@/features/auth/api/auth.query-keys"
export { GuestOnly } from "@/features/auth/guards/guest-only"
export { RequireRole } from "@/features/auth/guards/require-role"
export { RequireStaff } from "@/features/auth/guards/require-staff"
export { RoleHomeRedirect } from "@/features/auth/guards/role-home-redirect"
export { useCurrentUser } from "@/features/auth/hooks/use-current-user"
export { useLogout } from "@/features/auth/hooks/use-logout"
export { ActivatePage } from "@/features/auth/pages/activate-page"
export { LoginPage } from "@/features/auth/pages/login-page"
export type {
  AuthUser,
  StaffRole,
  UserRole,
} from "@/features/auth/types/auth.types"
