import { Navigate } from "react-router-dom"

import { useCurrentUser } from "@/features/auth/hooks/use-current-user"
import { ROLE_HOME } from "@/features/auth/lib/role-home"

/** `/` — send each role to where it lands after sign-in. */
export function RoleHomeRedirect() {
  const { user } = useCurrentUser()

  if (!user || user.role === "CUSTOMER") {
    return null
  }

  return <Navigate to={ROLE_HOME[user.role]} replace />
}
