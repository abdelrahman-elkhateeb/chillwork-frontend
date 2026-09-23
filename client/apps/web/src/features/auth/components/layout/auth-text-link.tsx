import type { ComponentProps } from "react"
import { Link } from "react-router-dom"
import { cn } from "@workspace/ui/lib/utils"

type Props = ComponentProps<typeof Link> & {
  /** Use the brand orange — for links on the dark side panel. */
  onDark?: boolean
}

export function AuthTextLink({ onDark = false, className, ...props }: Props) {
  return (
    <Link
      className={cn(
        "font-semibold transition-colors",
        onDark
          ? "text-primary hover:text-[#F4A576]"
          : "text-[#B8440E] hover:text-primary",
        className
      )}
      {...props}
    />
  )
}
