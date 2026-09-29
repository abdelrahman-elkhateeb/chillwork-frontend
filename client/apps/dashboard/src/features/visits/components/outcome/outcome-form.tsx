import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { CheckIcon, XIcon } from "lucide-react"
import { Button } from "@workspace/ui/components/button"
import { FieldError } from "@workspace/ui/components/field"
import { Label } from "@workspace/ui/components/label"
import {
  NativeSelect,
  NativeSelectOption,
} from "@workspace/ui/components/native-select"
import { Textarea } from "@workspace/ui/components/textarea"
import { cn } from "@workspace/ui/lib/utils"

import { FormAlert } from "@/components/form/form-alert"
import { SubmitButton } from "@/components/form/submit-button"
import { Eyebrow } from "@/components/layout/eyebrow"
import { HatchedNote } from "@/components/layout/hatched-note"
import { STATE_COPY } from "@/components/states/state-copy.constants"
import { ROUTES, pathTo } from "@/config/routes"
import { hasErrorCode } from "@/lib/api/api-error"
import { API_ERROR_CODES } from "@/lib/api/api.constants"
import { FAILURE_REASON_LABELS } from "@/features/visits/constants/visit-copy.constants"
import { useRecordWorkResult } from "@/features/visits/hooks/use-visit-mutations"
import type { UnitProgress } from "@/features/visits/lib/unit-progress"
import type {
  DeviceWorkResult,
  FailureReason,
  WorkResultValue,
} from "@/features/visits/types/visit.types"

const REASONS = Object.keys(FAILURE_REASON_LABELS) as FailureReason[]
const NOTE_MAX = 1000

type Props = {
  visitId: string
  deviceId: string
  progress: UnitProgress
  current: DeviceWorkResult | undefined
}

export function OutcomeForm({ visitId, deviceId, progress, current }: Props) {
  const navigate = useNavigate()
  const record = useRecordWorkResult(visitId, deviceId)
  const [result, setResult] = useState<WorkResultValue | null>(
    current?.result ?? (progress.canMarkFixed ? null : "FAILED")
  )
  const [reason, setReason] = useState<FailureReason | "">(
    current?.failureReason ??
      (progress.canMarkFixed ? "" : "CUSTOMER_REFUSED")
  )
  const [note, setNote] = useState(current?.failureNote ?? "")
  const [showErrors, setShowErrors] = useState(false)

  const backTo = pathTo(ROUTES.visit, { visitId })

  if (progress.outcomeBlocked) {
    return (
      <div className="flex flex-col gap-3">
        <HatchedNote title="Get the customer's answers first">
          Parts were picked for this unit but nobody has said yes or no yet.
          Nothing can be recorded until they do.
        </HatchedNote>
        <Button asChild className="h-[52px] text-[15px] font-semibold">
          <Link to={pathTo(ROUTES.approveParts, { visitId, deviceId })}>
            Get their answers
          </Link>
        </Button>
      </div>
    )
  }

  const reasonMissing = result === "FAILED" && !reason

  const save = () => {
    if (!result || reasonMissing) {
      setShowErrors(true)
      return
    }
    const version = current?.version ?? 0
    record.mutate(
      result === "REPAIRED"
        ? { result, version }
        : {
            result,
            failureReason: reason as FailureReason,
            failureNote: note.trim() || undefined,
            version,
          },
      { onSuccess: () => navigate(backTo) }
    )
  }

  const errorAlert = (() => {
    if (!record.isError) return null
    if (hasErrorCode(record.error, API_ERROR_CODES.WORK_NOT_APPROVED)) {
      return {
        title: "The customer hasn't approved a part",
        description:
          "A unit can only be marked fixed if at least one part was approved.",
      }
    }
    if (hasErrorCode(record.error, API_ERROR_CODES.VERSION_CONFLICT)) {
      return {
        title: "This outcome changed meanwhile",
        description:
          "It was saved on another screen a moment ago. Check it and save again.",
      }
    }
    if (hasErrorCode(record.error, API_ERROR_CODES.VISIT_STATUS_CONFLICT)) {
      return {
        title: "The visit isn't on site any more",
        description: "Outcomes can only be recorded while the visit is running.",
      }
    }
    return STATE_COPY.saveFailed
  })()

  return (
    <div>
      {errorAlert ? (
        <FormAlert tone="error" {...errorAlert} className="mb-4" />
      ) : null}

      <Eyebrow className="tracking-[0.1em]">How did it end?</Eyebrow>
      <div
        role="radiogroup"
        aria-label="How did it end?"
        className="mt-[11px] flex gap-[9px]"
      >
        <Button
          type="button"
          role="radio"
          aria-checked={result === "REPAIRED"}
          variant="outline"
          disabled={!progress.canMarkFixed || record.isPending}
          onClick={() => setResult("REPAIRED")}
          className={cn(
            "h-[72px] flex-1 flex-col gap-1.5 bg-white text-[14px] font-semibold text-muted-foreground disabled:bg-hatch-muted disabled:opacity-100",
            result === "REPAIRED" &&
              "border-2 border-[#17876A] bg-[#17876A]/9 font-bold text-[#11705A] hover:bg-[#17876A]/12"
          )}
        >
          <CheckIcon className="size-5" />
          Fixed
        </Button>
        <Button
          type="button"
          role="radio"
          aria-checked={result === "FAILED"}
          variant="outline"
          disabled={record.isPending}
          onClick={() => setResult("FAILED")}
          className={cn(
            "h-[72px] flex-1 flex-col gap-1.5 bg-white text-[14px] font-semibold text-muted-foreground",
            result === "FAILED" &&
              "border-2 border-destructive bg-destructive/6 font-bold text-[#8E1913] hover:bg-destructive/8"
          )}
        >
          <XIcon className="size-5" />
          Not fixed
        </Button>
      </div>
      {!progress.canMarkFixed ? (
        <p className="mt-2 font-narrow text-[12.5px] text-muted-foreground">
          “Fixed” is not offered: the customer approved no parts for this
          unit.
        </p>
      ) : null}
      {showErrors && !result ? (
        <FieldError className="mt-2 text-[12.5px] text-[#8E1913]">
          Choose how it ended.
        </FieldError>
      ) : null}

      {result === "FAILED" ? (
        <>
          <div className="mt-[18px]">
            <Label htmlFor="outcome-reason" className="mb-[7px] block text-[13px]">
              Why not?
            </Label>
            <NativeSelect
              id="outcome-reason"
              value={reason}
              aria-invalid={showErrors && reasonMissing ? true : undefined}
              onChange={(event) =>
                setReason(event.target.value as FailureReason)
              }
            >
              <NativeSelectOption value="" disabled>
                Pick a reason
              </NativeSelectOption>
              {REASONS.map((value) => (
                <NativeSelectOption key={value} value={value}>
                  {FAILURE_REASON_LABELS[value]}
                </NativeSelectOption>
              ))}
            </NativeSelect>
            {showErrors && reasonMissing ? (
              <FieldError className="mt-[7px] text-[12.5px] text-[#8E1913]">
                A reason is required.
              </FieldError>
            ) : (
              <p className="mt-[7px] font-narrow text-[12.5px] text-muted-foreground">
                A reason is required. It is the only thing the office has to
                go on.
              </p>
            )}
          </div>

          <div className="mt-4">
            <Label htmlFor="outcome-note" className="mb-[7px] block text-[13px]">
              Note for the office
            </Label>
            <Textarea
              id="outcome-note"
              rows={4}
              maxLength={NOTE_MAX}
              value={note}
              onChange={(event) => setNote(event.target.value)}
              placeholder="Optional — what you found, what it needs."
              className="bg-white text-[14.5px] leading-[1.5]"
            />
          </div>
        </>
      ) : null}

      {result ? (
        <div className="mt-4 rounded-[4px] border border-l-[3px] border-border border-l-primary bg-surface-sunken px-[13px] py-3">
          <div className="font-narrow text-[12.5px] font-bold">
            What this does
          </div>
          <p className="mt-1 font-narrow text-[12.5px] leading-[1.5] text-muted-foreground">
            {result === "FAILED"
              ? "This unit drops off the invoice entirely — no labour, no parts. The office sees the reason on their board."
              : "This unit is charged the parts the customer approved, plus one labour fee."}
          </p>
        </div>
      ) : null}

      <SubmitButton
        type="button"
        onClick={save}
        pending={record.isPending}
        pendingLabel="Saving…"
        className="mt-4 h-[54px] text-[15px]"
      >
        Save the outcome
      </SubmitButton>
      <p className="mt-[9px] text-center font-narrow text-[12px] text-muted-foreground">
        Saves for this unit alone. The others are untouched.
      </p>
    </div>
  )
}
