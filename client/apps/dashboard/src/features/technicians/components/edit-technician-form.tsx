import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@workspace/ui/components/button"
import { FieldSet } from "@workspace/ui/components/field"

import { FormAlert } from "@/components/form/form-alert"
import { SubmitButton } from "@/components/form/submit-button"
import { TextField } from "@/components/form/text-field"
import { STATE_COPY } from "@/components/states/state-copy.constants"
import { applyServerFieldErrors } from "@/lib/forms/apply-server-field-errors"
import { useUpdateTechnician } from "@/features/technicians/hooks/use-technician-mutations"
import {
  editTechnicianSchema,
  type EditTechnicianInput,
  type EditTechnicianValues,
} from "@/features/technicians/schemas/technician.schema"
import type { Technician } from "@/features/technicians/types/technician.types"

type Props = {
  technician: Technician
  onDone: () => void
}

/** Name and phone only — the email is their login and never changes. */
export function EditTechnicianForm({ technician, onDone }: Props) {
  const update = useUpdateTechnician(technician.id)
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<EditTechnicianInput, unknown, EditTechnicianValues>({
    resolver: zodResolver(editTechnicianSchema),
    defaultValues: { name: technician.name, phone: technician.phone },
  })

  const onSubmit = handleSubmit((values) => {
    update.mutate(values, {
      onSuccess: onDone,
      onError: (error) =>
        applyServerFieldErrors(error, setError, ["name", "phone"]),
    })
  })

  return (
    <form noValidate onSubmit={onSubmit} className="px-[18px] py-4">
      {update.isError && !errors.name && !errors.phone ? (
        <FormAlert tone="error" {...STATE_COPY.saveFailed} className="mb-4" />
      ) : null}
      <FieldSet disabled={update.isPending} className="gap-3.5">
        <TextField
          label="Full name"
          error={errors.name?.message}
          className="h-[42px] bg-white text-[14.5px]"
          {...register("name")}
        />
        <TextField
          label="Phone"
          type="tel"
          error={errors.phone?.message}
          className="h-[42px] bg-white text-[14.5px]"
          {...register("phone")}
        />
      </FieldSet>
      <div className="mt-4 flex gap-[9px]">
        <SubmitButton
          pending={update.isPending}
          pendingLabel="Saving…"
          className="flex-1"
        >
          Save details
        </SubmitButton>
        <Button
          type="button"
          variant="outline"
          onClick={onDone}
          className="h-12 bg-white px-4 text-[14px] font-semibold"
        >
          Cancel
        </Button>
      </div>
    </form>
  )
}
