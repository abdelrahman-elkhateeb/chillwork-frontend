/**
 * All money on the API is an integer count of the company currency's minor
 * unit (every supported currency has 2 decimals, so 15000 = 150.00).
 */
export function formatMoney(minor: number, currency: string | null): string {
  const major = minor / 100
  if (!currency) {
    return major.toFixed(2)
  }
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    currencyDisplay: "code",
  }).format(major)
}

/** "150.00" for an input field, from minor units. */
export function minorToInput(minor: number | null | undefined): string {
  if (minor === null || minor === undefined) {
    return ""
  }
  return (minor / 100).toFixed(2)
}

/**
 * Minor units from what an admin typed ("150", "150.5", "150.50"), or
 * `null` when it isn't a non-negative amount with at most 2 decimals.
 */
export function inputToMinor(value: string): number | null {
  const trimmed = value.trim().replace(/,/g, "")
  if (!/^\d+(\.\d{1,2})?$/.test(trimmed)) {
    return null
  }
  const [whole, fraction = ""] = trimmed.split(".")
  return Number(whole) * 100 + Number(fraction.padEnd(2, "0"))
}
