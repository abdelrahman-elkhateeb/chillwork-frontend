import {
  formatDate,
  formatDateTime,
  formatTime,
  isToday,
} from "@/lib/format/dates"
import type {
  CustomerRequest,
  CustomerRequestDevice,
  CustomerRequestSummary,
  CustomerVisit,
  TimelineEvent,
} from "@/features/requests/types/customer-request.types"

const NUMBER_WORDS = [
  "no",
  "one",
  "two",
  "three",
  "four",
  "five",
  "six",
  "seven",
  "eight",
  "nine",
  "ten",
]

/** "two units", "one unit", "12 units" */
export function countOf(count: number, noun: string): string {
  const word = NUMBER_WORDS[count] ?? String(count)
  return `${word} ${noun}${count === 1 ? "" : "s"}`
}

function capitalize(text: string): string {
  return text.charAt(0).toUpperCase() + text.slice(1)
}

/** "Living room AC" → "living room AC", for the middle of a sentence. */
export function inSentence(label: string): string {
  return label.charAt(0).toLowerCase() + label.slice(1)
}

export function firstName(name: string): string {
  return name.trim().split(/\s+/)[0] ?? name
}

export function greeting(now = new Date()): string {
  const hour = now.getHours()
  if (hour < 12) return "Good morning"
  if (hour < 18) return "Good afternoon"
  return "Good evening"
}

export function isLive(request: { progress: string }): boolean {
  return request.progress !== "COMPLETED"
}

/** "One job is still running." under the greeting. */
export function runningLine(requests: readonly CustomerRequestSummary[]) {
  const running = requests.filter(isLive).length
  if (running === 0) return "Nothing is running right now."
  return running === 1
    ? "One job is still running."
    : `${capitalize(countOf(running, "job"))} are still running.`
}

/** The one line a finished or waiting request gets in the list. */
export function summaryHeadline(request: CustomerRequestSummary): string {
  const total = request.deviceCount
  const fixed = request.devices.filter((d) => d.progress === "REPAIRED").length

  switch (request.outcome) {
    case "FULLY_REPAIRED":
      return total === 1
        ? `Fixed — ${inSentence(request.devices[0]?.label ?? "your unit")}`
        : `All ${countOf(total, "unit")} fixed`
    case "PARTIALLY_REPAIRED":
      return `${fixed} of ${total} units fixed`
    case "NO_REPAIR":
      return total === 1 ? "Not fixed" : `None of the ${total} units fixed`
    default:
      break
  }

  switch (request.progress) {
    case "SUBMITTED":
      return "We're finding you a technician"
    case "SCHEDULED":
      return "Your visit is booked"
    default:
      return "The technician is working on it"
  }
}

/** The visit that matters now: in progress first, then the next booked. */
export function currentVisit(
  request: CustomerRequest
): CustomerVisit | undefined {
  return (
    request.visits.find((visit) => visit.status === "IN_PROGRESS") ??
    request.visits.find((visit) => visit.status === "SCHEDULED")
  )
}

/** "Between 10:00 and 12:00" in the visit's own zone. */
export function slotLine(visit: CustomerVisit): string {
  const start = formatTime(visit.startAt, visit.timezone)
  const end = formatTime(visit.endAt, visit.timezone)
  return `Between ${start} and ${end}`
}

/** "Happening today" / "Booked for 3 March" — the live card's corner. */
export function whenLabel(visit: CustomerVisit | undefined): string {
  if (!visit) return "Finding a technician"
  if (visit.status === "IN_PROGRESS") return "Happening now"
  if (isToday(visit.startAt, visit.timezone)) return "Happening today"
  return `Booked for ${formatDate(visit.startAt, visit.timezone)}`
}

/** The live card's headline, with a name in it once there is one. */
export function liveHeadline(
  request: CustomerRequest | undefined,
  summary: CustomerRequestSummary
): string {
  const visit = request ? currentVisit(request) : undefined
  const name = visit?.technicianName ? firstName(visit.technicianName) : null
  if (!visit || !name) return summaryHeadline(summary)
  if (visit.status === "IN_PROGRESS") return `${name} is with you`
  return isToday(visit.startAt, visit.timezone)
    ? `${name} is coming today`
    : `${name} is booked for you`
}

/** "Bedroom — Carrier 1.5T" */
export function deviceName(device: CustomerRequestDevice): string {
  const make = [device.brand, device.model].filter(Boolean).join(" ")
  return make ? `${device.label} — ${make}` : device.label
}

/** When the last unit got its result, for "finished 28 February". */
export function finishedAt(events: readonly TimelineEvent[] | undefined) {
  const completed = events?.filter((event) => event.type === "VISIT_COMPLETED")
  return completed?.at(-1)?.occurredAt
}

export type TimelineLine = {
  key: string
  title: string
  detail: string
  tone: "neutral" | "primary" | "success" | "failed" | "ink"
}

/**
 * Only the five event types the API records, in her words. Nothing is
 * invented to fill a gap — the line stops where the job stopped.
 */
export function toTimelineLines(
  events: readonly TimelineEvent[],
  request: CustomerRequest
): TimelineLine[] {
  const visits = new Map(request.visits.map((v) => [v.visitId, v]))

  return events.map((event, index) => {
    const key = `${event.type}-${event.occurredAt}-${index}`
    const when = formatDateTime(event.occurredAt)
    const visit = event.visitId ? visits.get(event.visitId) : undefined
    const name = visit?.technicianName
      ? firstName(visit.technicianName)
      : "The technician"
    const devices = visit
      ? request.devices.filter((d) =>
          visit.deviceIds.includes(d.clientDeviceId)
        )
      : []

    switch (event.type) {
      case "REQUEST_SUBMITTED":
        return {
          key,
          title: `You reported ${countOf(request.devices.length, "fault")}`,
          detail: when,
          tone: "neutral",
        }
      case "VISIT_SCHEDULED":
        return {
          key,
          title: visit?.technicianName
            ? `We booked ${name} for you`
            : "We booked a technician for you",
          detail: visit
            ? `${when} · for ${formatDate(visit.startAt, visit.timezone)}, ${formatTime(visit.startAt, visit.timezone)}–${formatTime(visit.endAt, visit.timezone)}`
            : when,
          tone: "neutral",
        }
      case "VISIT_STARTED":
        return { key, title: `${name} arrived`, detail: when, tone: "primary" }
      case "VISIT_COMPLETED": {
        const failed = devices.some((d) => d.progress === "NOT_REPAIRED")
        const results = devices
          .map(
            (d) =>
              `${d.label} ${d.progress === "REPAIRED" ? "fixed" : "not fixed"}`
          )
          .join(", ")
        return {
          key,
          title: `${name} finished the visit`,
          detail: results ? `${when} · ${results}` : when,
          tone: failed ? "failed" : "success",
        }
      }
      case "INVOICE_ISSUED": {
        const charged = devices.filter((d) => d.progress === "REPAIRED").length
        return {
          key,
          title: "Invoice issued",
          detail:
            charged === 0
              ? `${when} · nothing charged`
              : `${when} · ${countOf(charged, "unit")} charged`,
          tone: "ink",
        }
      }
    }
  })
}
