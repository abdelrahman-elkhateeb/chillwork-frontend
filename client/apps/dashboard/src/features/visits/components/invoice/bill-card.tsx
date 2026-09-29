import type { ReactNode } from "react"
import { Badge } from "@workspace/ui/components/badge"
import { Card } from "@workspace/ui/components/card"
import { cn } from "@workspace/ui/lib/utils"

import { formatMoney } from "@/lib/format/money"
import { FAILURE_REASON_LABELS } from "@/features/visits/constants/visit-copy.constants"
import type {
  InvoiceDevice,
  InvoicePreview,
} from "@/features/visits/types/visit.types"

function Line({
  label,
  amount,
  muted = false,
}: {
  label: ReactNode
  amount: string
  muted?: boolean
}) {
  return (
    <div className="mt-[5px] flex justify-between gap-3 first:mt-2">
      <span className={cn("text-[13.5px]", muted && "text-muted-foreground")}>
        {label}
      </span>
      <span
        className={cn(
          "shrink-0 font-mono text-[13px]",
          muted && "text-[#8E1913]"
        )}
      >
        {amount}
      </span>
    </div>
  )
}

function DeviceSection({
  device,
  currency,
}: {
  device: InvoiceDevice
  currency: string
}) {
  const fixed = device.result === "REPAIRED"
  const failed = device.result === "FAILED"

  return (
    <div
      className={cn(
        "border-b border-[#EDEEEE] py-[11px]",
        failed && "-mx-3.5 bg-hatch px-3.5"
      )}
    >
      <div className="flex items-center justify-between gap-3">
        <span className="font-narrow text-[11px] font-bold tracking-[0.08em] text-[#8A9093] uppercase">
          {device.label}
        </span>
        {fixed ? (
          <Badge variant="success" className="px-[7px] py-0.5">
            Fixed
          </Badge>
        ) : failed ? (
          <Badge variant="destructive" className="bg-card px-[7px] py-0.5">
            Not fixed
          </Badge>
        ) : (
          <Badge variant="secondary" className="px-[7px] py-0.5">
            No outcome yet
          </Badge>
        )}
      </div>

      {fixed ? (
        <>
          <Line
            label="Labour, this unit"
            amount={formatMoney(device.laborMinor, currency)}
          />
          {device.parts.map((part) => (
            <Line
              key={part.partId}
              label={
                <>
                  {part.name}{" "}
                  <span className="font-mono text-[12px] text-muted-foreground">
                    ×{part.quantity}
                  </span>
                </>
              }
              amount={formatMoney(part.lineTotalMinor, currency)}
            />
          ))}
        </>
      ) : failed ? (
        <>
          <Line label="No labour, no parts" amount="—" muted />
          {device.failureReason ? (
            <div className="mt-[5px] font-narrow text-[12px] leading-[1.4] font-bold text-[#8E1913]">
              {FAILURE_REASON_LABELS[device.failureReason]}.
            </div>
          ) : null}
        </>
      ) : (
        <Line label="Counts nothing until it has an outcome" amount="—" muted />
      )}
    </div>
  )
}

/** Grouped by unit; labour is per fixed unit, never per visit. */
export function BillCard({ bill }: { bill: InvoicePreview }) {
  return (
    <Card className="gap-0 rounded-[6px] px-3.5 pt-1 pb-1.5">
      {bill.devices.map((device) => (
        <DeviceSection
          key={device.clientDeviceId}
          device={device}
          currency={bill.currency}
        />
      ))}
      <div className="flex items-center justify-between pt-3.5 pb-[15px]">
        <span className="font-heading text-[13.5px] font-bold uppercase">
          Total
        </span>
        <span className="font-mono text-[20px] font-semibold">
          {formatMoney(bill.totalMinor, bill.currency)}
        </span>
      </div>
    </Card>
  )
}
