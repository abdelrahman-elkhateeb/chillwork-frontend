import { httpClient } from "@/lib/api/http-client"
import type {
  CreateServiceRequestBody,
  CreatedServiceRequest,
} from "@/features/requests/types/request.types"

export const requestsApi = {
  /**
   * `201` for a new request, `200` when the API replays one it already
   * created for this key — both resolve to the same request.
   */
  create: (body: CreateServiceRequestBody, idempotencyKey: string) =>
    httpClient.post<CreatedServiceRequest>("/requests", body, {
      headers: { "Idempotency-Key": idempotencyKey },
    }),
}
