import { Link } from "react-router-dom"
import { Button } from "@workspace/ui/components/button"

import { FormAlert } from "@/components/form/form-alert"
import { Eyebrow } from "@/components/layout/eyebrow"
import { HatchedNote } from "@/components/layout/hatched-note"
import { ROUTES, pathTo } from "@/config/routes"
import { formatMoney } from "@/lib/format/money"
import { UnitTotals } from "@/features/visits/components/shared/unit-totals"
import {
  approvedPartsMinor,
  type UnitProgress,
} from "@/features/visits/lib/unit-progress"

type Props = {
  visitId: string
  deviceId: string
  progress: UnitProgress
  currency: string | null
  laborFeeMinor: number | null
}

/** What the customer agreed to — and whether "fixed" is still possible. */
export function AgreedSummary({
  visitId,
  deviceId,
  progress,
  currency,
  laborFeeMinor,
}: Props) {
  const { approved, refused } = progress

  return (
    <div className="flex flex-col gap-2">
      {approved.length > 0 ? (
        <>
          <Eyebrow className="text-[#11705A]">Approved</Eyebrow>
          {approved.map((item) => (
            <div
              key={item.proposalId ?? item.partId}
              className="flex items-center justify-between gap-3 rounded-[6px] border border-[#17876A]/40 border-l-[3px] border-l-[#17876A] bg-card px-3.5 py-3"
            >
              <div className="min-w-0">
                <div className="truncate text-[14px] font-semibold">
                  {item.name}
                </div>
                <div className="mt-0.5 font-mono text-[11.5px] text-muted-foreground">
                  × {item.quantity}
                </div>
              </div>
              <span className="font-mono text-[14px] font-semibold">
                {formatMoney(item.lineTotalMinor, currency)}
              </span>
            </div>
          ))}
        </>
      ) : null}

      {refused.length > 0 ? (
        <>
          <Eyebrow className="mt-2 text-[#8E1913]">Refused</Eyebrow>
          {refused.map((item) => (
            <div
              key={item.proposalId ?? item.partId}
              className="rounded-[6px] border border-destructive/35 bg-hatch px-3.5 py-3"
            >
              <div className="flex items-center justify-between gap-3">
                <div className="min-w-0">
                  <div className="truncate text-[14px] font-semibold text-muted-foreground">
                    {item.name}
                  </div>
                  <div className="mt-0.5 font-mono text-[11.5px] text-[#8A9093]">
                    × {item.quantity}
                  </div>
                </div>
                <span className="font-mono text-[14px] text-[#8E1913]">—</span>
              </div>
              <div className="mt-1.5 font-narrow text-[12.5px] font-bold text-[#8E1913]">
                Not fitted, not charged for.
              </div>
            </div>
          ))}
        </>
      ) : null}

      <div className="mt-2">
        <UnitTotals
          partsLabel="Parts they agreed to"
          partsMinor={approvedPartsMinor(progress)}
          laborLabel="Labour, if this unit is fixed"
          laborFeeMinor={laborFeeMinor}
          currency={currency}
        />
      </div>

      {progress.canMarkFixed ? (
        <FormAlert
          tone="success"
          title="You can mark this unit fixed"
          description={
            approved.length === 1
              ? "They approved one part, which is the minimum."
              : `They approved ${approved.length} parts.`
          }
        />
      ) : (
        <HatchedNote tone="red" title="“Fixed” is not offered">
          Nothing was approved, so nothing can be fitted. The only outcome
          left is not fixed — customer refused.
        </HatchedNote>
      )}

      <Button asChild className="mt-1 h-[54px] text-[15px] font-semibold">
        <Link to={pathTo(ROUTES.outcome, { visitId, deviceId })}>
          Record the outcome
        </Link>
      </Button>
    </div>
  )
}
