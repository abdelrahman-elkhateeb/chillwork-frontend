import { Button } from "@workspace/ui/components/button"

import { CityStrip } from "@/features/landing/components/mockups/dispatcher/city-strip"
import { DecisionsPanel } from "@/features/landing/components/mockups/dispatcher/decisions-panel"
import { DispatcherSidebar } from "@/features/landing/components/mockups/dispatcher/dispatcher-sidebar"
import { RequestsTable } from "@/features/landing/components/mockups/dispatcher/requests-table"
import { StatusBadge } from "@/features/landing/components/mockups/status-badge"
import { DISPATCHER_MOCKUP } from "@/features/landing/constants/dispatcher-mockup.constants"

/**
 * Illustrative dispatcher dashboard. Purely decorative — sized for the
 * desktop hero and cropped by the section's bottom edge on purpose.
 */
export function DispatcherMockup() {
  const { outToday } = DISPATCHER_MOCKUP

  return (
    <div
      aria-hidden="true"
      className="flex h-full overflow-hidden rounded-t-[8px] bg-[#EEF0F0] text-left ring-1 ring-paper/10"
    >
      <DispatcherSidebar />

      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex h-[57px] shrink-0 items-center justify-between border-b border-border bg-surface-sunken px-[18px]">
          <div className="flex items-center gap-2.5">
            <span className="text-[14px] font-semibold text-ink">
              {DISPATCHER_MOCKUP.title}
            </span>
            <StatusBadge tone="info" className="px-2 py-1">
              {DISPATCHER_MOCKUP.unassigned}
            </StatusBadge>
          </div>
          <div className="flex items-center gap-1.5 font-narrow text-[12.5px]">
            {DISPATCHER_MOCKUP.filters.map((filter) => (
              <Button
                key={filter}
                asChild
                variant="outline"
                className="pointer-events-none h-7 rounded-[4px] bg-card px-2.5 text-[12.5px] font-normal text-muted-foreground"
              >
                <span>{filter}</span>
              </Button>
            ))}
            <Button
              asChild
              className="pointer-events-none h-7 rounded-[4px] px-3 font-sans text-[12.5px] font-semibold text-ink"
            >
              <span>{DISPATCHER_MOCKUP.action}</span>
            </Button>
          </div>
        </div>

        <div className="flex h-[162px] shrink-0 border-b border-border">
          <CityStrip />
          <div className="w-[246px] shrink-0 bg-ink px-[18px] pt-4">
            <p className="text-[11px] font-bold tracking-[0.12em] text-paper/50 uppercase">
              {outToday.label}
            </p>
            <p className="mt-1 font-heading text-[42px] leading-none font-bold text-paper-bright">
              {outToday.value}
            </p>
            <p className="mt-2 text-[12.5px] text-paper/70">
              {outToday.caption}
            </p>
            <p className="mt-3.5 flex items-center gap-2 border-t border-paper/15 pt-3.5 text-[12.5px] text-paper-bright">
              <span className="size-2 bg-[#E06455]" />
              {outToday.risk}
            </p>
          </div>
        </div>

        <div className="flex min-h-0 flex-1">
          <RequestsTable />
          <DecisionsPanel />
        </div>
      </div>
    </div>
  )
}
