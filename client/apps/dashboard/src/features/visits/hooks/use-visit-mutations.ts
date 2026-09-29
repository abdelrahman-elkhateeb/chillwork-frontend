import { useRef } from "react"
import { useMutation, useQueryClient } from "@tanstack/react-query"

import { isApiError } from "@/lib/api/api-error"
import { visitsApi } from "@/features/visits/api/visits.api"
import { visitKeys } from "@/features/visits/api/visits.query-keys"
import type {
  DecidePartsBody,
  RecordWorkResultBody,
  SetDevicePartsBody,
} from "@/features/visits/types/visit.types"

/**
 * Every write refreshes the whole visit (detail, parts, results, preview):
 * `allowedActions` and the totals are the server's to work out.
 */
function useInvalidateVisit(visitId: string) {
  const queryClient = useQueryClient()
  return () =>
    Promise.all([
      queryClient.invalidateQueries({ queryKey: visitKeys.visit(visitId) }),
      queryClient.invalidateQueries({ queryKey: visitKeys.lists() }),
    ])
}

export function useStartVisit(visitId: string) {
  const invalidate = useInvalidateVisit(visitId)
  return useMutation({
    mutationFn: () => visitsApi.start(visitId),
    onSettled: invalidate,
  })
}

export function useCompleteVisit(visitId: string) {
  const invalidate = useInvalidateVisit(visitId)
  return useMutation({
    mutationFn: () => visitsApi.complete(visitId),
    onSettled: invalidate,
  })
}

export function useSetDeviceParts(visitId: string, deviceId: string) {
  const invalidate = useInvalidateVisit(visitId)
  return useMutation({
    mutationFn: (body: SetDevicePartsBody) =>
      visitsApi.setDeviceParts(visitId, deviceId, body),
    // A VERSION_CONFLICT also needs fresh data, so refresh either way.
    onSettled: invalidate,
  })
}

export function useDecideParts(visitId: string, deviceId: string) {
  const invalidate = useInvalidateVisit(visitId)
  return useMutation({
    mutationFn: (body: DecidePartsBody) =>
      visitsApi.decideParts(visitId, deviceId, body),
    onSettled: invalidate,
  })
}

export function useRecordWorkResult(visitId: string, deviceId: string) {
  const invalidate = useInvalidateVisit(visitId)
  return useMutation({
    mutationFn: (body: RecordWorkResultBody) =>
      visitsApi.recordWorkResult(visitId, deviceId, body),
    onSettled: invalidate,
  })
}

/** No response, a 5xx, or a concurrent duplicate: replay the same key. */
function isReplayable(error: unknown): boolean {
  return (
    isApiError(error) &&
    (error.status === 0 ||
      error.status >= 500 ||
      error.code === "IDEMPOTENCY_IN_PROGRESS")
  )
}

/**
 * Issues the invoice once. The Idempotency-Key lives as long as this
 * screen: a double tap or an automatic retry replays the same issuance
 * instead of failing with INVOICE_ALREADY_ISSUED.
 */
export function useIssueInvoice(visitId: string) {
  const invalidate = useInvalidateVisit(visitId)
  const key = useRef<string | null>(null)

  return useMutation({
    mutationFn: () => {
      key.current ??= crypto.randomUUID()
      return visitsApi.issueInvoice(visitId, key.current)
    },
    retry: (failureCount, error) => failureCount < 2 && isReplayable(error),
    retryDelay: (attempt) => 1500 * (attempt + 1),
    onSettled: invalidate,
  })
}
