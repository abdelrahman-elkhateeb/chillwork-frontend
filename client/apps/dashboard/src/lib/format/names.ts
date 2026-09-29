/** "Mahmoud Kamel" -> "MK" */
export function initials(name: string): string {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("")
}

/** "Mahmoud Kamel" -> "Mahmoud" */
export function firstName(name: string): string {
  return name.split(/\s+/)[0] ?? name
}

/** "Mahmoud Kamel" -> "Mahmoud K." */
export function shortName(name: string): string {
  const [first, last] = name.split(/\s+/)
  return last ? `${first} ${last[0]?.toUpperCase()}.` : (first ?? name)
}

/** "2 units" / "1 unit" */
export function pluralUnits(count: number): string {
  return `${count} ${count === 1 ? "unit" : "units"}`
}
