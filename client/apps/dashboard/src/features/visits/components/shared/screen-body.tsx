import type { ReactNode } from "react"
import { cn } from "@workspace/ui/lib/utils"

import {
  SCREEN_GUTTER,
  SCREEN_WIDTH,
  type ScreenWidth,
} from "@/features/visits/components/shared/screen-width"

type Props = {
  /** Match the screen's `ScreenHeader`. */
  width?: ScreenWidth
  className?: string
  children: ReactNode
}

/** Everything under the ink header, held to the screen's width. */
export function ScreenBody({ width = "narrow", className, children }: Props) {
  return (
    <div className={cn(SCREEN_GUTTER, SCREEN_WIDTH[width], className)}>
      {children}
    </div>
  )
}
