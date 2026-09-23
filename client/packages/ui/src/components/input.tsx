import * as React from "react"
import { cn } from "cn"

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "h-[46px] w-full min-w-0 rounded-[var(--radius-control)] border border-[#C0C4C4] bg-card px-3.5 text-[15px] text-foreground transition-[border-color,box-shadow] outline-none placeholder:text-muted-foreground/70",
        "focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/25",
        "disabled:cursor-not-allowed disabled:border-border disabled:bg-[#EFF0F0] disabled:text-[#9EA4A6]",
        "aria-invalid:border-[1.5px] aria-invalid:border-destructive aria-invalid:bg-white aria-invalid:focus-visible:ring-destructive/20",
        className
      )}
      {...props}
    />
  )
}

export { Input }
