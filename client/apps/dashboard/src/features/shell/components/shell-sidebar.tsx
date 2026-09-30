import type { ReactNode } from "react"

import { BrandLogo } from "@/components/brand/brand-logo"
import type { AuthUser } from "@/features/auth"
import { StaffUserMenu } from "@/features/shell/components/staff-user-menu"

type Props = {
  user: AuthUser
  /** Small caps under the logo (the admin's company name). */
  label?: ReactNode
  /** The nav links. */
  children: ReactNode
}

/** The ink sidebar both roles get from `md` up. */
export function ShellSidebar({ user, label, children }: Props) {
  return (
    <aside className="sticky top-0 hidden h-svh w-[196px] shrink-0 flex-col bg-ink py-[18px] md:flex">
      <div className="border-b border-paper/10 px-4 pb-3.5">
        <BrandLogo size="sm" />
        {label ? (
          <div className="mt-3.5 truncate font-narrow text-[12px] font-bold tracking-[0.1em] text-paper/40 uppercase">
            {label}
          </div>
        ) : null}
      </div>
      <div className="flex-1 overflow-y-auto px-2.5 py-3">{children}</div>
      <div className="border-t border-paper/10 px-3 pt-3">
        <StaffUserMenu user={user} withName className="w-full" />
      </div>
    </aside>
  )
}
