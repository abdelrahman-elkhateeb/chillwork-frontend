import { NavLink } from "react-router-dom"
import { cn } from "@workspace/ui/lib/utils"

import {
  ADMIN_NAV,
  type AdminNavCount,
} from "@/features/shell/constants/admin-nav.constants"
import { sidebarLinkClass } from "@/features/shell/lib/sidebar-link-class"

export type AdminCounts = Record<AdminNavCount, number | null>

function CountBadge({ kind, value }: { kind: AdminNavCount; value: number }) {
  if (kind === "outOfStock") {
    return value > 0 ? (
      <span className="font-mono text-[11px] text-[#E07A6E]">{value} out</span>
    ) : null
  }
  return (
    <span
      className={cn(
        "font-mono text-[11px]",
        kind === "waiting" && value > 0 ? "text-primary" : "text-paper/35"
      )}
    >
      {value}
    </span>
  )
}

/** The sidebar's links, with the live counts next to them. */
export function AdminNavLinks({
  counts,
  onNavigate,
}: {
  counts: AdminCounts
  onNavigate?: () => void
}) {
  return (
    <nav aria-label="Dashboard" className="flex flex-col gap-0.5">
      {ADMIN_NAV.map((item) => {
        const count = item.count ? counts[item.count] : null
        return (
          <NavLink
            key={item.to}
            to={item.to}
            onClick={onNavigate}
            className={({ isActive }) =>
              sidebarLinkClass(
                isActive,
                item.separated &&
                  "mt-2.5 rounded-none border-t border-t-paper/10 pt-[17px]"
              )
            }
          >
            <span>{item.label}</span>
            {item.count && count !== null ? (
              <CountBadge kind={item.count} value={count} />
            ) : null}
          </NavLink>
        )
      })}
    </nav>
  )
}
