import { Link, Outlet } from "react-router-dom"

import { WrongDoorNotice } from "@/features/auth/components/wrong-door-notice"
import { useCurrentUser } from "@/features/auth/hooks/use-current-user"
import { ROLE_HOME } from "@/features/auth/lib/role-home"
import type { StaffRole } from "@/features/auth/types/auth.types"

const WRONG_AREA = {
  // A technician on an office page (/parts, /technicians, …).
  ADMIN: {
    title: "Not part of your job",
    description:
      "Parts pricing, stock and the team belong to the office. You pick parts from inside a visit.",
    back: "Back to my visits →",
  },
  // An admin on a technician's phone screens.
  TECHNICIAN: {
    title: "This screen is for technicians",
    description:
      "It is the technician's view of his own visits. Everything here is also on the requests board.",
    back: "Back to the dashboard →",
  },
} as const satisfies Record<StaffRole, object>

/**
 * Rendered inside RequireStaff. Stays signed in — right app, wrong page —
 * and the link was never in their navigation to begin with.
 */
export function RequireRole({ role }: { role: StaffRole }) {
  const { user } = useCurrentUser()

  if (!user || user.role === "CUSTOMER") {
    return null
  }

  if (user.role !== role) {
    const copy = WRONG_AREA[role]
    return (
      <div className="min-h-svh bg-background">
        <WrongDoorNotice
          hatched
          title={copy.title}
          description={copy.description}
          action={
            <Link
              to={ROLE_HOME[user.role]}
              className="text-primary-deep hover:text-primary"
            >
              {copy.back}
            </Link>
          }
        />
      </div>
    )
  }

  return <Outlet />
}
