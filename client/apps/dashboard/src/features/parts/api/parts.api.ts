import { httpClient, withQuery } from "@/lib/api/http-client"
import type {
  AdminPart,
  AdminPartsQuery,
  CreatePartBody,
  StockAdjustmentBody,
  UpdatePartBody,
} from "@/features/parts/types/part.types"

const partPath = (id: string) => `/admin/parts/${encodeURIComponent(id)}`

export const partsApi = {
  list: (query: AdminPartsQuery, signal?: AbortSignal) =>
    httpClient.getPage<AdminPart>(withQuery("/admin/parts", query), {
      signal,
    }),

  create: (body: CreatePartBody) =>
    httpClient.post<AdminPart>("/admin/parts", body),

  update: (id: string, body: UpdatePartBody) =>
    httpClient.patch<AdminPart>(partPath(id), body),

  adjustStock: (id: string, body: StockAdjustmentBody) =>
    httpClient.post<AdminPart>(`${partPath(id)}/stock-adjustments`, body),
}
