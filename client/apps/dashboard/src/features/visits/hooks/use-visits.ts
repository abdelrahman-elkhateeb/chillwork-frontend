import { keepPreviousData, useQuery } from "@tanstack/react-query"

import { visitsApi } from "@/features/visits/api/visits.api"
import { visitKeys } from "@/features/visits/api/visits.query-keys"
import type { VisitsQuery } from "@/features/visits/types/visit.types"

export type VisitsTab = "today" | "upcoming" | "done"

/**
 * The three tabs as API filters. Days are the phone's own days — the
 * technician and his customers are in the same city.
 */
export function visitsQueryFor(tab: VisitsTab, now = new Date()): VisitsQuery {
  const startOfToday = new Date(now)
  startOfToday.setHours(0, 0, 0, 0)
  const startOfTomorrow = new Date(startOfToday)
  startOfTomorrow.setDate(startOfTomorrow.getDate() + 1)

  switch (tab) {
    case "today":
      return {
        from: startOfToday.toISOString(),
        to: startOfTomorrow.toISOString(),
        pageSize: 50,
      }
    case "upcoming":
      return {
        from: startOfTomorrow.toISOString(),
        status: "SCHEDULED",
        pageSize: 50,
      }
    case "done":
      return { status: "COMPLETED", pageSize: 50 }
  }
}

export function useVisits(query: VisitsQuery) {
  return useQuery({
    queryKey: visitKeys.list(query),
    queryFn: ({ signal }) => visitsApi.list(query, signal),
    placeholderData: keepPreviousData,
  })
}

export function useVisit(visitId: string) {
  return useQuery({
    queryKey: visitKeys.detail(visitId),
    queryFn: ({ signal }) => visitsApi.detail(visitId, signal),
  })
}

export function useVisitParts(visitId: string, enabled = true) {
  return useQuery({
    queryKey: visitKeys.parts(visitId),
    queryFn: ({ signal }) => visitsApi.parts(visitId, signal),
    enabled,
  })
}

export function useWorkResults(visitId: string, enabled = true) {
  return useQuery({
    queryKey: visitKeys.workResults(visitId),
    queryFn: ({ signal }) => visitsApi.workResults(visitId, signal),
    enabled,
  })
}

export function useInvoicePreview(visitId: string, enabled = true) {
  return useQuery({
    queryKey: visitKeys.invoicePreview(visitId),
    queryFn: ({ signal }) => visitsApi.invoicePreview(visitId, signal),
    enabled,
  })
}

/** The issued invoice — a 404 simply means none has been issued yet. */
export function useIssuedInvoice(visitId: string, enabled = true) {
  return useQuery({
    queryKey: visitKeys.invoice(visitId),
    queryFn: ({ signal }) => visitsApi.invoice(visitId, signal),
    enabled,
    retry: false,
  })
}

export function useCatalogParts(q: string) {
  return useQuery({
    queryKey: visitKeys.catalog(q),
    queryFn: ({ signal }) => visitsApi.catalog(q, signal),
    placeholderData: keepPreviousData,
  })
}
