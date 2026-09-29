import { Link } from "react-router-dom"
import { Button } from "@workspace/ui/components/button"

import { ROUTES, pathTo } from "@/config/routes"
import { MY_REQUESTS_COPY } from "@/features/requests/constants/my-requests-copy.constants"
import { useMyRequest } from "@/features/requests/hooks/use-my-requests"
import {
  countOf,
  currentVisit,
  liveHeadline,
  slotLine,
  whenLabel,
} from "@/features/requests/lib/request-display"
import type { CustomerRequestSummary } from "@/features/requests/types/customer-request.types"

/**
 * The one request that matters today gets a card with a name and a time
 * in it. The list has neither, so the card reads the detail — the same
 * query "See what is happening" opens, so that page is instant.
 */
export function LiveRequestCard({
  request,
}: {
  request: CustomerRequestSummary
}) {
  const detail = useMyRequest(request.requestId)
  const visit = detail.data ? currentVisit(detail.data) : undefined
  const facts = [
    visit ? slotLine(visit) : null,
    countOf(request.deviceCount, "unit"),
    request.address,
  ].filter(Boolean)

  return (
    <li className="overflow-hidden rounded-[7px] border border-primary bg-card">
      <div className="flex items-center justify-between gap-3 border-b border-primary/30 bg-[#FFF3EC] px-3.5 py-3">
        <span className="font-mono text-[14px] font-semibold">
          {request.reference}
        </span>
        <span className="text-[11.5px] font-bold tracking-[0.05em] text-primary-deep uppercase">
          {detail.data ? whenLabel(visit) : null}
        </span>
      </div>
      <div className="px-3.5 py-[13px]">
        <div className="text-[15.5px] font-bold">
          {liveHeadline(detail.data, request)}
        </div>
        <div className="mt-1 font-narrow text-[13.5px] leading-[1.5] text-muted-foreground">
          {facts.join(" · ")}
        </div>
        <Button
          asChild
          variant="outline"
          className="mt-3 h-11 w-full bg-white text-[13.5px] font-semibold"
        >
          <Link to={pathTo(ROUTES.request, { requestId: request.requestId })}>
            {MY_REQUESTS_COPY.list.seeWhatsHappening}
          </Link>
        </Button>
      </div>
    </li>
  )
}
