import type { ComponentProps } from "react"
import { cn } from "@workspace/ui/lib/utils"

/** The design's page gutter: 20px on phones, 64px from tablet up, 1440 max. */
export function LandingContainer({
  className,
  ...props
}: ComponentProps<"div">) {
  return (
    <div
      className={cn("mx-auto w-full max-w-[1440px] px-5 md:px-16", className)}
      {...props}
    />
  )
}
