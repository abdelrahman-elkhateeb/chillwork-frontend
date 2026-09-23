import type { DayBoardRow } from "@/features/landing/types/landing.types"

export const DISPATCH_POINTS: readonly string[] = [
  "A clashing slot is refused, not flagged",
  "Move a job to another man without losing its history",
  "You can always see who changed what, and when",
]

export const DAY_BOARD = {
  date: "Thursday 12 March",
  summary: "4 technicians out",
  rows: [
    {
      technician: "Mostafa K.",
      slots: [
        { kind: "job", span: 2, label: "Maadi — 2 units" },
        { kind: "free", span: 1 },
        { kind: "job", span: 2, label: "Zamalek — fridge" },
      ],
    },
    {
      technician: "Hana S.",
      slots: [
        { kind: "free", span: 1 },
        { kind: "job", span: 3, label: "Nasr City — chiller service" },
        { kind: "free", span: 1 },
      ],
    },
    {
      technician: "Tarek A.",
      slots: [
        { kind: "job", span: 2, label: "Dokki — washer" },
        { kind: "blocked", span: 2, label: "He is already out — blocked" },
      ],
    },
    {
      technician: "Youssef M.",
      slots: [
        { kind: "free", span: 1 },
        { kind: "free", span: 1 },
        { kind: "free", span: 1, label: "Free all day" },
      ],
    },
  ] satisfies DayBoardRow[],
} as const
