import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query"

import { partsApi } from "@/features/parts/api/parts.api"
import { partKeys } from "@/features/parts/api/parts.query-keys"
import type {
  AdminPartsQuery,
  CreatePartBody,
  StockAdjustmentBody,
  UpdatePartBody,
} from "@/features/parts/types/part.types"

/** The API's largest page. */
export const WHOLE_SHELF = { page: 1, pageSize: 100 } as const

export function useAdminParts(query: AdminPartsQuery) {
  return useQuery({
    queryKey: partKeys.list(query),
    queryFn: ({ signal }) => partsApi.list(query, signal),
    placeholderData: keepPreviousData,
  })
}

/**
 * One part. There is no single-part endpoint, so this reads the whole
 * shelf (up to the API's 100-per-page limit) and picks it out.
 */
export function useAdminPart(partId: string) {
  const query = useAdminParts(WHOLE_SHELF)
  const part = query.data?.items.find((item) => item.id === partId) ?? null
  return { ...query, part }
}

export function useCreatePart() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (body: CreatePartBody) => partsApi.create(body),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: partKeys.all }),
  })
}

export function useUpdatePart(partId: string) {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (body: UpdatePartBody) => partsApi.update(partId, body),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: partKeys.all }),
  })
}

export function useAdjustStock(partId: string) {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (body: StockAdjustmentBody) =>
      partsApi.adjustStock(partId, body),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: partKeys.all }),
  })
}
