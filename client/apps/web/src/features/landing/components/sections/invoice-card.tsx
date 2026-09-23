import { cn } from "@workspace/ui/lib/utils"

import { INVOICE } from "@/features/landing/constants/billing.constants"

/** Sample invoice built from the parts the technician fitted. */
export function InvoiceCard() {
  return (
    <div className="overflow-hidden rounded-[var(--radius-card)] bg-card text-ink">
      <div className="flex items-center justify-between border-b border-border bg-surface-sunken px-4 py-[13px] md:px-5 md:py-3.5">
        <span className="font-mono text-[12.5px] font-semibold md:text-[13px]">
          {INVOICE.number}
        </span>
        <span className="rounded-[3px] border border-[rgba(23,135,106,0.38)] bg-[rgba(23,135,106,0.13)] px-2 py-[3px] text-[11px] font-bold tracking-[0.08em] text-[#11705A] uppercase md:px-[9px] md:py-1 md:text-[11.5px]">
          {INVOICE.status}
        </span>
      </div>

      <div className="px-4 pt-1 pb-0.5 md:px-5 md:pt-1.5 md:pb-1">
        <ul>
          {INVOICE.lines.map((line) => (
            <li
              key={line.title}
              className={cn(
                "flex justify-between gap-4 border-b border-secondary py-3 md:py-[13px]",
                line.dropped && "opacity-50"
              )}
            >
              <div>
                <p
                  className={cn(
                    "text-[13.5px] md:text-[14px]",
                    line.dropped && "line-through"
                  )}
                >
                  {line.title}
                  {line.code ? (
                    <span className="font-mono text-[12px] text-muted-foreground md:text-[12.5px]">
                      {" "}
                      {line.code}
                    </span>
                  ) : null}
                </p>
                <p className="mt-0.5 text-[12px] text-muted-foreground md:text-[12.5px]">
                  <span className="md:hidden">{line.mobileDetail}</span>
                  <span className="hidden md:inline">{line.detail}</span>
                </p>
              </div>
              <span className="shrink-0 font-mono text-[13px] md:text-[13.5px]">
                {line.amount}
              </span>
            </li>
          ))}
        </ul>

        <div className="flex items-center justify-between pt-[15px] pb-[17px] md:pt-4 md:pb-[18px]">
          <span className="font-heading text-[13.5px] font-bold tracking-[-0.012em] uppercase md:text-[14px]">
            Total
          </span>
          <span className="font-mono text-[17px] font-semibold md:text-[19px]">
            {INVOICE.total}
          </span>
        </div>
      </div>
    </div>
  )
}
