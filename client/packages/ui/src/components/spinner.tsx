import * as React from "react"
import { cn } from "cn"

function Spinner({ className, ...props }: React.ComponentProps<"svg">) {
  return (
    <svg
      data-slot="spinner"
      viewBox="0 0 15 15"
      aria-hidden="true"
      className={cn("size-[15px] animate-spin", className)}
      {...props}
    >
      <circle
        cx="7.5"
        cy="7.5"
        r="6"
        fill="none"
        stroke="currentColor"
        strokeOpacity="0.28"
        strokeWidth="2.4"
      />
      <path
        d="M7.5 1.5 A6 6 0 0 1 13.5 7.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
      />
    </svg>
  )
}

export { Spinner }
