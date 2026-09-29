import { Badge } from "@workspace/ui/components/badge"
import { cn } from "@workspace/ui/lib/utils"

import type { Standing } from "@/features/requests/lib/request-standing"

/** Only "Waiting for a visit" is orange — it is the one that is his job. */
export function StandingBadge({
  standing,
  className,
}: {
  standing: Standing
  className?: string
}) {
  return (
    <Badge
      variant={standing.tone}
      className={cn(
        "px-2 py-[3px] font-sans text-[12px] leading-normal tracking-[0.05em]",
        className
      )}
    >
      {standing.label}
    </Badge>
  )
}
