import { useState, type FormEvent } from "react"
import { FormProvider, useForm, type FieldErrors } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Link } from "react-router-dom"
import { Button } from "@workspace/ui/components/button"

import { FormAlert } from "@/components/form/form-alert"
import { applyServerFieldErrors } from "@/lib/forms/apply-server-field-errors"
import { isApiError } from "@/lib/api/api-error"
import { ROUTES } from "@/config/routes"
import { useCurrentUser, type AuthUser } from "@/features/auth"
import { RequestHeader } from "@/features/requests/components/layout/request-header"
import { RequestStepper } from "@/features/requests/components/layout/request-stepper"
import { RequestSent } from "@/features/requests/components/outcome/request-sent"
import { ReviewStep } from "@/features/requests/components/steps/review-step"
import { UnitsStep } from "@/features/requests/components/steps/units-step"
import { WhereStep } from "@/features/requests/components/steps/where-step"
import { REQUEST_ALERTS } from "@/features/requests/constants/request-messages.constants"
import { useCreateServiceRequest } from "@/features/requests/hooks/use-create-service-request"
import { useRequestDraftAutosave } from "@/features/requests/hooks/use-request-draft-autosave"
import { createEmptyDevice } from "@/features/requests/lib/create-empty-device"
import { getRequestErrorAlert } from "@/features/requests/lib/get-request-error-alert"
import { getRequestFieldPaths } from "@/features/requests/lib/request-field-paths"
import {
  clearRequestDraft,
  readRequestDraft,
} from "@/features/requests/lib/request-draft-storage"
import { createRequestSchema } from "@/features/requests/schemas/create-request.schema"
import type { RequestStepIndex } from "@/features/requests/types/request-flow.types"
import type {
  CreateRequestFormInput,
  CreateRequestFormValues,
} from "@/features/requests/types/request.types"

const WHERE_FIELDS = ["address", "directions", "contactPhone"] as const

function emptyRequest(phone: string): CreateRequestFormInput {
  return {
    address: "",
    directions: "",
    contactPhone: phone,
    devices: [createEmptyDevice()],
  }
}

/** Which step holds the first invalid field, so the customer lands on it. */
function stepForErrors(fields: readonly string[]): RequestStepIndex {
  const hasWhereError = fields.some((field) =>
    (WHERE_FIELDS as readonly string[]).includes(field)
  )
  return hasWhereError ? 0 : 1
}

export function NewRequestPage() {
  const { user } = useCurrentUser()

  // Rendered behind RequireAuth, so this only guards the type.
  if (!user) {
    return null
  }

  return (
    <div className="min-h-svh bg-background text-foreground">
      <RequestHeader user={user} />
      {user.role === "CUSTOMER" ? (
        <NewRequestFlow user={user} />
      ) : (
        <main className="mx-auto max-w-[560px] px-4 py-10">
          <FormAlert {...REQUEST_ALERTS.customersOnly} />
          <Button asChild variant="outline" className="mt-4 h-[42px] w-full">
            <Link to={ROUTES.account}>Back to your account</Link>
          </Button>
        </main>
      )}
    </div>
  )
}

function NewRequestFlow({ user }: { user: AuthUser }) {
  const [step, setStep] = useState<RequestStepIndex>(0)
  const [showUnitErrors, setShowUnitErrors] = useState(false)
  const [fieldErrorsShown, setFieldErrorsShown] = useState(false)
  const [initialValues] = useState(
    () => readRequestDraft(user.id) ?? emptyRequest(user.phone)
  )

  const create = useCreateServiceRequest()
  const form = useForm<
    CreateRequestFormInput,
    unknown,
    CreateRequestFormValues
  >({
    resolver: zodResolver(createRequestSchema),
    defaultValues: initialValues,
    mode: "onTouched",
  })

  useRequestDraftAutosave(form, user.id, !create.isSuccess)

  const goTo = (next: RequestStepIndex) => {
    setStep(next)
    window.scrollTo({ top: 0 })
  }

  const nextFromWhere = async () => {
    if (await form.trigger(WHERE_FIELDS, { shouldFocus: true })) {
      goTo(1)
    }
  }

  const nextFromUnits = async () => {
    setShowUnitErrors(true)
    if (await form.trigger("devices", { shouldFocus: true })) {
      goTo(2)
    }
  }

  const submit = form.handleSubmit(
    (values) => {
      setFieldErrorsShown(false)
      create.mutate(values, {
        onSuccess: () => clearRequestDraft(user.id),
        onError: (error) => {
          const shown = applyServerFieldErrors(
            error,
            form.setError,
            getRequestFieldPaths(form.getValues())
          )
          setFieldErrorsShown(shown)
          if (shown && isApiError(error) && error.fieldErrors) {
            setShowUnitErrors(true)
            goTo(stepForErrors(Object.keys(error.fieldErrors)))
          }
        },
      })
    },
    (errors: FieldErrors<CreateRequestFormInput>) => {
      setShowUnitErrors(true)
      goTo(stepForErrors(Object.keys(errors)))
    }
  )

  // Every step's main button (and Enter in a text field) submits the
  // <form>; before the last step that means "next", never "send".
  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    if (step === 0) {
      event.preventDefault()
      void nextFromWhere()
      return
    }
    if (step === 1) {
      event.preventDefault()
      void nextFromUnits()
      return
    }
    void submit(event)
  }

  if (create.isSuccess) {
    return (
      <>
        <RequestStepper current="done" />
        <main className="mx-auto max-w-[1440px] px-4 py-8 pb-16 md:px-12">
          <RequestSent
            request={create.data}
            firstName={user.name.split(/\s+/)[0] ?? user.name}
          />
        </main>
      </>
    )
  }

  const failure = create.isError
    ? getRequestErrorAlert(create.error, { fieldErrorsShown })
    : null

  return (
    <>
      <RequestStepper
        current={step}
        onStepSelect={create.isPending ? undefined : goTo}
      />
      <main className="mx-auto max-w-[1440px] px-4 py-8 pb-16 md:px-12">
        <FormProvider {...form}>
          <form noValidate onSubmit={onSubmit}>
            {/* Locks every field while sending; nothing jumps. */}
            <fieldset disabled={create.isPending} className="min-w-0">
              {step === 0 ? <WhereStep /> : null}
              {step === 1 ? (
                <UnitsStep showErrors={showUnitErrors} onBack={() => goTo(0)} />
              ) : null}
              {step === 2 ? (
                <ReviewStep
                  isSending={create.isPending}
                  idempotencyKey={create.idempotencyKey}
                  failure={failure}
                  onEditWhere={() => goTo(0)}
                  onBack={() => goTo(1)}
                />
              ) : null}
            </fieldset>
          </form>
        </FormProvider>
      </main>
    </>
  )
}
