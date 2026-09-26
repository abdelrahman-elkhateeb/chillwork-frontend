import { cn } from "@workspace/ui/lib/utils"

import { UNIT_STATUS_LABELS } from "@/features/requests/constants/request-copy.constants"
import type { UnitStatus } from "@/features/requests/lib/unit-status"

type Props = {
  status: UnitStatus
  /** Unfinished units only turn red once the customer tries to move on. */
  showError: boolean
}

export function UnitStatusBadge({ status, showError }: Props) {
  const isReady = status === "ready"

  return (
    <span
      className={cn(
        "rounded-[3px] border px-2 py-[3px] font-narrow text-[12px] font-bold tracking-[0.05em] whitespace-nowrap uppercase",
        isReady && "border-[#17876A]/35 bg-[#17876A]/12 text-[#11705A]",
        !isReady &&
          showError &&
          "border-destructive/32 bg-destructive/9 text-[#8E1913]",
        !isReady &&
          !showError &&
          "border-border bg-secondary text-muted-foreground"
      )}
    >
      {UNIT_STATUS_LABELS[status]}
    </span>
  )
}
