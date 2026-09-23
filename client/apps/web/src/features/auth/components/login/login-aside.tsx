import { ROUTES } from "@/config/routes"
import { AuthAside } from "@/features/auth/components/layout/auth-aside"
import { AuthTextLink } from "@/features/auth/components/layout/auth-text-link"
import { RequestPreviewCard } from "@/features/auth/components/login/request-preview-card"
import { LOGIN_COPY } from "@/features/auth/constants/auth-copy.constants"

export function LoginAside() {
  return (
    <AuthAside
      title={LOGIN_COPY.asideTitle}
      description={LOGIN_COPY.asideDescription}
      drawing="outdoor"
      middle={<RequestPreviewCard />}
      footer={
        <>
          First time here?{" "}
          <AuthTextLink to={ROUTES.signup} onDark>
            Create an account
          </AuthTextLink>
        </>
      }
    />
  )
}
