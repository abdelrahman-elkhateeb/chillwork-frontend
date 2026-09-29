import { httpClient, withQuery } from "@/lib/api/http-client"
import type {
  Availability,
  CreateVisitBody,
  CreatedVisit,
} from "@/features/scheduling/types/scheduling.types"

export const schedulingKeys = {
  all: ["scheduling"] as const,
  availability: (technicianId: string, from: string, to: string) =>
    [...schedulingKeys.all, "availability", technicianId, from, to] as const,
}

export const schedulingApi = {
  availability: (
    technicianId: string,
    from: string,
    to: string,
    signal?: AbortSignal
  ) =>
    httpClient.get<Availability>(
      withQuery(
        `/admin/technicians/${encodeURIComponent(technicianId)}/availability`,
        { from, to }
      ),
      { signal }
    ),

  createVisit: (requestId: string, body: CreateVisitBody) =>
    httpClient.post<CreatedVisit>(
      `/admin/requests/${encodeURIComponent(requestId)}/visits`,
      body
    ),
}
