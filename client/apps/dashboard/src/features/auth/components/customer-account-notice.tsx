import { useEffect } from "react"
import { Link } from "react-router-dom"

import { CUSTOMER_SITE_URL, ROUTES } from "@/config/routes"
import { authApi } from "@/features/auth/api/auth.api"
import { WrongDoorNotice } from "@/features/auth/components/wrong-door-notice"

/**
 * A customer's session on the staff dashboard: signed out, not just
 * redirected, and pointed at the site they belong on.
 */
export function CustomerAccountNotice() {
  useEffect(() => {
    // Fire and forget: the server clears the cookies whatever it answers.
    void authApi.logout().catch(() => undefined)
  }, [])

  return (
    <div className="min-h-svh bg-background">
      <WrongDoorNotice
        title="This is the staff dashboard"
        description="Your account is a customer account. We've signed you back out."
        action={
          <div className="flex flex-col gap-2">
            <a
              href={CUSTOMER_SITE_URL}
              className="text-primary-deep hover:text-primary"
            >
              Go to the customer site →
            </a>
            <Link
              to={ROUTES.login}
              reloadDocument
              className="font-normal text-muted-foreground hover:text-foreground"
            >
              Staff sign in
            </Link>
          </div>
        }
      />
    </div>
  )
}
