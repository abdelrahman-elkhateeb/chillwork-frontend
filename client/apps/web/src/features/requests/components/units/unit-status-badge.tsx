import { Badge } from "@workspace/ui/components/badge"

import { UNIT_STATUS_LABELS } from "@/features/requests/constants/request-copy.constants"
import type { UnitStatus } from "@/features/requests/lib/unit-status"

type Props = {
  status: UnitStatus
  /** Unfinished units only turn red once the customer tries to move on. */
  showError: boolean
}

export function UnitStatusBadge({ status, showError }: Props) {
  const variant =
    status === "ready" ? "success" : showError ? "destructive" : "secondary"

  return (
    <Badge
      variant={variant}
      className="px-2 py-[3px] text-[12px] leading-normal tracking-[0.05em]"
    >
      {UNIT_STATUS_LABELS[status]}
    </Badge>
  )
}
