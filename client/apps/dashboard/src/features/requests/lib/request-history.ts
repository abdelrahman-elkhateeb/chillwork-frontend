import type { HistoryEntry } from "@/components/layout/history-line"
import { formatDateTime, formatTimeRange, formatDate } from "@/lib/format/dates"
import { formatMoney } from "@/lib/format/money"
import type { AdminRequestDetail } from "@/features/requests/types/request.types"

const OUTCOME_LABELS = {
  FULLY_REPAIRED: "every unit fixed",
  PARTIALLY_REPAIRED: "some units fixed",
  NO_REPAIR: "nothing could be fixed",
} as const

/**
 * What has happened so far, built only from what the request says — the
 * visits' states and invoices. Nothing is invented to fill a gap.
 */
export function requestHistory(request: AdminRequestDetail): HistoryEntry[] {
  const entries: HistoryEntry[] = [
    {
      key: "received",
      title: "Request received",
      detail: `${formatDateTime(request.createdAt)} · by ${request.customer.name}`,
      tone: "primary",
    },
  ]

  const visits = [...request.visits]
    .filter((visit) => visit.status !== "CANCELLED")
    .sort((a, b) => a.startAt.localeCompare(b.startAt))

  for (const visit of visits) {
    const when = `${formatDate(visit.startAt, visit.timezone)}, ${formatTimeRange(visit.startAt, visit.endAt, visit.timezone)}`
    entries.push({
      key: `${visit.visitId}-booked`,
      title: `Visit booked with ${visit.technician.name}`,
      detail: `${when} · ${visit.deviceIds.length} ${visit.deviceIds.length === 1 ? "unit" : "units"}`,
    })

    if (visit.status === "IN_PROGRESS") {
      entries.push({
        key: `${visit.visitId}-on-site`,
        title: `${visit.technician.name} is on site`,
        tone: "primary",
      })
    }

    if (visit.status === "COMPLETED") {
      entries.push({
        key: `${visit.visitId}-finished`,
        title: "Visit finished",
        detail: visit.outcome ? OUTCOME_LABELS[visit.outcome] : undefined,
        tone: visit.outcome === "FULLY_REPAIRED" ? "success" : "danger",
      })
    }

    if (visit.invoice) {
      entries.push({
        key: `${visit.visitId}-invoice`,
        title: `Invoice ${visit.invoice.reference} issued`,
        detail: `${formatMoney(visit.invoice.totalMinor, visit.invoice.currency)} · ${visit.invoice.paymentState === "UNPAID" ? "not paid yet" : "nothing to pay"}`,
        tone: "ink",
      })
    }
  }

  if (visits.length === 0) {
    entries.push({
      key: "no-visit",
      title: "No visit yet",
      detail: "Nothing else has happened.",
      tone: "pending",
    })
  }

  return entries
}
