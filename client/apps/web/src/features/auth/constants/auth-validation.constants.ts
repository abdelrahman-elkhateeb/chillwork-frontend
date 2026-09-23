/** Mirrors the API's rules (apps/api/src/modules/auth/auth.schemas.ts). */
export const NAME_MIN_LENGTH = 2
export const NAME_MAX_LENGTH = 100
export const PASSWORD_MIN_LENGTH = 8

/** Optional "+", 7–15 digits, no leading zero — after stripping spaces, dashes and brackets. */
export const PHONE_PATTERN = /^\+?[1-9]\d{6,14}$/
export const PHONE_SEPARATORS = /[\s\-()]/g
