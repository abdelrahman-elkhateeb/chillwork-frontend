import type { ReactNode } from "react"
import { cn } from "@workspace/ui/lib/utils"

type Props = {
  title: ReactNode
  children?: ReactNode
  /** red: can't be done / excluded. muted: missing or locked, not an error. */
  tone?: "red" | "muted"
  className?: string
}

/**
 * Hatching means excluded, everywhere: the part not on the shelf, the unit
 * that was not fixed, the AI reading that isn't there, the locked field.
 */
export function HatchedNote({
  title,
  children,
  tone = "muted",
  className,
}: Props) {
  return (
    <div
      className={cn(
        "rounded-[4px] border px-[11px] py-[9px]",
        tone === "red"
          ? "border-destructive/40 bg-hatch"
          : "border-line-strong bg-hatch-muted",
        className
      )}
    >
      <div
        className={cn(
          "font-narrow text-[12.5px] font-bold",
          tone === "red" && "text-[#8E1913]"
        )}
      >
        {title}
      </div>
      {children ? (
        <div className="mt-0.5 font-narrow text-[12px] leading-[1.45] text-muted-foreground">
          {children}
        </div>
      ) : null}
    </div>
  )
}
