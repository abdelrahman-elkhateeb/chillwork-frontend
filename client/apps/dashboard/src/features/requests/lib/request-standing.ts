import { formatShortWeekday, dayOf, formatTime } from "@/lib/format/dates"
import type {
  AdminRequestDetail,
  AdminRequestListItem,
} from "@/features/requests/types/request.types"

export type StandingTone = "attention" | "progress" | "info" | "success"

/** "Where it stands" — a sentence, not a code. */
export type Standing = { label: string; tone: StandingTone }

/**
 * The list only knows unscheduled units and visit counts, so it can tell
 * "waiting" from "booked" but not how a booked visit went — that is on the
 * request's own page.
 */
export function listStanding(request: AdminRequestListItem): Standing {
  if (request.unscheduledDeviceCount > 0) {
    return { label: "Waiting for a visit", tone: "attention" }
  }
  return {
    label:
      request.visitCount === 1
        ? "Visit booked"
        : `${request.visitCount} visits booked`,
    tone: "info",
  }
}

export function detailStanding(request: AdminRequestDetail): Standing {
  if (request.unscheduledDeviceCount > 0) {
    return { label: "Waiting for a visit", tone: "attention" }
  }

  const active = request.visits.filter((visit) => visit.status !== "CANCELLED")

  if (active.some((visit) => visit.status === "IN_PROGRESS")) {
    return { label: "Technician on site", tone: "progress" }
  }

  const next = active
    .filter((visit) => visit.status === "SCHEDULED")
    .sort((a, b) => a.startAt.localeCompare(b.startAt))[0]
  if (next) {
    const day = formatShortWeekday(dayOf(next.startAt, next.timezone))
    return {
      label: `Visit booked · ${day} ${formatTime(next.startAt, next.timezone)}`,
      tone: "info",
    }
  }

  if (active.length > 0 && active.every((visit) => visit.status === "COMPLETED")) {
    const allFixed = active.every((visit) => visit.outcome === "FULLY_REPAIRED")
    return {
      label: allFixed ? "Finished · fixed" : "Finished · not all fixed",
      tone: "success",
    }
  }

  return { label: "Visit booked", tone: "info" }
}
