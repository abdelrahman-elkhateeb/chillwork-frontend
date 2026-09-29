import { NavLink } from "react-router-dom"
import { cn } from "@workspace/ui/lib/utils"

import {
  ADMIN_NAV,
  type AdminNavCount,
} from "@/features/shell/constants/admin-nav.constants"

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
              cn(
                "flex items-center justify-between rounded-[4px] border-l-2 border-transparent px-[11px] py-[9px] text-[13px] text-paper/62 transition-colors hover:bg-paper/6 hover:text-paper",
                item.separated &&
                  "mt-2.5 rounded-none border-t border-t-paper/10 pt-[17px]",
                isActive &&
                  "border-l-primary bg-primary/16 font-semibold text-paper-bright hover:bg-primary/16"
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
