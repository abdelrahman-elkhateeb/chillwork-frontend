export type FieldErrors = Record<string, string[]>

export type ApiSuccess<T> = {
  data: T
  meta?: Record<string, unknown>
}

export type ApiFailure = {
  error: {
    code: string
    message: string
    fieldErrors?: FieldErrors
    requestId: string
  }
}

export type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE"

export type RequestOptions = {
  method?: HttpMethod
  body?: unknown
  signal?: AbortSignal
  /**
   * Don't try `POST /auth/refresh` and retry when this request gets a 401.
   * Set on the auth endpoints themselves, where a 401 is a real answer
   * (wrong password, dead refresh token), not an expired access token.
   */
  skipAuthRefresh?: boolean
}
