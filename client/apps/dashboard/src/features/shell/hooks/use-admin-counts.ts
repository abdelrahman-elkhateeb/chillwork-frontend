import { useAdminParts } from "@/features/parts"
import { useAdminRequests } from "@/features/requests"
import { useTechnicians, WHOLE_TEAM } from "@/features/technicians"

/** The API's largest page — what "waiting" is counted from. */
const REQUEST_WINDOW = { page: 1, pageSize: 100 } as const
const OUT_OF_STOCK = { available: false, page: 1, pageSize: 100 } as const

/**
 * The three numbers the admin home and sidebar show, all from data the API
 * already returns. There is no "unscheduled" filter on the requests list,
 * so "waiting" is counted over the newest 100 requests.
 */
export function useAdminCounts() {
  const requests = useAdminRequests(REQUEST_WINDOW)
  const technicians = useTechnicians(WHOLE_TEAM)
  const outOfStock = useAdminParts(OUT_OF_STOCK)

  const waitingRequests =
    requests.data?.items.filter((item) => item.unscheduledDeviceCount > 0) ??
    []
  const team = technicians.data?.items ?? []

  return {
    requests,
    technicians,
    outOfStock,
    waitingRequests,
    waitingCount: requests.data ? waitingRequests.length : null,
    waitingIsPartial: (requests.data?.meta.total ?? 0) > REQUEST_WINDOW.pageSize,
    activeTechnicianCount: technicians.data
      ? team.filter((technician) => technician.status === "ACTIVE").length
      : null,
    invitedTechnicianCount: team.filter(
      (technician) => technician.status === "INVITED"
    ).length,
    technicianCount: technicians.data?.meta.total ?? null,
    outOfStockCount: outOfStock.data?.meta.total ?? null,
  }
}
