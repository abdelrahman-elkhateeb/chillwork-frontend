import type { ReactNode } from "react"
import { cn } from "@workspace/ui/lib/utils"

import type { StatusTone } from "@/features/landing/types/mockup.types"

const TONE_CLASSES: Record<StatusTone, string> = {
  info: "border-[#1F6FA8]/35 bg-[#1F6FA8]/10 text-[#17557E]",
  progress: "border-[#19A2C4]/45 bg-[#19A2C4]/10 text-[#145A75]",
  success: "border-[#17876A]/35 bg-[#17876A]/10 text-[#11705A]",
  danger: "border-destructive/35 bg-destructive/[0.07] text-[#8E1913]",
}

type Props = {
  tone: StatusTone
  children: ReactNode
  className?: string
}

/** Small bordered uppercase status label used across the product mockups. */
export function StatusBadge({ tone, children, className }: Props) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-[3px] border px-[7px] py-[5px] font-narrow text-[11px] leading-none font-bold tracking-[0.08em] whitespace-nowrap uppercase",
        TONE_CLASSES[tone],
        className
      )}
    >
      {children}
    </span>
  )
}
