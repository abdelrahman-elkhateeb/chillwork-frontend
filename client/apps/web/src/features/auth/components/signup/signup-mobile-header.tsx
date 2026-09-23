import { BrandLogo } from "@/components/brand/brand-logo"
import { SignupProgress } from "@/features/auth/components/signup/signup-progress"
import { SIGNUP_COPY } from "@/features/auth/constants/auth-copy.constants"

export function SignupMobileHeader() {
  return (
    <>
      <BrandLogo size="sm" />
      <div className="mt-4">
        <SignupProgress />
      </div>
      <p className="mt-2.5 text-[12.5px] text-[#F0F1F1]/60">
        {SIGNUP_COPY.mobileStep}
      </p>
    </>
  )
}
