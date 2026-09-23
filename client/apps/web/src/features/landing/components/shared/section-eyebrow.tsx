import type { ReactNode } from "react"
import { cn } from "@workspace/ui/lib/utils"

type Props = {
  children: ReactNode
  /** `dark` sections use the bright orange; light ones the deeper, readable one. */
  tone?: "light" | "dark"
  className?: string
}

/** Short orange bar + small caps label that opens every section. */
export function SectionEyebrow({ children, tone = "light", className }: Props) {
  return (
    <div className={cn("flex items-center gap-2.5 md:gap-3", className)}>
      <span aria-hidden="true" className="h-[3px] w-5 bg-primary md:w-[26px]" />
      <span
        className={cn(
          "text-[11px] font-bold tracking-[0.14em] uppercase md:text-[12px]",
          tone === "dark" ? "text-primary" : "text-primary-deep"
        )}
      >
        {children}
      </span>
    </div>
  )
}
