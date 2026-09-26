import { useFormContext } from "react-hook-form"
import { Button } from "@workspace/ui/components/button"

import { TextField } from "@/components/form/text-field"
import { OptionalLabel } from "@/features/requests/components/shared/optional-label"
import { StepHeading } from "@/features/requests/components/shared/step-heading"
import { REQUEST_COPY } from "@/features/requests/constants/request-copy.constants"
import type { CreateRequestFormInput } from "@/features/requests/types/request.types"

const COPY = REQUEST_COPY.where

/** Its button submits the form; the page turns that into "next step". */
export function WhereStep() {
  const {
    register,
    formState: { errors },
  } = useFormContext<CreateRequestFormInput>()

  return (
    <div className="mx-auto max-w-[560px]">
      <StepHeading title={COPY.title} description={COPY.description} />

      <div className="mt-7 flex flex-col gap-3.5">
        <TextField
          label={COPY.address}
          autoComplete="street-address"
          error={errors.address?.message}
          {...register("address")}
        />
        <TextField
          label={<OptionalLabel label={COPY.directions} aside="optional" />}
          placeholder={COPY.directionsPlaceholder}
          error={errors.directions?.message}
          {...register("directions")}
        />
        <TextField
          label={COPY.phone}
          type="tel"
          autoComplete="tel"
          hint={COPY.phoneHint}
          error={errors.contactPhone?.message}
          {...register("contactPhone")}
        />
      </div>

      <Button
        type="submit"
        size="xl"
        className="mt-6 w-full rounded-[var(--radius-control)]"
      >
        {COPY.next}
      </Button>
    </div>
  )
}
