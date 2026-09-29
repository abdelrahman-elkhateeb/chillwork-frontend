import { httpClient, withQuery } from "@/lib/api/http-client"
import type { CatalogPart } from "@/features/parts"
import type {
  DecidePartsBody,
  DeviceParts,
  DeviceWorkResult,
  Invoice,
  InvoicePreview,
  RecordWorkResultBody,
  SetDevicePartsBody,
  VisitDetail,
  VisitListItem,
  VisitParts,
  VisitStatus,
  VisitsQuery,
  WorkResults,
} from "@/features/visits/types/visit.types"

const visitPath = (visitId: string) =>
  `/technician/visits/${encodeURIComponent(visitId)}`

const devicePath = (visitId: string, deviceId: string) =>
  `${visitPath(visitId)}/devices/${encodeURIComponent(deviceId)}`

export const visitsApi = {
  list: (query: VisitsQuery, signal?: AbortSignal) =>
    httpClient.getPage<VisitListItem>(withQuery("/technician/visits", query), {
      signal,
    }),

  detail: (visitId: string, signal?: AbortSignal) =>
    httpClient.get<VisitDetail>(visitPath(visitId), { signal }),

  start: (visitId: string) =>
    httpClient.post<{ id: string; status: VisitStatus }>(
      `${visitPath(visitId)}/start`
    ),

  complete: (visitId: string) =>
    httpClient.post<{ id: string; status: VisitStatus }>(
      `${visitPath(visitId)}/complete`
    ),

  parts: (visitId: string, signal?: AbortSignal) =>
    httpClient.get<VisitParts>(`${visitPath(visitId)}/parts`, { signal }),

  setDeviceParts: (
    visitId: string,
    deviceId: string,
    body: SetDevicePartsBody
  ) => httpClient.put<DeviceParts>(`${devicePath(visitId, deviceId)}/parts`, body),

  decideParts: (visitId: string, deviceId: string, body: DecidePartsBody) =>
    httpClient.post<DeviceParts>(
      `${devicePath(visitId, deviceId)}/parts/decisions`,
      body
    ),

  workResults: (visitId: string, signal?: AbortSignal) =>
    httpClient.get<WorkResults>(`${visitPath(visitId)}/work-results`, {
      signal,
    }),

  recordWorkResult: (
    visitId: string,
    deviceId: string,
    body: RecordWorkResultBody
  ) =>
    httpClient.put<DeviceWorkResult>(
      `${visitPath(visitId)}/work-results/${encodeURIComponent(deviceId)}`,
      body
    ),

  invoicePreview: (visitId: string, signal?: AbortSignal) =>
    httpClient.get<InvoicePreview>(`${visitPath(visitId)}/invoice-preview`, {
      signal,
    }),

  invoice: (visitId: string, signal?: AbortSignal) =>
    httpClient.get<Invoice>(`${visitPath(visitId)}/invoice`, { signal }),

  issueInvoice: (visitId: string, idempotencyKey: string) =>
    httpClient.post<Invoice>(`${visitPath(visitId)}/invoice`, undefined, {
      headers: { "Idempotency-Key": idempotencyKey },
    }),

  /** The active catalog, with in-stock flags (never the counts). */
  catalog: (q: string, signal?: AbortSignal) =>
    httpClient.getPage<CatalogPart>(
      withQuery("/catalog/parts", { q, page: 1, pageSize: 50 }),
      { signal }
    ),
}
