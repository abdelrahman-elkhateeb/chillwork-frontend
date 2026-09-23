import { Navigate, Outlet, useLocation } from "react-router-dom"

import { PageLoader } from "@/components/feedback/page-loader"
import { ROUTES } from "@/config/routes"
import { useCurrentUser } from "@/features/auth/hooks/use-current-user"
import type { LoginLocationState } from "@/features/auth/types/auth-form.types"

/** Renders child routes only for a signed-in user; otherwise sends them to log in. */
export function RequireAuth() {
  const { isPending, isAuthenticated } = useCurrentUser()
  const location = useLocation()

  if (isPending) {
    return <PageLoader />
  }

  if (!isAuthenticated) {
    const state: LoginLocationState = {
      from: location.pathname + location.search,
    }
    return <Navigate to={ROUTES.login} replace state={state} />
  }

  return <Outlet />
}
