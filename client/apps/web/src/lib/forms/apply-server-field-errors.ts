import type { FieldValues, Path, UseFormSetError } from "react-hook-form"

import { isApiError } from "@/lib/api/api-error"

/**
 * Copies an ApiError's `fieldErrors` onto the matching form fields, so
 * server-side validation shows under each field like client-side does.
 * Returns whether anything was applied.
 */
export function applyServerFieldErrors<TValues extends FieldValues>(
  error: unknown,
  setError: UseFormSetError<TValues>,
  fields: readonly Path<TValues>[]
): boolean {
  if (!isApiError(error) || !error.fieldErrors) {
    return false
  }

  let applied = false

  for (const field of fields) {
    const message = error.fieldErrors[field]?.[0]
    if (message) {
      setError(field, { type: "server", message })
      applied = true
    }
  }

  return applied
}
