import { formatDate } from "@/lib/format/dates"
import { formatMoney } from "@/lib/format/money"
import { MY_REQUESTS_COPY } from "@/features/requests/constants/my-requests-copy.constants"
import type {
  CustomerRequest,
  CustomerVisit,
} from "@/features/requests/types/customer-request.types"

const COPY = MY_REQUESTS_COPY.detail

type Props = {
  request: CustomerRequest
  visit: CustomerVisit & { invoice: NonNullable<CustomerVisit["invoice"]> }
}

/**
 * One visit's invoice. The customer API only gives the total (the
 * itemized view is FS27), so the fixed units are listed by name and the
 * unfixed ones say plainly that nothing was charged for them.
 */
export function BillCard({ request, visit }: Props) {
  const { invoice } = visit
  const devices = request.devices.filter((device) =>
    visit.deviceIds.includes(device.clientDeviceId)
  )
  const fixed = devices.filter((device) => device.progress === "REPAIRED")
  const notFixed = devices.filter(
    (device) => device.progress === "NOT_REPAIRED"
  )

  return (
    <div className="rounded-[6px] border border-border bg-card p-[13px]">
      <div className="flex items-center justify-between gap-3 border-b border-[#E4E6E6] pb-[11px]">
        <span className="font-mono text-[13px] font-semibold">
          {invoice.reference}
        </span>
        <span className="font-narrow text-[12.5px] text-muted-foreground">
          {formatDate(invoice.issuedAt, visit.timezone)}
        </span>
      </div>

      {fixed.length > 0 ? (
        <div className="border-b border-[#E4E6E6] py-[11px]">
          {fixed.map((device) => (
            <div
              key={device.clientDeviceId}
              className="font-narrow text-[11.5px] font-bold tracking-[0.06em] text-muted-foreground uppercase not-first:mt-1.5"
            >
              {device.label} — fixed
            </div>
          ))}
        </div>
      ) : null}

      {notFixed.map((device) => (
        <div
          key={device.clientDeviceId}
          className="border-b border-[#E4E6E6] bg-hatch px-1 py-[11px]"
        >
          <div className="font-narrow text-[11.5px] font-bold tracking-[0.06em] text-muted-foreground uppercase">
            {device.label} — not fixed
          </div>
          <div className="mt-[5px] font-narrow text-[13px] text-muted-foreground">
            {COPY.notFixedLine}
          </div>
        </div>
      ))}

      <div className="flex items-center justify-between pt-[11px]">
        <span className="text-[15px] font-bold">{COPY.total}</span>
        <span className="font-mono text-[18px] font-semibold">
          {formatMoney(invoice.totalMinor, invoice.currency)}
        </span>
      </div>
      <p className="mt-1.5 font-narrow text-[12.5px] leading-[1.5] text-muted-foreground">
        {invoice.paymentState === "NOT_REQUIRED"
          ? COPY.nothingToPay
          : COPY.quoteInvoice}
      </p>
    </div>
  )
}
