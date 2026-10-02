import type {
  BillingCallout,
  DrawingCallout,
  InvoiceLine,
} from "@/features/landing/types/landing.types"

/** Lettered to match the markers on the capacitor drawing. */
export const BILLING_CALLOUTS: readonly BillingCallout[] = [
  {
    title: "A — He picks it, she approves it",
    body: "From your own catalog at your own price, and only billed once the customer says yes.",
  },
  {
    title: "B — Stock comes down",
    body: "Issuing the invoice takes it off the shelf, with the move written to the stock ledger.",
  },
]

export const CAPACITOR_CALLOUTS: readonly DrawingCallout[] = [
  { label: "A", cx: 46, cy: 62, leaderToX: 128 },
  { label: "B", cx: 352, cy: 150, leaderToX: 248 },
]

export const INVOICE = {
  number: "INV-1177",
  status: "Issued",
  total: "[AMOUNT]",
  lines: [
    {
      title: "Labor fee",
      detail: "DEV-01 · your fixed rate, once per repaired unit",
      mobileDetail: "DEV-01 · once per repaired unit",
      amount: "[AMOUNT]",
    },
    {
      title: "Start capacitor",
      code: "CAP-45/5",
      detail: "DEV-01 · approved · 1 × catalog price",
      mobileDetail: "DEV-01",
      amount: "[AMOUNT]",
    },
    {
      title: "DEV-02 — drain repair",
      detail: "Not repaired — part unavailable. Costs nothing.",
      mobileDetail: "Not repaired — costs nothing.",
      amount: "—",
      excluded: true,
    },
  ] satisfies InvoiceLine[],
} as const
