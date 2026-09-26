import type { FormAlertContent } from "@/components/form/form.types"
import { isApiError } from "@/lib/api/api-error"
import { API_ERROR_CODES } from "@/lib/api/api.constants"
import { REQUEST_ALERTS } from "@/features/requests/constants/request-messages.constants"

/**
 * The alert shown above the request form for a failed submission, or
 * `null` when the error is already shown under the fields.
 * `fieldErrorsShown` is what `applyServerFieldErrors` returned.
 */
export function getRequestErrorAlert(
  error: unknown,
  { fieldErrorsShown }: { fieldErrorsShown: boolean }
): FormAlertContent | null {
  if (!error) {
    return null
  }

  if (!isApiError(error)) {
    return REQUEST_ALERTS.generic
  }

  switch (error.code) {
    case API_ERROR_CODES.VALIDATION_ERROR:
      return fieldErrorsShown ? null : REQUEST_ALERTS.invalid
    case API_ERROR_CODES.IDEMPOTENCY_IN_PROGRESS:
      return REQUEST_ALERTS.inProgress
    case API_ERROR_CODES.REQUEST_CREATION_FAILED:
      return withRequestId(REQUEST_ALERTS.creationFailed, error.requestId)
    case API_ERROR_CODES.PHOTO_NOT_AVAILABLE:
      return REQUEST_ALERTS.photosUnavailable
    case API_ERROR_CODES.FORBIDDEN:
      return REQUEST_ALERTS.customersOnly
    case API_ERROR_CODES.RATE_LIMITED:
      return REQUEST_ALERTS.rateLimited
    case API_ERROR_CODES.NETWORK_ERROR:
      return REQUEST_ALERTS.network
    default:
      return withRequestId(REQUEST_ALERTS.generic, error.requestId)
  }
}

/** Server-side failures carry an id support can look up in the logs. */
function withRequestId(
  alert: FormAlertContent,
  requestId: string | undefined
): FormAlertContent {
  if (!requestId) {
    return alert
  }

  return {
    ...alert,
    description: `${String(alert.description)} Reference: ${requestId}`,
  }
}
