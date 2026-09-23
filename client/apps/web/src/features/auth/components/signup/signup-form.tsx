import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import { FormAlert } from "@/components/form/form-alert"
import { PasswordField } from "@/components/form/password-field"
import { SubmitButton } from "@/components/form/submit-button"
import { TextField } from "@/components/form/text-field"
import { applyServerFieldErrors } from "@/lib/forms/apply-server-field-errors"
import { ROUTES } from "@/config/routes"
import { AuthFormHeader } from "@/features/auth/components/layout/auth-form-header"
import { AuthTextLink } from "@/features/auth/components/layout/auth-text-link"
import { SIGNUP_COPY } from "@/features/auth/constants/auth-copy.constants"
import { EMAIL_TAKEN_MESSAGE } from "@/features/auth/constants/auth-messages.constants"
import { useSignup } from "@/features/auth/hooks/use-signup"
import {
  getAuthErrorAlert,
  isEmailTakenError,
} from "@/features/auth/lib/get-auth-error-alert"
import { signupSchema } from "@/features/auth/schemas/signup.schema"
import type { SignupFormValues } from "@/features/auth/types/auth-form.types"
import type { SignupResult } from "@/features/auth/types/auth.types"

const SERVER_FIELDS = ["name", "email", "phone", "password"] as const

type Props = {
  onSuccess: (result: SignupResult) => void
}

export function SignupForm({ onSuccess }: Props) {
  const signup = useSignup()
  const {
    register,
    handleSubmit,
    setError,
    getValues,
    formState: { errors },
  } = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
    },
  })

  const onSubmit = handleSubmit(({ name, email, phone, password }) => {
    signup.mutate(
      { name, email, phone, password },
      {
        onSuccess,
        onError: (error) => {
          if (isEmailTakenError(error)) {
            setError("email", { type: "server", message: EMAIL_TAKEN_MESSAGE })
            return
          }
          applyServerFieldErrors(error, setError, SERVER_FIELDS)
        },
      }
    )
  })

  const alert = getAuthErrorAlert(signup.error)
  const emailTaken = errors.email?.message === EMAIL_TAKEN_MESSAGE

  return (
    <>
      <AuthFormHeader
        title={SIGNUP_COPY.title}
        description={SIGNUP_COPY.description}
      />

      {alert ? <FormAlert {...alert} className="mt-6" /> : null}

      <form noValidate onSubmit={onSubmit} className="mt-[26px]">
        <fieldset
          disabled={signup.isPending}
          className="flex min-w-0 flex-col gap-4"
        >
          <TextField
            label="Full name"
            autoComplete="name"
            placeholder="Nadia Farouk"
            autoFocus
            error={errors.name?.message}
            {...register("name")}
          />

          <div>
            <TextField
              label="Email"
              type="email"
              autoComplete="email"
              placeholder="nadia@example.com"
              error={errors.email?.message}
              {...register("email")}
            />
            {emailTaken ? (
              <AuthTextLink
                to={ROUTES.login}
                state={{ email: getValues("email") }}
                className="mt-2 inline-block text-[13px]"
              >
                Log in instead →
              </AuthTextLink>
            ) : null}
          </div>

          <TextField
            label="Phone"
            type="tel"
            autoComplete="tel"
            inputMode="tel"
            placeholder="+20 100 000 0000"
            hint="The technician calls this number when they're on the way."
            error={errors.phone?.message}
            {...register("phone")}
          />

          <PasswordField
            label="Password"
            autoComplete="new-password"
            placeholder="At least 8 characters"
            error={errors.password?.message}
            {...register("password")}
          />

          <PasswordField
            label="Confirm password"
            autoComplete="new-password"
            placeholder="Type it again"
            revealable={false}
            error={errors.confirmPassword?.message}
            {...register("confirmPassword")}
          />
        </fieldset>

        <SubmitButton
          pending={signup.isPending}
          pendingLabel={SIGNUP_COPY.pending}
          className="mt-[26px]"
        >
          {SIGNUP_COPY.submit}
        </SubmitButton>
      </form>

      <p className="mt-[18px] text-center text-[14.5px] text-muted-foreground">
        Already have an account?{" "}
        <AuthTextLink to={ROUTES.login}>Log in</AuthTextLink>
      </p>
    </>
  )
}
