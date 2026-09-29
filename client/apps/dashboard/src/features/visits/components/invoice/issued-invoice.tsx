import { Link } from "react-router-dom"
import { CheckIcon } from "lucide-react"
import { Button } from "@workspace/ui/components/button"
import { Card } from "@workspace/ui/components/card"

import { ROUTES } from "@/config/routes"
import { formatMoney } from "@/lib/format/money"
import { BillCard } from "@/features/visits/components/invoice/bill-card"
import type { Invoice } from "@/features/visits/types/visit.types"

/** "That's the job closed" — and what it moved off the shelf. */
export function IssuedInvoice({ invoice }: { invoice: Invoice }) {
  const charged = invoice.devices.filter((device) => device.billable).length
  const partsTaken = invoice.devices
    .filter((device) => device.billable)
    .flatMap((device) => device.parts)
    .reduce((sum, part) => sum + part.quantity, 0)

  return (
    <div role="status">
      <div className="flex items-center gap-[11px]">
        <span className="flex size-[30px] items-center justify-center rounded-full bg-[#11705A] text-white">
          <CheckIcon className="size-4" strokeWidth={3} />
        </span>
        <span className="text-[15px] font-semibold">
          {invoice.paymentState === "NOT_REQUIRED"
            ? "Closed — nothing to charge"
            : "That's the job closed"}
        </span>
      </div>

      <Card className="mt-[18px] gap-0 rounded-[6px] border-0 bg-ink px-[18px] py-4">
        <div className="font-narrow text-[11.5px] font-bold tracking-[0.1em] text-paper/45 uppercase">
          Invoice
        </div>
        <div className="mt-1.5 font-mono text-[28px] font-semibold text-paper-bright">
          {invoice.reference}
        </div>
        <div className="mt-3 flex items-center justify-between border-t border-paper/14 pt-[11px]">
          <span className="font-narrow text-[12.5px] text-paper/60">Total</span>
          <span className="font-mono text-[17px] font-semibold text-paper-bright">
            {formatMoney(invoice.totalMinor, invoice.currency)}
          </span>
        </div>
      </Card>

      <Card className="mt-3.5 gap-0 rounded-[6px] px-3.5 py-[13px] font-narrow text-[13px]">
        <div className="flex items-center justify-between border-b border-[#EDEEEE] pb-[9px]">
          <span>Units charged</span>
          <span className="text-[12.5px] font-bold">
            {charged} of {invoice.devices.length}
          </span>
        </div>
        <div className="flex items-center justify-between pt-[9px]">
          <span>Stock came down</span>
          <span className="text-[12.5px] font-bold">
            {partsTaken} {partsTaken === 1 ? "part" : "parts"}
          </span>
        </div>
      </Card>

      <div className="mt-3.5">
        <BillCard bill={invoice} />
      </div>

      <Button asChild className="mt-[18px] h-[54px] w-full text-[15px] font-semibold">
        <Link to={ROUTES.visits}>Back to my visits</Link>
      </Button>
      <p className="mt-3 font-narrow text-[12.5px] leading-[1.5] text-muted-foreground">
        Taking the money is a separate step that isn't built yet. The invoice
        stands on its own.
      </p>
    </div>
  )
}
