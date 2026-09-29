import type { ReactNode } from "react"
import { cn } from "@workspace/ui/lib/utils"

/** Small tracked caps over a value ("IN HER WORDS", "UNIT BY UNIT"). */
export function Eyebrow({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <div
      className={cn(
        "font-narrow text-[11px] font-bold tracking-[0.08em] text-[#8A9093] uppercase",
        className
      )}
    >
      {children}
    </div>
  )
}
