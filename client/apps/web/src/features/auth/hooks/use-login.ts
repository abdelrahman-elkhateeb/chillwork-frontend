import { useMutation, useQueryClient } from "@tanstack/react-query"

import { authApi } from "@/features/auth/api/auth.api"
import { authKeys } from "@/features/auth/api/auth.query-keys"
import type { LoginRequest } from "@/features/auth/types/auth.types"

export function useLogin() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (credentials: LoginRequest) => authApi.login(credentials),
    onSuccess: ({ user }) => {
      queryClient.setQueryData(authKeys.currentUser(), user)
    },
  })
}
