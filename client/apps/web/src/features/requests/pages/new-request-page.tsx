import { useEffect, useState, type FormEvent } from "react"
import { FormProvider, useForm, type FieldErrors } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useLocation, useNavigate } from "react-router-dom"

import { applyServerFieldErrors } from "@/lib/forms/apply-server-field-errors"
import { isApiError } from "@/lib/api/api-error"
import type { AuthUser } from "@/features/auth"
import { CustomerFrame } from "@/features/requests/components/layout/customer-frame"
import { RequestStepper } from "@/features/requests/components/layout/request-stepper"
import { RequestSent } from "@/features/requests/components/outcome/request-sent"
import { ReviewStep } from "@/features/requests/components/steps/review-step"
import { UnitsStep } from "@/features/requests/components/steps/units-step"
import { WhereStep } from "@/features/requests/components/steps/where-step"
import { useCreateServiceRequest } from "@/features/requests/hooks/use-create-service-request"
import { useRequestDraftAutosave } from "@/features/requests/hooks/use-request-draft-autosave"
import { createEmptyDevice } from "@/features/requests/lib/create-empty-device"
import { getRequestErrorAlert } from "@/features/requests/lib/get-request-error-alert"
import { getRequestFieldPaths } from "@/features/requests/lib/request-field-paths"
import {
  readReportAgainState,
  withReportedAgainUnit,
} from "@/features/requests/lib/report-again"
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
  return (
    <CustomerFrame>{(user) => <NewRequestFlow user={user} />}</CustomerFrame>
  )
}

function NewRequestFlow({ user }: { user: AuthUser }) {
  const location = useLocation()
  const navigate = useNavigate()
  // Reporting a unit again: where and who are already known, so she
  // starts on the unit that needs a fresh description.
  const [step, setStep] = useState<RequestStepIndex>(() =>
    readReportAgainState(location.state) ? 1 : 0
  )
  const [showUnitErrors, setShowUnitErrors] = useState(false)
  const [fieldErrorsShown, setFieldErrorsShown] = useState(false)
  const [initialValues] = useState(() => {
    const draft = readRequestDraft(user.id)
    const reportAgain = readReportAgainState(location.state)
    if (reportAgain) {
      return withReportedAgainUnit(draft, reportAgain)
    }
    return draft ?? emptyRequest(user.phone)
  })

  // The unit is in the form (and the autosaved draft) now; a reload must
  // not add it a second time.
  useEffect(() => {
    if (readReportAgainState(location.state)) {
      navigate(location.pathname, { replace: true, state: null })
    }
  }, [location.pathname, location.state, navigate])

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
