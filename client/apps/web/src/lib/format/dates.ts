/**
 * The API stores UTC instants. Visit times come with the company's IANA
 * timezone and are shown in it, so a slot reads the same wherever the
 * customer opens the page; request and event times have no zone of their
 * own and use the browser's.
 */

const formatters = new Map<string, Intl.DateTimeFormat>()

function formatter(
  key: string,
  options: Intl.DateTimeFormatOptions
): Intl.DateTimeFormat {
  let cached = formatters.get(key)
  if (!cached) {
    cached = new Intl.DateTimeFormat("en-GB", options)
    formatters.set(key, cached)
  }
  return cached
}

/** "12 March" */
export function formatDate(iso: string, timeZone?: string): string {
  return formatter(`date:${timeZone}`, {
    timeZone,
    day: "numeric",
    month: "long",
  }).format(new Date(iso))
}

/** "12 March, 10:18" */
export function formatDateTime(iso: string, timeZone?: string): string {
  return formatter(`datetime:${timeZone}`, {
    timeZone,
    day: "numeric",
    month: "long",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).format(new Date(iso))
}

/** "10:00" */
export function formatTime(iso: string, timeZone?: string): string {
  return formatter(`time:${timeZone}`, {
    timeZone,
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).format(new Date(iso))
}

/** Whether `iso` falls on today's date in `timeZone`. */
export function isToday(iso: string, timeZone?: string, now = new Date()) {
  const day = formatter(`day:${timeZone}`, {
    timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  })
  return day.format(new Date(iso)) === day.format(now)
}
