import { useRef, useState } from "react"
import { useMutation, useQueryClient } from "@tanstack/react-query"

import { isApiError } from "@/lib/api/api-error"
import { API_ERROR_CODES } from "@/lib/api/api.constants"
import { requestsApi } from "@/features/requests/api/requests.api"
import { requestKeys } from "@/features/requests/api/requests.query-keys"
import { toCreateRequestBody } from "@/features/requests/lib/to-create-request-body"
import type { CreateRequestFormValues } from "@/features/requests/types/request.types"

/**
 * Failures where the same submission may already be saved or still
 * running on the API: no response at all, any 5xx (including a proxy's,
 * with no envelope) and a concurrent duplicate. Retrying with the same
 * Idempotency-Key replays the original result instead of creating a
 * second request (or running the AI analysis again).
 */
function isReplayable(error: unknown): boolean {
  return (
    isApiError(error) &&
    (error.status === 0 ||
      error.status >= 500 ||
      error.code === API_ERROR_CODES.IDEMPOTENCY_IN_PROGRESS)
  )
}

const MAX_AUTO_RETRIES = 2

type Submission = { key: string; fingerprint: string }

/**
 * Submits one service request. One Idempotency-Key covers one submission:
 * double clicks, automatic retries and a manual "submit again" with the
 * same values all reuse it. Editing the values after a failure starts a
 * new submission with a new key — the API rejects a reused key whose
 * payload changed (IDEMPOTENCY_CONFLICT).
 */
export function useCreateServiceRequest() {
  const queryClient = useQueryClient()
  const submission = useRef<Submission | null>(null)
  // Mirrors the ref for rendering: the sending state shows which key the
  // retries share.
  const [idempotencyKey, setIdempotencyKey] = useState<string | null>(null)

  const mutation = useMutation({
    mutationFn: (values: CreateRequestFormValues) => {
      const body = toCreateRequestBody(values)
      const fingerprint = JSON.stringify(body)

      if (submission.current?.fingerprint !== fingerprint) {
        submission.current = { key: crypto.randomUUID(), fingerprint }
        setIdempotencyKey(submission.current.key)
      }

      return requestsApi.create(body, submission.current.key)
    },
    retry: (failureCount, error) =>
      failureCount < MAX_AUTO_RETRIES && isReplayable(error),
    retryDelay: (attempt) => 2000 * (attempt + 1),
    onSuccess: () => {
      submission.current = null
      return queryClient.invalidateQueries({ queryKey: requestKeys.all })
    },
  })

  return { ...mutation, idempotencyKey }
}
