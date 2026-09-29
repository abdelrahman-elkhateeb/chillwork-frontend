import { keepPreviousData, useQuery } from "@tanstack/react-query"

import { isNotFoundError } from "@/lib/api/api-error"
import { requestsApi } from "@/features/requests/api/requests.api"
import { requestKeys } from "@/features/requests/api/requests.query-keys"

/** Keeps the current page on screen while the next one loads. */
export function useMyRequests(page: number) {
  return useQuery({
    queryKey: requestKeys.list(page),
    queryFn: ({ signal }) => requestsApi.list(page, signal),
    placeholderData: keepPreviousData,
  })
}

// A 404 is an answer ("not yours, or gone"), not a blip worth retrying.
const retryUnlessNotFound = (failureCount: number, error: unknown) =>
  !isNotFoundError(error) && failureCount < 2

export function useMyRequest(requestId: string) {
  return useQuery({
    queryKey: requestKeys.detail(requestId),
    queryFn: ({ signal }) => requestsApi.get(requestId, signal),
    retry: retryUnlessNotFound,
  })
}

export function useRequestTimeline(requestId: string) {
  return useQuery({
    queryKey: requestKeys.timeline(requestId),
    queryFn: ({ signal }) => requestsApi.timeline(requestId, signal),
    retry: retryUnlessNotFound,
  })
}
