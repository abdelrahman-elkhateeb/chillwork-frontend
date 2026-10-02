import { Card } from "@workspace/ui/components/card"
import { Separator } from "@workspace/ui/components/separator"

import { CUSTOMER_REPORT } from "@/features/landing/constants/triage.constants"

/** What the customer actually said, kept verbatim. */
export function CustomerReportCard() {
  return (
    <Card className="block border-paper/15 bg-transparent p-5 text-inherit">
      <p className="text-[11.5px] font-bold tracking-[0.14em] text-paper/50 uppercase">
        {CUSTOMER_REPORT.label}
      </p>
      <blockquote className="mt-3 text-[14.5px] leading-[1.6] text-paper/85">
        {CUSTOMER_REPORT.quote}
      </blockquote>

      <ul className="mt-4 flex flex-col gap-1.5">
        {CUSTOMER_REPORT.units.map((unit) => (
          <li
            key={unit}
            className="rounded-[4px] border border-paper/20 px-3 py-2 font-mono text-[12px] text-paper/70"
          >
            {unit}
          </li>
        ))}
      </ul>

      <Separator className="mt-4 bg-paper/12" />
      <div className="pt-4">
        <p className="text-[11.5px] font-bold tracking-[0.14em] text-paper/50 uppercase">
          {CUSTOMER_REPORT.fallbackLabel}
        </p>
        <p className="mt-2 text-[13.5px] leading-[1.55] text-paper/65">
          {CUSTOMER_REPORT.fallback}
        </p>
      </div>
    </Card>
  )
}
