import type { FormAlertContent } from "@/components/form/form.types"
import { isApiError } from "@/lib/api/api-error"
import { API_ERROR_CODES } from "@/lib/api/api.constants"
import { AUTH_ALERTS } from "@/features/auth/constants/auth-messages.constants"

/**
 * The alert shown above an auth form for a failed request, or `null` when
 * the error is already shown under the fields (validation, duplicate email).
 *
 * Deactivated users get the same INVALID_CREDENTIALS wording on purpose —
 * the API never reveals whether an account exists.
 */
export function getAuthErrorAlert(error: unknown): FormAlertContent | null {
  if (!error) {
    return null
  }

  if (!isApiError(error)) {
    return AUTH_ALERTS.generic
  }

  switch (error.code) {
    case API_ERROR_CODES.CONFLICT:
      return null
    case API_ERROR_CODES.VALIDATION_ERROR:
      return error.fieldErrors ? null : AUTH_ALERTS.generic
    case API_ERROR_CODES.INVALID_CREDENTIALS:
      return AUTH_ALERTS.invalidCredentials
    case API_ERROR_CODES.RATE_LIMITED:
      return AUTH_ALERTS.rateLimited
    case API_ERROR_CODES.DEMO_COMPANY_UNAVAILABLE:
      return AUTH_ALERTS.signupUnavailable
    case API_ERROR_CODES.NETWORK_ERROR:
      return AUTH_ALERTS.network
    default:
      return AUTH_ALERTS.generic
  }
}

export function isEmailTakenError(error: unknown): boolean {
  return isApiError(error) && error.code === API_ERROR_CODES.CONFLICT
}
