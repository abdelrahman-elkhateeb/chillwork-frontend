import { useState } from "react"
import { useParams } from "react-router-dom"
import { Card } from "@workspace/ui/components/card"

import { FormAlert } from "@/components/form/form-alert"
import { SubmitButton } from "@/components/form/submit-button"
import { ErrorState } from "@/components/states/error-state"
import { CardListSkeleton } from "@/components/states/skeletons"
import { STATE_COPY } from "@/components/states/state-copy.constants"
import { ROUTES, pathTo } from "@/config/routes"
import { hasErrorCode, isNotFoundError } from "@/lib/api/api-error"
import { API_ERROR_CODES } from "@/lib/api/api.constants"
import { formatMoney } from "@/lib/format/money"
import { usePricing } from "@/features/settings"
import { AgreedSummary } from "@/features/visits/components/approval/agreed-summary"
import { DecisionButtons } from "@/features/visits/components/approval/decision-buttons"
import { unitName } from "@/features/visits/lib/unit-name"
import { PhoneHeader } from "@/features/visits/components/shared/phone-header"
import { VisitNotFound } from "@/features/visits/components/shared/visit-not-found"
import { useDecideParts } from "@/features/visits/hooks/use-visit-mutations"
import {
  useCatalogParts,
  useVisit,
  useVisitParts,
  useWorkResults,
} from "@/features/visits/hooks/use-visits"
import { unitProgress } from "@/features/visits/lib/unit-progress"

type Answer = "APPROVED" | "REJECTED"

/** `/visits/:visitId/units/:deviceId/approve` — hand the customer the phone. */
export function ApprovePartsPage() {
  const { visitId = "", deviceId = "" } = useParams()
  const visit = useVisit(visitId)
  const parts = useVisitParts(visitId)
  const results = useWorkResults(visitId)
  const catalog = useCatalogParts("")
  const pricing = usePricing()
  const decide = useDecideParts(visitId, deviceId)
  const [answers, setAnswers] = useState<Record<string, Answer>>({})

  const backTo = pathTo(ROUTES.visit, { visitId })

  if (visit.isPending || parts.isPending) {
    return (
      <>
        <PhoneHeader backTo={backTo} title=" " />
        <div className="p-4">
          <CardListSkeleton count={2} />
        </div>
      </>
    )
  }

  const device = visit.data?.devices.find((d) => d.clientDeviceId === deviceId)
  if (isNotFoundError(visit.error) || (visit.data && !device)) {
    return (
      <>
        <PhoneHeader backTo={ROUTES.visits} title=" " />
        <VisitNotFound />
      </>
    )
  }
  if (visit.isError || parts.isError || !device) {
    return (
      <>
        <PhoneHeader backTo={backTo} title=" " />
        <ErrorState
          error={visit.error ?? parts.error}
          onRetry={() => void parts.refetch()}
        />
      </>
    )
  }

  const progress = unitProgress(
    parts.data.devices.find((d) => d.clientDeviceId === deviceId),
    results.data?.devices.find((d) => d.clientDeviceId === deviceId)
  )
  const deviceParts = parts.data.devices.find(
    (d) => d.clientDeviceId === deviceId
  )
  const currency = parts.data.currency
  const descriptions = new Map(
    (catalog.data?.items ?? []).map((part) => [part.id, part.description])
  )
  const open = progress.openProposals
  const allAnswered = open.every(
    (item) => item.proposalId && answers[item.proposalId]
  )

  const record = () => {
    decide.mutate({
      version: deviceParts?.version ?? 0,
      decisions: open.map((item) => ({
        proposalId: item.proposalId!,
        decision: answers[item.proposalId!]!,
      })),
    })
  }

  const asking = open.length > 0

  return (
    <>
      <PhoneHeader
        backTo={backTo}
        title={
          <span className="block text-center font-narrow text-[13px] font-bold text-paper-bright">
            {unitName(device)}
          </span>
        }
        aside={
          asking ? (
            <span className="font-mono text-[11.5px] text-paper/50">
              {device.clientDeviceId}
            </span>
          ) : (
            <span className="font-narrow text-[11.5px] font-bold tracking-[0.06em] text-primary uppercase">
              Agreed
            </span>
          )
        }
      >
        {asking ? (
          <>
            <h1 className="mt-3.5 text-[19px] leading-[1.1] font-bold tracking-[-0.022em] text-paper-bright">
              These are the parts it needs
            </h1>
            <p className="mt-1.5 font-narrow text-[13.5px] leading-[1.5] text-paper/60">
              Say yes or no to each one. Nothing is fitted until you do.
            </p>
          </>
        ) : null}
      </PhoneHeader>

      <div className="flex flex-col gap-2.5 px-4 py-3.5">
        {asking ? (
          <>
            {hasErrorCode(decide.error, API_ERROR_CODES.VERSION_CONFLICT) ||
            hasErrorCode(decide.error, API_ERROR_CODES.VALIDATION_ERROR) ? (
              <FormAlert
                tone="info"
                title="These parts changed meanwhile"
                description="The list was updated on another screen. Check the answers again."
              />
            ) : decide.isError ? (
              <FormAlert tone="error" {...STATE_COPY.saveFailed} />
            ) : null}

            {open.map((item) => {
              const description = descriptions.get(item.partId)
              return (
                <Card
                  key={item.proposalId}
                  className="gap-0 rounded-[6px] px-[15px] py-3.5"
                >
                  <div className="flex items-start justify-between gap-2.5">
                    <div className="min-w-0">
                      <div className="text-[15px] font-bold">{item.name}</div>
                      {description ? (
                        <p className="mt-[3px] font-narrow text-[12.5px] leading-[1.45] text-muted-foreground">
                          {description}
                        </p>
                      ) : null}
                      <div className="mt-[5px] font-mono text-[11.5px] text-[#8A9093]">
                        × {item.quantity}
                      </div>
                    </div>
                    <span className="font-mono text-[15px] font-semibold whitespace-nowrap">
                      {formatMoney(item.lineTotalMinor, currency)}
                    </span>
                  </div>
                  <DecisionButtons
                    partName={item.name}
                    value={answers[item.proposalId!]}
                    disabled={decide.isPending}
                    onChange={(answer) =>
                      setAnswers((current) => ({
                        ...current,
                        [item.proposalId!]: answer,
                      }))
                    }
                  />
                </Card>
              )
            })}

            <FormAlert
              tone="info"
              title="Prices come from the company catalog"
              description="The technician cannot change them here — they were not typed in front of you."
              className="border-border border-l-primary bg-surface-sunken *:data-[slot=alert-title]:text-foreground"
            />

            <SubmitButton
              type="button"
              onClick={record}
              disabled={!allAnswered}
              pending={decide.isPending}
              pendingLabel="Recording…"
              className="h-[54px] text-[15px]"
            >
              Record the answers
            </SubmitButton>
          </>
        ) : (
          <AgreedSummary
            visitId={visitId}
            deviceId={deviceId}
            progress={progress}
            currency={currency}
            laborFeeMinor={pricing.data?.laborFeeMinor ?? null}
          />
        )}
      </div>
    </>
  )
}
