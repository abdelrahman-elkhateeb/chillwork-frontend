import type { ReactNode } from "react"
import { useFormContext } from "react-hook-form"
import {
  ArrowDownIcon,
  ArrowUpIcon,
  GripVerticalIcon,
  XIcon,
} from "lucide-react"
import { Button } from "@workspace/ui/components/button"
import { Card } from "@workspace/ui/components/card"
import { cn } from "@workspace/ui/lib/utils"

import { TextareaField } from "@/components/form/textarea-field"
import { TextField } from "@/components/form/text-field"
import { OptionalLabel } from "@/features/requests/components/shared/optional-label"
import { UnitStatusBadge } from "@/features/requests/components/units/unit-status-badge"
import { REQUEST_COPY } from "@/features/requests/constants/request-copy.constants"
import {
  getUnitStatus,
  summarizeUnit,
} from "@/features/requests/lib/unit-status"
import type {
  CreateRequestFormInput,
  RequestDeviceFormInput,
} from "@/features/requests/types/request.types"

const COPY = REQUEST_COPY.units

type Props = {
  index: number
  unit: RequestDeviceFormInput
  isOpen: boolean
  showErrors: boolean
  canMoveUp: boolean
  canMoveDown: boolean
  canRemove: boolean
  onOpen: () => void
  onMove: (direction: -1 | 1) => void
  onRemove: () => void
}

export function UnitCard({
  index,
  unit,
  isOpen,
  showErrors,
  canMoveUp,
  canMoveDown,
  canRemove,
  onOpen,
  onMove,
  onRemove,
}: Props) {
  const {
    register,
    formState: { errors },
  } = useFormContext<CreateRequestFormInput>()

  const number = index + 1
  const status = getUnitStatus(unit)
  const isInvalid = showErrors && status !== "ready"
  const unitErrors = errors.devices?.[index]
  const title = (
    <span className="font-heading text-[14px] font-bold tracking-[-0.012em] uppercase">
      Unit {number}
    </span>
  )
  const grip = (
    <GripVerticalIcon
      aria-hidden="true"
      className="hidden size-4 shrink-0 text-[#8A9093] sm:block"
    />
  )

  if (!isOpen) {
    return (
      <Card className="flex-row items-center justify-between gap-3 rounded-[6px] px-4 py-3.5 md:px-[18px]">
        <div className="flex min-w-0 items-center gap-3">
          {grip}
          {title}
          <span className="hidden min-w-0 truncate font-narrow text-[14px] text-muted-foreground md:inline">
            {summarizeUnit(unit)}
          </span>
          <UnitStatusBadge status={status} showError={showErrors} />
        </div>
        <Button
          type="button"
          variant="link"
          onClick={onOpen}
          aria-label={`${COPY.edit} unit ${number}`}
          className="h-auto shrink-0 px-0.5 py-1.5 font-narrow text-[13.5px] font-bold text-primary-deep"
        >
          {COPY.edit}
        </Button>
      </Card>
    )
  }

  return (
    <Card
      className={cn(
        "rounded-[6px] border-l-[3px]",
        isInvalid ? "border-l-destructive" : "border-l-primary"
      )}
    >
      <div className="flex items-center justify-between gap-3 border-b border-secondary px-4 py-[13px] md:px-[18px]">
        <div className="flex min-w-0 items-center gap-3">
          {grip}
          {title}
          <UnitStatusBadge status={status} showError={showErrors} />
        </div>
        <div className="flex shrink-0 items-center gap-1">
          {canMoveUp ? (
            <UnitIconButton
              label={`Move unit ${number} up`}
              onClick={() => onMove(-1)}
            >
              <ArrowUpIcon />
            </UnitIconButton>
          ) : null}
          {canMoveDown ? (
            <UnitIconButton
              label={`Move unit ${number} down`}
              onClick={() => onMove(1)}
            >
              <ArrowDownIcon />
            </UnitIconButton>
          ) : null}
          {canRemove ? (
            <UnitIconButton label={`Remove unit ${number}`} onClick={onRemove}>
              <XIcon />
            </UnitIconButton>
          ) : null}
        </div>
      </div>

      <div className="flex flex-col gap-3.5 px-4 pt-4 pb-[18px] md:px-[18px]">
        <div className="grid gap-3.5 md:grid-cols-3">
          <TextField
            label={COPY.location}
            placeholder={COPY.locationPlaceholder}
            error={unitErrors?.label?.message}
            {...register(`devices.${index}.label`)}
          />
          <TextField
            label={<OptionalLabel label={COPY.brand} aside={COPY.brandAside} />}
            placeholder={COPY.brandPlaceholder}
            error={unitErrors?.brand?.message}
            {...register(`devices.${index}.brand`)}
          />
          <TextField
            label={<OptionalLabel label={COPY.model} aside={COPY.modelAside} />}
            placeholder={COPY.modelPlaceholder}
            error={unitErrors?.model?.message}
            {...register(`devices.${index}.model`)}
          />
        </div>
        <TextareaField
          label={COPY.issue}
          rows={3}
          placeholder={COPY.issuePlaceholder}
          hint={COPY.issueHint}
          error={unitErrors?.originalDescription?.message}
          {...register(`devices.${index}.originalDescription`)}
        />
      </div>
    </Card>
  )
}

function UnitIconButton({
  label,
  onClick,
  children,
}: {
  label: string
  onClick: () => void
  children: ReactNode
}) {
  return (
    <Button
      type="button"
      variant="outline"
      size="icon"
      aria-label={label}
      onClick={onClick}
      className="rounded-[4px] border-border bg-white"
    >
      {children}
    </Button>
  )
}
