import { Link } from "react-router-dom"

import { formatDate } from "@/lib/format/dates"
import { ROUTES, pathTo } from "@/config/routes"
import { RequestProgressBadge } from "@/features/requests/components/my-requests/request-progress-badge"
import { MY_REQUESTS_COPY } from "@/features/requests/constants/my-requests-copy.constants"
import { summaryHeadline } from "@/features/requests/lib/request-display"
import type { CustomerRequestSummary } from "@/features/requests/types/customer-request.types"

/** One line per request that isn't today's — she has a dozen, not hundreds. */
export function RequestRow({ request }: { request: CustomerRequestSummary }) {
  return (
    <li className="flex items-center justify-between gap-4 rounded-[7px] border border-border bg-card px-3.5 py-[13px]">
      <div className="min-w-0">
        <div className="flex items-center gap-2.5">
          <span className="font-mono text-[13px] font-semibold">
            {request.reference}
          </span>
          <RequestProgressBadge progress={request.progress} />
        </div>
        <div className="mt-1.5 text-[14.5px] font-semibold">
          {summaryHeadline(request)}
        </div>
        <div className="mt-0.5 truncate font-narrow text-[13px] text-muted-foreground">
          {formatDate(request.createdAt)} · {request.address}
        </div>
      </div>
      <Link
        to={pathTo(ROUTES.request, { requestId: request.requestId })}
        className="shrink-0 text-[13px] font-bold text-primary-deep hover:underline"
        aria-label={`${MY_REQUESTS_COPY.list.open} ${request.reference}`}
      >
        {MY_REQUESTS_COPY.list.open}
      </Link>
    </li>
  )
}
