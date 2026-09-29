import { Badge } from "@workspace/ui/components/badge"

import type { TechnicianStanding } from "@/features/technicians/lib/technician-standing"

export function TechnicianStandingBadge({
  standing,
}: {
  standing: TechnicianStanding
}) {
  return (
    <Badge
      variant={standing.tone}
      className="px-[7px] py-[3px] font-sans text-[11.5px] leading-normal tracking-[0.05em]"
    >
      {standing.label}
    </Badge>
  )
}
