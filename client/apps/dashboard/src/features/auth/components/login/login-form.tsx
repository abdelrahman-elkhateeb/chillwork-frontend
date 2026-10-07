import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { FieldSet } from "@workspace/ui/components/field"

import { FormAlert } from "@/components/form/form-alert"
import type { FormAlertContent } from "@/components/form/form.types"
import { PasswordField } from "@/components/form/password-field"
import { SubmitButton } from "@/components/form/submit-button"
import { TextField } from "@/components/form/text-field"
import { applyServerFieldErrors } from "@/lib/forms/apply-server-field-errors"
import { CUSTOMER_SITE_URL } from "@/config/routes"
import { AuthFormHeader } from "@/features/auth/components/layout/auth-form-header"
import { LOGIN_COPY } from "@/features/auth/constants/auth-copy.constants"
import { useLogin } from "@/features/auth/hooks/use-login"
import { getAuthErrorAlert } from "@/features/auth/lib/get-auth-error-alert"
import {
  loginSchema,
  type LoginFormValues,
} from "@/features/auth/schemas/login.schema"
import type { AuthUser } from "@/features/auth/types/auth.types"

const FIELDS = ["email", "password"] as const

type Props = {
  defaultEmail?: string
  /** Shown above the form until the first submit. */
  notice?: FormAlertContent | null
  onSuccess: (user: AuthUser) => void
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
      onSuccess: ({ user }) => onSuccess(user),
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

      <FormAlert
        tone="info"
        title={LOGIN_COPY.demoTitle}
        description={
          <ul className="m-0 list-none p-0 [overflow-wrap:anywhere]">
            {LOGIN_COPY.demoAccounts.map(({ role, email }) => (
              <li key={email}>
                {role}: <span className="font-mono select-all">{email}</span>
              </li>
            ))}
            <li>
              Password (both):{" "}
              <span className="font-mono select-all">
                {LOGIN_COPY.demoPassword}
              </span>
            </li>
          </ul>
        }
        className="mt-6"
      />

      {alert ? <FormAlert {...alert} className="mt-6" /> : null}

      <form noValidate onSubmit={onSubmit} className="mt-7">
        <FieldSet disabled={login.isPending} className="min-w-0 gap-[18px]">
          <TextField
            label="Work email"
            type="email"
            autoComplete="email"
            placeholder="mostafa@yourcompany.com"
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
          className="mt-[26px] h-[50px] text-[15.5px]"
        >
          {LOGIN_COPY.submit}
        </SubmitButton>
      </form>

      <FormAlert
        tone="info"
        title={LOGIN_COPY.noAccountTitle}
        description={LOGIN_COPY.noAccountBody}
        className="mt-[22px] border-border border-l-ink bg-surface-sunken *:data-[slot=alert-title]:text-foreground"
      />

      <p className="mt-[26px] border-t border-border pt-[18px] text-center text-[13.5px] text-muted-foreground">
        {LOGIN_COPY.customerPrompt}{" "}
        <a
          href={`${CUSTOMER_SITE_URL}/login`}
          className="font-semibold text-primary-deep hover:text-primary"
        >
          {LOGIN_COPY.customerLink}
        </a>
      </p>
    </>
  )
}
