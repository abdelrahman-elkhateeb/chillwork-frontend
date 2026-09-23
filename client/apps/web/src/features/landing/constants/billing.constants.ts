import type {
  BillingCallout,
  DrawingCallout,
  InvoiceLine,
} from "@/features/landing/types/landing.types"

/** Lettered to match the markers on the capacitor drawing. */
export const BILLING_CALLOUTS: readonly BillingCallout[] = [
  {
    title: "A — He scans it in",
    body: "Picked from your own parts catalog, at your own price. Not typed, not guessed.",
  },
  {
    title: "B — Stock comes down",
    body: "One less on the shelf, the moment he fits it. You find out you are low before a customer does.",
  },
]

export const CAPACITOR_CALLOUTS: readonly DrawingCallout[] = [
  { label: "A", cx: 46, cy: 53, leaderToX: 150 },
  { label: "B", cx: 352, cy: 150, leaderToX: 248 },
]

export const INVOICE = {
  number: "INV-1177",
  status: "Paid",
  total: "[AMOUNT]",
  lines: [
    {
      title: "Call-out and labour",
      detail: "Your fixed rate, set once",
      mobileDetail: "Your fixed rate",
      amount: "[AMOUNT]",
    },
    {
      title: "Start capacitor",
      code: "CAP-45/5",
      detail: "Bedroom unit · 1 × catalog price",
      mobileDetail: "Bedroom unit",
      amount: "[AMOUNT]",
    },
    {
      title: "Living room unit — drain",
      detail: "Not finished today — off the bill, back on the list",
      mobileDetail: "Off the bill, back on the list",
      amount: "—",
      dropped: true,
    },
  ] satisfies InvoiceLine[],
} as const
