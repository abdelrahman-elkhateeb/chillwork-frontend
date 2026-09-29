import type { ReactNode } from "react"
import { cn } from "@workspace/ui/lib/utils"

type Props = {
  icon?: ReactNode
  title: ReactNode
  description?: ReactNode
  /** The button that gets them out — empty states always carry one. */
  action?: ReactNode
  footer?: ReactNode
  className?: string
}

/** The centred block every empty / error / not-found state is built from. */
export function StatePanel({
  icon,
  title,
  description,
  action,
  footer,
  className,
}: Props) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center px-6 py-10 text-center",
        className
      )}
    >
      {icon ? <div className="text-muted-foreground">{icon}</div> : null}
      <div className={cn("text-[16px] font-bold", icon && "mt-4")}>
        {title}
      </div>
      {description ? (
        <div className="mt-[7px] max-w-[300px] font-narrow text-[13.5px] leading-[1.5] text-muted-foreground">
          {description}
        </div>
      ) : null}
      {action ? <div className="mt-[18px]">{action}</div> : null}
      {footer}
    </div>
  )
}
