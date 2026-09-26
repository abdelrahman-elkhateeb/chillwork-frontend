import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { FieldSet } from "@workspace/ui/components/field"

import { FormAlert } from "@/components/form/form-alert"
import type { FormAlertContent } from "@/components/form/form.types"
import { PasswordField } from "@/components/form/password-field"
import { SubmitButton } from "@/components/form/submit-button"
import { TextField } from "@/components/form/text-field"
import { applyServerFieldErrors } from "@/lib/forms/apply-server-field-errors"
import { ROUTES } from "@/config/routes"
import { AuthFormHeader } from "@/features/auth/components/layout/auth-form-header"
import { AuthTextLink } from "@/features/auth/components/layout/auth-text-link"
import { LOGIN_COPY } from "@/features/auth/constants/auth-copy.constants"
import { useLogin } from "@/features/auth/hooks/use-login"
import { getAuthErrorAlert } from "@/features/auth/lib/get-auth-error-alert"
import { loginSchema } from "@/features/auth/schemas/login.schema"
import type { LoginFormValues } from "@/features/auth/types/auth-form.types"

const FIELDS = ["email", "password"] as const

type Props = {
  defaultEmail?: string
  /** Shown above the form until the first submit (e.g. "account ready"). */
  notice?: FormAlertContent | null
  onSuccess: () => void
}

export function LoginForm({ defaultEmail = "", notice, onSuccess }: Props) {
  const login = useLogin()
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, submitCount },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: defaultEmail, password: "" },
  })

  const onSubmit = handleSubmit((values) => {
    login.mutate(values, {
      onSuccess,
      onError: (error) => applyServerFieldErrors(error, setError, FIELDS),
    })
  })

  const alert =
    getAuthErrorAlert(login.error) ?? (submitCount === 0 ? notice : null)

  return (
    <>
      <AuthFormHeader
        title={LOGIN_COPY.title}
        description={LOGIN_COPY.description}
      />

      {alert ? <FormAlert {...alert} className="mt-6" /> : null}

      <form noValidate onSubmit={onSubmit} className="mt-7">
        <FieldSet disabled={login.isPending} className="min-w-0 gap-[18px]">
          <TextField
            label="Email"
            type="email"
            autoComplete="email"
            placeholder="nadia@example.com"
            autoFocus={!defaultEmail}
            error={errors.email?.message}
            {...register("email")}
          />
          <PasswordField
            label="Password"
            autoComplete="current-password"
            placeholder="Your password"
            autoFocus={Boolean(defaultEmail)}
            error={errors.password?.message}
            {...register("password")}
          />
        </FieldSet>

        <SubmitButton
          pending={login.isPending}
          pendingLabel={LOGIN_COPY.pending}
          className="mt-[26px]"
        >
          {LOGIN_COPY.submit}
        </SubmitButton>
      </form>

      <p className="mt-[18px] text-center text-[14.5px] text-muted-foreground">
        New here?{" "}
        <AuthTextLink to={ROUTES.signup}>Create an account</AuthTextLink>
      </p>
    </>
  )
}
