import { ROUTES } from "@/config/routes"
import { AuthAside } from "@/features/auth/components/layout/auth-aside"
import { AuthTextLink } from "@/features/auth/components/layout/auth-text-link"
import { SignupSteps } from "@/features/auth/components/signup/signup-steps"
import { SIGNUP_COPY } from "@/features/auth/constants/auth-copy.constants"

export function SignupAside() {
  return (
    <AuthAside
      title={SIGNUP_COPY.asideTitle}
      description={SIGNUP_COPY.asideDescription}
      drawing="split"
      footer={
        <>
          Already sent a request?{" "}
          <AuthTextLink to={ROUTES.login} onDark>
            Log in to follow it
          </AuthTextLink>
        </>
      }
    >
      <SignupSteps />
    </AuthAside>
  )
}
