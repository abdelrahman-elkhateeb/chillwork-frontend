import type { ReactNode } from "react"
import { Link } from "react-router-dom"
import { Button } from "@workspace/ui/components/button"

import { FormAlert } from "@/components/form/form-alert"
import { ROUTES } from "@/config/routes"
import { useCurrentUser, type AuthUser } from "@/features/auth"
import { RequestHeader } from "@/features/requests/components/layout/request-header"
import { REQUEST_ALERTS } from "@/features/requests/constants/request-messages.constants"

/**
 * The ink header plus the page — for customers. Staff signed in on the
 * customer site get the same notice as on /requests/new (the API would
 * answer them 403).
 */
export function CustomerFrame({
  children,
}: {
  children: (user: AuthUser) => ReactNode
}) {
  const { user } = useCurrentUser()

  // Rendered behind RequireAuth, so this only guards the type.
  if (!user) {
    return null
  }

  return (
    <div className="min-h-svh bg-background text-foreground">
      <RequestHeader user={user} />
      {user.role === "CUSTOMER" ? (
        children(user)
      ) : (
        <main className="mx-auto max-w-[560px] px-4 py-10">
          <FormAlert {...REQUEST_ALERTS.customersOnly} />
          <Button asChild variant="outline" className="mt-4 h-[42px] w-full">
            <Link to={ROUTES.account}>Back to your account</Link>
          </Button>
        </main>
      )}
    </div>
  )
}
