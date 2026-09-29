import { useNavigate, useParams } from "react-router-dom"

import { ROUTES } from "@/config/routes"
import { ActivationAside } from "@/features/auth/components/activation/activation-aside"
import { ActivationForm } from "@/features/auth/components/activation/activation-form"
import { AuthLayout } from "@/features/auth/components/layout/auth-layout"
import type { LoginLocationState } from "@/features/auth/types/auth.types"

/** `/activate/:token` — the one-time link an admin shares with a technician. */
export function ActivatePage() {
  const { token = "" } = useParams()
  const navigate = useNavigate()

  return (
    <AuthLayout aside={<ActivationAside />}>
      <ActivationForm
        token={token}
        onActivated={({ signedIn, email }) => {
          if (signedIn) {
            navigate(ROUTES.visits, { replace: true })
            return
          }
          const state: LoginLocationState = { email }
          navigate(ROUTES.login, { replace: true, state })
        }}
      />
    </AuthLayout>
  )
}
