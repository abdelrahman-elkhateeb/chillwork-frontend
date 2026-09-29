import { Badge } from "@workspace/ui/components/badge"

import { REQUEST_PROGRESS_LABELS } from "@/features/requests/constants/my-requests-copy.constants"
import type { RequestProgress } from "@/features/requests/types/customer-request.types"

const VARIANTS = {
  SUBMITTED: "outline",
  SCHEDULED: "info",
  IN_PROGRESS: "progress",
  COMPLETED: "success",
} as const satisfies Record<RequestProgress, string>

export function RequestProgressBadge({
  progress,
  className,
}: {
  progress: RequestProgress
  className?: string
}) {
  return (
    <Badge variant={VARIANTS[progress]} className={className}>
      {REQUEST_PROGRESS_LABELS[progress]}
    </Badge>
  )
}
