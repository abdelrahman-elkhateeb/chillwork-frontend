import type { ServiceRequestStatus } from "@/features/requests/types/request.types"

/**
 * FS16 — the customer's own requests. Read-only, and customer-safe by
 * construction: no AI analysis, no technician notes, no prices before an
 * invoice exists.
 */

export type DeviceProgress =
  | "AWAITING_SCHEDULE"
  | "SCHEDULED"
  | "IN_PROGRESS"
  | "REPAIRED"
  | "NOT_REPAIRED"

/** `COMPLETED` only once every unit has a final result. */
export type RequestProgress =
  "SUBMITTED" | "SCHEDULED" | "IN_PROGRESS" | "COMPLETED"

/** Set only when `progress` is `COMPLETED`. */
export type RequestOutcome =
  "FULLY_REPAIRED" | "PARTIALLY_REPAIRED" | "NO_REPAIR"

export type FailureReason =
  | "PART_UNAVAILABLE"
  | "CUSTOMER_REFUSED"
  | "TOO_EXPENSIVE"
  | "TECHNICAL_ISSUE"
  | "OTHER"

export type VisitStatus = "SCHEDULED" | "IN_PROGRESS" | "COMPLETED"

export type CustomerRequestSummary = {
  requestId: string
  reference: string
  status: ServiceRequestStatus
  progress: RequestProgress
  outcome: RequestOutcome | null
  createdAt: string
  address: string
  deviceCount: number
  devices: {
    clientDeviceId: string
    label: string
    progress: DeviceProgress
  }[]
}

export type CustomerRequestDevice = {
  clientDeviceId: string
  label: string
  brand: string | null
  model: string | null
  originalDescription: string
  progress: DeviceProgress
  /** Only for `NOT_REPAIRED`. */
  failureReason: FailureReason | null
  visitId: string | null
}

/** A summary only — the itemized customer invoice is FS27. */
export type CustomerInvoiceSummary = {
  id: string
  reference: string
  currency: string
  totalMinor: number
  status: "ISSUED" | "CLOSED"
  /** `NOT_REQUIRED` when nothing was fixed, so nothing is owed. */
  paymentState: "UNPAID" | "NOT_REQUIRED"
  issuedAt: string
}

/** Cancelled visits are left out by the API. */
export type CustomerVisit = {
  visitId: string
  startAt: string
  endAt: string
  /** IANA zone the slot is shown in. */
  timezone: string
  status: VisitStatus
  technicianName: string | null
  deviceIds: string[]
  invoice: CustomerInvoiceSummary | null
}

export type CustomerRequest = {
  requestId: string
  reference: string
  status: ServiceRequestStatus
  progress: RequestProgress
  outcome: RequestOutcome | null
  createdAt: string
  address: string
  contactPhone: string
  devices: CustomerRequestDevice[]
  visits: CustomerVisit[]
}

export type TimelineEventType =
  | "REQUEST_SUBMITTED"
  | "VISIT_SCHEDULED"
  | "VISIT_STARTED"
  | "VISIT_COMPLETED"
  | "INVOICE_ISSUED"

/** Oldest first; carries no actor, note or result. */
export type TimelineEvent = {
  type: TimelineEventType
  occurredAt: string
  visitId: string | null
}

/** `/requests` location state: greet her right after signing up. */
export type MyRequestsLocationState = {
  welcome?: boolean
}
