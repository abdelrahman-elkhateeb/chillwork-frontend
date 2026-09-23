import { BrandLogo } from "@/components/brand/brand-logo"
import { LOGIN_COPY } from "@/features/auth/constants/auth-copy.constants"

export function LoginMobileHeader() {
  return (
    <>
      <BrandLogo size="sm" />
      <p className="mt-4 font-heading text-[19px] leading-[1.1] font-bold tracking-[-0.02em] text-[#F7F8F8] uppercase">
        {LOGIN_COPY.asideTitle}
      </p>
    </>
  )
}
