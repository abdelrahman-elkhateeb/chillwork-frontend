import type { Path } from "react-hook-form"

import type { CreateRequestFormInput } from "@/features/requests/types/request.types"

const DEVICE_FIELDS = [
  "label",
  "brand",
  "model",
  "originalDescription",
] as const

/**
 * Every field the API can report an error on, for `applyServerFieldErrors`.
 * The API's `fieldErrors` keys use the same dot paths as react-hook-form
 * (`devices.0.originalDescription`), so they map one to one.
 */
export function getRequestFieldPaths(
  values: CreateRequestFormInput
): Path<CreateRequestFormInput>[] {
  return [
    "address",
    "directions",
    "contactPhone",
    "devices",
    ...values.devices.flatMap((_, index) =>
      DEVICE_FIELDS.map((field) => `devices.${index}.${field}` as const)
    ),
  ]
}
