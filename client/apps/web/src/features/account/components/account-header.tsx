import { Button } from "@workspace/ui/components/button"

import { BrandLogo } from "@/components/brand/brand-logo"

type Props = {
  onLogout: () => void
  isLoggingOut: boolean
}

export function AccountHeader({ onLogout, isLoggingOut }: Props) {
  return (
    <header className="bg-[var(--ink)]">
      <div className="mx-auto flex h-16 max-w-[1200px] items-center justify-between px-4 md:px-8">
        <BrandLogo size="sm" />
        <Button
          variant="ghost"
          size="lg"
          onClick={onLogout}
          disabled={isLoggingOut}
          className="h-10 px-3 text-white hover:bg-white/10 hover:text-white"
        >
          {isLoggingOut ? "Logging out…" : "Log out"}
        </Button>
      </div>
    </header>
  )
}
