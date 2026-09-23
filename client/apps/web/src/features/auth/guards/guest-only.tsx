import { useState } from "react"
import { Navigate, Outlet, useLocation } from "react-router-dom"

import { PageLoader } from "@/components/feedback/page-loader"
import { useCurrentUser } from "@/features/auth/hooks/use-current-user"
import {
  getPostLoginPath,
  readLoginLocationState,
} from "@/features/auth/lib/login-location-state"

/**
 * Only decides once, on arrival: a signed-in user who opens /login is sent
 * on. Signing in *on* the page must not trigger this redirect — the page
 * navigates itself, with its own state (e.g. the signup welcome).
 */
function GuestGate({ signedInOnArrival }: { signedInOnArrival: boolean }) {
  const [shouldRedirect] = useState(signedInOnArrival)
  const location = useLocation()

  if (shouldRedirect) {
    const target = getPostLoginPath(readLoginLocationState(location.state))
    return <Navigate to={target} replace />
  }

  return <Outlet />
}

/** Wraps the login/signup routes. */
export function GuestOnly() {
  const { isPending, isAuthenticated } = useCurrentUser()

  if (isPending) {
    return <PageLoader />
  }

  return <GuestGate signedInOnArrival={isAuthenticated} />
}
