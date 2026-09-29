import { API_BASE_URL } from "@/lib/api/api.constants"

let inFlight: Promise<boolean> | null = null

/**
 * Asks the API to rotate the refresh cookie and issue a new access cookie.
 * Resolves to whether it worked.
 *
 * Single-flight: when several requests hit a 401 at the same moment they
 * all wait on one refresh call instead of each rotating the token, which
 * would push the others outside the server's reuse grace window.
 */
export function refreshSession(): Promise<boolean> {
  inFlight ??= fetch(`${API_BASE_URL}/auth/refresh`, {
    method: "POST",
    credentials: "same-origin",
  })
    .then((response) => response.ok)
    .catch(() => false)
    .finally(() => {
      inFlight = null
    })

  return inFlight
}
