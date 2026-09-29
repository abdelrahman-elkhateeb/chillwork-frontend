import { Link } from "react-router-dom"
import { CheckIcon } from "lucide-react"
import { Button } from "@workspace/ui/components/button"
import { Card } from "@workspace/ui/components/card"

import { FormAlert } from "@/components/form/form-alert"
import { HatchedNote } from "@/components/layout/hatched-note"
import { ROUTES, pathTo } from "@/config/routes"
import { formatLongDay, dayOf, formatTimeRange } from "@/lib/format/dates"
import type { CreatedVisit } from "@/features/scheduling/types/scheduling.types"

type BackProps = { requestId: string }

function BackToRequest({ requestId }: BackProps) {
  return (
    <Button
      asChild
      variant="outline"
      className="h-11 w-full bg-white text-[14px] font-semibold"
    >
      <Link to={pathTo(ROUTES.request, { requestId })}>Back to the request</Link>
    </Button>
  )
}

/** Blue, not red: nothing went wrong — the work is already done. */
export function AlreadyBookedNotice({ requestId }: BackProps) {
  return (
    <div className="flex flex-col gap-3.5">
      <FormAlert
        tone="info"
        title="This one is already booked"
        description="Every unit on this request already has a visit. This is not an error — it is the answer."
      />
      <BackToRequest requestId={requestId} />
    </div>
  )
}

/** Cancelled, finished or otherwise closed — it never takes a visit. */
export function NotSchedulableNotice() {
  return (
    <div className="flex flex-col gap-3.5">
      <HatchedNote title="This request cannot be booked">
        It is closed for new visits — it may have been cancelled or already
        finished.
      </HatchedNote>
      <Button
        asChild
        variant="outline"
        className="h-11 w-full bg-white text-[14px] font-semibold"
      >
        <Link to={ROUTES.requests}>Back to requests</Link>
      </Button>
    </div>
  )
}

type BookedProps = {
  visit: CreatedVisit
  technicianName: string
}

export function BookedCard({ visit, technicianName }: BookedProps) {
  const day = dayOf(visit.startAt, visit.timezone)

  return (
    <div role="status">
      <div className="flex items-center gap-[11px]">
        <span className="flex size-[30px] items-center justify-center rounded-full bg-[#11705A] text-white">
          <CheckIcon className="size-4" strokeWidth={3} />
        </span>
        <span className="text-[15px] font-semibold">
          Booked — {technicianName} has it
        </span>
      </div>

      <Card className="mt-4 gap-0 rounded-[6px] border-0 bg-ink px-[18px] py-4">
        <div className="font-narrow text-[11.5px] font-bold tracking-[0.1em] text-paper/45 uppercase">
          Visit
        </div>
        <div className="mt-1.5 text-[17px] font-semibold text-paper-bright">
          {formatLongDay(day)} ·{" "}
          {formatTimeRange(visit.startAt, visit.endAt, visit.timezone)}
        </div>
        <div className="mt-1 font-narrow text-[12.5px] text-paper/55">
          {visit.deviceIds.length}{" "}
          {visit.deviceIds.length === 1 ? "unit" : "units"} · on{" "}
          {technicianName}'s day now
        </div>
      </Card>

      <div className="mt-4 flex flex-col gap-2 sm:flex-row">
        <Button asChild className="h-11 flex-1 text-[14px] font-semibold">
          <Link to={pathTo(ROUTES.request, { requestId: visit.requestId })}>
            Back to the request
          </Link>
        </Button>
        <Button
          asChild
          variant="outline"
          className="h-11 flex-1 bg-white text-[14px] font-semibold"
        >
          <Link to={ROUTES.requests}>All requests</Link>
        </Button>
      </div>
    </div>
  )
}
