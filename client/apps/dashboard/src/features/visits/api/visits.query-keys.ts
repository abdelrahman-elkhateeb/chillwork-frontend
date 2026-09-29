import type { VisitsQuery } from "@/features/visits/types/visit.types"

export const visitKeys = {
  all: ["visits"] as const,
  lists: () => [...visitKeys.all, "list"] as const,
  list: (query: VisitsQuery) => [...visitKeys.lists(), query] as const,
  visit: (visitId: string) => [...visitKeys.all, "visit", visitId] as const,
  detail: (visitId: string) =>
    [...visitKeys.visit(visitId), "detail"] as const,
  parts: (visitId: string) => [...visitKeys.visit(visitId), "parts"] as const,
  workResults: (visitId: string) =>
    [...visitKeys.visit(visitId), "work-results"] as const,
  invoicePreview: (visitId: string) =>
    [...visitKeys.visit(visitId), "invoice-preview"] as const,
  invoice: (visitId: string) =>
    [...visitKeys.visit(visitId), "invoice"] as const,
  catalog: (q: string) => ["catalog-parts", q] as const,
}
