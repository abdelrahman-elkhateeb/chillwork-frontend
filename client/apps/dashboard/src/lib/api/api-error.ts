import { API_ERROR_CODES } from "@/lib/api/api.constants"
import type { ApiFailure, FieldErrors } from "@/lib/api/api.types"

export class ApiError extends Error {
  readonly status: number
  readonly code: string
  readonly fieldErrors?: FieldErrors
  readonly requestId?: string

  constructor(params: {
    status: number
    code: string
    message: string
    fieldErrors?: FieldErrors
    requestId?: string
  }) {
    super(params.message)
    this.name = "ApiError"
    this.status = params.status
    this.code = params.code
    this.fieldErrors = params.fieldErrors
    this.requestId = params.requestId
  }

  static fromFailure(status: number, body: ApiFailure): ApiError {
    return new ApiError({ status, ...body.error })
  }

  static network(): ApiError {
    return new ApiError({
      status: 0,
      code: API_ERROR_CODES.NETWORK_ERROR,
      message: "Can't reach the server. Check your connection.",
    })
  }

  static unknown(status: number, requestId?: string): ApiError {
    return new ApiError({
      status,
      code: API_ERROR_CODES.UNKNOWN_ERROR,
      message: "Something went wrong. Please try again.",
      requestId,
    })
  }
}

export function isApiError(error: unknown): error is ApiError {
  return error instanceof ApiError
}

export function isUnauthorizedError(error: unknown): boolean {
  return isApiError(error) && error.status === 401
}

export function isNotFoundError(error: unknown): boolean {
  return isApiError(error) && error.status === 404
}

export function hasErrorCode(error: unknown, code: string): boolean {
  return isApiError(error) && error.code === code
}
