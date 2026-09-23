import { useQuery } from "@tanstack/react-query"

import { currentUserQueryOptions } from "@/features/auth/api/current-user.query"

export function useCurrentUser() {
  const query = useQuery(currentUserQueryOptions())

  return {
    ...query,
    user: query.data ?? null,
    isAuthenticated: Boolean(query.data),
  }
}
