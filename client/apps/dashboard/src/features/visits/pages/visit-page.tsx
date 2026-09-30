import { useParams } from "react-router-dom"
import { MapPinIcon, PhoneIcon } from "lucide-react"
import { Button } from "@workspace/ui/components/button"

import { ErrorState } from "@/components/states/error-state"
import { CardListSkeleton } from "@/components/states/skeletons"
import { ROUTES } from "@/config/routes"
import { isNotFoundError } from "@/lib/api/api-error"
import { UnitCard } from "@/features/visits/components/detail/unit-card"
import { VisitActions } from "@/features/visits/components/detail/visit-actions"
import { ScreenBody } from "@/features/visits/components/shared/screen-body"
import { ScreenHeader } from "@/features/visits/components/shared/screen-header"
import { VisitNotFound } from "@/features/visits/components/shared/visit-not-found"
import { VISIT_STATUS_LABELS } from "@/features/visits/constants/visit-copy.constants"
import {
  useVisit,
  useVisitParts,
  useWorkResults,
} from "@/features/visits/hooks/use-visits"
import { unitProgress } from "@/features/visits/lib/unit-progress"

export function VisitPage() {
  const { visitId = "" } = useParams()
  const visit = useVisit(visitId)
  const started =
    visit.data?.status === "IN_PROGRESS" || visit.data?.status === "COMPLETED"
  const parts = useVisitParts(visitId, started)
  const results = useWorkResults(visitId, started)

  if (visit.isPending) {
    return (
      <>
        <ScreenHeader backTo={ROUTES.visits} title=" " width="wide" />
        <ScreenBody width="wide" className="py-4">
          <CardListSkeleton count={2} />
        </ScreenBody>
      </>
    )
  }

  if (visit.isError) {
    return (
      <>
        <ScreenHeader backTo={ROUTES.visits} title=" " width="wide" />
        {isNotFoundError(visit.error) ? (
          <VisitNotFound />
        ) : (
          <ErrorState
            error={visit.error}
            onRetry={() => void visit.refetch()}
          />
        )}
      </>
    )
  }

  const data = visit.data
  const editable = data.allowedActions.includes("RECORD_WORK_RESULT")
  const progressFor = (deviceId: string) =>
    started && parts.data && results.data
      ? unitProgress(
          parts.data.devices.find((d) => d.clientDeviceId === deviceId),
          results.data.devices.find((d) => d.clientDeviceId === deviceId)
        )
      : null
  const unitsWithoutOutcome = results.data
    ? results.data.devices.filter((device) => device.result === null).length
    : data.devices.length

  return (
    <>
      <ScreenHeader
        backTo={ROUTES.visits}
        width="wide"
        title={
          <h1 className="text-center font-mono text-[14px] font-semibold tracking-normal text-paper-bright normal-case">
            {data.requestReference ?? "Visit"}
          </h1>
        }
        aside={
          <span className="font-narrow text-[11.5px] font-bold tracking-[0.06em] text-primary uppercase">
            {VISIT_STATUS_LABELS[data.status]}
          </span>
        }
      >
        <div className="lg:flex lg:items-end lg:justify-between lg:gap-6">
          <div className="min-w-0">
            <div className="mt-[11px] text-[16px] font-bold text-paper-bright">
              {data.customer.name ?? "Customer"}
            </div>
            <div className="mt-[3px] font-narrow text-[13px] leading-[1.4] text-paper/55">
              {data.address}
            </div>
          </div>
          <div className="mt-3 flex gap-[7px] lg:w-[340px] lg:shrink-0">
            {data.customer.phone ? (
              <Button
                asChild
                variant="inverse"
                className="h-[42px] flex-1 rounded-[5px] border-paper/22 text-[13.5px] font-semibold"
              >
                <a href={`tel:${data.customer.phone}`}>
                  <PhoneIcon />
                  Call
                </a>
              </Button>
            ) : null}
            {data.address ? (
              <Button
                asChild
                variant="inverse"
                className="h-[42px] flex-1 rounded-[5px] border-paper/22 text-[13.5px] font-semibold"
              >
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(data.address)}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  <MapPinIcon />
                  Directions
                </a>
              </Button>
            ) : null}
          </div>
        </div>
      </ScreenHeader>

      {/* From `lg` the actions sit beside the units instead of under them. */}
      <ScreenBody
        width="wide"
        className="py-[13px] md:py-5 lg:grid lg:grid-cols-[minmax(0,1fr)_340px] lg:items-start lg:gap-6"
      >
        <div className="flex flex-col gap-[9px]">
          {data.devices.map((device) => (
            <UnitCard
              key={device.clientDeviceId}
              visitId={data.id}
              device={device}
              progress={progressFor(device.clientDeviceId)}
              editable={editable}
            />
          ))}
        </div>

        <VisitActions
          visit={data}
          unitsWithoutOutcome={unitsWithoutOutcome}
          className="lg:mt-0"
        />
      </ScreenBody>
    </>
  )
}
