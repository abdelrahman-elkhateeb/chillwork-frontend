import type { ReactNode } from "react"
import { Badge } from "@workspace/ui/components/badge"

import type { StatusTone } from "@/features/landing/types/mockup.types"

const TONE_VARIANTS = {
  info: "info",
  progress: "progress",
  success: "success",
  danger: "destructive",
} as const satisfies Record<StatusTone, string>

type Props = {
  tone: StatusTone
  children: ReactNode
  className?: string
}

/** Small bordered uppercase status label used across the product mockups. */
export function StatusBadge({ tone, children, className }: Props) {
  return (
    <Badge variant={TONE_VARIANTS[tone]} className={className}>
      {children}
    </Badge>
  )
}
