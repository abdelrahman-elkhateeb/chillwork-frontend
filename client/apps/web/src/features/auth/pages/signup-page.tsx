import { useNavigate } from "react-router-dom"

import { ROUTES } from "@/config/routes"
import type { AccountLocationState } from "@/features/account"
import { AuthLayout } from "@/features/auth/components/layout/auth-layout"
import { SignupAside } from "@/features/auth/components/signup/signup-aside"
import { SignupForm } from "@/features/auth/components/signup/signup-form"
import { SignupMobileHeader } from "@/features/auth/components/signup/signup-mobile-header"
import type { LoginLocationState } from "@/features/auth/types/auth-form.types"
import type { SignupResult } from "@/features/auth/types/auth.types"

export function SignupPage() {
  const navigate = useNavigate()

  const handleSuccess = ({ user, signedIn }: SignupResult) => {
    if (signedIn) {
      const state: AccountLocationState = { welcome: true }
      navigate(ROUTES.account, { replace: true, state })
      return
    }

    // Account exists but the follow-up login didn't go through.
    const state: LoginLocationState = {
      email: user.email,
      justRegistered: true,
    }
    navigate(ROUTES.login, { replace: true, state })
  }

  return (
    <AuthLayout aside={<SignupAside />} mobileHeader={<SignupMobileHeader />}>
      <SignupForm onSuccess={handleSuccess} />
    </AuthLayout>
  )
}
