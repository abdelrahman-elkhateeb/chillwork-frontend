import { ApiError } from "@/lib/api/api-error"
import { API_BASE_URL, REQUEST_ID_HEADER } from "@/lib/api/api.constants"
import type {
  ApiFailure,
  ApiSuccess,
  Page,
  QueryParams,
  RequestOptions,
} from "@/lib/api/api.types"
import { refreshSession } from "@/lib/api/refresh-session"

async function send(path: string, options: RequestOptions): Promise<Response> {
  const hasBody = options.body !== undefined
  const headers = new Headers(options.headers)
  if (hasBody) {
    headers.set("Content-Type", "application/json")
  }

  try {
    return await fetch(`${API_BASE_URL}${path}`, {
      method: options.method ?? "GET",
      credentials: "same-origin",
      headers,
      body: hasBody ? JSON.stringify(options.body) : undefined,
      signal: options.signal,
    })
  } catch (error) {
    if (error instanceof DOMException && error.name === "AbortError") {
      throw error
    }
    throw ApiError.network()
  }
}

async function readJson(response: Response): Promise<unknown> {
  try {
    return await response.json()
  } catch {
    return null
  }
}

function isFailureBody(body: unknown): body is ApiFailure {
  return typeof body === "object" && body !== null && "error" in body
}

async function unwrap<T>(response: Response): Promise<ApiSuccess<T>> {
  const body = await readJson(response)

  if (response.ok) {
    return body as ApiSuccess<T>
  }

  if (isFailureBody(body)) {
    throw ApiError.fromFailure(response.status, body)
  }

  // No envelope (e.g. a proxy error page) — the header still ties it to
  // the server logs when the request reached the API at all.
  throw ApiError.unknown(
    response.status,
    response.headers.get(REQUEST_ID_HEADER) ?? undefined
  )
}

async function requestEnvelope<T>(
  path: string,
  options: RequestOptions = {}
): Promise<ApiSuccess<T>> {
  let response = await send(path, options)

  if (response.status === 401 && !options.skipAuthRefresh) {
    const refreshed = await refreshSession()
    if (refreshed) {
      response = await send(path, options)
    }
  }

  return unwrap<T>(response)
}

/**
 * Sends a request to the API and returns the envelope's `data`, or throws
 * an `ApiError` built from its `error`. An expired access cookie gets one
 * transparent refresh-and-retry.
 */
export async function request<T>(
  path: string,
  options: RequestOptions = {}
): Promise<T> {
  const envelope = await requestEnvelope<T>(path, options)
  return envelope.data
}

/** `?a=1&b=x` from the defined, non-empty params only. */
export function withQuery(path: string, params: QueryParams = {}): string {
  const search = new URLSearchParams()
  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined && value !== "") {
      search.set(key, String(value))
    }
  }
  const query = search.toString()
  return query ? `${path}?${query}` : path
}

type BodylessOptions = Omit<RequestOptions, "method" | "body">

export const httpClient = {
  get: <T>(path: string, options?: BodylessOptions) =>
    request<T>(path, { ...options, method: "GET" }),

  /** A paginated list — keeps the envelope's `meta` next to the rows. */
  getPage: async <T>(
    path: string,
    options?: BodylessOptions
  ): Promise<Page<T>> => {
    const { data, meta } = await requestEnvelope<T[]>(path, {
      ...options,
      method: "GET",
    })
    return {
      items: data,
      meta: meta ?? { page: 1, pageSize: data.length, total: data.length },
    }
  },

  post: <T>(path: string, body?: unknown, options?: BodylessOptions) =>
    request<T>(path, { ...options, method: "POST", body }),

  put: <T>(path: string, body?: unknown, options?: BodylessOptions) =>
    request<T>(path, { ...options, method: "PUT", body }),

  patch: <T>(path: string, body?: unknown, options?: BodylessOptions) =>
    request<T>(path, { ...options, method: "PATCH", body }),
}
