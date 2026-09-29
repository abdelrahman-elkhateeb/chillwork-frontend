import { Navigate, Outlet, useLocation } from "react-router-dom"

import { PageLoader } from "@/components/feedback/page-loader"
import { ROUTES } from "@/config/routes"
import { CustomerAccountNotice } from "@/features/auth/components/customer-account-notice"
import { useCurrentUser } from "@/features/auth/hooks/use-current-user"
import type { LoginLocationState } from "@/features/auth/types/auth.types"

/** Renders child routes only for a signed-in admin or technician. */
export function RequireStaff() {
  const { isPending, user } = useCurrentUser()
  const location = useLocation()

  if (isPending) {
    return <PageLoader />
  }

  if (!user) {
    const state: LoginLocationState = {
      from: location.pathname + location.search,
    }
    return <Navigate to={ROUTES.login} replace state={state} />
  }

  if (user.role === "CUSTOMER") {
    return <CustomerAccountNotice />
  }

  return <Outlet />
}
