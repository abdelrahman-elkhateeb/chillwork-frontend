import { httpClient } from "@/lib/api/http-client"
import type {
  ActivateTechnicianRequest,
  ActivateTechnicianResponse,
  AuthUser,
  CurrentUserResponse,
  LoginRequest,
  LoginResponse,
  LogoutResponse,
} from "@/features/auth/types/auth.types"

/**
 * Login/logout/activation skip the refresh-and-retry: a 401 from them is
 * the real answer, not an expired access cookie.
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

  logout: () =>
    httpClient.post<LogoutResponse>("/auth/logout", undefined, NO_REFRESH),

  activateTechnician: (body: ActivateTechnicianRequest) =>
    httpClient.post<ActivateTechnicianResponse>(
      "/auth/activate-technician",
      body,
      NO_REFRESH
    ),
}
