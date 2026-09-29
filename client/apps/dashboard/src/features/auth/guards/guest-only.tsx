import { useState } from "react"
import { Navigate, Outlet, useLocation } from "react-router-dom"

import { PageLoader } from "@/components/feedback/page-loader"
import { useCurrentUser } from "@/features/auth/hooks/use-current-user"
import {
  getPostLoginPath,
  readLoginLocationState,
} from "@/features/auth/lib/login-location-state"
import { isStaff } from "@/features/auth/lib/role-home"
import type { AuthUser } from "@/features/auth/types/auth.types"

/**
 * Only decides once, on arrival: signed-in staff who open /login are sent
 * on. Signing in *on* the page must not trigger this — the page navigates
 * itself. A customer session is left alone here: signing in replaces it.
 */
function GuestGate({ userOnArrival }: { userOnArrival: AuthUser | null }) {
  const [staffOnArrival] = useState(
    userOnArrival && isStaff(userOnArrival) ? userOnArrival : null
  )
  const location = useLocation()

  if (staffOnArrival) {
    const target = getPostLoginPath(
      readLoginLocationState(location.state),
      staffOnArrival
    )
    return <Navigate to={target} replace />
  }

  return <Outlet />
}

export function GuestOnly() {
  const { isPending, user } = useCurrentUser()

  if (isPending) {
    return <PageLoader />
  }

  return <GuestGate userOnArrival={user} />
}
