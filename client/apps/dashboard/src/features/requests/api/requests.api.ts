import { httpClient, withQuery } from "@/lib/api/http-client"
import type {
  AdminRequestDetail,
  AdminRequestListItem,
  AdminRequestsQuery,
} from "@/features/requests/types/request.types"

export const requestsApi = {
  list: (query: AdminRequestsQuery, signal?: AbortSignal) =>
    httpClient.getPage<AdminRequestListItem>(
      withQuery("/admin/requests", query),
      { signal }
    ),

  detail: (requestId: string, signal?: AbortSignal) =>
    httpClient.get<AdminRequestDetail>(
      `/admin/requests/${encodeURIComponent(requestId)}`,
      { signal }
    ),
}
