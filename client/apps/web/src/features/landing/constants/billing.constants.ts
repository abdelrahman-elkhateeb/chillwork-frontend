import type {
  BillingCallout,
  DrawingCallout,
  InvoiceLine,
} from "@/features/landing/types/landing.types"

/** Lettered to match the markers on the capacitor drawing. */
export const BILLING_CALLOUTS: readonly BillingCallout[] = [
  {
    title: "A — He scans it in",
    body: "Picked from your own catalog at your own price. Not typed, not guessed.",
  },
  {
    title: "B — Stock comes down",
    body: "One less on the shelf the moment he fits it. You find out you are low before a customer does.",
  },
]

export const CAPACITOR_CALLOUTS: readonly DrawingCallout[] = [
  { label: "A", cx: 46, cy: 62, leaderToX: 128 },
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
      detail: "DEV-01 · 1 × catalog price",
      mobileDetail: "DEV-01",
      amount: "[AMOUNT]",
    },
    {
      title: "DEV-02 — drain repair",
      detail: "Not completed — cannot be charged for. Follow-up opened.",
      mobileDetail: "Not completed — follow-up opened.",
      amount: "—",
      excluded: true,
    },
  ] satisfies InvoiceLine[],
} as const
