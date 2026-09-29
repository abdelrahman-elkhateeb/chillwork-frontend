import { useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"

import { AuthLayout } from "@/features/auth/components/layout/auth-layout"
import { LoginAside } from "@/features/auth/components/login/login-aside"
import { LoginForm } from "@/features/auth/components/login/login-form"
import { CustomerAccountNotice } from "@/features/auth/components/customer-account-notice"
import { AUTH_ALERTS } from "@/features/auth/constants/auth-copy.constants"
import {
  getPostLoginPath,
  readLoginLocationState,
} from "@/features/auth/lib/login-location-state"

export function LoginPage() {
  const location = useLocation()
  const navigate = useNavigate()
  const state = readLoginLocationState(location.state)
  // A customer who signs in here is signed back out, not let in.
  const [customerSignedIn, setCustomerSignedIn] = useState(false)

  if (customerSignedIn) {
    return <CustomerAccountNotice />
  }

  return (
    <AuthLayout aside={<LoginAside />}>
      <LoginForm
        key={state.email}
        defaultEmail={state.email}
        notice={state.signedOutCustomer ? AUTH_ALERTS.signedOutCustomer : null}
        onSuccess={(user) => {
          if (user.role === "CUSTOMER") {
            setCustomerSignedIn(true)
            return
          }
          navigate(getPostLoginPath(state, user), { replace: true })
        }}
      />
    </AuthLayout>
  )
}
