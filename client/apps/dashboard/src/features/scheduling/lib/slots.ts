import { zonedTimeToIso, type CalendarDay } from "@/lib/format/dates"
import type {
  Availability,
  Slot,
} from "@/features/scheduling/types/scheduling.types"

export type SlotWindow = { startAt: string; endAt: string }

export function slotWindow(
  day: CalendarDay,
  slot: Slot,
  timeZone: string
): SlotWindow {
  return {
    startAt: zonedTimeToIso(day, slot.startHour, 0, timeZone),
    endAt: zonedTimeToIso(day, slot.endHour, 0, timeZone),
  }
}

/** Half-open intervals, like the API: 10–12 and 12–14 don't clash. */
export function overlaps(a: SlotWindow, b: SlotWindow): boolean {
  return a.startAt < b.endAt && b.startAt < a.endAt
}

export type SlotState = "free" | "taken" | "past"

export function slotState(
  window: SlotWindow,
  availability: Availability | undefined,
  now = new Date()
): SlotState {
  if (new Date(window.startAt) <= now) {
    return "past"
  }
  if (availability?.busy.some((busy) => overlaps(window, busy))) {
    return "taken"
  }
  return "free"
}
