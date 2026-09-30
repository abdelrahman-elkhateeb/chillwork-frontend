import { NavLink, Outlet } from "react-router-dom"
import { cn } from "@workspace/ui/lib/utils"

import { useCurrentUser } from "@/features/auth"
import { ShellSidebar } from "@/features/shell/components/shell-sidebar"
import { TECHNICIAN_NAV } from "@/features/shell/constants/technician-nav.constants"
import { sidebarLinkClass } from "@/features/shell/lib/sidebar-link-class"

/**
 * 390 first: a single column and a bottom bar with two tabs, nothing else.
 * From `md` up (a tablet in the van, a laptop at the office) the tabs move
 * into the same ink sidebar the admin has, and each screen widens its own
 * content. Same app, origin and cookies as the admin's.
 */
export function TechnicianShell() {
  const { user } = useCurrentUser()

  if (!user) {
    return null
  }

  return (
    <div className="min-h-svh bg-[#E4E6E6] md:flex md:bg-background">
      <ShellSidebar user={user}>
        <nav aria-label="Technician" className="flex flex-col gap-0.5">
          {TECHNICIAN_NAV.map((tab) => (
            <NavLink
              key={tab.to}
              to={tab.to}
              className={({ isActive }) => sidebarLinkClass(isActive)}
            >
              {tab.label}
            </NavLink>
          ))}
        </nav>
      </ShellSidebar>

      <div className="mx-auto flex min-h-svh max-w-[480px] flex-col bg-background md:mx-0 md:max-w-none md:min-w-0 md:flex-1">
        <main className="flex min-w-0 flex-1 flex-col pb-[52px] md:pb-0">
          <Outlet />
        </main>

        <nav
          aria-label="Technician"
          className="fixed inset-x-0 bottom-0 z-20 mx-auto flex max-w-[480px] border-t border-border bg-card md:hidden"
        >
          {TECHNICIAN_NAV.map((tab) => (
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
