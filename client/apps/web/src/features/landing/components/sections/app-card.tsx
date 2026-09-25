import type { ReactNode } from "react"

import type { AppRole } from "@/features/landing/types/landing.types"

type Props = {
  app: AppRole
  /** Illustrative screen from that app. */
  preview: ReactNode
}

export function AppCard({ app, preview }: Props) {
  return (
    <li className="flex flex-col overflow-hidden rounded-[6px] border border-border bg-card">
      <div className="px-5 pt-[18px] pb-4">
        <p className="text-[11.5px] font-bold tracking-[0.14em] text-primary-deep uppercase">
          {app.role}
        </p>
        <h3 className="mt-1.5 text-[17px] leading-[normal] font-bold tracking-[-0.012em] text-ink">
          {app.title}
        </h3>
      </div>

      <div
        aria-hidden="true"
        className="flex flex-1 flex-col justify-start bg-surface-sunken p-5 lg:h-[268px] lg:flex-none"
      >
        {preview}
      </div>

      <p className="px-5 py-[18px] text-[13.5px] leading-[1.55] text-muted-foreground">
        {app.summary}
      </p>
    </li>
  )
}
