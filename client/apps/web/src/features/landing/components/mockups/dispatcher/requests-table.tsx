import { cn } from "@workspace/ui/lib/utils"

import { StatusBadge } from "@/features/landing/components/mockups/status-badge"
import {
  DISPATCHER_MOCKUP,
  REQUEST_ROWS,
} from "@/features/landing/constants/dispatcher-mockup.constants"
import type {
  RequestStatus,
  StatusTone,
} from "@/features/landing/types/mockup.types"

const STATUS: Record<RequestStatus, { label: string; tone: StatusTone }> = {
  "in-triage": { label: "In triage", tone: "progress" },
  scheduled: { label: "Scheduled", tone: "info" },
  "on-site": { label: "On site", tone: "progress" },
  invoiced: { label: "Invoiced", tone: "success" },
  escalated: { label: "Escalated", tone: "danger" },
}

const COLUMNS = "grid-cols-[84px_132px_88px_48px_minmax(0,1fr)_100px_96px]"

export function RequestsTable() {
  return (
    <div className="min-w-0 flex-1 bg-card px-[18px]">
      <div
        className={cn(
          "grid h-[31px] items-center border-b border-border text-[11px] font-bold tracking-[0.1em] text-muted-foreground uppercase",
          COLUMNS
        )}
      >
        {DISPATCHER_MOCKUP.columns.map((column) => (
          <span key={column}>{column}</span>
        ))}
      </div>

      <ul>
        {REQUEST_ROWS.map((row) => (
          <li
            key={row.id}
            className={cn(
              "-mx-[18px] grid h-[41px] items-center border-b border-secondary px-[18px] font-narrow text-[13px]",
              COLUMNS,
              row.highlighted && "bg-primary/[0.06]"
            )}
          >
            <span className="font-mono text-[12px] font-semibold text-ink">
              {row.id}
            </span>
            <span className="truncate text-[13.5px] font-medium text-ink">
              {row.customer}
            </span>
            <span className="text-muted-foreground">{row.area}</span>
            <span className="font-mono text-[12px] text-ink">{row.units}</span>
            <span className="flex min-w-0 items-center gap-1.5 truncate text-[13.5px] text-ink">
              {row.reading}
              {row.readingNote ? (
                row.readingNote.kind === "in-stock" ? (
                  <span className="text-[#17876A]">{row.readingNote.text}</span>
                ) : (
                  <span className="rounded-[2px] border border-destructive/40 bg-hatch px-1.5 py-0.5 text-[11px] font-bold tracking-[0.08em] text-[#8E1913] uppercase">
                    {row.readingNote.text}
                  </span>
                )
              ) : null}
            </span>
            <span>
              <StatusBadge tone={STATUS[row.status].tone}>
                {STATUS[row.status].label}
              </StatusBadge>
            </span>
            <span className="text-ink">{row.technician}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
