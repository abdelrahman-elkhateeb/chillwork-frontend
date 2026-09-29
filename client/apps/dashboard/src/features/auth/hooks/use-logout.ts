import { useMutation } from "@tanstack/react-query"

import { ROUTES } from "@/config/routes"
import { authApi } from "@/features/auth/api/auth.api"

/**
 * A full page load afterwards rather than a client-side navigate: it drops
 * every piece of the previous user's data held in memory, and avoids the
 * guard redirecting before the navigation commits. The server always
 * clears the cookies, so do this on either outcome.
 */
export function useLogout(redirectTo: string = ROUTES.login) {
  return useMutation({
    mutationFn: () => authApi.logout(),
    onSettled: () => {
      window.location.replace(redirectTo)
    },
  })
}
