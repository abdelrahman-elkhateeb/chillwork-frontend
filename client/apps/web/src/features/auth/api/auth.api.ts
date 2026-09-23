import { httpClient } from "@/lib/api/http-client"
import type {
  AuthUser,
  CurrentUserResponse,
  LoginRequest,
  LoginResponse,
  LogoutResponse,
  SignupRequest,
  SignupResponse,
} from "@/features/auth/types/auth.types"

/**
 * Login/signup/logout skip the refresh-and-retry: a 401 from them is the
 * real answer (bad credentials), not an expired access cookie.
 */
const NO_REFRESH = { skipAuthRefresh: true } as const

export const authApi = {
  getCurrentUser: async (signal?: AbortSignal): Promise<AuthUser> => {
    const { user } = await httpClient.get<CurrentUserResponse>("/auth/me", {
      signal,
    })
    return user
  },

  login: (body: LoginRequest) =>
    httpClient.post<LoginResponse>("/auth/login", body, NO_REFRESH),

  signup: (body: SignupRequest) =>
    httpClient.post<SignupResponse>("/auth/register", body, NO_REFRESH),

  logout: () =>
    httpClient.post<LogoutResponse>("/auth/logout", undefined, NO_REFRESH),
}
