import type { ReactNode } from "react"

type Props = {
  /** Dark side panel, shown from `lg` up. */
  aside: ReactNode
  /** Compact dark strip that replaces the side panel on small screens. */
  mobileHeader: ReactNode
  children: ReactNode
}

export function AuthLayout({ aside, mobileHeader, children }: Props) {
  return (
    <div className="flex min-h-svh bg-background text-foreground">
      <aside className="relative hidden w-[548px] shrink-0 flex-col justify-between overflow-hidden bg-[var(--ink)] px-[52px] py-12 lg:flex">
        {aside}
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="bg-[var(--ink)] px-5 pt-[18px] pb-5 lg:hidden">
          {mobileHeader}
        </header>

        <main className="flex flex-1 justify-center px-5 py-8 sm:px-10 sm:py-12 lg:items-center lg:px-16 lg:py-14">
          <div className="w-full max-w-[420px]">{children}</div>
        </main>
      </div>
    </div>
  )
}
