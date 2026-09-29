import { Link, useParams } from "react-router-dom"
import { ArrowLeftIcon } from "lucide-react"
import { Button } from "@workspace/ui/components/button"
import { cn } from "@workspace/ui/lib/utils"

import { ErrorState } from "@/components/states/error-state"
import { NotFoundState } from "@/components/states/not-found-state"
import { DetailSkeleton } from "@/components/states/skeletons"
import { isNotFoundError } from "@/lib/api/api-error"
import { ROUTES } from "@/config/routes"
import { CustomerFrame } from "@/features/requests/components/layout/customer-frame"
import { BillCard } from "@/features/requests/components/request-detail/bill-card"
import { RequestOverview } from "@/features/requests/components/request-detail/request-overview"
import {
  RequestTimeline,
  RequestTimelineSkeleton,
} from "@/features/requests/components/request-detail/request-timeline"
import { UnitResultCard } from "@/features/requests/components/request-detail/unit-result-card"
import { MY_REQUESTS_COPY } from "@/features/requests/constants/my-requests-copy.constants"
import {
  useMyRequest,
  useRequestTimeline,
} from "@/features/requests/hooks/use-my-requests"
import {
  finishedAt,
  inSentence,
  toTimelineLines,
} from "@/features/requests/lib/request-display"
import { toReportAgainState } from "@/features/requests/lib/report-again"
import type { CustomerRequest } from "@/features/requests/types/customer-request.types"

const COPY = MY_REQUESTS_COPY.detail

const PANEL = "overflow-hidden rounded-[8px] border border-border bg-card"

/** `/requests/:requestId` — one request, unit by unit, and what happened. */
export function RequestPage() {
  return (
    <CustomerFrame>
      {() => (
        <main className="mx-auto max-w-[1040px] px-4 py-6 pb-16 md:px-8">
          <Link
            to={ROUTES.requests}
            className="inline-flex items-center gap-1.5 text-[13px] font-bold text-primary-deep hover:underline"
          >
            <ArrowLeftIcon className="size-3.5" />
            {COPY.back}
          </Link>
          <RequestDetail />
        </main>
      )}
    </CustomerFrame>
  )
}

function RequestDetail() {
  const { requestId = "" } = useParams()
  const request = useMyRequest(requestId)

  if (request.isPending) {
    return <DetailSkeleton className={cn("mt-4", PANEL)} />
  }

  if (request.isError) {
    return isNotFoundError(request.error) ? (
      <NotFoundState
        title={COPY.notFound}
        backTo={ROUTES.requests}
        backLabel={COPY.back}
        className={cn("mt-4", PANEL)}
      />
    ) : (
      <ErrorState
        error={request.error}
        onRetry={() => void request.refetch()}
        className={cn("mt-4", PANEL)}
      />
    )
  }

  return <RequestDetailBody request={request.data} />
}

function RequestDetailBody({ request }: { request: CustomerRequest }) {
  const timeline = useRequestTimeline(request.requestId)
  const visits = new Map(request.visits.map((v) => [v.visitId, v]))
  const invoiced = request.visits.flatMap((visit) =>
    visit.invoice ? [{ ...visit, invoice: visit.invoice }] : []
  )
  const notFixed = request.devices.filter(
    (device) => device.progress === "NOT_REPAIRED"
  )

  return (
    <div className={cn("mt-4 flex flex-col", PANEL)}>
      <RequestOverview
        request={request}
        finishedAt={finishedAt(timeline.data)}
      />

      <div className="flex flex-col md:flex-row">
        <section
          aria-labelledby="units-heading"
          className="min-w-0 flex-1 px-[18px] py-[15px] md:border-r md:border-[#E4E6E6]"
        >
          <SectionLabel id="units-heading">{COPY.unitByUnit}</SectionLabel>
          <div className="mt-[9px] flex flex-col gap-[11px]">
            {request.devices.map((device) => (
              <UnitResultCard
                key={device.clientDeviceId}
                device={device}
                visit={device.visitId ? visits.get(device.visitId) : undefined}
              />
            ))}
          </div>

          {invoiced.length > 0 ? (
            <>
              <SectionLabel className="mt-[15px]">{COPY.bill}</SectionLabel>
              <div className="mt-[9px] flex flex-col gap-[11px]">
                {invoiced.map((visit) => (
                  <BillCard
                    key={visit.visitId}
                    request={request}
                    visit={visit}
                  />
                ))}
              </div>
            </>
          ) : null}
        </section>

        <section
          aria-labelledby="timeline-heading"
          className="border-t border-[#E4E6E6] bg-[#F5F6F6] px-[18px] py-[15px] md:w-[388px] md:shrink-0 md:border-t-0"
        >
          <SectionLabel id="timeline-heading">{COPY.timeline}</SectionLabel>
          {timeline.isPending ? (
            <RequestTimelineSkeleton />
          ) : timeline.isError ? (
            <ErrorState
              error={timeline.error}
              onRetry={() => void timeline.refetch()}
              className="px-0 py-6"
            />
          ) : (
            <RequestTimeline lines={toTimelineLines(timeline.data, request)} />
          )}

          {notFixed.map((device) => (
            <Button
              key={device.clientDeviceId}
              asChild
              variant="outline"
              className="mt-3.5 h-[46px] w-full bg-white text-[14px] font-semibold"
            >
              <Link
                to={ROUTES.newRequest}
                state={toReportAgainState(request, device)}
              >
                {COPY.reportAgain(inSentence(device.label))}
              </Link>
            </Button>
          ))}
        </section>
      </div>
    </div>
  )
}

function SectionLabel({
  id,
  className,
  children,
}: {
  id?: string
  className?: string
  children: string
}) {
  return (
    <h2
      id={id}
      className={cn(
        "font-narrow text-[11.5px] font-bold tracking-[0.1em] text-muted-foreground uppercase",
        className
      )}
    >
      {children}
    </h2>
  )
}
