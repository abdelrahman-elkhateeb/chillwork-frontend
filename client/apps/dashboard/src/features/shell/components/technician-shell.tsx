import { NavLink, Outlet } from "react-router-dom"
import { cn } from "@workspace/ui/lib/utils"

import { ROUTES } from "@/config/routes"

const TABS = [
  { label: "Visits", to: ROUTES.visits },
  { label: "Me", to: ROUTES.me },
] as const

/**
 * 390 first: a single column and a bottom bar with two tabs, nothing else.
 * Same app, origin and cookies as the admin's — only the layout differs.
 */
export function TechnicianShell() {
  return (
    <div className="min-h-svh bg-[#E4E6E6]">
      <div className="mx-auto flex min-h-svh max-w-[480px] flex-col bg-background">
        <main className="flex min-w-0 flex-1 flex-col pb-[52px]">
          <Outlet />
        </main>

        <nav
          aria-label="Technician"
          className="fixed inset-x-0 bottom-0 z-20 mx-auto flex max-w-[480px] border-t border-border bg-card"
        >
          {TABS.map((tab) => (
            <NavLink
              key={tab.to}
              to={tab.to}
              className={({ isActive }) =>
                cn(
                  "flex h-[52px] flex-1 items-center justify-center font-narrow text-[12.5px] text-[#8A9093]",
                  isActive && "font-bold text-primary-deep"
                )
              }
            >
              {tab.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </div>
  )
}
