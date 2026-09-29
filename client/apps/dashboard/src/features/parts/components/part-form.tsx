import type { ReactNode } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Link } from "react-router-dom"
import { Button } from "@workspace/ui/components/button"
import { FieldSet } from "@workspace/ui/components/field"

import { FormAlert } from "@/components/form/form-alert"
import { MoneyField } from "@/components/form/money-field"
import { SubmitButton } from "@/components/form/submit-button"
import { TextField } from "@/components/form/text-field"
import { TextareaField } from "@/components/form/textarea-field"
import { STATE_COPY } from "@/components/states/state-copy.constants"
import { SavedNote } from "@/components/states/saved-note"
import { ROUTES } from "@/config/routes"
import { hasErrorCode } from "@/lib/api/api-error"
import { API_ERROR_CODES } from "@/lib/api/api.constants"
import { applyServerFieldErrors } from "@/lib/forms/apply-server-field-errors"
import { minorToInput } from "@/lib/format/money"
import {
  partSchema,
  type PartFormInput,
  type PartFormValues,
} from "@/features/parts/schemas/part.schema"
import type { AdminPart } from "@/features/parts/types/part.types"

type Props = {
  /** Editing when given; adding otherwise. */
  part?: AdminPart
  currency: string | null
  pending: boolean
  error: unknown
  saved?: boolean
  /** Rejects with the ApiError on failure (a mutation's `mutateAsync`). */
  onSubmit: (values: PartFormValues) => Promise<unknown>
  /** The "On the shelf" box (edit only). */
  shelf?: ReactNode
}

/** Adding and editing are the same form; stock is never typed over here. */
export function PartForm({
  part,
  currency,
  pending,
  error,
  saved = false,
  onSubmit,
  shelf,
}: Props) {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<PartFormInput, unknown, PartFormValues>({
    resolver: zodResolver(partSchema),
    defaultValues: {
      name: part?.name ?? "",
      description: part?.description ?? "",
      price: minorToInput(part?.unitPriceMinor),
      startingStock: "",
    },
  })

  const submit = handleSubmit(async (values) => {
    try {
      await onSubmit(values)
    } catch (failure) {
      // Server-side field errors land under their fields.
      applyServerFieldErrors(failure, setError, ["name", "description"])
    }
  })

  const nameTaken = hasErrorCode(error, API_ERROR_CODES.CONFLICT)
  const formFailed =
    Boolean(error) &&
    !nameTaken &&
    !hasErrorCode(error, API_ERROR_CODES.VALIDATION_ERROR)

  return (
    <form noValidate onSubmit={submit} className="p-4">
      {formFailed ? (
        <FormAlert tone="error" {...STATE_COPY.saveFailed} className="mb-4" />
      ) : null}

      <FieldSet disabled={pending} className="gap-3.5">
        <TextField
          label="What it is called"
          hint="This is what the technician reads on the phone and the customer reads on the invoice. Write it the way it is said."
          error={
            errors.name?.message ??
            (nameTaken ? "There is already a part with this name." : undefined)
          }
          className="h-[42px] bg-white text-[14.5px]"
          {...register("name")}
        />
        <TextareaField
          label="What it does"
          hint="Optional. One line the customer sees when approving it, e.g. “Makes the compressor start.”"
          error={errors.description?.message}
          rows={2}
          className="bg-white text-[14.5px]"
          {...register("description")}
        />
        <MoneyField
          label="Price to the customer"
          currency={currency}
          hint="Changing it never changes an invoice already issued — the price is copied onto the invoice when it is issued."
          error={errors.price?.message}
          {...register("price")}
        />
        {!part ? (
          <TextField
            label="On the shelf now"
            inputMode="numeric"
            placeholder="0"
            hint="Only set here, once. After that, stock moves with a reason attached."
            error={errors.startingStock?.message}
            className="h-[42px] bg-white font-mono text-[14px]"
            {...register("startingStock")}
          />
        ) : null}
      </FieldSet>

      {shelf}

      <div className="mt-[18px] flex gap-[9px]">
        <SubmitButton pending={pending} pendingLabel="Saving…" className="flex-1">
          Save the part
        </SubmitButton>
        <Button
          asChild
          variant="outline"
          className="h-12 bg-white px-4 text-[14px] font-semibold"
        >
          <Link to={ROUTES.parts}>Cancel</Link>
        </Button>
      </div>

      {saved ? <SavedNote className="mt-3.5" /> : null}
    </form>
  )
}
