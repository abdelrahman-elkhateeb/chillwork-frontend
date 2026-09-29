import { Link } from "react-router-dom"
import { Badge } from "@workspace/ui/components/badge"
import { Button } from "@workspace/ui/components/button"
import { Card } from "@workspace/ui/components/card"

import { Eyebrow } from "@/components/layout/eyebrow"
import { HatchedNote } from "@/components/layout/hatched-note"
import { ROUTES, pathTo } from "@/config/routes"
import { FAILURE_REASON_LABELS } from "@/features/visits/constants/visit-copy.constants"
import { unitName } from "@/features/visits/lib/unit-name"
import type { UnitProgress } from "@/features/visits/lib/unit-progress"
import type { VisitDetailDevice } from "@/features/visits/types/visit.types"

type Props = {
  visitId: string
  device: VisitDetailDevice
  /** `null` before the visit starts — nothing to show yet. */
  progress: UnitProgress | null
  /** The unit's parts and outcome can still be worked on. */
  editable: boolean
}

function PartsLine({ progress }: { progress: UnitProgress }) {
  if (progress.awaitingApproval) {
    return (
      <span className="text-primary-deep">
        {progress.openProposals.length} picked · waiting for the customer
      </span>
    )
  }
  if (!progress.hasTrackedProposals) {
    return <span className="text-muted-foreground">None picked</span>
  }
  const parts = [`${progress.approved.length} approved`]
  if (progress.refused.length > 0) {
    parts.push(`${progress.refused.length} refused`)
  }
  return <span>{parts.join(" · ")}</span>
}

function OutcomeBadge({ progress }: { progress: UnitProgress }) {
  const result = progress.result
  if (!result) {
    return <span className="text-muted-foreground">No outcome yet</span>
  }
  if (result.result === "REPAIRED") {
    return (
      <Badge variant="success" className="px-[7px] py-0.5">
        Fixed
      </Badge>
    )
  }
  return (
    <span className="inline-flex flex-wrap items-center gap-1.5">
      <Badge variant="blocked" className="px-[7px] py-0.5">
        Not fixed
      </Badge>
      {result.failureReason ? (
        <span className="text-[#8E1913]">
          {FAILURE_REASON_LABELS[result.failureReason]}
        </span>
      ) : null}
    </span>
  )
}

export function UnitCard({ visitId, device, progress, editable }: Props) {
  const params = { visitId, deviceId: device.clientDeviceId }

  return (
    <Card className="gap-0 rounded-[6px] px-[13px] py-3">
      <div className="flex items-center justify-between gap-3">
        <span className="text-[14.5px] font-bold">{unitName(device)}</span>
        <span className="font-mono text-[11.5px] text-muted-foreground">
          {device.clientDeviceId}
        </span>
      </div>

      <Eyebrow className="mt-2.5">They said</Eyebrow>
      <p className="mt-[3px] font-narrow text-[13px] leading-[1.45] whitespace-pre-line">
        “{device.originalDescription}”
      </p>

      {device.analysis ? (
        <>
          <Eyebrow className="mt-2.5">AI reading</Eyebrow>
          <p className="mt-[3px] font-narrow text-[13px] leading-[1.45]">
            {device.analysis.summary}
          </p>
          {device.analysis.inspectionQuestions.length > 0 ? (
            <ul className="mt-1 list-disc pl-4 font-narrow text-[12.5px] leading-[1.45] text-muted-foreground">
              {device.analysis.inspectionQuestions.map((question) => (
                <li key={question}>{question}</li>
              ))}
            </ul>
          ) : null}
        </>
      ) : (
        <HatchedNote title="No AI reading" className="mt-[9px]">
          Work from what the customer wrote.
        </HatchedNote>
      )}

      {progress ? (
        <div className="mt-3 border-t border-[#E4E6E6] pt-2.5 font-narrow text-[12.5px]">
          <div className="flex items-center justify-between gap-3">
            <span className="text-[#8A9093]">Parts</span>
            <PartsLine progress={progress} />
          </div>
          <div className="mt-1.5 flex items-center justify-between gap-3">
            <span className="text-[#8A9093]">Outcome</span>
            <OutcomeBadge progress={progress} />
          </div>

          {editable ? (
            <div className="mt-3 grid grid-cols-2 gap-2">
              <Button
                asChild
                variant="outline"
                className="h-12 bg-white font-sans text-[14px] font-semibold"
              >
                <Link to={pathTo(ROUTES.deviceParts, params)}>Parts</Link>
              </Button>
              {progress.awaitingApproval ? (
                <Button
                  asChild
                  className="h-12 font-sans text-[14px] font-semibold"
                >
                  <Link to={pathTo(ROUTES.approveParts, params)}>
                    Get approval
                  </Link>
                </Button>
              ) : (
                <Button
                  asChild
                  variant={progress.result ? "outline" : "default"}
                  className="h-12 bg-clip-padding font-sans text-[14px] font-semibold"
                >
                  <Link to={pathTo(ROUTES.outcome, params)}>
                    {progress.result ? "Change outcome" : "Outcome"}
                  </Link>
                </Button>
              )}
            </div>
          ) : null}
        </div>
      ) : null}
    </Card>
  )
}
