import { useState } from "react"
import { Outlet, useLocation } from "react-router-dom"
import { MenuIcon, XIcon } from "lucide-react"
import { Button } from "@workspace/ui/components/button"

import { BrandLogo } from "@/components/brand/brand-logo"
import { useCurrentUser } from "@/features/auth"
import { useCompanySettings } from "@/features/settings"
import { AdminNavLinks } from "@/features/shell/components/admin-nav-links"
import { ShellSidebar } from "@/features/shell/components/shell-sidebar"
import { StaffUserMenu } from "@/features/shell/components/staff-user-menu"
import { ADMIN_NAV } from "@/features/shell/constants/admin-nav.constants"
import { useAdminCounts } from "@/features/shell/hooks/use-admin-counts"

function sectionFor(pathname: string): string {
  const match = ADMIN_NAV.find(
    (item) => pathname === item.to || pathname.startsWith(`${item.to}/`)
  )
  return match?.label ?? "Dashboard"
}

/**
 * Persistent sidebar with live counts, built for a laptop. Below `md` the
 * sidebar folds into the ink top bar's menu.
 */
export function AdminShell() {
  const { user } = useCurrentUser()
  const { pathname } = useLocation()
  const settings = useCompanySettings()
  const counts = useAdminCounts()
  const [menuOpen, setMenuOpen] = useState(false)

  if (!user) {
    return null
  }

  const navCounts = {
    waiting: counts.waitingCount,
    technicians: counts.technicianCount,
    outOfStock: counts.outOfStockCount,
  }

  return (
    <div className="flex min-h-svh bg-background text-foreground">
      <ShellSidebar user={user} label={settings.data?.name ?? " "}>
        <AdminNavLinks counts={navCounts} />
      </ShellSidebar>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="bg-ink md:hidden">
          <div className="flex h-14 items-center justify-between px-4">
            <BrandLogo size="sm" />
            <div className="flex items-center gap-1">
              <StaffUserMenu user={user} />
              <Button
                variant="ghost"
                size="icon-lg"
                aria-label={menuOpen ? "Close menu" : "Open menu"}
                aria-expanded={menuOpen}
                onClick={() => setMenuOpen((open) => !open)}
                className="text-paper hover:bg-paper/10 hover:text-paper"
              >
                {menuOpen ? <XIcon /> : <MenuIcon />}
              </Button>
            </div>
          </div>
          {menuOpen ? (
            <div className="border-t border-paper/10 px-2.5 pt-2 pb-3">
              <AdminNavLinks
                counts={navCounts}
                onNavigate={() => setMenuOpen(false)}
              />
            </div>
          ) : null}
        </header>

        <div className="hidden h-14 items-center justify-between border-b border-border bg-card px-7 md:flex">
          <span className="font-narrow text-[13.5px] text-muted-foreground">
            {sectionFor(pathname)}
          </span>
          <span className="font-mono text-[12px] text-[#8A9093]">
            {pathname}
          </span>
        </div>

        <main className="min-w-0 flex-1 px-4 py-6 md:px-7 md:py-[26px]">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
