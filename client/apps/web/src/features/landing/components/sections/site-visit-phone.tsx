import { cn } from "@workspace/ui/lib/utils"

import { SITE_VISIT } from "@/features/landing/constants/field.constants"
import type { SiteUnitStatus } from "@/features/landing/types/landing.types"

const UNIT_CLASSES: Record<SiteUnitStatus, { card: string; status: string }> = {
  done: { card: "border-border", status: "text-[#11705A]" },
  checking: {
    card: "border-[rgba(25,162,196,0.5)] bg-[rgba(25,162,196,0.09)]",
    status: "text-[#145A75]",
  },
}

const STATUS_LABELS: Record<SiteUnitStatus, string> = {
  done: "Done",
  checking: "Checking",
}

/** Phone mockup of the technician's visit screen. Purely illustrative. */
export function SiteVisitPhone() {
  return (
    <div
      aria-hidden="true"
      className="w-full rounded-[20px] bg-ink p-2 md:w-[308px] md:rounded-[22px] md:p-[9px]"
    >
      <div className="overflow-hidden rounded-[14px] bg-card md:rounded-[15px]">
        <div className="border-b border-border bg-surface-sunken px-3.5 py-[13px] md:px-4 md:pt-[15px]">
          <p className="text-[12px] font-semibold tracking-[0.06em] text-muted-foreground uppercase md:text-[12.5px]">
            {SITE_VISIT.time}
          </p>
          <p className="mt-1 text-[15px] font-semibold text-ink md:mt-[5px] md:text-[15.5px]">
            {SITE_VISIT.customer}
          </p>
          <p className="mt-0.5 hidden text-[13px] text-muted-foreground md:block">
            {SITE_VISIT.summary}
          </p>
        </div>

        <div className="px-3.5 py-[13px] md:px-4 md:py-3.5">
          <ul className="flex flex-col gap-2">
            {SITE_VISIT.units.map((unit) => (
              <li
                key={unit.name}
                className={cn(
                  "rounded-[5px] border px-3 py-[11px] md:py-3",
                  UNIT_CLASSES[unit.status].card
                )}
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[13px] font-semibold text-ink md:text-[13.5px]">
                    <span className="md:hidden">{unit.mobileName}</span>
                    <span className="hidden md:inline">{unit.name}</span>
                  </span>
                  <span
                    className={cn(
                      "text-[10.5px] font-bold tracking-[0.05em] uppercase md:text-[11px]",
                      UNIT_CLASSES[unit.status].status
                    )}
                  >
                    {STATUS_LABELS[unit.status]}
                  </span>
                </div>
                <p className="mt-[5px] text-[12.5px] leading-[1.45] text-muted-foreground">
                  {unit.note}
                </p>
              </li>
            ))}
          </ul>
        </div>

        <div className="px-3.5 pb-3.5 md:px-4 md:pb-4">
          <div className="flex h-[50px] items-center justify-center rounded-[6px] bg-primary text-[15px] font-semibold text-ink">
            {SITE_VISIT.action}
          </div>
          <p className="mt-2.5 hidden text-center text-[12px] text-muted-foreground md:block">
            {SITE_VISIT.actionHint}
          </p>
        </div>
      </div>
    </div>
  )
}
