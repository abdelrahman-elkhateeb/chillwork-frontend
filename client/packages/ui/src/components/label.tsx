import * as React from "react"
import { cn } from "cn"

function Label({ className, ...props }: React.ComponentProps<"label">) {
  return (
    <label
      data-slot="label"
      className={cn(
        "block text-[13.5px] font-semibold text-foreground select-none",
        className
      )}
      {...props}
    />
  )
}

export { Label }
