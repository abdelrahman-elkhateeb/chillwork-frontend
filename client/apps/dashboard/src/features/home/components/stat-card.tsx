import type { ReactNode } from "react"
import { Card } from "@workspace/ui/components/card"
import { Skeleton } from "@workspace/ui/components/skeleton"
import { cn } from "@workspace/ui/lib/utils"

type Props = {
  label: string
  value: number | null
  /** Next to the number, e.g. "+2 invited". */
  aside?: ReactNode
  caption: string
  tone?: "ink" | "plain" | "danger"
}

/** One of the three numbers on the admin home. */
export function StatCard({
  label,
  value,
  aside,
  caption,
  tone = "plain",
}: Props) {
  const onInk = tone === "ink"

  return (
    <Card
      className={cn(
        "flex-1 gap-0 rounded-[6px] px-5 py-[18px]",
        onInk && "border-transparent bg-ink"
      )}
    >
      <div
        className={cn(
          "font-narrow text-[11.5px] font-bold tracking-[0.1em] uppercase",
          onInk ? "text-paper/45" : "text-[#8A9093]"
        )}
      >
        {label}
      </div>
      <div className="mt-2 flex items-baseline gap-3">
        {value === null ? (
          <Skeleton
            className={cn("h-[46px] w-14", onInk && "bg-paper/10")}
          />
        ) : (
          <span
            className={cn(
              "font-heading text-[44px] leading-[1.05] font-bold tracking-[-0.03em]",
              onInk && "text-paper-bright",
              tone === "danger" && value > 0 && "text-[#8E1913]"
            )}
          >
            {value}
          </span>
        )}
        {aside}
      </div>
      <div
        className={cn(
          "mt-[3px] font-narrow text-[12.5px]",
          onInk ? "text-paper/55" : "text-muted-foreground"
        )}
      >
        {caption}
      </div>
    </Card>
  )
}
