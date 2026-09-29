import { Link } from "react-router-dom"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@workspace/ui/components/button"
import { Card, CardHeader, CardTitle } from "@workspace/ui/components/card"
import { FieldSet } from "@workspace/ui/components/field"

import { FormAlert } from "@/components/form/form-alert"
import { SubmitButton } from "@/components/form/submit-button"
import { TextField } from "@/components/form/text-field"
import { STATE_COPY } from "@/components/states/state-copy.constants"
import { ROUTES, pathTo } from "@/config/routes"
import { hasErrorCode } from "@/lib/api/api-error"
import { API_ERROR_CODES } from "@/lib/api/api.constants"
import { applyServerFieldErrors } from "@/lib/forms/apply-server-field-errors"
import { firstName } from "@/lib/format/names"
import { ActivationLinkCard } from "@/features/technicians/components/activation-link-card"
import { useCreateTechnician } from "@/features/technicians/hooks/use-technician-mutations"
import {
  createTechnicianSchema,
  type CreateTechnicianInput,
  type CreateTechnicianValues,
} from "@/features/technicians/schemas/technician.schema"

const FIELDS = ["name", "email", "phone"] as const

export function NewTechnicianPage() {
  const create = useCreateTechnician()
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<CreateTechnicianInput, unknown, CreateTechnicianValues>({
    resolver: zodResolver(createTechnicianSchema),
    defaultValues: { name: "", email: "", phone: "" },
  })

  const onSubmit = handleSubmit((values) => {
    create.mutate(values, {
      onError: (error) => {
        if (hasErrorCode(error, API_ERROR_CODES.CONFLICT)) {
          setError("email", {
            type: "server",
            message: "There is already an account on this email.",
          })
          return
        }
        applyServerFieldErrors(error, setError, FIELDS)
      },
    })
  })

  const unhandledError =
    create.isError &&
    !hasErrorCode(create.error, API_ERROR_CODES.CONFLICT) &&
    !hasErrorCode(create.error, API_ERROR_CODES.VALIDATION_ERROR)

  return (
    <div className="mx-auto max-w-[460px]">
      <Link
        to={ROUTES.technicians}
        className="font-narrow text-[13px] font-bold text-primary-deep hover:text-primary"
      >
        ← Technicians
      </Link>

      {create.isSuccess ? (
        <div className="mt-3 flex flex-col gap-3">
          <ActivationLinkCard
            title={`${firstName(create.data.technician.name)} is created`}
            invitation={create.data.invitation}
          />
          <Button
            asChild
            variant="outline"
            className="h-11 bg-white text-[14px] font-semibold"
          >
            <Link
              to={pathTo(ROUTES.technician, {
                technicianId: create.data.technician.id,
              })}
            >
              Open their page
            </Link>
          </Button>
        </div>
      ) : (
        <Card className="mt-3 gap-0 rounded-[8px]">
          <CardHeader className="px-4 py-[13px]">
            <CardTitle className="font-heading text-[13px] font-bold tracking-[-0.01em] uppercase">
              Add a technician
            </CardTitle>
          </CardHeader>
          <form noValidate onSubmit={onSubmit} className="p-4">
            {unhandledError ? (
              <FormAlert
                tone="error"
                {...STATE_COPY.saveFailed}
                className="mb-4"
              />
            ) : null}
            <FieldSet disabled={create.isPending} className="gap-3.5">
              <TextField
                label="Full name"
                autoComplete="off"
                autoFocus
                error={errors.name?.message}
                className="h-[42px] bg-white text-[14.5px]"
                {...register("name")}
              />
              <TextField
                label="Work email"
                type="email"
                autoComplete="off"
                hint="They sign in with this. It can't be changed later."
                error={errors.email?.message}
                className="h-[42px] bg-white text-[14.5px]"
                {...register("email")}
              />
              <TextField
                label="Phone"
                type="tel"
                autoComplete="off"
                error={errors.phone?.message}
                className="h-[42px] bg-white text-[14.5px]"
                {...register("phone")}
              />
            </FieldSet>
            <SubmitButton
              pending={create.isPending}
              pendingLabel="Creating…"
              className="mt-[18px]"
            >
              Create and make a link
            </SubmitButton>
            <p className="mt-[9px] font-narrow text-[12.5px] leading-[1.5] text-muted-foreground">
              No password is set here. They set their own on the link.
            </p>
          </form>
        </Card>
      )}
    </div>
  )
}
