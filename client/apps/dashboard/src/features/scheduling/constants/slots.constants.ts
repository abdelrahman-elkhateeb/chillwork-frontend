import type { Slot } from "@/features/scheduling/types/scheduling.types"

/**
 * The design books in four fixed two-hour windows. The API takes any start
 * and end; these are a product choice, not an API rule.
 */
export const DAY_SLOTS: readonly Slot[] = [
  { id: "08", label: "08–10", range: "08:00–10:00", startHour: 8, endHour: 10 },
  { id: "10", label: "10–12", range: "10:00–12:00", startHour: 10, endHour: 12 },
  { id: "13", label: "13–15", range: "13:00–15:00", startHour: 13, endHour: 15 },
  { id: "16", label: "16–18", range: "16:00–18:00", startHour: 16, endHour: 18 },
]

/** How many days the day picker offers, starting today. */
export const DAYS_AHEAD = 5
