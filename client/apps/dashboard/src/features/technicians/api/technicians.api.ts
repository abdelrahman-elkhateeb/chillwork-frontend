import { httpClient, withQuery } from "@/lib/api/http-client"
import type {
  CreateTechnicianBody,
  CreateTechnicianResult,
  Invitation,
  Technician,
  TechniciansQuery,
  UpdateTechnicianBody,
} from "@/features/technicians/types/technician.types"

const technicianPath = (id: string) =>
  `/admin/technicians/${encodeURIComponent(id)}`

export const techniciansApi = {
  list: (query: TechniciansQuery, signal?: AbortSignal) =>
    httpClient.getPage<Technician>(withQuery("/admin/technicians", query), {
      signal,
    }),

  create: (body: CreateTechnicianBody) =>
    httpClient.post<CreateTechnicianResult>("/admin/technicians", body),

  update: (id: string, body: UpdateTechnicianBody) =>
    httpClient.patch<Technician>(technicianPath(id), body),

  /** A fresh link; the previous unused one stops working. */
  reissueInvitation: (id: string) =>
    httpClient.post<Invitation>(`${technicianPath(id)}/invitation`),
}
