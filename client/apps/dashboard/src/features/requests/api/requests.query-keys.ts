import type { AdminRequestsQuery } from "@/features/requests/types/request.types"

export const requestKeys = {
  all: ["admin-requests"] as const,
  lists: () => [...requestKeys.all, "list"] as const,
  list: (query: AdminRequestsQuery) => [...requestKeys.lists(), query] as const,
  detail: (requestId: string) =>
    [...requestKeys.all, "detail", requestId] as const,
}
