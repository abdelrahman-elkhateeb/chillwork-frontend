import { useMutation, useQueryClient } from "@tanstack/react-query"

import { techniciansApi } from "@/features/technicians/api/technicians.api"
import { technicianKeys } from "@/features/technicians/api/technicians.query-keys"
import type {
  CreateTechnicianBody,
  UpdateTechnicianBody,
} from "@/features/technicians/types/technician.types"

export function useCreateTechnician() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (body: CreateTechnicianBody) => techniciansApi.create(body),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: technicianKeys.all }),
  })
}

export function useUpdateTechnician(technicianId: string) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (body: UpdateTechnicianBody) =>
      techniciansApi.update(technicianId, body),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: technicianKeys.all }),
  })
}

export function useReissueInvitation(technicianId: string) {
  return useMutation({
    mutationFn: () => techniciansApi.reissueInvitation(technicianId),
  })
}
