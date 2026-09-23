import { queryOptions } from "@tanstack/react-query"

import { isUnauthorizedError } from "@/lib/api/api-error"
import { authApi } from "@/features/auth/api/auth.api"
import { authKeys } from "@/features/auth/api/auth.query-keys"
import type { AuthUser } from "@/features/auth/types/auth.types"

/**
 * The signed-in user, or `null` when there is no valid session. A 401 is
 * an answer here ("signed out"), not an error.
 */
export function currentUserQueryOptions() {
  return queryOptions<AuthUser | null>({
    queryKey: authKeys.currentUser(),
    queryFn: async ({ signal }) => {
      try {
        return await authApi.getCurrentUser(signal)
      } catch (error) {
        if (isUnauthorizedError(error)) {
          return null
        }
        throw error
      }
    },
    staleTime: 5 * 60 * 1000,
    retry: false,
  })
}
