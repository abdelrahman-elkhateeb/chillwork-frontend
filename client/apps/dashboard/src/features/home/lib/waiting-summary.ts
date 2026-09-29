const NUMBER_WORDS = [
  "No",
  "One",
  "Two",
  "Three",
  "Four",
  "Five",
  "Six",
  "Seven",
  "Eight",
  "Nine",
  "Ten",
]

/** "Six requests still have nobody on them." */
export function waitingSummary(count: number | null): string {
  if (count === null) {
    return "Checking the board…"
  }
  if (count === 0) {
    return "Every request has somebody on it."
  }
  const amount = NUMBER_WORDS[count] ?? String(count)
  return count === 1
    ? `${amount} request still has nobody on it.`
    : `${amount} requests still have nobody on them.`
}
