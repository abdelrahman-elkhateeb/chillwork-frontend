import { Link, useParams } from "react-router-dom"
import { Card, CardHeader, CardTitle } from "@workspace/ui/components/card"

import { DetailSkeleton } from "@/components/states/skeletons"
import { ErrorState } from "@/components/states/error-state"
import { NotFoundState } from "@/components/states/not-found-state"
import { ROUTES, pathTo } from "@/config/routes"
import { isNotFoundError } from "@/lib/api/api-error"
import { pluralUnits } from "@/lib/format/names"
import { useAdminRequest } from "@/features/requests"
import { useCompanySettings } from "@/features/settings"
import { useTechnicians, WHOLE_TEAM } from "@/features/technicians"
import { AlreadyBookedNotice } from "@/features/scheduling/components/schedule-outcomes"
import { ScheduleForm } from "@/features/scheduling/components/schedule-form"

const ACTIVE_TEAM = { ...WHOLE_TEAM, status: "ACTIVE" } as const

export function ScheduleVisitPage() {
  const { requestId = "" } = useParams()
  const request = useAdminRequest(requestId)
  const settings = useCompanySettings()
  const team = useTechnicians(ACTIVE_TEAM)

  const failed = request.error ?? team.error

  let body
  if (request.isPending || team.isPending || settings.isPending) {
    body = <DetailSkeleton className="p-0" />
  } else if (request.isError && isNotFoundError(request.error)) {
    body = (
      <NotFoundState
        title="No such request"
        backTo={ROUTES.requests}
        backLabel="Back to requests"
      />
    )
  } else if (failed || !request.data || !team.data) {
    body = (
      <ErrorState
        error={failed}
        onRetry={() => {
          void request.refetch()
          void team.refetch()
        }}
      />
    )
  } else {
    const unscheduled = request.data.devices.filter(
      (device) => device.visitId === null
    )
    body =
      unscheduled.length === 0 ? (
        <AlreadyBookedNotice requestId={requestId} />
      ) : (
        <>
          <div className="mb-4 rounded-[5px] bg-surface-sunken px-[13px] py-[11px]">
            <div className="text-[13.5px] font-semibold">
              {request.data.customer.name} — {pluralUnits(unscheduled.length)}
            </div>
            <div className="mt-[3px] font-narrow text-[12.5px] text-muted-foreground">
              {request.data.address}
            </div>
          </div>
          <ScheduleForm
            request={request.data}
            technicians={team.data.items}
            timeZone={settings.data?.timezone ?? "UTC"}
          />
        </>
      )
  }

  return (
    <div className="mx-auto max-w-[600px]">
      <Link
        to={pathTo(ROUTES.request, { requestId })}
        className="font-narrow text-[13px] font-bold text-primary-deep hover:text-primary"
      >
        ← Back to the request
      </Link>
      <Card className="mt-3 gap-0 rounded-[8px]">
        <CardHeader className="px-[18px] py-[13px]">
          <CardTitle className="font-heading text-[13px] font-bold tracking-[-0.01em] uppercase">
            Schedule a visit
          </CardTitle>
          <span className="font-mono text-[11px] text-[#8A9093]">
            {request.data?.reference}
          </span>
        </CardHeader>
        <div className="px-[18px] py-4">{body}</div>
      </Card>
    </div>
  )
}
