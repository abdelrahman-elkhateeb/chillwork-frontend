import { Badge } from "@workspace/ui/components/badge"

import { VISIT_STATUS_LABELS } from "@/features/visits/constants/visit-copy.constants"
import type { VisitStatus } from "@/features/visits/types/visit.types"

const VARIANTS = {
  SCHEDULED: "info",
  IN_PROGRESS: "progress",
  COMPLETED: "success",
  CANCELLED: "excluded",
} as const satisfies Record<VisitStatus, string>

export function VisitStatusBadge({ status }: { status: VisitStatus }) {
  return (
    <Badge
      variant={VARIANTS[status]}
      className="px-2 py-[3px] text-[11.5px] leading-normal tracking-[0.06em]"
    >
      {VISIT_STATUS_LABELS[status]}
    </Badge>
  )
}
