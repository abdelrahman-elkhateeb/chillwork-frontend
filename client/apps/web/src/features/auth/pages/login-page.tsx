import { useLocation, useNavigate } from "react-router-dom"

import { AuthLayout } from "@/features/auth/components/layout/auth-layout"
import { LoginAside } from "@/features/auth/components/login/login-aside"
import { LoginForm } from "@/features/auth/components/login/login-form"
import { LoginMobileHeader } from "@/features/auth/components/login/login-mobile-header"
import { AUTH_ALERTS } from "@/features/auth/constants/auth-messages.constants"
import {
  getPostLoginPath,
  readLoginLocationState,
} from "@/features/auth/lib/login-location-state"

export function LoginPage() {
  const location = useLocation()
  const navigate = useNavigate()
  const state = readLoginLocationState(location.state)

  return (
    <AuthLayout aside={<LoginAside />} mobileHeader={<LoginMobileHeader />}>
      <LoginForm
        // Remount when arriving with a different prefilled email.
        key={state.email}
        defaultEmail={state.email}
        notice={state.justRegistered ? AUTH_ALERTS.justRegistered : null}
        onSuccess={() => navigate(getPostLoginPath(state), { replace: true })}
      />
    </AuthLayout>
  )
}
