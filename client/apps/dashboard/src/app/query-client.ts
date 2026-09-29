import { QueryCache, QueryClient } from "@tanstack/react-query"

import { isApiError, isUnauthorizedError } from "@/lib/api/api-error"
import { authKeys } from "@/features/auth"

export const queryClient: QueryClient = new QueryClient({
  queryCache: new QueryCache({
    // Any query that still gets a 401 after the http client's own
    // refresh-and-retry means the session is gone (e.g. an admin stopped
    // this technician) — reflect that so the guard sends them to sign in.
    onError: (error) => {
      if (isUnauthorizedError(error)) {
        queryClient.setQueryData(authKeys.currentUser(), null)
      }
    },
  }),
  defaultOptions: {
    queries: {
      staleTime: 30 * 1000,
      refetchOnWindowFocus: false,
      // Don't retry what won't change on retry (4xx), do retry flaky 5xx/network.
      retry: (failureCount, error) =>
        failureCount < 2 &&
        !(isApiError(error) && error.status >= 400 && error.status < 500),
    },
  },
})
