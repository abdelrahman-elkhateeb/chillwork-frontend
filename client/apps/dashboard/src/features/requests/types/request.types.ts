export type RequestStatus = "SUBMITTED"

export type NextAction = "SCHEDULE_VISIT"

export type VisitStatus = "SCHEDULED" | "IN_PROGRESS" | "COMPLETED" | "CANCELLED"

export type VisitOutcome = "FULLY_REPAIRED" | "PARTIALLY_REPAIRED" | "NO_REPAIR"

export type AdminRequestListItem = {
  requestId: string
  reference: string
  status: RequestStatus
  createdAt: string
  address: string
  customer: { id: string; name: string; phone: string }
  deviceCount: number
  unscheduledDeviceCount: number
  visitCount: number
  nextActions: NextAction[]
}

export type DeviceAnalysis = {
  summary: string
  possibleCauses: string[]
  missingInformation: string[]
  inspectionQuestions: string[]
}

export type AdminRequestDevice = {
  clientDeviceId: string
  label: string
  brand: string | null
  model: string | null
  /** Exactly what the customer typed. */
  originalDescription: string
  aiAnalysis: {
    status: string
    errorCode: string | null
    /** `null` when the analysis failed — never invented. */
    analysis: DeviceAnalysis | null
  }
  /** The latest non-cancelled visit covering it, or `null`. */
  visitId: string | null
}

export type InvoiceSummary = {
  id: string
  reference: string
  currency: string
  totalMinor: number
  status: "ISSUED" | "CLOSED"
  paymentState: "UNPAID" | "NOT_REQUIRED"
}

export type AdminRequestVisit = {
  visitId: string
  technician: { id: string; name: string }
  startAt: string
  endAt: string
  timezone: string
  status: VisitStatus
  deviceIds: string[]
  workTypes: string[]
  outcome: VisitOutcome | null
  invoice: InvoiceSummary | null
}

export type AdminRequestDetail = {
  requestId: string
  reference: string
  status: RequestStatus
  createdAt: string
  address: string
  contactPhone: string
  customer: { id: string; name: string; email: string; phone: string }
  devices: AdminRequestDevice[]
  visits: AdminRequestVisit[]
  unscheduledDeviceCount: number
  nextActions: NextAction[]
}

export type AdminRequestsQuery = {
  search?: string
  page?: number
  pageSize?: number
}
