import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

import { settingsApi, settingsKeys } from "@/features/settings/api/settings.api"
import type { UpdateCompanySettingsBody } from "@/features/settings/types/settings.types"

export function useCompanySettings() {
  return useQuery({
    queryKey: settingsKeys.settings(),
    queryFn: ({ signal }) => settingsApi.get(signal),
  })
}

export function useUpdateCompanySettings() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (body: UpdateCompanySettingsBody) => settingsApi.update(body),
    onSuccess: (settings) => {
      queryClient.setQueryData(settingsKeys.settings(), settings)
      return queryClient.invalidateQueries({ queryKey: settingsKeys.pricing() })
    },
  })
}

/**
 * Currency + labor fee. `BILLING_NOT_CONFIGURED` (409) until an admin has
 * saved both — callers show prices only when this has data.
 */
export function usePricing() {
  return useQuery({
    queryKey: settingsKeys.pricing(),
    queryFn: ({ signal }) => settingsApi.pricing(signal),
    staleTime: 5 * 60 * 1000,
  })
}
