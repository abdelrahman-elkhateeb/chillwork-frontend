import type { ReactNode } from "react"
import { cn } from "@workspace/ui/lib/utils"

type Props = {
  title: string
  description: string
  action: ReactNode
  /** Hatched: "not yours, but nothing is wrong" (the technician on /parts). */
  hatched?: boolean
}

/**
 * The polite redirect for a door that isn't theirs. It is a courtesy, not
 * the lock — the API refuses the request on its own either way.
 */
export function WrongDoorNotice({
  title,
  description,
  action,
  hatched = false,
}: Props) {
  return (
    <div className="flex min-h-[60svh] items-center justify-center px-4 py-10">
      <div
        role="status"
        className={cn(
          "w-full max-w-[440px] rounded-[6px] border border-l-[3px] border-line-strong border-l-ink bg-surface-sunken px-[18px] py-4",
          hatched && "bg-hatch-muted"
        )}
      >
        <div className="text-[15px] font-bold">{title}</div>
        <p className="mt-1.5 font-narrow text-[13.5px] leading-[1.5] text-muted-foreground">
          {description}
        </p>
        <div className="mt-3 text-[13.5px] font-semibold">{action}</div>
      </div>
    </div>
  )
}
