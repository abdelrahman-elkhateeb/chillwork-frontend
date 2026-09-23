import { useMutation } from "@tanstack/react-query"

import { ROUTES } from "@/config/routes"
import { authApi } from "@/features/auth/api/auth.api"

export function useLogout() {
  return useMutation({
    mutationFn: () => authApi.logout(),
    // A full page load rather than a client-side navigate + cache reset:
    // - it drops every piece of the previous user's data held in memory;
    // - clearing the current user in the cache would make the auth guard
    //   redirect to /login before the (transition-wrapped) router
    //   navigation home commits.
    // The server always clears the cookies, so do this on either outcome.
    onSettled: () => {
      window.location.replace(ROUTES.home)
    },
  })
}
