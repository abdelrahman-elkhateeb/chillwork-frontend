import { useParams } from "react-router-dom"

import { HatchedNote } from "@/components/layout/hatched-note"
import { ErrorState } from "@/components/states/error-state"
import { CardListSkeleton } from "@/components/states/skeletons"
import { ROUTES, pathTo } from "@/config/routes"
import { isNotFoundError } from "@/lib/api/api-error"
import { unitName } from "@/features/visits/lib/unit-name"
import { OutcomeForm } from "@/features/visits/components/outcome/outcome-form"
import { ScreenBody } from "@/features/visits/components/shared/screen-body"
import { ScreenHeader } from "@/features/visits/components/shared/screen-header"
import { VisitNotFound } from "@/features/visits/components/shared/visit-not-found"
import {
  useVisit,
  useVisitParts,
  useWorkResults,
} from "@/features/visits/hooks/use-visits"
import { unitProgress } from "@/features/visits/lib/unit-progress"

/** `/visits/:visitId/units/:deviceId/outcome` */
export function OutcomePage() {
  const { visitId = "", deviceId = "" } = useParams()
  const visit = useVisit(visitId)
  const parts = useVisitParts(visitId)
  const results = useWorkResults(visitId)
  const backTo = pathTo(ROUTES.visit, { visitId })

  if (visit.isPending || parts.isPending || results.isPending) {
    return (
      <>
        <ScreenHeader backTo={backTo} title=" " />
        <ScreenBody className="py-4">
          <CardListSkeleton count={2} />
        </ScreenBody>
      </>
    )
  }

  const device = visit.data?.devices.find((d) => d.clientDeviceId === deviceId)
  if (isNotFoundError(visit.error) || (visit.data && !device)) {
    return (
      <>
        <ScreenHeader backTo={ROUTES.visits} title=" " />
        <VisitNotFound />
      </>
    )
  }
  if (visit.isError || parts.isError || results.isError || !device) {
    return (
      <>
        <ScreenHeader backTo={backTo} title=" " />
        <ErrorState
          error={visit.error ?? parts.error ?? results.error}
          onRetry={() => {
            void parts.refetch()
            void results.refetch()
          }}
        />
      </>
    )
  }

  const current = results.data.devices.find(
    (d) => d.clientDeviceId === deviceId
  )
  const progress = unitProgress(
    parts.data.devices.find((d) => d.clientDeviceId === deviceId),
    current
  )

  return (
    <>
      <ScreenHeader
        backTo={backTo}
        title={
          <h1 className="text-center font-narrow text-[13px] font-bold tracking-normal text-paper-bright normal-case">
            {unitName(device)}
          </h1>
        }
        aside={
          <span className="font-mono text-[11.5px] text-paper/50">
            {device.clientDeviceId}
          </span>
        }
      />
      <ScreenBody className="py-4 md:py-6">
        {visit.data.allowedActions.includes("RECORD_WORK_RESULT") ? (
          <OutcomeForm
            visitId={visitId}
            deviceId={deviceId}
            progress={progress}
            current={current}
          />
        ) : (
          <HatchedNote title="The outcome can't be changed now">
            Outcomes are recorded while the visit is on site. Once it is
            finished they stay as they were.
          </HatchedNote>
        )}
      </ScreenBody>
    </>
  )
}
