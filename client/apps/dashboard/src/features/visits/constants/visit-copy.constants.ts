import type {
  FailureReason,
  VisitAction,
  VisitStatus,
} from "@/features/visits/types/visit.types"

export const VISIT_STATUS_LABELS = {
  SCHEDULED: "Scheduled",
  IN_PROGRESS: "On site",
  COMPLETED: "Finished",
  CANCELLED: "Cancelled",
} as const satisfies Record<VisitStatus, string>

/** The API's reasons, in the words the office reads them in. */
export const FAILURE_REASON_LABELS = {
  PART_UNAVAILABLE: "Part not available",
  CUSTOMER_REFUSED: "Customer refused",
  TOO_EXPENSIVE: "Too expensive",
  TECHNICAL_ISSUE: "Technical issue",
  OTHER: "Other",
} as const satisfies Record<FailureReason, string>

export const ACTION_LABELS = {
  START_VISIT: "Start the visit",
  SELECT_PARTS: "Pick the parts",
  RECORD_WORK_RESULT: "Record the outcome",
  COMPLETE_VISIT: "Finish the visit",
  ISSUE_INVOICE: "Issue the invoice",
} as const satisfies Record<VisitAction, string>

export const VISITS_TABS = [
  { value: "today", label: "Today" },
  { value: "upcoming", label: "Upcoming" },
  { value: "done", label: "Done" },
] as const

export const VISITS_EMPTY = {
  today: {
    title: "Nothing booked today",
    description: "When the office books you a visit it shows up here.",
  },
  upcoming: {
    title: "Nothing coming up",
    description: "Visits booked for later days show up here.",
  },
  done: {
    title: "No finished visits yet",
    description: "Visits you finish show up here with their invoice.",
  },
} as const
