/**
 * Always a same-origin path. In dev, Vite proxies it to the API (see
 * vite.config.ts); in production the host is expected to do the same.
 * The auth cookies are HttpOnly and set without a Domain, so they only
 * work when the API is reached through the site's own origin.
 */
export const API_BASE_URL = "/api/v1"

export const API_ERROR_CODES = {
  NETWORK_ERROR: "NETWORK_ERROR",
  UNKNOWN_ERROR: "UNKNOWN_ERROR",
  VALIDATION_ERROR: "VALIDATION_ERROR",
  UNAUTHORIZED: "UNAUTHORIZED",
  CONFLICT: "CONFLICT",
  RATE_LIMITED: "RATE_LIMITED",
  INVALID_CREDENTIALS: "INVALID_CREDENTIALS",
  SESSION_EXPIRED: "SESSION_EXPIRED",
  SESSION_REVOKED: "SESSION_REVOKED",
  CSRF_ORIGIN_REJECTED: "CSRF_ORIGIN_REJECTED",
  DEMO_COMPANY_UNAVAILABLE: "DEMO_COMPANY_UNAVAILABLE",
} as const

export type ApiErrorCode =
  (typeof API_ERROR_CODES)[keyof typeof API_ERROR_CODES]
