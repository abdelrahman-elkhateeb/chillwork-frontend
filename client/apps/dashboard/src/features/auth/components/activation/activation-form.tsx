import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Link } from "react-router-dom"
import { Button } from "@workspace/ui/components/button"
import { FieldSet } from "@workspace/ui/components/field"

import { FormAlert } from "@/components/form/form-alert"
import { PasswordField } from "@/components/form/password-field"
import { SubmitButton } from "@/components/form/submit-button"
import { hasErrorCode } from "@/lib/api/api-error"
import { API_ERROR_CODES } from "@/lib/api/api.constants"
import { applyServerFieldErrors } from "@/lib/forms/apply-server-field-errors"
import { ROUTES } from "@/config/routes"
import { AuthFormHeader } from "@/features/auth/components/layout/auth-form-header"
import { ACTIVATION_COPY } from "@/features/auth/constants/auth-copy.constants"
import {
  useActivateTechnician,
  type ActivateResult,
} from "@/features/auth/hooks/use-activate-technician"
import { getAuthErrorAlert } from "@/features/auth/lib/get-auth-error-alert"
import {
  activationSchema,
  type ActivationFormValues,
} from "@/features/auth/schemas/activation.schema"

type Props = {
  token: string
  onActivated: (result: ActivateResult) => void
}

export function ActivationForm({ token, onActivated }: Props) {
  const activate = useActivateTechnician()
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<ActivationFormValues>({
    resolver: zodResolver(activationSchema),
    defaultValues: { password: "", confirm: "" },
  })

  // A typo in the confirmation is caught here, before the API is called —
  // it must never burn the one-time link.
  const onSubmit = handleSubmit(({ password }) => {
    activate.mutate(
      { token, password },
      {
        onSuccess: onActivated,
        onError: (error) =>
          applyServerFieldErrors(error, setError, ["password"]),
      }
    )
  })

  const linkIsDead = hasErrorCode(
    activate.error,
    API_ERROR_CODES.INVALID_ACTIVATION_TOKEN
  )
  const alert = getAuthErrorAlert(activate.error)

  return (
    <>
      <AuthFormHeader title={ACTIVATION_COPY.title} />

      {alert ? <FormAlert {...alert} className="mt-5" /> : null}

      {linkIsDead ? (
        <Button
          asChild
          className="mt-4 h-11 w-full rounded-[var(--radius-control)] text-[14px] font-semibold"
        >
          <Link to={ROUTES.login}>{ACTIVATION_COPY.goToSignIn}</Link>
        </Button>
      ) : (
        <form noValidate onSubmit={onSubmit} className="mt-5">
          <FieldSet
            disabled={activate.isPending}
            className="min-w-0 gap-[18px]"
          >
            <PasswordField
              label="New password"
              autoComplete="new-password"
              placeholder="At least 8 characters"
              autoFocus
              error={errors.password?.message}
              {...register("password")}
            />
            <PasswordField
              label="Type it again"
              autoComplete="new-password"
              revealable={false}
              error={errors.confirm?.message}
              {...register("confirm")}
            />
          </FieldSet>

          <SubmitButton
            pending={activate.isPending}
            pendingLabel={ACTIVATION_COPY.pending}
            className="mt-6 h-[50px] text-[15.5px]"
          >
            {ACTIVATION_COPY.submit}
          </SubmitButton>

          <p className="mt-3.5 text-center font-narrow text-[12.5px] text-muted-foreground">
            {ACTIVATION_COPY.onceNote}
          </p>
        </form>
      )}
    </>
  )
}
