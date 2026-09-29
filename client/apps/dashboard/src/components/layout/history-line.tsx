import { cn } from "@workspace/ui/lib/utils"

export type HistoryEntry = {
  key: string
  title: string
  detail?: string
  /** Dot colour: what kind of moment it was. */
  tone?: "neutral" | "primary" | "success" | "danger" | "ink" | "pending"
}

const DOT_TONES = {
  neutral: "bg-line-strong",
  primary: "bg-primary",
  success: "bg-[#11705A]",
  danger: "bg-destructive",
  ink: "bg-ink",
  pending: "bg-line-strong",
} as const

/** A vertical line of dated events — it stops where the truth stops. */
export function HistoryLine({ entries }: { entries: HistoryEntry[] }) {
  return (
    <ol className="border-l-2 border-border pl-4">
      {entries.map((entry, index) => (
        <li
          key={entry.key}
          className={cn(
            "relative",
            index < entries.length - 1 && "pb-[13px]"
          )}
        >
          <span
            aria-hidden="true"
            className={cn(
              "absolute top-1 -left-[22px] size-[9px] rounded-full",
              DOT_TONES[entry.tone ?? "neutral"]
            )}
          />
          <div
            className={cn(
              "text-[13.5px] font-semibold",
              entry.tone === "pending" && "text-muted-foreground"
            )}
          >
            {entry.title}
          </div>
          {entry.detail ? (
            <div className="mt-0.5 font-narrow text-[12.5px] leading-[1.5] text-muted-foreground">
              {entry.detail}
            </div>
          ) : null}
        </li>
      ))}
    </ol>
  )
}
