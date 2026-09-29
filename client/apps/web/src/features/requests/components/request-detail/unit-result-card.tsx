import { cn } from "@workspace/ui/lib/utils"

import { formatDate } from "@/lib/format/dates"
import {
  DEVICE_PROGRESS_LABELS,
  FAILURE_REASON_COPY,
  MY_REQUESTS_COPY,
} from "@/features/requests/constants/my-requests-copy.constants"
import {
  deviceName,
  firstName,
  slotLine,
} from "@/features/requests/lib/request-display"
import type {
  CustomerRequestDevice,
  CustomerVisit,
} from "@/features/requests/types/customer-request.types"

const COPY = MY_REQUESTS_COPY.detail

const HEAD_TONES = {
  AWAITING_SCHEDULE: { bar: "", label: "text-muted-foreground" },
  SCHEDULED: { bar: "", label: "text-[#17557E]" },
  IN_PROGRESS: { bar: "bg-[#19A2C4]/[0.07]", label: "text-[#145A75]" },
  REPAIRED: { bar: "bg-[#17876A]/[0.07]", label: "text-[#11705A]" },
  NOT_REPAIRED: { bar: "bg-hatch", label: "text-[#8E1913]" },
} as const

type Props = {
  device: CustomerRequestDevice
  visit: CustomerVisit | undefined
}

/** What she said, and what came of it. */
export function UnitResultCard({ device, visit }: Props) {
  const tone = HEAD_TONES[device.progress]
  const failure =
    device.progress === "NOT_REPAIRED" && device.failureReason
      ? FAILURE_REASON_COPY[device.failureReason]
      : null
  const booked =
    visit &&
    (device.progress === "SCHEDULED" || device.progress === "IN_PROGRESS")

  return (
    <article
      className={cn(
        "overflow-hidden rounded-[6px] border bg-card",
        device.progress === "NOT_REPAIRED"
          ? "border-line-strong"
          : "border-border"
      )}
    >
      <div
        className={cn(
          "flex items-center justify-between gap-3 border-b border-[#E4E6E6] px-[13px] py-[11px]",
          tone.bar
        )}
      >
        <h3 className="font-sans text-[14px] font-bold tracking-normal normal-case">
          {deviceName(device)}
        </h3>
        <span
          className={cn(
            "shrink-0 text-[11.5px] font-bold tracking-[0.05em] uppercase",
            tone.label
          )}
        >
          {DEVICE_PROGRESS_LABELS[device.progress]}
        </span>
      </div>
      <div className="px-[13px] py-3">
        <div className="font-narrow text-[12.5px] text-muted-foreground">
          {COPY.youSaid}
        </div>
        <p className="mt-[3px] text-[13.5px] leading-[1.5] break-words whitespace-pre-line">
          “{device.originalDescription}”
        </p>

        {booked ? (
          <p className="mt-2.5 font-narrow text-[13px] leading-[1.5] text-muted-foreground">
            {formatDate(visit.startAt, visit.timezone)} ·{" "}
            {slotLine(visit).toLowerCase()}
            {visit.technicianName
              ? ` · ${firstName(visit.technicianName)}`
              : null}
          </p>
        ) : null}

        {failure ? (
          <>
            <div className="mt-2.5 font-narrow text-[12.5px] text-muted-foreground">
              {COPY.whyNot}
            </div>
            <div className="mt-[3px] text-[13.5px] font-semibold">
              {failure.title}
            </div>
            <p className="mt-1 font-narrow text-[13px] leading-[1.5] text-muted-foreground">
              {failure.body}
            </p>
          </>
        ) : null}
      </div>
    </article>
  )
}
