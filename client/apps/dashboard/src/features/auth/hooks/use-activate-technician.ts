import { useMutation, useQueryClient } from "@tanstack/react-query"

import { authApi } from "@/features/auth/api/auth.api"
import { authKeys } from "@/features/auth/api/auth.query-keys"

type ActivateInput = { token: string; password: string }

export type ActivateResult = { signedIn: boolean; email: string }

/**
 * Sets the technician's own password, then signs straight in with it
 * ("Activate and sign in") — activation itself never opens a session. If
 * only the sign-in fails, the account is still active: `signedIn: false`
 * sends them to the login page instead of showing an activation error.
 */
export function useActivateTechnician() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({
      token,
      password,
    }: ActivateInput): Promise<ActivateResult> => {
      const { email } = await authApi.activateTechnician({ token, password })

      try {
        const { user } = await authApi.login({ email, password })
        queryClient.setQueryData(authKeys.currentUser(), user)
        return { signedIn: true, email }
      } catch {
        return { signedIn: false, email }
      }
    },
  })
}
