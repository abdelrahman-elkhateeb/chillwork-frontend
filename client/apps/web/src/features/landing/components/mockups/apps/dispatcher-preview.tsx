import { cn } from "@workspace/ui/lib/utils"

import { DISPATCHER_PREVIEW } from "@/features/landing/constants/apps.constants"
import type { ScheduleSlotKind } from "@/features/landing/types/mockup.types"

const SLOT_CLASSES: Record<ScheduleSlotKind, string> = {
  job: "bg-ink",
  free: "bg-[#E4E6E6]",
  blocked: "bg-hatch border border-destructive/60",
}

/** The day board refusing a clashing assignment. */
export function DispatcherPreview() {
  return (
    <div className="flex flex-col gap-[9px] font-narrow">
      <div className="rounded-[6px] border border-secondary bg-card px-3.5 py-3">
        <p className="text-[12px] font-semibold text-ink">
          {DISPATCHER_PREVIEW.date}
        </p>
        <ul className="mt-2 flex flex-col gap-2">
          {DISPATCHER_PREVIEW.schedule.map((row) => (
            <li key={row.technician} className="flex items-center gap-2">
              <span className="w-[66px] shrink-0 text-[12px] text-muted-foreground">
                {row.technician}
              </span>
              <span className="flex h-4 flex-1 gap-[3px]">
                {row.slots.map((slot, index) => (
                  <span
                    key={index}
                    style={{ flexGrow: slot.span, flexBasis: 0 }}
                    className={cn("rounded-[1.5px]", SLOT_CLASSES[slot.kind])}
                  />
                ))}
              </span>
            </li>
          ))}
        </ul>
      </div>

      <div className="rounded-[6px] border border-l-[3px] border-secondary border-l-destructive bg-card px-3.5 py-[11px]">
        <p className="text-[12.5px] font-bold text-[#8E1913]">
          {DISPATCHER_PREVIEW.refusal.title}
        </p>
        <p className="mt-1 text-[12px] text-muted-foreground">
          {DISPATCHER_PREVIEW.refusal.body}
        </p>
      </div>
    </div>
  )
}
