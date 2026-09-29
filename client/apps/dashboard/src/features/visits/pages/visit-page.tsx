import { useParams } from "react-router-dom"
import { MapPinIcon, PhoneIcon } from "lucide-react"
import { Button } from "@workspace/ui/components/button"

import { ErrorState } from "@/components/states/error-state"
import { CardListSkeleton } from "@/components/states/skeletons"
import { ROUTES } from "@/config/routes"
import { isNotFoundError } from "@/lib/api/api-error"
import { UnitCard } from "@/features/visits/components/detail/unit-card"
import { VisitActions } from "@/features/visits/components/detail/visit-actions"
import { PhoneHeader } from "@/features/visits/components/shared/phone-header"
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
        <PhoneHeader backTo={ROUTES.visits} title=" " />
        <div className="p-4">
          <CardListSkeleton count={2} />
        </div>
      </>
    )
  }

  if (visit.isError) {
    return (
      <>
        <PhoneHeader backTo={ROUTES.visits} title=" " />
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
      <PhoneHeader
        backTo={ROUTES.visits}
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
        <div className="mt-[11px] text-[16px] font-bold text-paper-bright">
          {data.customer.name ?? "Customer"}
        </div>
        <div className="mt-[3px] font-narrow text-[13px] leading-[1.4] text-paper/55">
          {data.address}
        </div>
        <div className="mt-3 flex gap-[7px]">
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
      </PhoneHeader>

      <div className="px-4 py-[13px]">
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

        <VisitActions visit={data} unitsWithoutOutcome={unitsWithoutOutcome} />
      </div>
    </>
  )
}
