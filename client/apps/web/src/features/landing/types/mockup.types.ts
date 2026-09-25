/** Data shapes for the illustrative product screens drawn on the landing page. */

export type StatusTone = "info" | "progress" | "success" | "danger"

export type SidebarItem = {
  label: string
  count: string
  /** Orange count — needs attention. */
  alert?: boolean
  mono?: boolean
  active?: boolean
}

export type CityPinTone = "idle" | "active" | "danger"

export type CityPin = {
  /** Percent across the strip. */
  x: number
  /** Percent down the strip. */
  y: number
  tone: CityPinTone
}

export type RequestStatus =
  "in-triage" | "scheduled" | "on-site" | "invoiced" | "escalated"

export type RequestRow = {
  id: string
  customer: string
  area: string
  units: number
  reading: string
  readingNote?: { text: string; kind: "in-stock" | "out-of-stock" }
  status: RequestStatus
  technician: string
  highlighted?: boolean
}

export type Decision = {
  title: string
  body: string
  tone: "danger" | "info"
}

export type ScheduleSlotKind = "job" | "free" | "blocked"

export type ScheduleSlot = {
  kind: ScheduleSlotKind
  /** Relative width. */
  span: number
}

export type ScheduleRow = {
  technician: string
  slots: ScheduleSlot[]
}

export type InspectionCheck = {
  label: string
  done: boolean
}

export type PartChip = {
  code: string
  note: string
  available: boolean
}

export type DeviceReading = {
  id: string
  name: string
  model: string
  /** Rendered as: lead **emphasis** rest */
  finding: { lead: string; emphasis: string; rest: string }
  parts: PartChip[]
}

export type TriageFact = {
  label: string
  value: string
}
