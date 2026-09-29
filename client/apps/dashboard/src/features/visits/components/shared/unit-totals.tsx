import { Card } from "@workspace/ui/components/card"

import { formatMoney } from "@/lib/format/money"

type Props = {
  partsLabel: string
  partsMinor: number
  laborLabel: string
  laborFeeMinor: number | null
  currency: string | null
}

/** The ink money box: parts for this unit, plus labour if it gets fixed. */
export function UnitTotals({
  partsLabel,
  partsMinor,
  laborLabel,
  laborFeeMinor,
  currency,
}: Props) {
  return (
    <Card className="gap-0 rounded-[6px] border-0 bg-ink px-[15px] py-3.5">
      <div className="flex items-center justify-between">
        <span className="font-narrow text-[12.5px] text-paper/60">
          {partsLabel}
        </span>
        <span className="font-mono text-[15px] font-semibold text-paper-bright">
          {formatMoney(partsMinor, currency)}
        </span>
      </div>
      {laborFeeMinor !== null ? (
        <div className="mt-2 flex items-center justify-between border-t border-paper/14 pt-2">
          <span className="font-narrow text-[12.5px] text-paper/60">
            {laborLabel}
          </span>
          <span className="font-mono text-[13px] text-paper/80">
            {formatMoney(laborFeeMinor, currency)}
          </span>
        </div>
      ) : null}
    </Card>
  )
}
