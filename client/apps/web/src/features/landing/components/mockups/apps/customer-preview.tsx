import { Card } from "@workspace/ui/components/card"
import { cn } from "@workspace/ui/lib/utils"

import { CUSTOMER_PREVIEW } from "@/features/landing/constants/apps.constants"

const CARD = "rounded-[6px] border-secondary px-3.5"

/** The customer's request tracker: status, agreed price, report. */
export function CustomerPreview() {
  return (
    <div className="flex flex-col gap-[9px]">
      <Card className={cn(CARD, "block py-3")}>
        <div className="flex items-center justify-between">
          <span className="font-mono text-[12px] font-semibold text-ink">
            {CUSTOMER_PREVIEW.request}
          </span>
          <span className="font-narrow text-[11px] font-bold tracking-[0.08em] text-[#145A75] uppercase">
            {CUSTOMER_PREVIEW.status}
          </span>
        </div>
        <p className="mt-2 text-[13.5px] font-semibold text-ink">
          {CUSTOMER_PREVIEW.visit}
        </p>
        <p className="mt-0.5 text-[12.5px] text-muted-foreground">
          {CUSTOMER_PREVIEW.units}
        </p>
      </Card>

      {CUSTOMER_PREVIEW.rows.map((row) => (
        <Card
          key={row.label}
          className={cn(CARD, "h-[38px] flex-row items-center justify-between")}
        >
          <span className="text-[13px] text-ink">{row.label}</span>
          <span
            className={
              row.kind === "amount"
                ? "font-mono text-[12.5px] text-ink"
                : "text-[13px] font-semibold text-primary-deep"
            }
          >
            {row.value}
          </span>
        </Card>
      ))}
    </div>
  )
}
