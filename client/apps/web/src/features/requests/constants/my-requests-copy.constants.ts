import type {
  DeviceProgress,
  FailureReason,
  RequestProgress,
} from "@/features/requests/types/customer-request.types"

/** Copy from the "1–3 · Her requests, one opened, the timeline" board. */
export const MY_REQUESTS_COPY = {
  list: {
    title: "My requests",
    reportFault: "Report a fault",
    seeWhatsHappening: "See what is happening",
    open: "Open",
    emptyTitle: "No requests yet",
    emptyBody:
      "When something stops cooling, tell us here. You'll see every visit and bill in one place.",
    welcomeTitle: (name: string) => `You're in, ${name}`,
    welcomeBody: "Your account is ready. Report a fault whenever you need us.",
  },
  detail: {
    back: "All my requests",
    notFound: "No such request",
    whatItCameTo: "What it came to",
    unitByUnit: "Unit by unit",
    youSaid: "You said",
    whyNot: "Why not",
    bill: "The bill",
    total: "Total",
    notFixedLine: "No labour, no parts — nothing to charge for.",
    quoteInvoice: "Quote this number if you call us about the bill.",
    nothingToPay: "Nothing to pay. No unit was fixed, so nothing was charged.",
    timeline: "What happened, in order",
    reportAgain: (label: string) => `Report the ${label} again`,
  },
} as const

export const REQUEST_PROGRESS_LABELS: Record<RequestProgress, string> = {
  SUBMITTED: "Received",
  SCHEDULED: "Booked",
  IN_PROGRESS: "In progress",
  COMPLETED: "Finished",
}

export const DEVICE_PROGRESS_LABELS: Record<DeviceProgress, string> = {
  AWAITING_SCHEDULE: "Waiting for a slot",
  SCHEDULED: "Booked",
  IN_PROGRESS: "Being worked on",
  REPAIRED: "Fixed",
  NOT_REPAIRED: "Not fixed",
}

/** Her words, not the technician's form. */
export const FAILURE_REASON_COPY: Record<
  FailureReason,
  { title: string; body: string }
> = {
  PART_UNAVAILABLE: {
    title: "The part was not available",
    body: "The part it needs was not on the van or on our shelf. Nothing was charged for this unit.",
  },
  CUSTOMER_REFUSED: {
    title: "You chose not to go ahead",
    body: "Nothing was fitted and nothing was charged for this unit.",
  },
  TOO_EXPENSIVE: {
    title: "The repair cost more than it was worth",
    body: "Nothing was fitted and nothing was charged for this unit.",
  },
  TECHNICAL_ISSUE: {
    title: "It could not be fixed on the day",
    body: "The fault needs more than one visit could do. Nothing was charged for this unit.",
  },
  OTHER: {
    title: "It could not be fixed this time",
    body: "Nothing was charged for this unit.",
  },
}
