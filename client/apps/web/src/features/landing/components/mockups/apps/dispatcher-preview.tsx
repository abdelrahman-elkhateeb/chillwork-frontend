import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@workspace/ui/components/alert"
import { Card } from "@workspace/ui/components/card"
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
      <Card className="block rounded-[6px] border-secondary px-3.5 py-3">
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
      </Card>

      <Alert
        variant="destructive"
        role={undefined}
        className="rounded-[6px] border-secondary border-l-destructive bg-card px-3.5 py-[11px]"
      >
        <AlertTitle className="text-[12.5px] font-bold">
          {DISPATCHER_PREVIEW.refusal.title}
        </AlertTitle>
        <AlertDescription className="text-[12px] leading-[normal]">
          {DISPATCHER_PREVIEW.refusal.body}
        </AlertDescription>
      </Alert>
    </div>
  )
}
