import {
  ADDRESS_DIRECTIONS_SEPARATOR,
  MAX_DEVICES_PER_REQUEST,
} from "@/features/requests/constants/request-validation.constants"
import { createEmptyDevice } from "@/features/requests/lib/create-empty-device"
import type {
  CustomerRequest,
  CustomerRequestDevice,
} from "@/features/requests/types/customer-request.types"
import type { CreateRequestFormInput } from "@/features/requests/types/request.types"

/** `/requests/new` location state: "report this unit again". */
export type ReportAgainState = {
  reportAgain: {
    address: string
    contactPhone: string
    label: string
    brand: string
    model: string
  }
}

export function toReportAgainState(
  request: CustomerRequest,
  device: CustomerRequestDevice
): ReportAgainState {
  return {
    reportAgain: {
      address: request.address,
      contactPhone: request.contactPhone,
      label: device.label,
      brand: device.brand ?? "",
      model: device.model ?? "",
    },
  }
}

/** `location.state` is untyped and user-controllable — read it defensively. */
export function readReportAgainState(
  state: unknown
): ReportAgainState["reportAgain"] | null {
  if (typeof state !== "object" || state === null) return null
  const value = (state as Record<string, unknown>).reportAgain
  if (typeof value !== "object" || value === null) return null

  const fields = value as Record<string, unknown>
  const text = (key: string) =>
    typeof fields[key] === "string" ? (fields[key] as string) : ""

  const label = text("label")
  if (!label) return null
  return {
    address: text("address"),
    contactPhone: text("contactPhone"),
    label,
    brand: text("brand"),
    model: text("model"),
  }
}

/** The stored address carries "how to find you" after the separator. */
function splitAddress(stored: string) {
  const at = stored.indexOf(ADDRESS_DIRECTIONS_SEPARATOR)
  return at === -1
    ? { address: stored, directions: "" }
    : {
        address: stored.slice(0, at),
        directions: stored.slice(at + ADDRESS_DIRECTIONS_SEPARATOR.length),
      }
}

/**
 * The unit goes in with an empty description — what it is doing now is
 * the one thing she has to say again. An unsent draft is never thrown
 * away: the unit is added to it instead, when there is room.
 */
export function withReportedAgainUnit(
  draft: CreateRequestFormInput | null,
  unit: ReportAgainState["reportAgain"]
): CreateRequestFormInput {
  const device = {
    ...createEmptyDevice(),
    label: unit.label,
    brand: unit.brand,
    model: unit.model,
  }

  if (draft) {
    const onlyBlank =
      draft.devices.length === 1 &&
      !draft.devices[0]?.label &&
      !draft.devices[0]?.originalDescription
    if (onlyBlank) return { ...draft, devices: [device] }
    return draft.devices.length < MAX_DEVICES_PER_REQUEST
      ? { ...draft, devices: [...draft.devices, device] }
      : draft
  }

  return {
    ...splitAddress(unit.address),
    contactPhone: unit.contactPhone,
    devices: [device],
  }
}
