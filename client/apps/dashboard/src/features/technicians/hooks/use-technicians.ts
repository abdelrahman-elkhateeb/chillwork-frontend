import { keepPreviousData, useQuery } from "@tanstack/react-query"

import { techniciansApi } from "@/features/technicians/api/technicians.api"
import { technicianKeys } from "@/features/technicians/api/technicians.query-keys"
import type { TechniciansQuery } from "@/features/technicians/types/technician.types"

/** The API's largest page — enough for a whole team on one screen. */
export const WHOLE_TEAM = { page: 1, pageSize: 100 } as const

export function useTechnicians(query: TechniciansQuery) {
  return useQuery({
    queryKey: technicianKeys.list(query),
    queryFn: ({ signal }) => techniciansApi.list(query, signal),
    placeholderData: keepPreviousData,
  })
}

/**
 * One technician. The API has no single-technician endpoint, so this reads
 * the whole team list (shared with the list page's cache) and picks one.
 */
export function useTechnician(technicianId: string) {
  const query = useTechnicians(WHOLE_TEAM)
  const technician =
    query.data?.items.find((item) => item.id === technicianId) ?? null
  return { ...query, technician }
}
