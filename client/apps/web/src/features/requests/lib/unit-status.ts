import type { RequestDeviceFormInput } from "@/features/requests/types/request.types"

export type UnitStatus = "ready" | "needsDescription" | "needsLocation"

/** Same rule as the schema's required fields, for the badge on each card. */
export function getUnitStatus(unit: RequestDeviceFormInput): UnitStatus {
  if (!unit.originalDescription.trim()) {
    return "needsDescription"
  }
  if (!unit.label.trim()) {
    return "needsLocation"
  }
  return "ready"
}

/** "Bedroom — Carrier 1.5T" */
export function describeUnit(unit: RequestDeviceFormInput): string {
  const equipment = [unit.brand, unit.model]
    .map((part) => part.trim())
    .filter(Boolean)
    .join(" ")

  return equipment ? `${unit.label.trim()} — ${equipment}` : unit.label.trim()
}

/** "Living room · Sharp · dripping water indoors" — a collapsed card's line. */
export function summarizeUnit(unit: RequestDeviceFormInput): string {
  return [unit.label, unit.brand, unit.originalDescription]
    .map((part) => part.trim())
    .filter(Boolean)
    .join(" · ")
}

export function pluralizeUnits(count: number): string {
  return count === 1 ? "1 unit" : `${count} units`
}
