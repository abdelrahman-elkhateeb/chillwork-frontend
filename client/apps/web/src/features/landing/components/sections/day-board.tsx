import { cn } from "@workspace/ui/lib/utils"

import { DAY_BOARD } from "@/features/landing/constants/dispatch.constants"
import type { DayBoardSlotKind } from "@/features/landing/types/landing.types"

const SLOT_CLASSES: Record<DayBoardSlotKind, string> = {
  job: "bg-ink font-medium text-paper/[0.92]",
  free: "bg-secondary text-muted-foreground",
  blocked:
    "border-[1.5px] border-destructive bg-destructive/[0.08] font-bold text-[#8E1913]",
}

/** One day of every technician's schedule; a clashing booking shows as blocked. */
export function DayBoard() {
  return (
    <div className="overflow-hidden rounded-[var(--radius-card)] border border-border bg-card">
      <div className="flex items-center justify-between border-b border-border bg-surface-sunken px-5 py-3.5">
        <span className="text-[14px] font-bold tracking-[-0.01em] text-ink">
          {DAY_BOARD.date}
        </span>
        <span className="text-[13px] text-muted-foreground">
          {DAY_BOARD.summary}
        </span>
      </div>

      <ul className="px-5 pt-1 pb-[18px]">
        {DAY_BOARD.rows.map((row) => (
          <li
            key={row.technician}
            className="flex items-center gap-4 border-b border-secondary py-[13px] last:border-b-0"
          >
            <span className="w-24 shrink-0 text-[14px] font-semibold text-ink">
              {row.technician}
            </span>
            <div className="flex min-w-0 flex-1 gap-1">
              {row.slots.map((slot, index) => (
                <span
                  key={index}
                  style={{ flexGrow: slot.span }}
                  className={cn(
                    "flex h-7 min-w-0 items-center truncate rounded-[3px] pl-2.5 text-[11.5px]",
                    SLOT_CLASSES[slot.kind]
                  )}
                >
                  {slot.label}
                </span>
              ))}
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
