export type Availability = {
  technicianId: string
  timezone: string
  from: string
  to: string
  /** Busy intervals only — no customer or request data. */
  busy: { visitId: string; startAt: string; endAt: string }[]
}

export type CreateVisitBody = {
  technicianId: string
  startAt: string
  endAt: string
  deviceIds: string[]
  workTypes?: ("INSPECTION" | "REPAIR")[]
}

export type CreatedVisit = {
  visitId: string
  requestId: string
  technicianId: string
  startAt: string
  endAt: string
  timezone: string
  deviceIds: string[]
  workTypes: string[]
  status: "SCHEDULED"
}

/** A bookable window, in the company's wall-clock hours. */
export type Slot = {
  id: string
  /** "10–12", on the slot button. */
  label: string
  /** "10:00–12:00", in sentences. */
  range: string
  startHour: number
  endHour: number
}
