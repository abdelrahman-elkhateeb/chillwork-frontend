export type FieldErrors = Record<string, string[]>

export type PageMeta = {
  page: number
  pageSize: number
  total: number
}

export type ApiSuccess<T> = {
  data: T
  meta?: PageMeta
}

/** A paginated list: the rows plus the envelope's `meta`. */
export type Page<T> = {
  items: T[]
  meta: PageMeta
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
  /** Extra request headers, e.g. `Idempotency-Key`. */
  headers?: Record<string, string>
  /**
   * Don't try `POST /auth/refresh` and retry when this request gets a 401.
   * Set on the auth endpoints themselves, where a 401 is a real answer
   * (wrong password, dead refresh token), not an expired access token.
   */
  skipAuthRefresh?: boolean
}

export type QueryParams = Record<string, string | number | boolean | undefined>
