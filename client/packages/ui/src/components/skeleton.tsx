import { cn } from "cn"

/** A block the shape of what is coming — never a spinner in the middle. */
function Skeleton({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="skeleton"
      className={cn("animate-pulse rounded-[2px] bg-[#E4E6E6]", className)}
      {...props}
    />
  )
}

export { Skeleton }
