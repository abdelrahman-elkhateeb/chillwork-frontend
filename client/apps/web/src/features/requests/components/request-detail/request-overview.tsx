import { formatDate } from "@/lib/format/dates"
import { formatMoney } from "@/lib/format/money"
import { RequestProgressBadge } from "@/features/requests/components/my-requests/request-progress-badge"
import { MY_REQUESTS_COPY } from "@/features/requests/constants/my-requests-copy.constants"
import type { CustomerRequest } from "@/features/requests/types/customer-request.types"

type Props = {
  request: CustomerRequest
  /** When the last visit finished, once the timeline has loaded. */
  finishedAt?: string
}

/** Reference, where, when — and, once invoiced, what it came to. */
export function RequestOverview({ request, finishedAt }: Props) {
  const invoices = request.visits.flatMap((visit) =>
    visit.invoice ? [visit.invoice] : []
  )
  const total = invoices.reduce((sum, invoice) => sum + invoice.totalMinor, 0)
  const reported = `Reported ${formatDate(request.createdAt)}`
  const dates =
    request.progress === "COMPLETED" && finishedAt
      ? `${reported}, finished ${formatDate(finishedAt)}`
      : reported

  return (
    <div className="flex flex-wrap items-start justify-between gap-4 border-b border-[#E4E6E6] px-[18px] py-4">
      <div className="min-w-0">
        <div className="flex items-center gap-[11px]">
          <h1 className="font-mono text-[20px] font-semibold tracking-normal normal-case">
            {request.reference}
          </h1>
          <RequestProgressBadge progress={request.progress} />
        </div>
        <p className="mt-[7px] font-narrow text-[13.5px] leading-[1.5] text-muted-foreground">
          {request.address} · {request.contactPhone}
          <br />
          {dates}
        </p>
      </div>
      {invoices.length > 0 ? (
        <div className="sm:text-right">
          <div className="font-narrow text-[11.5px] font-bold tracking-[0.08em] text-muted-foreground uppercase">
            {MY_REQUESTS_COPY.detail.whatItCameTo}
          </div>
          <div className="mt-[3px] font-mono text-[24px] font-semibold">
            {formatMoney(total, invoices[0]?.currency ?? null)}
          </div>
        </div>
      ) : null}
    </div>
  )
}
