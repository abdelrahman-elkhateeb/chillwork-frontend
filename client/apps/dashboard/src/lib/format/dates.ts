/**
 * The API stores UTC instants and returns the company's IANA timezone next
 * to every visit. Everything shown to staff is in that zone, never the
 * browser's — a dispatcher on a laptop abroad still sees Cairo time.
 */

type ZonedParts = {
  year: number
  month: number
  day: number
  hour: number
  minute: number
  weekday: string
}

const partsFormatters = new Map<string, Intl.DateTimeFormat>()

function partsFormatter(timeZone: string): Intl.DateTimeFormat {
  let formatter = partsFormatters.get(timeZone)
  if (!formatter) {
    formatter = new Intl.DateTimeFormat("en-GB", {
      timeZone,
      hourCycle: "h23",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      weekday: "short",
    })
    partsFormatters.set(timeZone, formatter)
  }
  return formatter
}

export function zonedParts(date: Date, timeZone: string): ZonedParts {
  const parts = Object.fromEntries(
    partsFormatter(timeZone)
      .formatToParts(date)
      .map((part) => [part.type, part.value])
  )
  return {
    year: Number(parts.year),
    month: Number(parts.month),
    day: Number(parts.day),
    hour: Number(parts.hour),
    minute: Number(parts.minute),
    weekday: parts.weekday ?? "",
  }
}

/** Minutes the zone is ahead of UTC at that instant (Cairo summer: 180). */
function offsetMinutes(utcMs: number, timeZone: string): number {
  const p = zonedParts(new Date(utcMs), timeZone)
  const asUtc = Date.UTC(p.year, p.month - 1, p.day, p.hour, p.minute)
  return Math.round((asUtc - Math.floor(utcMs / 60000) * 60000) / 60000)
}

/**
 * The UTC ISO string for a wall-clock time in `timeZone`. The API rejects
 * offset-less times, and a `Z` string is always explicit.
 */
export function zonedTimeToIso(
  day: CalendarDay,
  hour: number,
  minute: number,
  timeZone: string
): string {
  const guess = Date.UTC(day.year, day.month - 1, day.day, hour, minute)
  let utc = guess - offsetMinutes(guess, timeZone) * 60000
  // Across a DST change the first guess can be an hour out.
  const corrected = guess - offsetMinutes(utc, timeZone) * 60000
  if (corrected !== utc) {
    utc = corrected
  }
  return new Date(utc).toISOString()
}

export type CalendarDay = { year: number; month: number; day: number }

export function todayIn(timeZone: string): CalendarDay {
  const { year, month, day } = zonedParts(new Date(), timeZone)
  return { year, month, day }
}

export function addDays(day: CalendarDay, count: number): CalendarDay {
  const date = new Date(Date.UTC(day.year, day.month - 1, day.day + count))
  return {
    year: date.getUTCFullYear(),
    month: date.getUTCMonth() + 1,
    day: date.getUTCDate(),
  }
}

export function sameDay(a: CalendarDay, b: CalendarDay): boolean {
  return a.year === b.year && a.month === b.month && a.day === b.day
}

export function dayOf(iso: string, timeZone: string): CalendarDay {
  const { year, month, day } = zonedParts(new Date(iso), timeZone)
  return { year, month, day }
}

const pad = (value: number) => String(value).padStart(2, "0")

/** "10:00" */
export function formatTime(iso: string, timeZone: string): string {
  const { hour, minute } = zonedParts(new Date(iso), timeZone)
  return `${pad(hour)}:${pad(minute)}`
}

/** "10:00–12:00" */
export function formatTimeRange(
  startIso: string,
  endIso: string,
  timeZone: string
): string {
  return `${formatTime(startIso, timeZone)}–${formatTime(endIso, timeZone)}`
}

function calendarDayDate(day: CalendarDay): Date {
  return new Date(Date.UTC(day.year, day.month - 1, day.day, 12))
}

/** "Thursday, 12 March" */
export function formatLongDay(day: CalendarDay): string {
  return new Intl.DateTimeFormat("en-GB", {
    timeZone: "UTC",
    weekday: "long",
    day: "numeric",
    month: "long",
  }).format(calendarDayDate(day))
}

/** "Thursday" */
export function formatWeekday(day: CalendarDay): string {
  return new Intl.DateTimeFormat("en-GB", {
    timeZone: "UTC",
    weekday: "long",
  }).format(calendarDayDate(day))
}

/** "Thu" */
export function formatShortWeekday(day: CalendarDay): string {
  return new Intl.DateTimeFormat("en-GB", {
    timeZone: "UTC",
    weekday: "short",
  }).format(calendarDayDate(day))
}

/** "12 March", in the zone given (defaults to the browser's). */
export function formatDate(iso: string, timeZone?: string): string {
  return new Intl.DateTimeFormat("en-GB", {
    timeZone,
    day: "numeric",
    month: "long",
  }).format(new Date(iso))
}

/** "12 March, 10:18" */
export function formatDateTime(iso: string, timeZone?: string): string {
  return new Intl.DateTimeFormat("en-GB", {
    timeZone,
    day: "numeric",
    month: "long",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).format(new Date(iso))
}

/** "2 hours ago", "Yesterday", "3 days ago", "Last week", "12 March". */
export function formatCameIn(iso: string, now = new Date()): string {
  const diffMs = now.getTime() - new Date(iso).getTime()
  const minutes = Math.floor(diffMs / 60000)
  if (minutes < 1) return "Just now"
  if (minutes < 60) return `${minutes} min ago`
  const hours = Math.floor(minutes / 60)
  if (hours < 24) return hours === 1 ? "An hour ago" : `${hours} hours ago`
  const days = Math.floor(hours / 24)
  if (days === 1) return "Yesterday"
  if (days < 7) return `${days} days ago`
  if (days < 14) return "Last week"
  return formatDate(iso)
}
