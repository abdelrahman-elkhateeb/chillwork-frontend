import { useMutation, useQueries, useQueryClient } from "@tanstack/react-query"

import { requestKeys } from "@/features/requests"
import { technicianKeys } from "@/features/technicians"
import {
  schedulingApi,
  schedulingKeys,
} from "@/features/scheduling/api/scheduling.api"
import type { CreateVisitBody } from "@/features/scheduling/types/scheduling.types"

/** Every active technician's busy times over one window, side by side. */
export function useTeamAvailability(
  technicianIds: string[],
  from: string,
  to: string
) {
  return useQueries({
    queries: technicianIds.map((technicianId) => ({
      queryKey: schedulingKeys.availability(technicianId, from, to),
      queryFn: ({ signal }: { signal: AbortSignal }) =>
        schedulingApi.availability(technicianId, from, to, signal),
      staleTime: 0,
    })),
  })
}

export function useCreateVisit(requestId: string) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (body: CreateVisitBody) =>
      schedulingApi.createVisit(requestId, body),
    // A clash means someone else booked meanwhile: refresh who is free.
    onSettled: () =>
      Promise.all([
        queryClient.invalidateQueries({ queryKey: schedulingKeys.all }),
        queryClient.invalidateQueries({ queryKey: requestKeys.all }),
        queryClient.invalidateQueries({ queryKey: technicianKeys.all }),
      ]),
  })
}
