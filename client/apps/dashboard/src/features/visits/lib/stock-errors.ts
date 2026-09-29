import { isApiError } from "@/lib/api/api-error"

/**
 * `409 INSUFFICIENT_STOCK` names the offending rows by index
 * (`items.N.quantity: ["Only 2 available"]`); map them back to part ids.
 */
export function stockErrorsByPart(
  error: unknown,
  sentPartIds: readonly string[]
): Record<string, string> {
  if (!isApiError(error) || !error.fieldErrors) {
    return {}
  }
  const result: Record<string, string> = {}
  for (const [path, messages] of Object.entries(error.fieldErrors)) {
    const match = /^items\.(\d+)\.(quantity|partId)$/.exec(path)
    const partId = match ? sentPartIds[Number(match[1])] : undefined
    if (partId && messages[0]) {
      result[partId] = messages[0]
    }
  }
  return result
}
