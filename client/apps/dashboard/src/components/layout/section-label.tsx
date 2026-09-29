import type { ReactNode } from "react"
import { cn } from "@workspace/ui/lib/utils"

/** The orange dash + tracked caps that heads a block ("WAITING FOR A VISIT"). */
export function SectionLabel({
  children,
  aside,
  className,
}: {
  children: ReactNode
  /** Right-aligned link, e.g. "All requests →". */
  aside?: ReactNode
  className?: string
}) {
  return (
    <div
      className={cn("mb-3 flex items-center justify-between gap-3", className)}
    >
      <div className="flex items-center gap-[11px]">
        <span aria-hidden="true" className="block h-[3px] w-5 bg-primary" />
        <h2 className="font-sans text-[11.5px] font-bold tracking-[0.14em] text-primary-deep">
          {children}
        </h2>
      </div>
      {aside ? (
        <div className="font-narrow text-[13px] font-bold">{aside}</div>
      ) : null}
    </div>
  )
}
