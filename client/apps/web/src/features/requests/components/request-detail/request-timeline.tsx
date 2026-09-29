import { Skeleton } from "@workspace/ui/components/skeleton"
import { cn } from "@workspace/ui/lib/utils"

import type { TimelineLine } from "@/features/requests/lib/request-display"

const DOT_TONES = {
  neutral: "bg-line-strong",
  primary: "bg-primary",
  success: "bg-[#11705A]",
  failed: "bg-[#B3201A]",
  ink: "bg-ink",
} as const satisfies Record<TimelineLine["tone"], string>

export function RequestTimeline({ lines }: { lines: TimelineLine[] }) {
  return (
    <ol className="mt-3 border-l-2 border-border pl-4">
      {lines.map((line) => (
        <li key={line.key} className="relative pb-[15px] last:pb-0">
          <span
            aria-hidden
            className={cn(
              "absolute top-1 -left-[22px] size-[9px] rounded-full",
              DOT_TONES[line.tone]
            )}
          />
          <div className="text-[13.5px] font-semibold">{line.title}</div>
          <div className="mt-0.5 font-narrow text-[12.5px] leading-[1.5] text-muted-foreground">
            {line.detail}
          </div>
        </li>
      ))}
    </ol>
  )
}

export function RequestTimelineSkeleton() {
  return (
    <div
      role="status"
      aria-label="Loading"
      className="mt-3 flex flex-col gap-4 border-l-2 border-border pl-4"
    >
      {[0, 1, 2].map((row) => (
        <div key={row}>
          <Skeleton className="h-3 w-40" />
          <Skeleton className="mt-2 h-2.5 w-24 bg-[#EDEEEE]" />
        </div>
      ))}
    </div>
  )
}
