import type { ReactNode } from "react"

import { BrandLogo } from "@/components/brand/brand-logo"

type Props = {
  /** Dark side panel, shown from `lg` up. */
  aside: ReactNode
  children: ReactNode
}

export function AuthLayout({ aside, children }: Props) {
  return (
    <div className="flex min-h-svh bg-background text-foreground">
      <aside className="relative hidden w-[548px] shrink-0 flex-col justify-between gap-10 overflow-hidden bg-ink px-[52px] py-12 lg:flex">
        {aside}
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="bg-ink px-5 py-[18px] lg:hidden">
          <BrandLogo size="sm" withTag />
        </header>

        <main className="flex flex-1 justify-center px-5 py-8 sm:px-10 sm:py-12 lg:items-center lg:px-16 lg:py-14">
          <div className="w-full max-w-[420px]">{children}</div>
        </main>
      </div>
    </div>
  )
}
