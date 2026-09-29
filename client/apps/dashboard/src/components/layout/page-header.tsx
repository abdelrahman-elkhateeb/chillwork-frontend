import type { ReactNode } from "react"
import { cn } from "@workspace/ui/lib/utils"

type Props = {
  title: ReactNode
  description?: ReactNode
  /** Right-aligned actions (e.g. "Add a part"). */
  actions?: ReactNode
  className?: string
}

/** The H1 at the top of an admin page. */
export function PageHeader({ title, description, actions, className }: Props) {
  return (
    <div
      className={cn(
        "flex flex-wrap items-start justify-between gap-x-6 gap-y-3",
        className
      )}
    >
      <div className="min-w-0">
        <h1 className="text-[26px] leading-[1.1] font-bold">{title}</h1>
        {description ? (
          <p className="mt-1.5 font-narrow text-[14.5px] text-muted-foreground">
            {description}
          </p>
        ) : null}
      </div>
      {actions ? <div className="flex shrink-0 gap-2">{actions}</div> : null}
    </div>
  )
}
