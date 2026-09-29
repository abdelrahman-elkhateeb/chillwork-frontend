import { keepPreviousData, useQuery } from "@tanstack/react-query"

import { requestsApi } from "@/features/requests/api/requests.api"
import { requestKeys } from "@/features/requests/api/requests.query-keys"
import type { AdminRequestsQuery } from "@/features/requests/types/request.types"

/** Keeps the previous page on screen while the next one loads. */
export function useAdminRequests(query: AdminRequestsQuery) {
  return useQuery({
    queryKey: requestKeys.list(query),
    queryFn: ({ signal }) => requestsApi.list(query, signal),
    placeholderData: keepPreviousData,
  })
}

export function useAdminRequest(requestId: string) {
  return useQuery({
    queryKey: requestKeys.detail(requestId),
    queryFn: ({ signal }) => requestsApi.detail(requestId, signal),
  })
}
