import { useState } from "react"
import { useFieldArray, useFormContext, useWatch } from "react-hook-form"
import { PlusIcon } from "lucide-react"
import { Button } from "@workspace/ui/components/button"

import { StepHeading } from "@/features/requests/components/shared/step-heading"
import { RequestSummaryPanel } from "@/features/requests/components/units/request-summary-panel"
import { UnitCard } from "@/features/requests/components/units/unit-card"
import { REQUEST_COPY } from "@/features/requests/constants/request-copy.constants"
import { MAX_DEVICES_PER_REQUEST } from "@/features/requests/constants/request-validation.constants"
import { createEmptyDevice } from "@/features/requests/lib/create-empty-device"
import { getUnitStatus } from "@/features/requests/lib/unit-status"
import type { CreateRequestFormInput } from "@/features/requests/types/request.types"

const COPY = REQUEST_COPY.units

const BLOCKER_REASONS = {
  needsDescription: "still needs a description",
  needsLocation: "still needs a location",
} as const

type Props = {
  showErrors: boolean
  onBack: () => void
}

export function UnitsStep({ showErrors, onBack }: Props) {
  const { control } = useFormContext<CreateRequestFormInput>()
  const { fields, append, remove, move } = useFieldArray({
    control,
    name: "devices",
    keyName: "key",
  })
  const units = useWatch({ control, name: "devices" })
  const address = useWatch({ control, name: "address" })
  const phone = useWatch({ control, name: "contactPhone" })

  // Ready units fold away when another one is added; unfinished units
  // always stay open so nothing incomplete is hidden.
  const [openIds, setOpenIds] = useState(
    () => new Set(units.map((unit) => unit.clientDeviceId))
  )

  const statuses = units.map(getUnitStatus)
  const firstUnfinished = statuses.findIndex((status) => status !== "ready")
  const blockerStatus = statuses[firstUnfinished]
  const blocker =
    blockerStatus && blockerStatus !== "ready"
      ? `Unit ${firstUnfinished + 1} ${BLOCKER_REASONS[blockerStatus]}`
      : null

  const addUnit = () => {
    const unit = createEmptyDevice()
    append(unit)
    setOpenIds(new Set([unit.clientDeviceId]))
  }

  const openUnit = (clientDeviceId: string) => {
    setOpenIds((current) => new Set(current).add(clientDeviceId))
  }

  return (
    <div className="flex flex-col gap-8 lg:flex-row">
      <div className="min-w-0 grow">
        <StepHeading title={COPY.title} description={COPY.description} />

        <ul className="mt-6 flex flex-col gap-3">
          {fields.map((field, index) => {
            const unit = units[index] ?? field
            const isOpen =
              openIds.has(unit.clientDeviceId) || statuses[index] !== "ready"

            return (
              <li key={field.key}>
                <UnitCard
                  index={index}
                  unit={unit}
                  isOpen={isOpen}
                  showErrors={showErrors}
                  canMoveUp={index > 0}
                  canMoveDown={index < fields.length - 1}
                  canRemove={fields.length > 1}
                  onOpen={() => openUnit(unit.clientDeviceId)}
                  onMove={(direction) => move(index, index + direction)}
                  onRemove={() => remove(index)}
                />
              </li>
            )
          })}
        </ul>

        {fields.length < MAX_DEVICES_PER_REQUEST ? (
          <Button
            type="button"
            variant="outline"
            onClick={addUnit}
            className="mt-3.5 h-[52px] w-full gap-[9px] rounded-[6px] border-[1.5px] border-dashed text-[14.5px] font-semibold hover:border-primary hover:bg-card"
          >
            <PlusIcon />
            {COPY.add}
          </Button>
        ) : (
          <p className="mt-3.5 text-center font-narrow text-[13px] text-muted-foreground">
            A request can cover up to {MAX_DEVICES_PER_REQUEST} units.
          </p>
        )}
      </div>

      <div className="w-full shrink-0 lg:w-[306px]">
        <RequestSummaryPanel
          unitCount={fields.length}
          address={address}
          phone={phone}
          blocker={blocker}
          onChangeWhere={onBack}
        />
      </div>
    </div>
  )
}
