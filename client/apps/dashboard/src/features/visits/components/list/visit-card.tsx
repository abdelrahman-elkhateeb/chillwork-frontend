import { Link } from "react-router-dom"
import { PhoneIcon } from "lucide-react"
import { Button } from "@workspace/ui/components/button"
import { Card } from "@workspace/ui/components/card"
import { cn } from "@workspace/ui/lib/utils"

import { ROUTES, pathTo } from "@/config/routes"
import { formatDate, formatTimeRange } from "@/lib/format/dates"
import { pluralUnits } from "@/lib/format/names"
import { VisitStatusBadge } from "@/features/visits/components/shared/visit-status-badge"
import type { VisitListItem } from "@/features/visits/types/visit.types"

type Props = {
  visit: VisitListItem
  /** The one that matters right now: bigger, with the call button. */
  featured?: boolean
  featuredLabel?: string
  showDate?: boolean
}

function subtitle(visit: VisitListItem): string {
  const units = visit.devices.length
  const where = visit.address ?? ""
  return units === 1 && visit.devices[0]
    ? `${where} · ${visit.devices[0].label}`
    : `${where} · ${pluralUnits(units)}`
}

export function VisitCard({
  visit,
  featured = false,
  featuredLabel = "Next",
  showDate = false,
}: Props) {
  const href = pathTo(ROUTES.visit, { visitId: visit.id })
  const time = formatTimeRange(visit.startAt, visit.endAt, visit.timezone)
  const customer = visit.customer.name ?? "Customer"

  if (featured) {
    return (
      <Card className="gap-0 rounded-[6px] border-l-[3px] border-l-primary px-[15px] py-3.5">
        <div className="flex items-center justify-between">
          <span className="font-narrow text-[11.5px] font-bold tracking-[0.08em] text-primary-deep uppercase">
            {featuredLabel}
          </span>
          <span className="font-mono text-[12.5px] font-semibold">{time}</span>
        </div>
        <div className="mt-2 text-[17px] font-bold">{customer}</div>
        <div className="mt-[3px] truncate font-narrow text-[13.5px] text-muted-foreground">
          {subtitle(visit)}
        </div>
        <div className="mt-3 flex gap-2">
          <Button
            asChild
            className="h-12 flex-1 text-[14.5px] font-semibold"
          >
            <Link to={href}>Open visit</Link>
          </Button>
          {visit.customer.phone ? (
            <Button
              asChild
              variant="outline"
              aria-label={`Call ${customer}`}
              className="size-12 bg-white"
            >
              <a href={`tel:${visit.customer.phone}`}>
                <PhoneIcon />
              </a>
            </Button>
          ) : null}
        </div>
      </Card>
    )
  }

  return (
    <Link to={href} className="block">
      <Card
        className={cn(
          "gap-0 rounded-[6px] px-[15px] py-[13px] transition-colors hover:border-line-strong",
          visit.status === "CANCELLED" && "opacity-70"
        )}
      >
        <div className="flex items-center justify-between gap-3">
          <span className="truncate text-[15px] font-semibold">{customer}</span>
          <span className="shrink-0 font-mono text-[12px] text-muted-foreground">
            {showDate ? `${formatDate(visit.startAt, visit.timezone)} · ` : ""}
            {time}
          </span>
        </div>
        <div className="mt-[3px] truncate font-narrow text-[13px] text-muted-foreground">
          {subtitle(visit)}
        </div>
        <div className="mt-2.5">
          <VisitStatusBadge status={visit.status} />
        </div>
      </Card>
    </Link>
  )
}
