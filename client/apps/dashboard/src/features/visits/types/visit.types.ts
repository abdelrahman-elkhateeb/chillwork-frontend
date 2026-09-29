export type VisitStatus = "SCHEDULED" | "IN_PROGRESS" | "COMPLETED" | "CANCELLED"

/**
 * What the technician may do next — a UI hint from the server, derived
 * from the visit's status. The phone never works this out for itself.
 */
export type VisitAction =
  | "START_VISIT"
  | "SELECT_PARTS"
  | "RECORD_WORK_RESULT"
  | "COMPLETE_VISIT"
  | "ISSUE_INVOICE"

export type VisitDevice = {
  clientDeviceId: string
  label: string
  brand: string | null
  model: string | null
}

export type VisitListItem = {
  id: string
  requestReference: string | null
  startAt: string
  endAt: string
  timezone: string
  status: VisitStatus
  workTypes: string[]
  customer: { name: string | null; phone: string | null }
  address: string | null
  devices: VisitDevice[]
  allowedActions: VisitAction[]
}

export type DeviceAnalysis = {
  summary: string
  possibleCauses: string[]
  missingInformation: string[]
  inspectionQuestions: string[]
}

export type VisitDetailDevice = VisitDevice & {
  originalDescription: string
  /** `null` (never invented) when the analysis failed or was unavailable. */
  analysis: DeviceAnalysis | null
  analysisStatus: "SUCCESS" | "FAILED" | "UNAVAILABLE"
}

export type VisitDetail = Omit<VisitListItem, "devices"> & {
  devices: VisitDetailDevice[]
}

export type VisitsQuery = {
  from?: string
  to?: string
  status?: VisitStatus
  page?: number
  pageSize?: number
}

// ---- Part proposals ------------------------------------------------------

export type PartDecision = "PROPOSED" | "APPROVED" | "REJECTED"

export type PartProposal = {
  /** `null` only for legacy items that predate decisions. */
  proposalId: string | null
  partId: string
  name: string
  /** Snapshotted from the catalog when proposed — never typed in. */
  unitPriceMinor: number
  quantity: number
  lineTotalMinor: number
  decision: PartDecision | null
  decidedAt: string | null
}

export type DeviceParts = {
  clientDeviceId: string
  /** Every item that isn't REJECTED. */
  partsMinor: number
  /** Compare-and-set: 0 means nothing proposed yet. */
  version: number
  items: PartProposal[]
}

export type VisitParts = {
  visitId: string
  currency: string
  devices: DeviceParts[]
}

export type SetDevicePartsBody = {
  items: { partId: string; quantity: number }[]
  version: number
}

export type DecidePartsBody = {
  version: number
  decisions: { proposalId: string; decision: "APPROVED" | "REJECTED" }[]
}

// ---- Work results --------------------------------------------------------

export type FailureReason =
  | "PART_UNAVAILABLE"
  | "CUSTOMER_REFUSED"
  | "TOO_EXPENSIVE"
  | "TECHNICAL_ISSUE"
  | "OTHER"

export type WorkResultValue = "REPAIRED" | "FAILED"

export type DeviceWorkResult = {
  clientDeviceId: string
  result: WorkResultValue | null
  failureReason: FailureReason | null
  failureNote: string | null
  version: number
}

export type VisitOutcome = "FULLY_REPAIRED" | "PARTIALLY_REPAIRED" | "NO_REPAIR"

export type WorkResults = {
  visitId: string
  /** Only once every device has a result. */
  outcome: VisitOutcome | null
  devices: DeviceWorkResult[]
}

export type RecordWorkResultBody =
  | { result: "REPAIRED"; version: number }
  | {
      result: "FAILED"
      failureReason: FailureReason
      failureNote?: string
      version: number
    }

// ---- Invoice -------------------------------------------------------------

export type InvoiceLine = {
  partId: string
  name: string
  unitPriceMinor: number
  quantity: number
  lineTotalMinor: number
}

export type InvoiceDevice = {
  clientDeviceId: string
  label: string
  result: WorkResultValue | null
  failureReason: FailureReason | null
  billable: boolean
  parts: InvoiceLine[]
  partsMinor: number
  laborMinor: number
  totalMinor: number
}

export type InvoicePreview = {
  visitId: string
  currency: string
  laborFeeMinor: number
  devices: InvoiceDevice[]
  subtotalMinor: number
  laborMinor: number
  totalMinor: number
}

export type Invoice = InvoicePreview & {
  id: string
  reference: string
  status: "ISSUED" | "CLOSED"
  paymentState: "UNPAID" | "NOT_REQUIRED"
  issuedAt: string
}
