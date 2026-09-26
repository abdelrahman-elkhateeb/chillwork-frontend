import { BrandLogo } from "@/components/brand/brand-logo"
import { UserMenu, type AuthUser } from "@/features/auth"

export function RequestHeader({ user }: { user: AuthUser }) {
  return (
    <header className="bg-ink">
      <div className="mx-auto flex h-[62px] max-w-[1440px] items-center justify-between px-4 md:px-12">
        <BrandLogo size="sm" />
        <UserMenu user={user} />
      </div>
    </header>
  )
}
