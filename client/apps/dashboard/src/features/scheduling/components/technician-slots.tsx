import { Avatar, AvatarFallback } from "@workspace/ui/components/avatar"
import { Button } from "@workspace/ui/components/button"
import { Skeleton } from "@workspace/ui/components/skeleton"
import { cn } from "@workspace/ui/lib/utils"

import { initials } from "@/lib/format/names"
import type { Technician } from "@/features/technicians"
import { DAY_SLOTS } from "@/features/scheduling/constants/slots.constants"
import type { SlotState } from "@/features/scheduling/lib/slots"
import type { Slot } from "@/features/scheduling/types/scheduling.types"

type Props = {
  technician: Technician
  /** `null` while this technician's day is loading. */
  states: Record<string, SlotState> | null
  stopsThatDay: number
  selectedSlotId: string | null
  onSelect: (slot: Slot) => void
  highlight?: boolean
}

/**
 * One technician's day in four windows. A taken slot is hatched, not
 * hidden — the dispatcher sees the day filling up, and who by.
 */
export function TechnicianSlots({
  technician,
  states,
  stopsThatDay,
  selectedSlotId,
  onSelect,
  highlight = false,
}: Props) {
  return (
    <div className="overflow-hidden rounded-[6px] border border-border">
      <div className="flex items-center gap-2.5 border-b border-[#E4E6E6] bg-[#F2F3F3] px-[13px] py-2.5">
        <Avatar className="size-[30px] after:hidden">
          <AvatarFallback
            className={cn(
              "text-[11.5px] font-bold text-paper-bright",
              highlight ? "bg-ink" : "bg-muted-foreground"
            )}
          >
            {initials(technician.name)}
          </AvatarFallback>
        </Avatar>
        <div className="min-w-0 flex-1">
          <div className="truncate text-[13.5px] font-bold">
            {technician.name}
          </div>
          <div className="font-narrow text-[12px] text-muted-foreground">
            {states === null
              ? "Checking the day…"
              : stopsThatDay === 0
                ? "Free all day"
                : `${stopsThatDay} ${stopsThatDay === 1 ? "stop" : "stops"} already`}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-[7px] px-[13px] py-[11px]">
        {DAY_SLOTS.map((slot) => {
          if (states === null) {
            return <Skeleton key={slot.id} className="h-[52px] rounded-[5px]" />
          }
          const state = states[slot.id] ?? "free"
          const selected = selectedSlotId === slot.id

          if (state !== "free") {
            return (
              <div
                key={slot.id}
                aria-label={`${slot.label} ${state === "taken" ? "taken" : "already passed"}`}
                className="flex h-[52px] flex-col items-center justify-center rounded-[5px] border border-line-strong bg-hatch-muted"
              >
                <span className="font-mono text-[12.5px] font-semibold text-[#8A9093]">
                  {slot.label}
                </span>
                <span className="font-narrow text-[10.5px] tracking-[0.05em] text-[#8A9093] uppercase">
                  {state === "taken" ? "Taken" : "Past"}
                </span>
              </div>
            )
          }

          return (
            <Button
              key={slot.id}
              type="button"
              variant={selected ? "default" : "outline"}
              aria-pressed={selected}
              onClick={() => onSelect(slot)}
              className={cn(
                "h-[52px] rounded-[5px] font-mono text-[12.5px] font-semibold",
                selected ? "border-2 border-primary" : "bg-white"
              )}
            >
              {slot.label}
            </Button>
          )
        })}
      </div>
    </div>
  )
}
