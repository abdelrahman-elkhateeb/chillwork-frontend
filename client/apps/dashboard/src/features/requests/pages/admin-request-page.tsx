import { Link, useParams } from "react-router-dom"
import { PhoneIcon } from "lucide-react"
import { Button } from "@workspace/ui/components/button"
import { Card } from "@workspace/ui/components/card"

import { Eyebrow } from "@/components/layout/eyebrow"
import { HistoryLine } from "@/components/layout/history-line"
import { DetailSkeleton } from "@/components/states/skeletons"
import { ErrorState } from "@/components/states/error-state"
import { NotFoundState } from "@/components/states/not-found-state"
import { ROUTES, pathTo } from "@/config/routes"
import { isNotFoundError } from "@/lib/api/api-error"
import { formatCameIn } from "@/lib/format/dates"
import { RequestUnitCard } from "@/features/requests/components/request-unit-card"
import { StandingBadge } from "@/features/requests/components/standing-badge"
import { useAdminRequest } from "@/features/requests/hooks/use-admin-requests"
import { requestHistory } from "@/features/requests/lib/request-history"
import { detailStanding } from "@/features/requests/lib/request-standing"

const COUNT_WORDS = ["no", "one", "two", "three", "four", "five", "six"]

function unitsHeading(count: number): string {
  if (count === 1) return "The unit"
  return `The units, ${COUNT_WORDS[count] ?? count} of them`
}

export function AdminRequestPage() {
  const { requestId = "" } = useParams()
  const request = useAdminRequest(requestId)

  if (request.isPending) {
    return (
      <Card className="mx-auto max-w-[860px] rounded-[8px]">
        <DetailSkeleton />
      </Card>
    )
  }

  if (request.isError) {
    return isNotFoundError(request.error) ? (
      <NotFoundState
        title="No such request"
        backTo={ROUTES.requests}
        backLabel="Back to requests"
      />
    ) : (
      <ErrorState
        error={request.error}
        onRetry={() => void request.refetch()}
      />
    )
  }

  const data = request.data
  const canSchedule = data.nextActions.includes("SCHEDULE_VISIT")

  return (
    <div className="mx-auto max-w-[860px]">
      <Link
        to={ROUTES.requests}
        className="font-narrow text-[13px] font-bold text-primary-deep hover:text-primary"
      >
        ← All requests
      </Link>

      <Card className="mt-3 gap-0 rounded-[8px]">
        <div className="flex flex-wrap items-start justify-between gap-4 border-b border-[#E4E6E6] px-[18px] py-4">
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-[11px]">
              <h1 className="font-mono text-[20px] font-semibold tracking-normal normal-case">
                {data.reference}
              </h1>
              <StandingBadge standing={detailStanding(data)} />
            </div>
            <div className="mt-[9px] text-[16px] font-bold">
              {data.customer.name}
            </div>
            <div className="mt-[3px] font-narrow text-[13.5px] leading-[1.5] text-muted-foreground">
              {data.address}
              <br />
              {data.contactPhone} · came in {formatCameIn(data.createdAt).toLowerCase()}
            </div>
          </div>
          {canSchedule ? (
            <Button
              asChild
              className="h-[46px] px-5 text-[14.5px] font-semibold"
            >
              <Link
                to={pathTo(ROUTES.scheduleVisit, { requestId: data.requestId })}
              >
                Schedule a visit
              </Link>
            </Button>
          ) : null}
        </div>

        <div className="px-[18px] pt-[15px]">
          <Eyebrow className="text-[11.5px] tracking-[0.1em] text-muted-foreground">
            {unitsHeading(data.devices.length)}
          </Eyebrow>
          <div className="mt-[9px] flex flex-col gap-2.5">
            {data.devices.map((device, index) => (
              <RequestUnitCard
                key={device.clientDeviceId}
                device={device}
                index={index}
              />
            ))}
          </div>

          <Eyebrow className="mt-3.5 text-[11.5px] tracking-[0.1em] text-muted-foreground">
            What has happened so far
          </Eyebrow>
          <div className="mt-[9px] pb-4">
            <HistoryLine entries={requestHistory(data)} />
          </div>
        </div>

        <div className="flex gap-[9px] border-t border-[#E4E6E6] px-[18px] py-3.5">
          <Button
            asChild
            variant="outline"
            className="h-11 bg-white px-[18px] text-[14px] font-semibold"
          >
            <a href={`tel:${data.contactPhone}`}>
              <PhoneIcon />
              Call the customer
            </a>
          </Button>
        </div>
      </Card>
    </div>
  )
}
