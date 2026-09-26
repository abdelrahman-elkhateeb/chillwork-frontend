import { Link, useLocation } from "react-router-dom"
import { Button } from "@workspace/ui/components/button"

import { FormAlert } from "@/components/form/form-alert"
import { ROUTES } from "@/config/routes"
import { useCurrentUser, useLogout } from "@/features/auth"
import { AccountDetails } from "@/features/account/components/account-details"
import { AccountHeader } from "@/features/account/components/account-header"
import {
  firstName,
  toAccountDetails,
} from "@/features/account/lib/account-details"
import type { AccountLocationState } from "@/features/account/types/account.types"

export function AccountPage() {
  const { user } = useCurrentUser()
  const logout = useLogout()
  const location = useLocation()
  const { welcome } = (location.state ?? {}) as AccountLocationState

  // Rendered behind RequireAuth, so this only guards the type.
  if (!user) {
    return null
  }

  return (
    <div className="min-h-svh bg-background text-foreground">
      <AccountHeader
        onLogout={() => logout.mutate()}
        isLoggingOut={logout.isPending}
      />

      <main className="mx-auto max-w-[640px] px-4 py-10 md:py-14">
        {welcome ? (
          <FormAlert
            tone="success"
            title={`You're in, ${firstName(user.name)}`}
            description="Your account is ready."
            className="mb-8"
          />
        ) : null}

        <h1 className="text-[27px] font-bold">Your account</h1>
        <p className="mt-2.5 text-[15px] text-muted-foreground">
          The details your technician sees when they're on the way.
        </p>

        {user.role === "CUSTOMER" ? (
          <Button
            asChild
            size="xl"
            className="mt-6 w-full rounded-[var(--radius-control)] sm:w-auto"
          >
            <Link to={ROUTES.newRequest}>Request a service visit</Link>
          </Button>
        ) : null}

        <div className="mt-7">
          <AccountDetails details={toAccountDetails(user)} />
        </div>
      </main>
    </div>
  )
}
