import { Button } from "@workspace/ui/components/button"

import { REQUEST_COPY } from "@/features/requests/constants/request-copy.constants"
import { pluralizeUnits } from "@/features/requests/lib/unit-status"

const COPY = REQUEST_COPY.summary

type Props = {
  unitCount: number
  address: string
  phone: string
  /** Why the request can't go to review yet, e.g. "Unit 3 still needs a description". */
  blocker: string | null
  onChangeWhere: () => void
}

export function RequestSummaryPanel({
  unitCount,
  address,
  phone,
  blocker,
  onChangeWhere,
}: Props) {
  return (
    <aside className="rounded-[6px] bg-ink p-5 lg:sticky lg:top-6">
      <div className="font-narrow text-[11.5px] font-bold tracking-[0.1em] text-paper/45 uppercase">
        {COPY.eyebrow}
      </div>
      <div className="mt-2 font-heading text-[34px] leading-[1.05] font-bold tracking-[-0.03em] text-paper-bright">
        {pluralizeUnits(unitCount)}
      </div>
      <div className="mt-1 text-[13.5px] text-paper/60">{COPY.oneVisit}</div>

      <div className="mt-4 border-t border-paper/14 pt-3.5">
        <div className="font-narrow text-[13px] break-words text-paper/70">
          {address}
        </div>
        <div className="mt-[3px] font-narrow text-[13px] text-paper/70">
          {phone}
        </div>
        <button
          type="button"
          onClick={onChangeWhere}
          className="mt-2 font-narrow text-[13px] font-bold text-primary hover:text-[#F4A576]"
        >
          {COPY.change}
        </button>
      </div>

      <div className="mt-[18px] border-l-2 border-primary bg-paper/6 px-[13px] py-3 text-[13.5px] leading-[1.55] text-paper/82">
        {COPY.callOut}
      </div>

      {/* Submits the form; the page turns that into "go to review". */}
      <Button
        type="submit"
        className="mt-[18px] h-[50px] w-full rounded-[var(--radius-control)] text-[15px] font-semibold"
      >
        {COPY.next}
      </Button>
      {blocker ? (
        <p
          role="status"
          className="mt-2.5 text-center font-narrow text-[12.5px] text-paper/50"
        >
          {blocker}
        </p>
      ) : null}
    </aside>
  )
}
