/**
 * Mirrors the API's rules (apps/api/src/modules/requests/request.schemas.ts
 * and the FS14 bounds it shares from gemini.constants.ts).
 */
export const MAX_DEVICES_PER_REQUEST = 10
export const MAX_ADDRESS_LENGTH = 500
export const MAX_DIRECTIONS_LENGTH = 200

/**
 * The API has one `address` field, so "how to find you" travels inside it,
 * after this separator. Both together must fit MAX_ADDRESS_LENGTH.
 */
export const ADDRESS_DIRECTIONS_SEPARATOR = " — "
export const MAX_DEVICE_LABEL_LENGTH = 100
export const MAX_DEVICE_BRAND_LENGTH = 100
export const MAX_DEVICE_MODEL_LENGTH = 100
export const MAX_ORIGINAL_DESCRIPTION_LENGTH = 4000
