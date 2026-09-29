import { httpClient, withQuery } from "@/lib/api/http-client"
import type {
  CustomerRequest,
  CustomerRequestSummary,
  TimelineEvent,
} from "@/features/requests/types/customer-request.types"
import type {
  CreateServiceRequestBody,
  CreatedServiceRequest,
} from "@/features/requests/types/request.types"

export const MY_REQUESTS_PAGE_SIZE = 10

export const requestsApi = {
  /**
   * `201` for a new request, `200` when the API replays one it already
   * created for this key — both resolve to the same request.
   */
  create: (body: CreateServiceRequestBody, idempotencyKey: string) =>
    httpClient.post<CreatedServiceRequest>("/requests", body, {
      headers: { "Idempotency-Key": idempotencyKey },
    }),

  /** The caller's own requests, newest first. */
  list: (page: number, signal?: AbortSignal) =>
    httpClient.getPage<CustomerRequestSummary>(
      withQuery("/requests", { page, pageSize: MY_REQUESTS_PAGE_SIZE }),
      { signal }
    ),

  /** Someone else's request and a malformed id are both a plain 404. */
  get: (requestId: string, signal?: AbortSignal) =>
    httpClient.get<CustomerRequest>(
      `/requests/${encodeURIComponent(requestId)}`,
      { signal }
    ),

  timeline: (requestId: string, signal?: AbortSignal) =>
    httpClient.get<TimelineEvent[]>(
      `/requests/${encodeURIComponent(requestId)}/timeline`,
      { signal }
    ),
}
