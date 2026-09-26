import { useFormContext, useWatch } from "react-hook-form"
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@workspace/ui/components/alert"
import { Button } from "@workspace/ui/components/button"
import { Card } from "@workspace/ui/components/card"
import { cn } from "@workspace/ui/lib/utils"

import { FormAlert } from "@/components/form/form-alert"
import type { FormAlertContent } from "@/components/form/form.types"
import { SubmitButton } from "@/components/form/submit-button"
import { StepHeading } from "@/features/requests/components/shared/step-heading"
import { REQUEST_COPY } from "@/features/requests/constants/request-copy.constants"
import { describeUnit } from "@/features/requests/lib/unit-status"
import type { CreateRequestFormInput } from "@/features/requests/types/request.types"

const COPY = REQUEST_COPY.review

type Props = {
  isSending: boolean
  idempotencyKey: string | null
  failure: FormAlertContent | null
  onEditWhere: () => void
  onBack: () => void
}

function shortenKey(key: string): string {
  return `${key.slice(0, 4)}…${key.slice(-3)}`
}

export function ReviewStep({
  isSending,
  idempotencyKey,
  failure,
  onEditWhere,
  onBack,
}: Props) {
  const { control } = useFormContext<CreateRequestFormInput>()
  const [address, directions, phone, units] = useWatch({
    control,
    name: ["address", "directions", "contactPhone", "devices"],
  })

  return (
    <div className="mx-auto max-w-[560px]">
      <StepHeading title={COPY.title} description={COPY.description} />

      {failure ? <FormAlert {...failure} className="mt-6" /> : null}

      <div
        className={cn(
          "mt-6 transition-opacity",
          isSending && "pointer-events-none opacity-45"
        )}
      >
        <Card className="flex-row items-start justify-between gap-3 rounded-[5px] border-0 bg-surface-sunken px-[13px] py-3">
          <div className="min-w-0">
            <div className="text-[13.5px] font-semibold break-words">
              {address}
            </div>
            <div className="mt-[3px] font-narrow text-[12.5px] break-words text-muted-foreground">
              {[directions, phone].filter(Boolean).join(" · ")}
            </div>
          </div>
          <Button
            type="button"
            variant="link"
            onClick={onEditWhere}
            className="h-auto shrink-0 p-0 font-narrow text-[12.5px] font-bold text-foreground hover:text-primary-deep"
          >
            {COPY.edit}
          </Button>
        </Card>

        <ol className="mt-3 border-t border-secondary pt-1">
          {units.map((unit, index) => (
            <li
              key={unit.clientDeviceId}
              className="border-b border-[#EDEEEE] py-2.5 last:border-b-0"
            >
              <div className="text-[13.5px] font-semibold">
                {index + 1} · {describeUnit(unit)}
              </div>
              <p className="mt-[3px] line-clamp-3 font-narrow text-[12.5px] leading-[1.45] whitespace-pre-line text-muted-foreground">
                {unit.originalDescription}
              </p>
            </li>
          ))}
        </ol>
      </div>

      <SubmitButton
        pending={isSending}
        pendingLabel={REQUEST_COPY.sending.label}
        className="mt-3.5 h-12 text-[14.5px]"
      >
        {failure ? REQUEST_COPY.failed.retry : COPY.send}
      </SubmitButton>

      {isSending ? (
        <>
          <Alert
            role="status"
            className="mt-4 border-l-primary bg-surface-sunken"
          >
            <AlertTitle className="text-[13px] font-bold">
              {REQUEST_COPY.sending.title}
            </AlertTitle>
            <AlertDescription className="font-narrow text-[12.5px] leading-[1.5]">
              {REQUEST_COPY.sending.description}
            </AlertDescription>
          </Alert>
          {idempotencyKey ? (
            <div className="mt-3.5 font-mono text-[11.5px] text-[#8A9093]">
              Idempotency-Key: {shortenKey(idempotencyKey)}
            </div>
          ) : null}
        </>
      ) : (
        <Button
          type="button"
          variant="outline"
          onClick={onBack}
          className="mt-2 h-[42px] w-full rounded-[var(--radius-control)] text-[14px] font-semibold"
        >
          {COPY.back}
        </Button>
      )}
    </div>
  )
}
