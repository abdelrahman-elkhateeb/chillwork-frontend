import { useMutation, useQueryClient } from "@tanstack/react-query"

import { authApi } from "@/features/auth/api/auth.api"
import { authKeys } from "@/features/auth/api/auth.query-keys"
import type {
  SignupRequest,
  SignupResult,
} from "@/features/auth/types/auth.types"

/**
 * Creates the account, then signs straight in with the same credentials
 * (the API keeps the two steps separate). If only the second step fails,
 * the mutation still succeeds with `signedIn: false` — the account exists,
 * so the user is sent to log in rather than shown a signup error.
 */
export function useSignup() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (input: SignupRequest): Promise<SignupResult> => {
      const { user } = await authApi.signup(input)

      try {
        const session = await authApi.login({
          email: user.email,
          password: input.password,
        })
        return { user: session.user, signedIn: true }
      } catch {
        return { user, signedIn: false }
      }
    },
    onSuccess: ({ user, signedIn }) => {
      if (signedIn) {
        queryClient.setQueryData(authKeys.currentUser(), user)
      }
    },
  })
}
